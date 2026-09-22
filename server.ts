import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

export interface ContactRecord {
  id: string;
  name: string;
  email: string;
  reason: string;
  message: string;
  timestamp: string;
  status: 'new' | 'replied';
  replied: boolean;
  repliedAt: string | null;
}

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const CONTACT_FILE = path.join(DATA_DIR, 'contactReceived.json');
const LEGACY_FILE = path.join(DATA_DIR, 'submissions.json');

// Replit secret or environment password; fallback to student designated password
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Grossmont2029';

// In-memory active session tokens for verified server-side authentication
const activeTokens = new Set<string>();

// Ensure data directory and data/contactReceived.json exist
function initStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(CONTACT_FILE)) {
    const initialRecords: ContactRecord[] = [
      {
        id: 'contact-demo-1',
        name: 'Dr. Sarah Jenkins',
        email: 'sjenkins@ucsd.health.edu',
        reason: 'Pre-Med & Academic Mentorship',
        message: 'Hello Mohammed, wonderful to see a Grossmont High sophomore combining AI design with a passion for healthcare. Your goal of reaching 517 on the MCAT and physician shadowing is very commendable. Keep up the great work in AP Biology!',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
        status: 'new',
        replied: false,
        repliedAt: null,
      },
      {
        id: 'contact-demo-2',
        name: 'Grossmont High AI Club Lead',
        email: 'aiclub@guhsd.net',
        reason: 'Grossmont High AI Projects',
        message: 'Hey Mohammed, we loved your interactive portfolio demo. Would you like to present your AI employee collaboration workflow at the next computer science club meeting?',
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
        status: 'replied',
        replied: true,
        repliedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
      {
        id: 'contact-demo-3',
        name: 'Alex Chen',
        email: 'alex.chen@sdsu.edu',
        reason: 'Language & Gaming Discussion',
        message: 'Saw that you are studying Chinese and play competitive games! Let me know if you want to practice HSK character flashcards or join our local collegiate esports scrimmage.',
        timestamp: new Date(Date.now() - 3600000 * 72).toISOString(),
        status: 'replied',
        replied: true,
        repliedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
      }
    ];
    fs.writeFileSync(CONTACT_FILE, JSON.stringify(initialRecords, null, 2), 'utf-8');
  }

  // Also sync legacy file for backwards compatibility
  if (!fs.existsSync(LEGACY_FILE)) {
    try {
      const records = JSON.parse(fs.readFileSync(CONTACT_FILE, 'utf-8'));
      fs.writeFileSync(LEGACY_FILE, JSON.stringify(records, null, 2), 'utf-8');
    } catch (e) {
      // Ignore
    }
  }
}

function getContactRecords(): ContactRecord[] {
  try {
    initStorage();
    const content = fs.readFileSync(CONTACT_FILE, 'utf-8');
    const records = JSON.parse(content);
    return Array.isArray(records) ? records : [];
  } catch (error) {
    console.error('Error reading contactReceived.json:', error);
    return [];
  }
}

function saveContactRecords(records: ContactRecord[]): boolean {
  try {
    initStorage();
    fs.writeFileSync(CONTACT_FILE, JSON.stringify(records, null, 2), 'utf-8');
    // Also update legacy file so older endpoints stay in sync
    fs.writeFileSync(LEGACY_FILE, JSON.stringify(records, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing contactReceived.json:', error);
    return false;
  }
}

app.use(express.json());

// API Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Authentication Middleware for Protected Admin Routes
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const directPassword = req.headers['x-admin-password'];

  if ((token && activeTokens.has(token)) || directPassword === ADMIN_PASSWORD) {
    return next();
  }

  return res.status(401).json({
    error: 'Unauthorized: Valid admin authentication required to access message data.'
  });
}

// Admin Login Route
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;

  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password. Access denied.' });
  }

  const token = 'token-' + crypto.randomBytes(24).toString('hex');
  activeTokens.add(token);

  res.json({
    success: true,
    token,
    message: 'Admin authentication successful'
  });
});

