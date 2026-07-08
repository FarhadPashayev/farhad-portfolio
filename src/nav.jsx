const { IconTerminal, IconMenu, IconX } = window.Icons;

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 50,
      width: 'calc(100% - 48px)',
      maxWidth: 920,
    }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        borderRadius: 20,
        background: scrolled ? 'rgba(7,9,12,0.72)' : 'rgba(7,9,12,0.45)',
        backdropFilter: 'blur(48px) saturate(200%)',
        WebkitBackdropFilter: 'blur(48px) saturate(200%)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: scrolled
          ? '0 12px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.11), inset 0 -1px 0 rgba(0,0,0,0.1)'
          : '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
        transition: 'all .3s ease',
      }}>

        {/* Logo */}
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'Geist Mono', fontSize: 13, letterSpacing: '-0.01em', textDecoration: 'none' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 28, height: 28, borderRadius: 8,
            background: 'var(--accent-dim)', color: 'var(--accent)',
            border: '1px solid var(--accent-glow)',
          }}>
            <IconTerminal size={14} stroke={2} />
          </span>
          <span style={{ color: 'var(--text)' }}>
            <span style={{ color: 'var(--text-mute)' }}>~/</span>farhad<span style={{ color: 'var(--accent)' }}>.qa</span>
          </span>
        </a>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="nav-links">
          {window.DATA.nav.map(item => (
            <a key={item.id} href={`#${item.id}`}
              style={{
                display: 'block',
                padding: '6px 13px',
                borderRadius: 10,
                fontSize: 13, color: 'var(--text-dim)',
                fontFamily: 'Geist Mono',
                transition: 'color .2s, background .2s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.background = 'transparent'; }}>
              {item.label}
            </a>
          ))}
        </div>

        {/* Status badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 12px', borderRadius: 999,
          background: 'rgba(50,205,50,0.08)',
          border: '1px solid rgba(50,205,50,0.22)',
          fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--text-dim)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)', display: 'inline-block' }} />
          Available
        </div>
      </nav>

      <style>{`
        @media (max-width: 900px) { .nav-links { display: none !important; } }
      `}</style>
    </div>
  );
}

window.Nav = Nav;
