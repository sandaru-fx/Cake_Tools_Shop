import { useEffect, useMemo, useState } from 'react';
import { FaCopy, FaLink, FaWhatsapp, FaKey } from 'react-icons/fa';
import { getAdminSettings, saveAdminSettings } from '../adminStore';

function cleanDigits(v) {
  return String(v || '').replace(/[^\d]/g, '');
}

export default function AdminApi() {
  const [settings, setSettings] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getAdminSettings());
  }, []);

  const derived = useMemo(() => {
    const origin = window.location.origin;
    const webhookExample = `${origin}/api/webhook`;
    return { origin, webhookExample };
  }, []);

  const onSave = (e) => {
    e.preventDefault();
    const next = {
      ...settings,
      whatsappNumber: cleanDigits(settings.whatsappNumber),
      webhookUrl: String(settings.webhookUrl || '').trim(),
      apiBaseUrl: String(settings.apiBaseUrl || '').trim(),
      publicApiKey: String(settings.publicApiKey || '').trim(),
    };
    saveAdminSettings(next);
    setSettings(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1400);
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 900);
    } catch {
      /* ignore */
    }
  };

  if (!settings) return null;

  return (
    <div className="admin-grid">
      <section className="admin-card admin-section">
        <h3>Business contact</h3>
        <form className="admin-form" onSubmit={onSave}>
          <div className="row">
            <label htmlFor="wa">WhatsApp number</label>
            <div className="admin-muted" style={{ fontSize: '0.9rem', marginTop: -4 }}>
              Use international format digits only. Example: <span className="pill">94771234567</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'center' }}>
              <input
                id="wa"
                value={settings.whatsappNumber || ''}
                onChange={(e) => setSettings((s) => ({ ...s, whatsappNumber: e.target.value }))}
                placeholder="9477xxxxxxx"
              />
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => copy(cleanDigits(settings.whatsappNumber))}
                aria-label="Copy WhatsApp number"
              >
                <FaCopy /> Copy
              </button>
            </div>
          </div>

          <div className="admin-actions" style={{ marginTop: 6 }}>
            <button className="btn btn-primary btn-sm" type="submit">
              Save settings
            </button>
            {saved && <span className="pill success">Saved</span>}
          </div>
        </form>
      </section>

      <section className="admin-card admin-section">
        <h3>API & integrations</h3>
        <form className="admin-form" onSubmit={onSave}>
          <div className="row">
            <label htmlFor="apiBase">
              <FaLink style={{ marginRight: 8 }} />
              API base URL (optional)
            </label>
            <input
              id="apiBase"
              value={settings.apiBaseUrl || ''}
              onChange={(e) => setSettings((s) => ({ ...s, apiBaseUrl: e.target.value }))}
              placeholder="https://api.yoursite.com"
            />
          </div>

          <div className="row">
            <label htmlFor="key">
              <FaKey style={{ marginRight: 8 }} />
              Public API key (optional)
            </label>
            <input
              id="key"
              value={settings.publicApiKey || ''}
              onChange={(e) => setSettings((s) => ({ ...s, publicApiKey: e.target.value }))}
              placeholder="pk_live_..."
            />
          </div>

          <div className="row">
            <label htmlFor="webhook">
              <FaWhatsapp style={{ marginRight: 8 }} />
              Webhook URL (optional)
            </label>
            <input
              id="webhook"
              value={settings.webhookUrl || ''}
              onChange={(e) => setSettings((s) => ({ ...s, webhookUrl: e.target.value }))}
              placeholder={derived.webhookExample}
            />
            <div className="admin-muted" style={{ fontSize: '0.9rem' }}>
              This is a UI placeholder for later backend integration.
            </div>
          </div>

          <div className="admin-actions" style={{ marginTop: 6 }}>
            <button className="btn btn-primary btn-sm" type="submit">
              Save settings
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => copy(JSON.stringify(settings, null, 2))}>
              <FaCopy /> Copy JSON
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

