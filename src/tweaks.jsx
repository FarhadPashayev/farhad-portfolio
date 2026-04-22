// Tweak panel — accent color swap only
const ACCENTS = [
  { key: 'lime',   label: 'Cyber Lime',    hex: '#32CD32', dim: 'rgba(50, 205, 50, 0.14)',   glow: 'rgba(50, 205, 50, 0.35)' },
  { key: 'cyan',   label: 'Neon Cyan',     hex: '#22d3ee', dim: 'rgba(34, 211, 238, 0.14)',  glow: 'rgba(34, 211, 238, 0.35)' },
  { key: 'violet', label: 'Electric Violet', hex: '#a78bfa', dim: 'rgba(167, 139, 250, 0.14)', glow: 'rgba(167, 139, 250, 0.35)' },
  { key: 'amber',  label: 'Hazard Amber',  hex: '#ffb547', dim: 'rgba(255, 181, 71, 0.14)',  glow: 'rgba(255, 181, 71, 0.35)' },
  { key: 'magenta',label: 'Hot Magenta',   hex: '#ff4d8f', dim: 'rgba(255, 77, 143, 0.14)',  glow: 'rgba(255, 77, 143, 0.35)' },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "lime"
}/*EDITMODE-END*/;

function applyAccent(key) {
  const a = ACCENTS.find(x => x.key === key) || ACCENTS[0];
  document.documentElement.style.setProperty('--accent', a.hex);
  document.documentElement.style.setProperty('--accent-dim', a.dim);
  document.documentElement.style.setProperty('--accent-glow', a.glow);
}

function Tweaks() {
  const [active, setActive] = React.useState(false);
  const [accent, setAccent] = React.useState(TWEAK_DEFAULTS.accent);

  React.useEffect(() => { applyAccent(accent); }, [accent]);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setActive(true);
      if (e.data.type === '__deactivate_edit_mode') setActive(false);
    };
    window.addEventListener('message', onMsg);
    // announce AFTER listener is attached
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const setVal = (key, val) => {
    if (key === 'accent') setAccent(val);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
  };

  if (!active) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 100,
      width: 280,
      padding: 18,
      borderRadius: 12,
      border: '1px solid var(--border-strong)',
      background: 'rgba(11, 14, 19, 0.92)',
      backdropFilter: 'blur(20px) saturate(140%)',
      WebkitBackdropFilter: 'blur(20px) saturate(140%)',
      boxShadow: '0 20px 60px -10px rgba(0,0,0,0.6)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          Tweaks
        </span>
        <span style={{ fontFamily: 'Geist Mono', fontSize: 10, color: 'var(--accent)' }}>● live</span>
      </div>

      <div style={{ fontFamily: 'Geist Mono', fontSize: 10, color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 10 }}>
        Accent
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 10 }}>
        {ACCENTS.map(a => (
          <button key={a.key}
            onClick={() => setVal('accent', a.key)}
            title={a.label}
            style={{
              aspectRatio: '1 / 1',
              borderRadius: 8,
              border: accent === a.key ? `2px solid ${a.hex}` : '1px solid var(--border-strong)',
              background: a.hex,
              cursor: 'pointer',
              boxShadow: accent === a.key ? `0 0 12px ${a.glow}` : 'none',
              transition: 'all .2s',
              padding: 0,
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>
        {ACCENTS.find(a => a.key === accent)?.label}
      </div>
    </div>
  );
}

// bootstrap accent before React mounts (so nothing flashes)
applyAccent(TWEAK_DEFAULTS.accent);

window.Tweaks = Tweaks;
