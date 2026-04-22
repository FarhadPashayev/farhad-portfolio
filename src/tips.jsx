const { IconArrowRight } = window.Icons;

function Tips() {
  return (
    <section id="notes" style={{ padding: '120px 32px', position: 'relative' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <window.SectionHeader
          num="04"
          label="QA Notes"
          title={<>Field notes from<br/>the pipeline.</>}
          subtitle="Short, opinionated takes on testing practice. Written between test runs."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }} className="tips-grid">
          {window.DATA.tips.map((t, i) => <TipCard key={i} t={t} i={i} />)}
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) { .tips-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .tips-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function TipCard({ t, i }) {
  const Icon = t.icon;
  const [hovered, setHovered] = React.useState(false);
  return (
    <article
      className="glass-card stagger"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '22px 22px 20px',
        borderRadius: 12,
        border: '1px solid var(--border-strong)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        cursor: 'pointer',
        transition: 'border-color .25s, transform .25s',
        borderColor: hovered ? 'var(--accent-glow)' : 'var(--border-strong)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        display: 'flex', flexDirection: 'column', minHeight: 210,
      }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--accent-dim)', color: 'var(--accent)',
            border: '1px solid var(--accent-glow)',
          }}>
            <Icon size={13} stroke={1.8} />
          </div>
          <span style={{ fontFamily: 'Geist Mono', fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            #{t.tag}
          </span>
        </div>
        <span style={{ fontFamily: 'Geist Mono', fontSize: 10, color: 'var(--text-mute)' }}>{t.read}</span>
      </div>

      <h4 style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.25, margin: '0 0 10px 0' }}>
        {t.title}
      </h4>
      <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text-dim)', margin: 0, flex: 1 }}>
        {t.body}
      </p>

      <div style={{
        marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'Geist Mono', fontSize: 11,
      }}>
        <span style={{ color: 'var(--text-mute)' }}>tip / 0{i + 1}</span>
        <span style={{ color: hovered ? 'var(--accent)' : 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'color .2s' }}>
          Read <IconArrowRight size={12} stroke={2} />
        </span>
      </div>
    </article>
  );
}

window.Tips = Tips;
