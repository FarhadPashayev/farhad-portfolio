const { IconArrowUpRight, IconGitBranch } = window.Icons;

function Projects() {
  return (
    <section id="work" style={{ padding: '120px 32px', position: 'relative' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <window.SectionHeader
          num="01"
          label="Project Showcase"
          title={<>Selected work.<br/>Systems under pressure.</>}
          subtitle="Four frameworks I've built or led — each solving a specific pain point at scale. Metrics are real; details that are under NDA have been abstracted."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }} className="projects-grid">
          {window.DATA.projects.map(p => <ProjectCard key={p.id} p={p} />)}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function ProjectCard({ p }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <article
      className="glass-card stagger"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '28px 28px 26px',
        borderRadius: 14,
        border: '1px solid var(--border-strong)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.005))',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color .3s, transform .3s',
        borderColor: hovered ? 'var(--accent-glow)' : 'var(--border-strong)',
      }}>

      {/* corner glow */}
      <div aria-hidden style={{
        position: 'absolute', top: -80, right: -80, width: 280, height: 280,
        borderRadius: '50%',
        background: 'radial-gradient(closest-side, var(--accent-dim), transparent 70%)',
        opacity: hovered ? 1 : 0.3,
        transition: 'opacity .35s',
        pointerEvents: 'none',
      }} />

      {/* top row: index + status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--text-mute)' }}>
          <span>{p.index}</span>
          <span style={{ width: 24, height: 1, background: 'var(--border-strong)' }}></span>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}>{p.primaryTag}</span>
        </div>
        <StatusPill status={p.status} />
      </div>

      {/* name + arrow */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12, position: 'relative' }}>
        <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15, margin: 0, maxWidth: 360 }}>
          {p.name}
        </h3>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: hovered ? 'var(--accent)' : 'rgba(255,255,255,0.04)',
          color: hovered ? '#06140b' : 'var(--text-dim)',
          border: '1px solid ' + (hovered ? 'var(--accent)' : 'var(--border-strong)'),
          transition: 'all .3s',
          flexShrink: 0,
        }}>
          <IconArrowUpRight size={16} stroke={2} />
        </div>
      </div>

      {/* description */}
      <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-dim)', margin: '0 0 20px 0', position: 'relative' }}>
        {p.description}
      </p>

      {/* stack badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22, position: 'relative' }}>
        {p.stack.map(tech => (
          <span key={tech} style={{
            padding: '4px 10px',
            borderRadius: 999,
            border: '1px solid var(--border-strong)',
            background: 'rgba(255,255,255,0.02)',
            fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--text-dim)',
          }}>{tech}</span>
        ))}
      </div>

      {/* key metric — the hero element */}
      <div style={{
        position: 'relative',
        padding: '14px 16px',
        borderRadius: 10,
        border: '1px dashed var(--accent-glow)',
        background: 'var(--accent-dim)',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{
          fontFamily: 'Geist Mono', fontSize: 18, fontWeight: 600,
          color: 'var(--accent)', minWidth: 70, letterSpacing: '-0.02em',
        }}>
          {p.metricDelta}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Geist Mono', fontSize: 10, color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 2 }}>
            Key Metric
          </div>
          <div style={{ fontSize: 13, color: 'var(--text)' }}>{p.metric}</div>
        </div>
      </div>

      {/* repo line */}
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--text-mute)', position: 'relative' }}>
        <IconGitBranch size={12} stroke={1.8} />
        <span>{p.repo}</span>
      </div>
    </article>
  );
}

function StatusPill({ status }) {
  const isLive = status === 'Production' || status === 'Active';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px',
      borderRadius: 999,
      border: '1px solid ' + (isLive ? 'var(--accent-glow)' : 'var(--border-strong)'),
      background: isLive ? 'var(--accent-dim)' : 'rgba(255,255,255,0.02)',
      fontFamily: 'Geist Mono', fontSize: 10, color: isLive ? 'var(--accent)' : 'var(--text-dim)',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: isLive ? 'var(--accent)' : 'var(--text-dim)',
        boxShadow: isLive ? '0 0 8px var(--accent-glow)' : 'none',
        animation: isLive ? 'pulse 2s ease-in-out infinite' : 'none',
      }}></span>
      {status}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </span>
  );
}

window.Projects = Projects;
