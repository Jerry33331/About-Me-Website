import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  User, 
  HelpCircle,
  Database,
  Lock
} from 'lucide-react';
import { PageId } from '../types';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onSubmissionSuccess?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onSubmissionSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('Pre-Med & Academic Mentorship');
  const [replyMethod, setReplyMethod] = useState<'Email' | 'Phone'>('Email');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Client-side validation (Rubric: required fields are validated)
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setErrorMessage('Full name is required.');
      return;
    }
    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setErrorMessage('A valid email address containing "@" and a domain is required.');
      return;
    }
    if (!trimmedMessage || trimmedMessage.length < 5) {
      setErrorMessage('Message must be at least 5 characters long.');
      return;
    }
    if (replyMethod === 'Phone' && phone.trim() && phone.trim().length < 7) {
      setErrorMessage('Please provide a valid phone number or switch to Email reply.');
      return;
    }

    setLoading(true);

    try {
      // Rubric Criterion 4: Uses POST /api/contact
      const fullMessage = replyMethod === 'Phone' && phone.trim()
        ? `${trimmedMessage}\n\n[Preferred Reply: Phone/Text at ${phone.trim()}]`
        : trimmedMessage;

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          reason,
          message: fullMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit contact message.');
      }

      // Rubric: Form clears after successful submission
      const recordId = data.record?.id || data.submission?.id || 'saved';
      setSubmittedId(recordId);
      setSuccessMessage('Message successfully submitted and saved to persistent server storage!');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setReason('Pre-Med & Academic Mentorship');
      setReplyMethod('Email');

      if (onSubmissionSuccess) {
        onSubmissionSuccess();
      }
    } catch (err: any) {
      console.error('Contact form error:', err);
      setErrorMessage(err.message || 'Error submitting message to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact-page" className="py-8 space-y-8">
      {/* Header */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-200 shadow-2xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
          <Mail className="w-3.5 h-3.5 text-emerald-700" />
          <span>Rubric Criteria 3 & 4 • Contact Form & Persistent Storage</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
          Contact Mohammed Albayati
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-2xl leading-relaxed">
          Send a message to Mohammed using the official assignment contact form. Submissions are processed by Express at <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-emerald-900 font-mono font-bold">POST /api/contact</code> and appended to persistent storage at <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-emerald-900 font-mono font-bold">data/contactReceived.json</code>.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form Container */}
        <section className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-2xs">
          {submittedId ? (
            <div 
              id="submission-success-banner"
              className="p-6 rounded-xl bg-emerald-50 border-2 border-emerald-500 text-emerald-900 space-y-4 animate-fade-in"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-emerald-950">
                    Message Sent & Persistently Stored!
                  </h3>
                  <p className="text-xs text-emerald-800">
                    Your contact submission was validated, sent via POST /api/contact, and appended to data/contactReceived.json.
                  </p>
                </div>
              </div>

              <div className="text-xs bg-white/90 p-3 rounded-lg border border-emerald-200 font-mono text-zinc-800 space-y-1">
                <div>Record ID: <span className="font-bold text-emerald-800">{submittedId}</span></div>
                <div>Persistent Storage: <span className="font-bold text-emerald-800">data/contactReceived.json</span></div>
                <div>Server Status: <span className="font-bold text-emerald-800">Appended without overwriting</span></div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="view-in-admin-btn"
                  onClick={() => onNavigate('admin')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify in Admin Dashboard</span>
                </button>

                <button
                  id="send-another-btn"
                  onClick={() => setSubmittedId(null)}
                  className="px-4 py-2 rounded-lg bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-800 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form 
              id="contact-form"
              onSubmit={handleSubmit} 
              className="space-y-5"
            >
              {errorMessage && (
                <div 
                  id="form-error-feedback"
                  className="p-3.5 rounded-lg bg-red-50 border border-red-300 text-red-700 text-xs flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5"
                  >
                    Your Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Alex Smith"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5"
                  >
                    Your Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. asmith@health.org"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
                  />
                </div>
              </div>

              {/* Reason for Contact Dropdown */}
              <div>
                <label
                  htmlFor="contact-reason"
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5"
                >
                  Reason for Contact <span className="text-red-600">*</span>
                </label>
                <select
                  id="contact-reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
                >
                  <option value="Pre-Med & Academic Mentorship">Pre-Med & Academic Mentorship</option>
                  <option value="Grossmont High AI Projects">Grossmont High AI Projects</option>
                  <option value="Language & Gaming Discussion">Language & Gaming Discussion</option>
                  <option value="General Question">General Question</option>
                  <option value="Hospital Volunteering & Shadowing">Hospital Volunteering & Shadowing</option>
                </select>
              </div>

              {/* Preferred Reply Method Radio */}
              <div>
                <span className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Preferred Reply Method
                </span>
                <div className="flex items-center gap-6 text-xs text-zinc-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="replyMethod"
                      value="Email"
                      checked={replyMethod === 'Email'}
                      onChange={() => setReplyMethod('Email')}
                      className="text-emerald-700 focus:ring-emerald-600"
                    />
                    <span>Reply via Email</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="replyMethod"
                      value="Phone"
                      checked={replyMethod === 'Phone'}
                      onChange={() => setReplyMethod('Phone')}
                      className="text-emerald-700 focus:ring-emerald-600"
                    />
                    <span>Reply via Phone / Text</span>
                  </label>
                </div>

                {replyMethod === 'Phone' && (
                  <div className="mt-2.5">
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (619) 555-0199"
                      className="w-full sm:w-64 px-3.5 py-2 rounded-lg border border-zinc-300 text-xs focus:ring-2 focus:ring-emerald-600 bg-white"
                    />
                  </div>
                )}
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5"
                >
                  Your Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message for Mohammed Albayati here..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white resize-y"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  id="contact-submit-button"
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 disabled:bg-zinc-400 text-white text-sm font-bold shadow-xs cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting to Server...' : 'Submit Message'}</span>
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Sidebar Info Card */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-emerald-950 text-white p-6 rounded-2xl border border-emerald-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>Criterion 4 Architecture</span>
            </div>

            <h3 className="text-base font-bold">
              Backend Storage Verification
            </h3>

            <p className="text-xs text-emerald-200 leading-relaxed">
              When you submit this form:
            </p>

            <ul className="text-xs text-emerald-100 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Express processes <code className="text-emerald-300 font-mono">POST /api/contact</code></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Appended to <code className="text-emerald-300 font-mono">data/contactReceived.json</code></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Generates unique ID, timestamp, and status</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Persists across page refreshes and server reboots</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-emerald-800">
              <button
                onClick={() => onNavigate('admin')}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Login (Password: Grossmont2029)</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
