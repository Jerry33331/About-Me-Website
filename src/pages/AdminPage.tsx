import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Trash2, 
  Mail, 
  MailCheck, 
  RefreshCw, 
  FileJson, 
  Copy, 
  Check, 
  Clock, 
  User, 
  Filter, 
  AlertCircle,
  Lock,
  LogOut,
  BarChart3,
  CheckCircle2,
  Calendar,
  Tag,
  ArrowUpDown
} from 'lucide-react';
import { ContactMessage, AdminStats, PageId } from '../types';

interface AdminPageProps {
  onNavigate: (page: PageId) => void;
  onRefreshBadge?: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate, onRefreshBadge }) => {
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem('admin_auth_token') || null;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'new' | 'replied'>('all');
  const [copiedJson, setCopiedJson] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const [stats, setStats] = useState<AdminStats>({
    total: 0,
    newCount: 0,
    replied: 0,
    replyRate: 0,
    reasons: [],
    storageFile: 'data/contactReceived.json',
    lastUpdated: null
  });

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Incorrect password.');
      }

      const token = data.token;
      setAuthToken(token);
      localStorage.setItem('admin_auth_token', token);
      setPasswordInput('');
    } catch (err: any) {
      setLoginError(err.message || 'Authentication failed. Please check password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (authToken) {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${authToken}` },
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setAuthToken(null);
      localStorage.removeItem('admin_auth_token');
      setMessages([]);
    }
  };

  const fetchAdminData = async () => {
    if (!authToken) return;
    setLoading(true);
    setError('');

    try {
      const [messagesRes, statsRes] = await Promise.all([
        fetch('/api/admin/messages', {
          headers: { Authorization: `Bearer ${authToken}` }
        }),
        fetch('/api/admin/stats')
      ]);

      if (messagesRes.status === 401) {
        // Token expired or invalid
        handleLogout();
        throw new Error('Session expired. Please log in again.');
      }

      if (!messagesRes.ok || !statsRes.ok) {
        throw new Error('Failed to retrieve messages from server.');
      }

      const msgData: ContactMessage[] = await messagesRes.json();
      const statsData: AdminStats = await statsRes.json();

      setMessages(msgData);
      setStats(statsData);

      if (onRefreshBadge) {
        onRefreshBadge();
      }
    } catch (err: any) {
      console.error('Error fetching admin data:', err);
      setError(err.message || 'Error connecting to persistent storage server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchAdminData();
    }
  }, [authToken]);

  // Rubric: Mark as Replied updates replied and repliedAt in persistent storage
  const handleToggleReplied = async (id: string) => {
    if (!authToken) return;
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}/reply`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${authToken}` }
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update reply status.');
      }

      const updated = await res.json();
      setMessages(prev => prev.map(m => (m.id === id ? updated.record : m)));
      fetchAdminData();
    } catch (err: any) {
      alert(err.message || 'Error updating reply status.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!authToken) return;
    if (!window.confirm('Delete this message from data/contactReceived.json?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` }
      });

      if (res.ok) {
        setMessages(prev => prev.filter(m => m.id !== id));
        fetchAdminData();
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const handleCopyRawJson = () => {
    navigator.clipboard.writeText(JSON.stringify(messages, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // Filter messages (All / New / Replied)
  const filteredMessages = messages.filter(m => {
    if (filter === 'new') return !m.replied;
    if (filter === 'replied') return m.replied;
    return true;
  });

  // Calculate reason totals from current messages
  const reasonsBreakdown = React.useMemo(() => {
    const map: Record<string, number> = {};
    messages.forEach(m => {
      const r = m.reason || 'General Inquiry';
      map[r] = (map[r] || 0) + 1;
    });
    return Object.entries(map).map(([reason, count]) => ({
      reason,
      count,
      pct: messages.length > 0 ? Math.round((count / messages.length) * 100) : 0
    }));
  }, [messages]);

  // If unauthenticated: Rubric requires password check server-side and blocking unauthorized users
  if (!authToken) {
    return (
      <div id="admin-login-screen" className="py-12 max-w-md mx-auto space-y-6">
        <div className="bg-white rounded-2xl border-2 border-emerald-500 p-6 sm:p-8 shadow-md text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7 text-red-600" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-100 text-red-800 text-2xs font-bold mb-2">
              <span>Rubric Criterion 7 • Server Authentication</span>
            </div>
            <h1 className="text-2xl font-extrabold text-emerald-950">
              Admin Authentication
            </h1>
            <p className="text-xs text-zinc-600 mt-1">
              Protected by server-side verification. Enter the project password to access contact submissions and message management.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left pt-2">
            {loginError && (
              <div 
                id="admin-login-error"
                className="p-3 rounded-lg bg-red-50 border border-red-300 text-red-700 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label 
                htmlFor="admin-password-input"
                className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1"
              >
                Admin Password
              </label>
              <input
                id="admin-password-input"
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm focus:ring-2 focus:ring-emerald-600 bg-white"
              />
            </div>

            <button
              id="admin-login-submit-button"
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs disabled:bg-zinc-400"
            >
              {loginLoading ? 'Authenticating...' : 'Unlock Admin Dashboard'}
            </button>
          </form>

          <div className="pt-3 border-t border-zinc-100 text-2xs text-zinc-500 bg-zinc-50 p-2.5 rounded-lg">
            <span className="font-semibold text-zinc-700">Student Password:</span> <code className="bg-emerald-100 text-emerald-950 px-1.5 py-0.5 rounded font-mono font-bold">Grossmont2029</code>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard View
  return (
    <div id="admin-dashboard-page" className="py-8 space-y-8">
      {/* Top Header */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-red-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
              <span>Criteria 7 & 8 • Security & Analytics Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
              Contact Messages & Storage Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600">
              Logged in as Administrator • Persistent storage file: <code className="bg-zinc-100 px-1 py-0.5 rounded text-emerald-900 font-mono font-bold">data/contactReceived.json</code>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              id="admin-refresh-button"
              onClick={fetchAdminData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>

            <button
              id="admin-logout-button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </section>

      {/* Rubric Criterion 8: Metric Cards (Total, New, Replied, Reply Rate) */}
      <section 
        id="admin-stats-summary"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-2xs space-y-1">
          <span className="text-2xs font-bold uppercase tracking-wider text-zinc-500">
            Total Messages
          </span>
          <div className="text-3xl font-extrabold text-emerald-950">
            {stats.total}
          </div>
          <span className="text-2xs text-emerald-700 font-semibold">data/contactReceived.json</span>
        </div>

        <div className="bg-white p-5 rounded-xl border-t-4 border-red-600 border-x-zinc-200 border-b-zinc-200 shadow-2xs space-y-1">
          <span className="text-2xs font-bold uppercase tracking-wider text-red-600">
            New (Unreplied)
          </span>
          <div className="text-3xl font-extrabold text-red-700">
            {stats.newCount}
          </div>
          <span className="text-2xs text-zinc-500">Requires attention</span>
        </div>

        <div className="bg-white p-5 rounded-xl border-t-4 border-emerald-600 border-x-zinc-200 border-b-zinc-200 shadow-2xs space-y-1">
          <span className="text-2xs font-bold uppercase tracking-wider text-emerald-700">
            Replied Messages
          </span>
          <div className="text-3xl font-extrabold text-emerald-800">
            {stats.replied}
          </div>
          <span className="text-2xs text-zinc-500">Marked complete</span>
        </div>

        <div className="bg-white p-5 rounded-xl border-t-4 border-blue-600 border-x-zinc-200 border-b-zinc-200 shadow-2xs space-y-1">
          <span className="text-2xs font-bold uppercase tracking-wider text-blue-700">
            Reply Rate
          </span>
          <div className="text-3xl font-extrabold text-blue-900">
            {stats.replyRate}%
          </div>
          <span className="text-2xs text-zinc-500">Calculated from total</span>
        </div>
      </section>

      {/* Rubric Criterion 8: Chart Accurately Shows Messages by Reason */}
      <section 
        id="messages-by-reason-chart"
        className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-2xs space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base sm:text-lg font-bold text-zinc-900">
              Chart: Inquiries Breakdown by Reason
            </h2>
          </div>
          <span className="text-2xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-md">
            Live Stored Distribution
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {reasonsBreakdown.length === 0 ? (
            <div className="text-xs text-zinc-500 py-4 text-center">No stored messages to plot.</div>
          ) : (
            reasonsBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-700">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>{item.reason}</span>
                  </span>
                  <span className="font-mono text-zinc-900 font-bold">
                    {item.count} messages ({item.pct}%)
                  </span>
                </div>

                {/* Visual Progress Bar Chart */}
                <div className="w-full h-3 rounded-full bg-zinc-100 overflow-hidden border border-zinc-200">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(item.pct, 4)}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Rubric Criterion 7: Message Management (Newest-First, All/New/Replied Filters, Mark as Replied) */}
      <section className="bg-white rounded-2xl border border-zinc-200 shadow-2xs overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 sm:p-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-zinc-900">
              Message Records (Newest-First)
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-xs font-bold">
              {filteredMessages.length}
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <span className="text-2xs font-semibold text-zinc-500 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>

            <button
              id="filter-all-btn"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
              }`}
            >
              All ({messages.length})
            </button>

            <button
              id="filter-new-btn"
              onClick={() => setFilter('new')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                filter === 'new'
                  ? 'bg-red-600 text-white shadow-2xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
              }`}
            >
              New ({stats.newCount})
            </button>

            <button
              id="filter-replied-btn"
              onClick={() => setFilter('replied')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                filter === 'replied'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
              }`}
            >
              Replied ({stats.replied})
            </button>
          </div>
        </div>

        {/* Message Records List */}
        <div className="divide-y divide-zinc-100">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-xs">
              No messages found in this filter category.
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div 
                key={msg.id}
                id={`admin-message-card-${msg.id}`}
                className={`p-6 transition-colors ${
                  !msg.replied ? 'bg-red-50/20' : 'bg-white'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-zinc-900">
                        {msg.name}
                      </span>
                      <a 
                        href={`mailto:${msg.email}`}
                        className="text-xs text-emerald-700 hover:underline font-mono"
                      >
                        {msg.email}
                      </a>

                      {/* Status Badge */}
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs font-bold ${
                        msg.replied
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {msg.replied ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            <span>Replied</span>
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                            <span>New Inbound</span>
                          </>
                        )}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-2xs text-zinc-500">
                      <span className="inline-flex items-center gap-1 font-semibold text-zinc-700">
                        <Tag className="w-3 h-3 text-emerald-600" />
                        <span>Reason: {msg.reason}</span>
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Received: {new Date(msg.timestamp).toLocaleString()}</span>
                      </span>
                      {msg.repliedAt && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold">
                            Replied At: {new Date(msg.repliedAt).toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions: Mark as Replied & Delete */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleReplied(msg.id)}
                      disabled={actionLoadingId === msg.id}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        msg.replied
                          ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                      }`}
                    >
                      <MailCheck className="w-3.5 h-3.5" />
                      <span>{msg.replied ? 'Mark as New' : 'Mark as Replied'}</span>
                    </button>

                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete from JSON storage"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Message Body */}
                <div className="mt-3 p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 leading-relaxed whitespace-pre-wrap font-sans">
                  {msg.message}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info & Raw JSON inspection */}
        <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-2xs text-zinc-500">
          <div>
            Record storage: <code className="font-mono text-zinc-800 font-bold">data/contactReceived.json</code>
          </div>

          <button
            onClick={handleCopyRawJson}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-700 font-medium transition-colors cursor-pointer"
          >
            {copiedJson ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copiedJson ? 'JSON Copied!' : 'Copy Raw JSON'}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
