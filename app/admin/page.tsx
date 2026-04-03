'use client';

import { useState, useEffect, useCallback } from 'react';

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  painPoint: string;
  aiFamiliarity: string;
  amount: number;
  ticketType: string;
  paidAt: string;
}

interface Summary {
  totalRegistrations: number;
  totalRevenue: number;
  earlyBirdCount: number;
  regularCount: number;
  seatsRemaining: number;
  workshopDate: string;
  daysUntilWorkshop: number;
}

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const fetchRegistrations = useCallback(async (adminKey: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/registrations?key=${encodeURIComponent(adminKey)}`);
      if (res.status === 401) {
        setError('Invalid admin key');
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setSummary(data.summary);
      setRegistrations(data.registrations);
      setAuthenticated(true);
    } catch {
      setError('Failed to load registrations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check URL params for key
    const params = new URLSearchParams(window.location.search);
    const urlKey = params.get('key');
    if (urlKey) {
      setKey(urlKey);
      fetchRegistrations(urlKey);
    }
  }, [fetchRegistrations]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (key) fetchRegistrations(key);
  };

  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f0f1a',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        <form onSubmit={handleLogin} style={{
          background: '#1a1a2e',
          padding: '40px',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '400px',
        }}>
          <h1 style={{ color: '#fff', margin: '0 0 8px', fontSize: '24px' }}>🔒 Admin Dashboard</h1>
          <p style={{ color: '#9ca3af', margin: '0 0 24px' }}>AI For Business Unlocked</p>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter admin key"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #374151',
              background: '#111827',
              color: '#fff',
              fontSize: '16px',
              marginBottom: '16px',
              boxSizing: 'border-box',
            }}
          />
          {error && <p style={{ color: '#ef4444', margin: '0 0 16px', fontSize: '14px' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: '#7c3aed',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'wait' : 'pointer',
            }}
          >
            {loading ? 'Loading...' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f1a',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '24px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ margin: '0 0 4px', fontSize: '28px' }}>📊 Workshop Dashboard</h1>
            <p style={{ margin: 0, color: '#9ca3af' }}>AI For Business Unlocked — April 25, 2026</p>
          </div>
          <button
            onClick={() => fetchRegistrations(key)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #374151',
              background: 'transparent',
              color: '#9ca3af',
              cursor: 'pointer',
            }}
          >
            🔄 Refresh
          </button>
        </div>

        {/* Stats Cards */}
        {summary && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}>
            <StatCard
              label="Total Registrations"
              value={String(summary.totalRegistrations)}
              sublabel={`of 25 seats`}
              color="#7c3aed"
            />
            <StatCard
              label="Total Revenue"
              value={`$${summary.totalRevenue.toLocaleString()}`}
              sublabel={`${summary.earlyBirdCount} early bird, ${summary.regularCount} regular`}
              color="#10b981"
            />
            <StatCard
              label="Seats Remaining"
              value={String(summary.seatsRemaining)}
              sublabel={summary.seatsRemaining <= 5 ? '🔥 Almost full!' : 'of 25 total'}
              color={summary.seatsRemaining <= 5 ? '#ef4444' : '#3b82f6'}
            />
            <StatCard
              label="Days Until Workshop"
              value={String(summary.daysUntilWorkshop)}
              sublabel="April 25, 2026"
              color="#f59e0b"
            />
          </div>
        )}

        {/* Registrations Table */}
        <div style={{
          background: '#1a1a2e',
          borderRadius: '16px',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #374151' }}>
            <h2 style={{ margin: 0, fontSize: '18px' }}>🎟️ Registrations</h2>
          </div>

          {registrations.length === 0 ? (
            <div style={{ padding: '60px 24px', textAlign: 'center', color: '#9ca3af' }}>
              <p style={{ fontSize: '48px', margin: '0 0 16px' }}>🎯</p>
              <p style={{ fontSize: '18px', margin: '0 0 8px' }}>No registrations yet</p>
              <p style={{ fontSize: '14px' }}>Share the landing page to start getting signups!</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #374151' }}>
                    {['Name', 'Email', 'Business', 'Industry', 'Ticket', 'Paid', 'Pain Point'].map((h) => (
                      <th key={h} style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#9ca3af',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((r) => (
                    <tr key={r.id} style={{ borderBottom: '1px solid #1f2937' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '500' }}>{r.name}</td>
                      <td style={{ padding: '12px 16px', color: '#9ca3af', fontSize: '14px' }}>{r.email}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px' }}>{r.businessName || '—'}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px' }}>{r.industry || '—'}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: r.ticketType === 'Early Bird' ? '#7c3aed33' : '#3b82f633',
                          color: r.ticketType === 'Early Bird' ? '#a78bfa' : '#60a5fa',
                        }}>
                          {r.ticketType} — ${r.amount}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#9ca3af', fontSize: '13px' }}>
                        {r.paidAt ? new Date(r.paidAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {r.painPoint || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sublabel, color }: { label: string; value: string; sublabel: string; color: string }) {
  return (
    <div style={{
      background: '#1a1a2e',
      borderRadius: '12px',
      padding: '20px',
      borderTop: `3px solid ${color}`,
    }}>
      <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#9ca3af' }}>{label}</p>
      <p style={{ margin: '0 0 4px', fontSize: '32px', fontWeight: '700', color }}>{value}</p>
      <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>{sublabel}</p>
    </div>
  );
}
