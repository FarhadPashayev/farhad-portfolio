const { IconGauge, IconZap, IconBug } = window.Icons;

// ---- Synthesized load-test data ----
// VU counts on X axis
const vus = [100, 500, 1000, 2000, 3000, 4000, 5000, 5500];

const responseData = vus.map((v, i) => ({
  vu: v,
  p50: 80 + i * 8 + Math.sin(i) * 4,
  p95: 120 + Math.pow(i, 1.6) * 9,
  p99: 180 + Math.pow(i, 1.85) * 11,
}));

const throughputData = vus.map((v, i) => {
  // Rises then plateaus, slight dip at end
  const base = Math.min(v * 0.82, 3400);
  return { vu: v, rps: Math.round(base - Math.pow(Math.max(0, i - 5), 2) * 60) };
});

const errorData = vus.map((v, i) => ({
  vu: v,
  err: i < 5 ? 0.02 + i * 0.01 : 0.08 + Math.pow(i - 4, 1.6) * 0.4,
}));

function Dashboard() {
  return (
    <section id="performance" style={{ padding: '120px 32px', position: 'relative' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <window.SectionHeader
          num="03"
          label="Performance Dashboard"
          title={<>Load test snapshot —<br/>Fintech API, 24h soak.</>}
          subtitle="Real numbers from a staged JMeter run against a payments gateway. p95 held below 500ms until ~5k concurrent users; error budget stayed within SLO."
        />

        {/* top KPI strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }} className="kpi-grid">
          <Kpi label="Peak VUs" value="5,200" sub="sustained" positive />
          <Kpi label="p95 latency" value="482ms" sub="target < 500ms" positive />
          <Kpi label="Throughput" value="3.1k" sub="req/s peak" positive />
          <Kpi label="Error rate" value="0.37%" sub="SLO 1%" positive />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }} className="dash-grid">
          <ChartCard
            icon={IconGauge}
            title="Response Time vs Virtual Users"
            subtitle="p50 · p95 · p99 latencies (ms)"
            legend={[
              { c: 'var(--text-mute)', l: 'p50' },
              { c: 'var(--blue)', l: 'p95' },
              { c: 'var(--accent)', l: 'p99' },
            ]}>
            <ResponseChart />
          </ChartCard>

          <div style={{ display: 'grid', gap: 16 }}>
            <ChartCard
              icon={IconZap}
              title="Throughput"
              subtitle="requests/second"
              legend={[{ c: 'var(--accent)', l: 'rps' }]}>
              <ThroughputChart />
            </ChartCard>
            <ChartCard
              icon={IconBug}
              title="Error rate"
              subtitle="% of failed requests"
              legend={[{ c: 'var(--red)', l: 'errors' }]}>
              <ErrorChart />
            </ChartCard>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) {
          .dash-grid { grid-template-columns: 1fr !important; }
          .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .kpi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Kpi({ label, value, sub, positive }) {
  return (
    <div style={{
      padding: '18px 20px',
      borderRadius: 10,
      border: '1px solid var(--border-strong)',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    }}>
      <div style={{ fontFamily: 'Geist Mono', fontSize: 10, color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em' }}>{value}</div>
        {positive && <span style={{ fontFamily: 'Geist Mono', fontSize: 10, color: 'var(--accent)' }}>✓</span>}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-mute)', marginTop: 4, fontFamily: 'Geist Mono' }}>{sub}</div>
    </div>
  );
}

function ChartCard({ icon: Ic, title, subtitle, legend, children }) {
  return (
    <div style={{
      padding: 20,
      borderRadius: 12,
      border: '1px solid var(--border-strong)',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      overflow: 'hidden',
      minWidth: 0,
    }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <Ic size={15} stroke={1.8} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <h4 style={{ fontSize: 14, fontWeight: 500, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.3, flex: '1 1 auto', minWidth: 0 }}>{title}</h4>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: 'Geist Mono', fontSize: 10, color: 'var(--text-mute)' }}>{subtitle}</div>
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            {legend.map((l, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'Geist Mono', fontSize: 10, color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>
                <span style={{ width: 8, height: 2, background: l.c, borderRadius: 1 }}></span>{l.l}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ minWidth: 0, width: '100%', overflow: 'hidden' }}>{children}</div>
    </div>
  );
}

// --- charts as inline SVG ---

function useChartDims(ref) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    if (!ref.current) return;
    const measure = () => {
      if (ref.current) setW(ref.current.getBoundingClientRect().width);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [ref]);
  return Math.max(w, 0);
}

function path(points) {
  return points.map((p, i) => (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ' ' + p.y.toFixed(1)).join(' ');
}

function ResponseChart() {
  const ref = React.useRef(null);
  const W = useChartDims(ref);
  const H = 260;
  const pad = { l: 42, r: 16, t: 18, b: 28 };
  const [hoverIdx, setHoverIdx] = React.useState(null);

  const xs = responseData.map(d => d.vu);
  const maxVu = Math.max(...xs);
  const maxY = 620;
  const X = v => pad.l + (v / maxVu) * (W - pad.l - pad.r);
  const Y = v => pad.t + (1 - v / maxY) * (H - pad.t - pad.b);

  const p50 = responseData.map(d => ({ x: X(d.vu), y: Y(d.p50) }));
  const p95 = responseData.map(d => ({ x: X(d.vu), y: Y(d.p95) }));
  const p99 = responseData.map(d => ({ x: X(d.vu), y: Y(d.p99) }));

  const gridY = [100, 200, 300, 400, 500, 600];

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    // find nearest point
    let nearest = 0, best = Infinity;
    responseData.forEach((d, i) => {
      const dx = Math.abs(X(d.vu) - mx);
      if (dx < best) { best = dx; nearest = i; }
    });
    setHoverIdx(nearest);
  };

  const hp = hoverIdx !== null ? responseData[hoverIdx] : null;
  const hx = hp ? X(hp.vu) : 0;

  return (
    <div ref={ref} style={{ width: '100%', minWidth: 0, position: 'relative' }}>
      {W > 0 && <svg width={W} height={H} style={{ display: 'block', maxWidth: '100%' }}
        onMouseMove={onMove} onMouseLeave={() => setHoverIdx(null)}>
        <defs>
          <linearGradient id="p99fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grid */}
        {gridY.map(g => (
          <g key={g}>
            <line x1={pad.l} x2={W - pad.r} y1={Y(g)} y2={Y(g)} stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4" />
            <text x={pad.l - 8} y={Y(g) + 3} textAnchor="end" fill="var(--text-mute)" fontFamily="Geist Mono" fontSize="9">{g}ms</text>
          </g>
        ))}

        {/* SLO line at 500ms */}
        <line x1={pad.l} x2={W - pad.r} y1={Y(500)} y2={Y(500)} stroke="var(--amber)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        <text x={W - pad.r} y={Y(500) - 4} textAnchor="end" fill="var(--amber)" fontFamily="Geist Mono" fontSize="9" opacity="0.7">SLO 500ms</text>

        {/* x labels */}
        {xs.map((v, i) => (
          <text key={v} x={X(v)} y={H - 8} textAnchor="middle" fill="var(--text-mute)" fontFamily="Geist Mono" fontSize="9">
            {v >= 1000 ? (v/1000) + 'k' : v}
          </text>
        ))}

        {/* p99 filled area */}
        <path d={path(p99) + ` L${X(maxVu)} ${Y(0)} L${X(0)} ${Y(0)} Z`} fill="url(#p99fill)" />
        {/* lines */}
        <path d={path(p50)} fill="none" stroke="var(--text-mute)" strokeWidth="1.5" />
        <path d={path(p95)} fill="none" stroke="var(--blue)" strokeWidth="1.8" />
        <path d={path(p99)} fill="none" stroke="var(--accent)" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 4px var(--accent-glow))' }} />

        {/* points */}
        {p99.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="var(--accent)" />)}
        {p95.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="2" fill="var(--blue)" />)}

        {/* hover cursor line + highlighted points */}
        {hp && (
          <g pointerEvents="none">
            <line x1={hx} x2={hx} y1={pad.t} y2={H - pad.b} stroke="var(--text-dim)" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
            <circle cx={hx} cy={Y(hp.p50)} r="4" fill="var(--text-mute)" stroke="var(--bg)" strokeWidth="1.5" />
            <circle cx={hx} cy={Y(hp.p95)} r="4" fill="var(--blue)" stroke="var(--bg)" strokeWidth="1.5" />
            <circle cx={hx} cy={Y(hp.p99)} r="4.5" fill="var(--accent)" stroke="var(--bg)" strokeWidth="1.5" />
          </g>
        )}
      </svg>}
      {hp && (
        <div style={{
          position: 'absolute',
          left: Math.min(Math.max(hx - 80, 8), W - 172),
          top: 8,
          pointerEvents: 'none',
          padding: '10px 12px',
          borderRadius: 8,
          background: 'rgba(7,9,12,0.94)',
          border: '1px solid var(--border-strong)',
          boxShadow: '0 12px 30px -10px rgba(0,0,0,0.6)',
          fontFamily: 'Geist Mono', fontSize: 11,
          minWidth: 160,
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{ color: 'var(--text-mute)', marginBottom: 6, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {hp.vu.toLocaleString()} VUs
          </div>
          <Row color="var(--text-mute)" label="p50" val={Math.round(hp.p50) + 'ms'} />
          <Row color="var(--blue)" label="p95" val={Math.round(hp.p95) + 'ms'} />
          <Row color="var(--accent)" label="p99" val={Math.round(hp.p99) + 'ms'} />
        </div>
      )}
    </div>
  );
}

function Row({ color, label, val }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, marginTop: 3 }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 8, height: 2, background: color, borderRadius: 1 }}></span>
        <span style={{ color: 'var(--text-dim)' }}>{label}</span>
      </span>
      <span style={{ color: 'var(--text)' }}>{val}</span>
    </div>
  );
}

