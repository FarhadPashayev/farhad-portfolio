const { IconGithub, IconLinkedin, IconMail, IconArrowRight, IconCheck } = window.Icons;

function Contact() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', message: '' }); }, 2200);
  };

  const socials = window.DATA.socials;

  return (
    <section id="contact" style={{ padding: '120px 32px 100px', position: 'relative' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <window.SectionHeader
          num="05"
          label="Contact"
          title={<>Got a flaky system?<br/>Let's triage it together.</>}
          subtitle="Open to full-time and contract work. Fastest reply over LinkedIn."
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 32 }} className="contact-grid">
          {/* LEFT: socials & details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SocialRow icon={IconLinkedin} label="LinkedIn" handle={socials.linkedin.handle} url={socials.linkedin.url} primary />
            <SocialRow icon={IconGithub} label="GitHub" handle={socials.github.handle} url={socials.github.url} />
            <SocialRow icon={IconMail} label="Email" handle={socials.email.handle} url={socials.email.url} />

            <div style={{
              marginTop: 12, padding: '18px 20px', borderRadius: 12,
              border: '1px solid var(--border-strong)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
            }}>
              <div style={{ fontFamily: 'Geist Mono', fontSize: 10, color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 10 }}>
                Current status
              </div>
              <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.5 }}>
                Accepting new engagements for <span style={{ color: 'var(--accent)' }}>Q3 2026</span>. Remote-first, open to Baku / Istanbul / EU time zones.
              </div>
            </div>
          </div>

          {/* RIGHT: form */}
          <form onSubmit={submit} style={{
            padding: '26px 26px 22px',
            borderRadius: 14,
            border: '1px solid var(--border-strong)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.005))',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <Field label="Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Your name" />
              <Field label="Email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} placeholder="you@company.com" type="email" />
            </div>
            <Field label="Message" value={form.message} onChange={v => setForm(f => ({ ...f, message: v }))} placeholder="Tell me about the project, the pain point, or the stack…" multiline />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
              <span style={{ fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--text-mute)' }}>
                Usually replies within 24h
              </span>
              <button type="submit" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 20px',
                background: sent ? 'var(--accent-dim)' : 'var(--accent)',
                color: sent ? 'var(--accent)' : '#06140b',
                fontFamily: 'Geist Mono', fontSize: 13, fontWeight: 600,
                borderRadius: 8, border: sent ? '1px solid var(--accent-glow)' : 'none',
                cursor: 'pointer',
                boxShadow: sent ? 'none' : '0 10px 30px -10px var(--accent-glow)',
                transition: 'all .2s',
              }}>
                {sent ? <><IconCheck size={14} stroke={2.2} /> Message sent</> : <>Send message <IconArrowRight size={14} stroke={2} /></>}
              </button>
            </div>
          </form>
        </div>

        {/* footer */}
        <div style={{
          marginTop: 80, paddingTop: 24, borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--text-mute)', flexWrap: 'wrap', gap: 12,
        }}>
          <span>© 2026 Farhad Pashayev · Built with care in Baku</span>
          <span>Last deploy: <span style={{ color: 'var(--accent)' }}>● passed</span> · main@f4ab921</span>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function SocialRow({ icon: Ic, label, handle, url, primary }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
       onMouseEnter={() => setHovered(true)}
       onMouseLeave={() => setHovered(false)}
       style={{
         display: 'flex', alignItems: 'center', gap: 14,
         padding: '18px 20px',
         borderRadius: 12,
         border: '1px solid ' + (hovered ? 'var(--accent-glow)' : 'var(--border-strong)'),
         background: hovered ? 'var(--accent-dim)' : 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
         transition: 'all .2s',
       }}>
      <div style={{
        width: 40, height: 40, borderRadius: 9,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: primary ? 'var(--accent-dim)' : 'rgba(255,255,255,0.04)',
        color: primary ? 'var(--accent)' : 'var(--text)',
        border: '1px solid ' + (primary ? 'var(--accent-glow)' : 'var(--border-strong)'),
      }}>
        <Ic size={16} stroke={1.8} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Geist Mono', fontSize: 10, color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{label}</div>
        <div style={{ fontSize: 14, color: 'var(--text)', marginTop: 2 }}>{handle}</div>
      </div>
      <IconArrowRight size={16} stroke={1.8} style={{ color: hovered ? 'var(--accent)' : 'var(--text-mute)', transform: hovered ? 'translateX(2px)' : 'none', transition: 'all .2s' }} />
    </a>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', multiline }) {
  const [focused, setFocused] = React.useState(false);
  const baseStyle = {
    width: '100%',
    padding: '12px 14px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid ' + (focused ? 'var(--accent-glow)' : 'var(--border-strong)'),
    color: 'var(--text)',
    fontFamily: 'Geist', fontSize: 14,
    borderRadius: 8,
    outline: 'none',
    transition: 'border-color .2s',
    resize: multiline ? 'vertical' : 'none',
    fontFamily: 'inherit',
  };
  return (
    <label style={{ display: 'block' }}>
      <div style={{ fontFamily: 'Geist Mono', fontSize: 10, color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 6 }}>
        {label}
      </div>
      {multiline ? (
        <textarea rows={4} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={baseStyle} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={baseStyle} />
      )}
    </label>
  );
}

window.Contact = Contact;
