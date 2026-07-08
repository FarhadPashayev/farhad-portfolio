function App() {
  const glowRef = React.useRef(null);

  React.useEffect(() => {
    const onMove = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // Staggered reveal on scroll
  React.useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          // Stagger children with .stagger class
          const kids = e.target.querySelectorAll('.stagger');
          kids.forEach((k, i) => {
            setTimeout(() => k.classList.add('in'), i * 70);
          });
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('section').forEach(s => {
      s.classList.add('reveal');
      io.observe(s);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ambient orbs */}
      <div className="orb orb-1" aria-hidden />
      <div className="orb orb-2" aria-hidden />
      <div className="orb orb-3" aria-hidden />

      {/* mouse-follow glow */}
      <div ref={glowRef} aria-hidden style={{
        position: 'fixed', top: 0, left: 0, width: 600, height: 600,
        pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 60%)',
        opacity: 0.55,
        transition: 'transform 0.18s cubic-bezier(.2,.7,.2,1)',
        willChange: 'transform',
        mixBlendMode: 'screen',
      }} />
      <window.Nav />
      <window.Hero />
      <window.Projects />
      <window.Skills />
      <window.Dashboard />
      <window.Tips />
      <window.Contact />
      <window.Tweaks />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