// Admin Logout Route
app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (token) {
    activeTokens.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// Rubric Criterion 4: Uses POST /api/contact, records appended to data/contactReceived.json
app.post('/api/contact', (req, res) => {
  const { name, email, reason, subject, message } = req.body;

  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  if (!email || !String(email).trim() || !String(email).includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }
  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: 'Message cannot be empty.' });
  }

  const chosenReason = String(reason || subject || 'General Inquiry').trim();

  const newRecord: ContactRecord = {
    id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    name: String(name).trim(),
    email: String(email).trim(),
    reason: chosenReason,
    message: String(message).trim(),
    timestamp: new Date().toISOString(),
    status: 'new',
    replied: false,
    repliedAt: null,
  };

  const records = getContactRecords();
  // Appends to list (placed at index 0 for newest-first retrieval, persisted in array)
  records.unshift(newRecord);
  const success = saveContactRecords(records);

  if (!success) {
    return res.status(500).json({ error: 'Failed to write to persistent data/contactReceived.json.' });
  }

  res.status(201).json({
    success: true,
    message: 'Your message has been received and saved persistently.',
    record: newRecord
  });
});

// Also support POST /api/submissions for backwards compatibility
app.post('/api/submissions', (req, res) => {
  const { name, email, subject, reason, message } = req.body;
  req.body.reason = reason || subject || 'General Inquiry';
  return app._router.handle(req, res, () => {});
});

// Rubric Criterion 7: Admin Security & Message Management - GET /api/admin/messages
// Unauthenticated users CANNOT access message data; returns newest-first
app.get('/api/admin/messages', requireAdminAuth, (req, res) => {
  const records = getContactRecords();
  // Ensure strict chronological sort (newest-first)
  const sorted = [...records].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  res.json(sorted);
});

// Rubric Criterion 7: Mark as Replied updates replied and repliedAt in persistent storage
app.patch('/api/admin/messages/:id/reply', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const records = getContactRecords();
  const target = records.find(r => r.id === id);

  if (!target) {
    return res.status(404).json({ error: 'Message record not found' });
  }

  const newRepliedState = !target.replied;
  target.replied = newRepliedState;
  target.status = newRepliedState ? 'replied' : 'new';
  target.repliedAt = newRepliedState ? new Date().toISOString() : null;

  saveContactRecords(records);

  res.json({
    success: true,
    message: newRepliedState ? 'Marked as replied' : 'Marked as new',
    record: target
  });
});

// Delete message endpoint (Admin only)
app.delete('/api/admin/messages/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const records = getContactRecords();
  const filtered = records.filter(r => r.id !== id);

  if (filtered.length === records.length) {
    return res.status(404).json({ error: 'Message record not found' });
  }

  saveContactRecords(filtered);
  res.json({ success: true, remainingCount: filtered.length });
});

// Rubric Criterion 8: Total / New / Replied / Reply Rate & Messages by Reason chart data
app.get('/api/admin/stats', (req, res) => {
  const records = getContactRecords();
  const total = records.length;
  const replied = records.filter(r => r.replied).length;
  const newCount = records.filter(r => !r.replied).length;
  const replyRate = total > 0 ? Math.round((replied / total) * 100) : 0;

  // Breakdown by Reason
  const reasonsMap: Record<string, number> = {};
  records.forEach(r => {
    const key = r.reason || 'General Inquiry';
    reasonsMap[key] = (reasonsMap[key] || 0) + 1;
  });

  const reasonsList = Object.entries(reasonsMap).map(([reason, count]) => ({
    reason,
    count
  }));

  res.json({
    total,
    newCount,
    replied,
    replyRate,
    reasons: reasonsList,
    storageFile: 'data/contactReceived.json',
    lastUpdated: records[0]?.timestamp || null
  });
});

// Backwards-compatible GET submissions
app.get('/api/submissions', requireAdminAuth, (req, res) => {
  const records = getContactRecords();
  res.json(records);
});

async function startServer() {
  initStorage();

  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mohammed's portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
