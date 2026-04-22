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

  const navStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 50,
    transition: 'all .3s ease',
    background: scrolled ? 'rgba(7,9,12,0.72)' : 'transparent',
    backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
  };

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Geist Mono', fontSize: 13, letterSpacing: '-0.01em' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 7, background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-glow)' }}>
            <IconTerminal size={14} stroke={2} />
          </span>
          <span><span style={{ color: 'var(--text-mute)' }}>~/</span>farhad<span style={{ color: 'var(--accent)' }}>.qa</span></span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="nav-links">
          {window.DATA.nav.map(item => (
            <a key={item.id} href={`#${item.id}`}
               style={{ fontSize: 13, color: 'var(--text-dim)', transition: 'color .2s', fontFamily: 'Geist Mono' }}
               onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
               onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}>
              <span style={{ color: 'var(--text-mute)', marginRight: 4 }}>→</span>{item.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--text-dim)' }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent-glow)' }}></span>
            Available for hire
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

window.Nav = Nav;
