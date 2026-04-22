function SectionHeader({ num, label, title, subtitle }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, fontFamily: 'Geist Mono', fontSize: 12, color: 'var(--text-mute)' }}>
        <span style={{ color: 'var(--accent)' }}>{num}</span>
        <span style={{ width: 40, height: 1, background: 'var(--border-strong)' }}></span>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}>{label}</span>
      </div>
      <h2 style={{ fontSize: 'clamp(34px, 4.5vw, 54px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0, maxWidth: 800 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: 'var(--text-dim)', fontSize: 17, lineHeight: 1.5, marginTop: 18, maxWidth: 620 }}>{subtitle}</p>
      )}
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: '120px 32px', position: 'relative' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <SectionHeader
          num="02"
          label="Skill Matrix"
          title={<>The stack that<br/>keeps bugs honest.</>}
          subtitle="Four testing surfaces, one discipline. These are the tools I reach for daily — calibrated by years of shipping, not by LinkedIn endorsements."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="skills-grid">
          {window.DATA.skills.map((s, i) => (
            <SkillCard key={s.category} skill={s} index={i} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1100px) { .skills-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px)  { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function SkillCard({ skill, index }) {
  const Icon = skill.icon;
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className="glass-card stagger"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '26px 24px 28px',
        borderRadius: 12,
        border: '1px solid var(--border-strong)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        transition: 'border-color .25s, transform .25s',
        borderColor: hovered ? 'var(--accent-glow)' : 'var(--border-strong)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        overflow: 'hidden',
      }}>
      {/* accent glow on hover */}
      <div aria-hidden style={{
        position: 'absolute', top: -40, right: -40, width: 180, height: 180,
        borderRadius: '50%',
        background: 'radial-gradient(closest-side, var(--accent-dim), transparent 70%)',
        opacity: hovered ? 1 : 0.35,
        transition: 'opacity .3s',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22, position: 'relative' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 9,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--accent-dim)', color: 'var(--accent)',
          border: '1px solid var(--accent-glow)',
        }}>
          <Icon size={18} stroke={1.8} />
        </div>
        <span style={{ fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--text-mute)' }}>0{index + 1}</span>
      </div>

      <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 18, position: 'relative' }}>
        {skill.category}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, position: 'relative' }}>
        {skill.tools.map(tool => (
          <div key={tool.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, fontSize: 13, marginBottom: 6 }}>
              <span style={{ color: 'var(--text)', minWidth: 0, flex: '1 1 auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={tool.name}>{tool.name}</span>
              <span style={{ color: 'var(--text-mute)', fontFamily: 'Geist Mono', fontSize: 11, flexShrink: 0 }}>{tool.level}</span>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${tool.level}%`,
                background: 'linear-gradient(90deg, var(--accent), color-mix(in oklab, var(--accent), white 20%))',
                boxShadow: '0 0 8px var(--accent-glow)',
                transition: 'width 1s cubic-bezier(.2,.7,.2,1)',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.Skills = Skills;
window.SectionHeader = SectionHeader;
