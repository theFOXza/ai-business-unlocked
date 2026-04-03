'use client';

import { useState } from 'react';

export default function SupportChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat window */}
      <div className={`support-chat-window ${open ? 'open' : ''}`}>
        <div className="support-chat-header">
          <span>Support</span>
          <button onClick={() => setOpen(false)} aria-label="Close support chat" className="support-chat-close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="support-chat-body">
          <p className="support-chat-placeholder">
            👋 Need help? We&apos;ll get back to you shortly.
          </p>
          {/* Chat integration will go here */}
        </div>
      </div>

      {/* Floating button */}
      <button
        className="support-chat-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open support chat"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </>
  );
}
