const { IconDownload, IconArrowRight, IconCheck, IconGithub, IconLinkedin } = window.Icons;

// Typed line component
function TypedLine({ text, onDone, speed = 22, startDelay = 0, prefix = null }) {
  const [shown, setShown] = React.useState('');
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  React.useEffect(() => {
    if (!started) return;
    if (shown.length >= text.length) {
      onDone && onDone();
      return;
    }
    const t = setTimeout(() => setShown(text.slice(0, shown.length + 1)), speed);
    return () => clearTimeout(t);
  }, [shown, started, text, speed, onDone]);

  return <span>{prefix}{shown}</span>;
}

function Hero() {
  const [step, setStep] = React.useState(0);
  const advance = React.useCallback(() => setStep(s => s + 1), []);

  return (
    <section id="top" style={{ position: 'relative', paddingTop: 160, paddingBottom: 120, overflow: 'hidden' }}>
      {/* ambient accent glow */}
      <div aria-hidden style={{
        position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 600, borderRadius: '50%',
        background: 'radial-gradient(closest-side, var(--accent-dim), transparent 70%)',
        filter: 'blur(40px)', opacity: 0.6, pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px', position: 'relative' }}>

        {/* small status bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--text-mute)', marginBottom: 32 }}>
          <span style={{
            padding: '5px 12px', borderRadius: 999,
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
            color: 'var(--text-dim)',
          }}>
            QA Automation Engineer
          </span>
          <span>·</span>
          <span>Baku, AZ</span>
          <span>·</span>
          <span>UTC+4</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 56, alignItems: 'start' }} className="hero-grid">
          {/* LEFT: name + tagline */}
          <div>
            <h1 style={{
              fontSize: 'clamp(52px, 7vw, 92px)',
              lineHeight: 0.96,
              fontWeight: 600,
              letterSpacing: '-0.035em',
              margin: '0 0 28px 0',
            }}>
              Farhad
              <br />
              Pashayev<span style={{ color: 'var(--accent)' }}>.</span>
            </h1>

            <p style={{
              fontSize: 22,
              lineHeight: 1.45,
              color: 'var(--text-dim)',
              maxWidth: 560,
              margin: '0 0 40px 0',
              letterSpacing: '-0.01em',
            }}>
              Ensuring system integrity through{' '}
              <span style={{ color: 'var(--text)', borderBottom: '1px dashed var(--accent)' }}>automated</span>
              {' '}&{' '}
              <span style={{ color: 'var(--text)', borderBottom: '1px dashed var(--accent)' }}>performance</span>
              {' '}testing.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="Farhad_Pashayev_CV.pdf" download="Farhad_Pashayev_CV.pdf" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 22px',
                background: 'var(--accent)',
                color: '#06140b',
                fontFamily: 'Geist Mono', fontSize: 13, fontWeight: 600,
                borderRadius: 8,
                boxShadow: '0 10px 30px -10px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.3)',
                transition: 'transform .15s, box-shadow .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 14px 40px -10px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px -10px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.3)'; }}
              >
                <IconDownload size={15} stroke={2} /> Download CV
              </a>
              <a href="#work" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 22px',
                border: '1px solid var(--border-strong)',
                background: 'rgba(255,255,255,0.02)',
                color: 'var(--text)',
                fontFamily: 'Geist Mono', fontSize: 13, fontWeight: 500,
                borderRadius: 8,
                transition: 'background .2s, border-color .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
              >
                View Work <IconArrowRight size={14} stroke={2} />
              </a>
            </div>

            {/* small stats strip — data from CV */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
              marginTop: 48,
              padding: '20px 24px',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(32px) saturate(180%)',
              WebkitBackdropFilter: 'blur(32px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.3)',
            }}>
              {[
                { k: '4+', v: 'Years in QA' },
                { k: '17+', v: 'Bank integrations tested' },
                { k: '5.2k', v: 'Peak VUs — JMeter' },
              ].map((s, i) => (
                <div key={i} style={{ borderLeft: i === 0 ? 'none' : '1px solid var(--border)', paddingLeft: i === 0 ? 0 : 24 }}>
                  <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>{s.k}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-mute)', fontFamily: 'Geist Mono', marginTop: 4 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: terminal window */}
          <TerminalCard step={step} advance={advance} />
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

function TerminalCard({ step, advance }) {
  return (
    <div style={{
      borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.09)',
      background: 'rgba(8,11,16,0.6)',
      backdropFilter: 'blur(48px) saturate(200%)',
      WebkitBackdropFilter: 'blur(48px) saturate(200%)',
      boxShadow: '0 32px 80px -16px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.15)',
      overflow: 'hidden',
      marginTop: 12,
    }}>
      {/* titlebar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }}></span>
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--text-mute)' }}>
          farhad@qa-lab — zsh — 84×24
        </div>
        <div style={{ fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--text-mute)' }}>⌘T</div>
      </div>

      {/* body */}
      <div style={{ padding: '20px 22px', fontFamily: 'Geist Mono', fontSize: 13, lineHeight: 1.7, minHeight: 460 }}>
        <Prompt />
        {' '}
        {step >= 0 && (
          <TypedLine text={"whoami"} onDone={advance} speed={50} />
        )}
        {step >= 1 && (
          <>
            <div style={{ color: 'var(--text-dim)', marginTop: 6 }}>Software QA Automation Engineer · 4+ yrs</div>
            <div style={{ marginTop: 14 }}>
              <Prompt />{' '}
              <TypedLine text={"./init-lab.sh"} onDone={advance} speed={26} startDelay={300} />
            </div>
          </>
        )}
        {step >= 2 && <BootSequence onDone={advance} />}
        {step >= 3 && (
          <>
            <div style={{ marginTop: 14 }}>
              <Prompt />{' '}
              <TypedLine text={"./run-suite --all --parallel"} onDone={advance} speed={22} startDelay={250} />
            </div>
          </>
        )}
        {step >= 4 && (
          <>
            <TestResults />
            <div style={{ marginTop: 10 }}>
              <Prompt />{' '}
              <span className="caret" style={{ color: 'var(--text-dim)' }}></span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Prompt() {
  return (
    <span>
      <span style={{ color: 'var(--accent)' }}>farhad</span>
      <span style={{ color: 'var(--text-mute)' }}>@qa-lab</span>
      <span style={{ color: 'var(--text-mute)' }}>:</span>
      <span style={{ color: 'var(--blue)' }}>~</span>
      <span style={{ color: 'var(--text-mute)' }}>$</span>
    </span>
  );
}

function BootSequence({ onDone }) {
  const lines = [
    { t: 'Initializing Selenium Grid', s: 'OK', delay: 300 },
    { t: 'Spinning up Playwright browser contexts', s: 'OK', delay: 280 },
    { t: 'Warming up Rest-Assured HTTP client', s: 'OK', delay: 260 },
    { t: 'Connecting MongoDB assertion layer', s: 'OK', delay: 240 },
    { t: 'Booting JMeter distributed workers (×8)', s: 'OK', delay: 340 },
    { t: 'Testing API endpoints · /auth /tx /kyc', s: 'PASSED', delay: 300 },
    { t: 'Performance check · latency within limits', s: 'PASSED', delay: 300 },
  ];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    if (i >= lines.length) { onDone && onDone(); return; }
    const t = setTimeout(() => setI(n => n + 1), lines[i].delay);
    return () => clearTimeout(t);
  }, [i]);
  return (
    <div style={{ marginTop: 8 }}>
      {lines.slice(0, i).map((l, idx) => (
        <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ color: 'var(--text-mute)', width: 18 }}>›</span>
          <span style={{ color: 'var(--text-dim)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.t}...</span>
          <span style={{ color: 'var(--accent)', fontWeight: 600, flexShrink: 0 }}>[{l.s}]</span>
        </div>
      ))}
    </div>
  );
}

function TestResults() {
  const [shown, setShown] = React.useState(0);
  const lines = [
    { t: '▸ Fintech E2E', s: 'PASS', ms: '247s', c: 142 },
    { t: '▸ API Contract Suite', s: 'PASS', ms: '41s', c: 63 },
    { t: '▸ Playwright SPA Tests', s: 'PASS', ms: '372s', c: 98 },
    { t: '▸ Load Test — 5.2k VUs', s: 'PASS', ms: '900s', c: 1 },
  ];
  React.useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown(s => s + 1), 320);
    return () => clearTimeout(t);
  }, [shown]);
  return (
    <div style={{ marginTop: 8 }}>
      {lines.slice(0, shown).map((l, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ color: 'var(--text-dim)', flex: 1 }}>{l.t}</span>
          <span style={{ color: 'var(--text-mute)' }}>{l.c} tests</span>
          <span style={{ color: 'var(--text-mute)' }}>{l.ms}</span>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>✓ {l.s}</span>
        </div>
      ))}
      {shown >= lines.length && (
        <div style={{ color: 'var(--accent)', marginTop: 10 }}>
          ━━ 304 passed, 0 failed, 0 skipped in 1560s ━━
        </div>
      )}
    </div>
  );
}

window.Hero = Hero;