function ThroughputChart() {
  const ref = React.useRef(null);
  const W = useChartDims(ref);
  const H = 140;
  const pad = { l: 36, r: 10, t: 10, b: 22 };
  const maxY = 3500;
  const maxVu = Math.max(...throughputData.map(d => d.vu));
  const X = v => pad.l + (v / maxVu) * (W - pad.l - pad.r);
  const Y = v => pad.t + (1 - v / maxY) * (H - pad.t - pad.b);
  const [hoverIdx, setHoverIdx] = React.useState(null);

  const barW = Math.max(6, (W - pad.l - pad.r) / throughputData.length - 6);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    let n = 0, best = Infinity;
    throughputData.forEach((d, i) => {
      const dx = Math.abs(X(d.vu) - mx);
      if (dx < best) { best = dx; n = i; }
    });
    setHoverIdx(n);
  };
  const hp = hoverIdx !== null ? throughputData[hoverIdx] : null;

  return (
    <div ref={ref} style={{ width: '100%', minWidth: 0, position: 'relative' }}>
      {W > 0 && <svg width={W} height={H} style={{ display: 'block', maxWidth: '100%' }}
        onMouseMove={onMove} onMouseLeave={() => setHoverIdx(null)}>
        {[0, 1000, 2000, 3000].map(g => (
          <g key={g}>
            <line x1={pad.l} x2={W - pad.r} y1={Y(g)} y2={Y(g)} stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4" />
            <text x={pad.l - 6} y={Y(g) + 3} textAnchor="end" fill="var(--text-mute)" fontFamily="Geist Mono" fontSize="8">{g}</text>
          </g>
        ))}
        {throughputData.map((d, i) => {
          const y = Y(d.rps);
          const h = (H - pad.b) - y;
          return (
            <g key={d.vu}>
              <rect x={X(d.vu) - barW / 2} y={y} width={barW} height={h}
                fill="var(--accent-dim)" stroke="var(--accent)" strokeWidth="1" rx="2" />
              {i === throughputData.length - 1 && (
                <text x={X(d.vu)} y={y - 6} textAnchor="middle" fill="var(--accent)" fontFamily="Geist Mono" fontSize="9">{d.rps}</text>
              )}
            </g>
          );
        })}
        {throughputData.map((d, i) => (
          i % 2 === 0 && (
            <text key={d.vu} x={X(d.vu)} y={H - 6} textAnchor="middle" fill="var(--text-mute)" fontFamily="Geist Mono" fontSize="8">
              {d.vu >= 1000 ? (d.vu/1000) + 'k' : d.vu}
            </text>
          )
        ))}
        {hp && (
          <rect x={X(hp.vu) - barW / 2 - 2} y={Y(hp.rps) - 2} width={barW + 4} height={(H - pad.b) - Y(hp.rps) + 2}
            fill="none" stroke="var(--accent)" strokeWidth="1.5" rx="3" pointerEvents="none" />
        )}
      </svg>}
      {hp && (
        <div style={{
          position: 'absolute', left: Math.min(Math.max(X(hp.vu) - 60, 4), W - 124), top: 4,
          padding: '6px 10px', borderRadius: 6,
          background: 'rgba(7,9,12,0.94)', border: '1px solid var(--border-strong)',
          fontFamily: 'Geist Mono', fontSize: 10, pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>
          <span style={{ color: 'var(--text-mute)' }}>{hp.vu.toLocaleString()} VUs · </span>
          <span style={{ color: 'var(--accent)' }}>{hp.rps} rps</span>
        </div>
      )}
    </div>
  );
}

function ErrorChart() {
  const ref = React.useRef(null);
  const W = useChartDims(ref);
  const H = 140;
  const pad = { l: 36, r: 10, t: 10, b: 22 };
  const maxY = 1;
  const maxVu = Math.max(...errorData.map(d => d.vu));
  const X = v => pad.l + (v / maxVu) * (W - pad.l - pad.r);
  const Y = v => pad.t + (1 - v / maxY) * (H - pad.t - pad.b);
  const [hoverIdx, setHoverIdx] = React.useState(null);

  const pts = errorData.map(d => ({ x: X(d.vu), y: Y(d.err) }));

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    let n = 0, best = Infinity;
    errorData.forEach((d, i) => {
      const dx = Math.abs(X(d.vu) - mx);
      if (dx < best) { best = dx; n = i; }
    });
    setHoverIdx(n);
  };
  const hp = hoverIdx !== null ? errorData[hoverIdx] : null;

  return (
    <div ref={ref} style={{ width: '100%', minWidth: 0, position: 'relative' }}>
      {W > 0 && <svg width={W} height={H} style={{ display: 'block', maxWidth: '100%' }}
        onMouseMove={onMove} onMouseLeave={() => setHoverIdx(null)}>
        <defs>
          <linearGradient id="errfill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--red)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--red)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map(g => (
          <g key={g}>
            <line x1={pad.l} x2={W - pad.r} y1={Y(g)} y2={Y(g)} stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4" />
            <text x={pad.l - 6} y={Y(g) + 3} textAnchor="end" fill="var(--text-mute)" fontFamily="Geist Mono" fontSize="8">{(g * 100).toFixed(0)}%</text>
          </g>
        ))}
        <path d={path(pts) + ` L${X(maxVu)} ${Y(0)} L${X(0)} ${Y(0)} Z`} fill="url(#errfill)" />
        <path d={path(pts)} fill="none" stroke="var(--red)" strokeWidth="1.8" />
        {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="2" fill="var(--red)" />)}

        {errorData.map((d, i) => (
          i % 2 === 0 && (
            <text key={d.vu} x={X(d.vu)} y={H - 6} textAnchor="middle" fill="var(--text-mute)" fontFamily="Geist Mono" fontSize="8">
              {d.vu >= 1000 ? (d.vu/1000) + 'k' : d.vu}
            </text>
          )
        ))}
        {hp && (
          <g pointerEvents="none">
            <line x1={X(hp.vu)} x2={X(hp.vu)} y1={pad.t} y2={H - pad.b} stroke="var(--text-dim)" strokeDasharray="2 3" opacity="0.5" />
            <circle cx={X(hp.vu)} cy={Y(hp.err)} r="4" fill="var(--red)" stroke="var(--bg)" strokeWidth="1.5" />
          </g>
        )}
      </svg>}
      {hp && (
        <div style={{
          position: 'absolute', left: Math.min(Math.max(X(hp.vu) - 60, 4), W - 134), top: 4,
          padding: '6px 10px', borderRadius: 6,
          background: 'rgba(7,9,12,0.94)', border: '1px solid var(--border-strong)',
          fontFamily: 'Geist Mono', fontSize: 10, pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>
          <span style={{ color: 'var(--text-mute)' }}>{hp.vu.toLocaleString()} VUs · </span>
          <span style={{ color: 'var(--red)' }}>{(hp.err * 100).toFixed(2)}%</span>
        </div>
      )}
    </div>
  );
}

window.Dashboard = Dashboard;
