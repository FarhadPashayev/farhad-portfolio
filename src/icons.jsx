// Minimal line icons, 1.5 stroke, Lucide-esque
const Icon = ({ d, size = 16, stroke = 1.5, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...props}>
    {d}
  </svg>
);

const IconDownload = (p) => <Icon {...p} d={<><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>} />;
const IconArrowRight = (p) => <Icon {...p} d={<><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></>} />;
const IconArrowUpRight = (p) => <Icon {...p} d={<><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>} />;
const IconCheck = (p) => <Icon {...p} d={<path d="m4 12 5 5L20 6" />} />;
const IconTerminal = (p) => <Icon {...p} d={<><path d="m5 8 4 4-4 4" /><path d="M13 16h6" /><rect x="2" y="4" width="20" height="16" rx="2" /></>} />;
const IconGithub = (p) => <Icon {...p} d={<path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />} />;
const IconLinkedin = (p) => <Icon {...p} d={<><rect x="2" y="2" width="20" height="20" rx="2.5" /><path d="M7 10v7M7 7v.01M11 17v-4.5a2.5 2.5 0 0 1 5 0V17M11 10v7" /></>} />;
const IconMail = (p) => <Icon {...p} d={<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m3 7 9 6 9-6" /></>} />;
const IconGauge = (p) => <Icon {...p} d={<><path d="M12 14 8 10" /><path d="M3.3 14a9 9 0 1 1 17.4 0" /></>} />;
const IconZap = (p) => <Icon {...p} d={<path d="M13 2 3 14h8l-1 8 10-12h-8l1-8z" />} />;
const IconDatabase = (p) => <Icon {...p} d={<><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" /><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" /></>} />;
const IconGlobe = (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></>} />;
const IconBraces = (p) => <Icon {...p} d={<><path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1" /><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1" /></>} />;
const IconFlask = (p) => <Icon {...p} d={<><path d="M9 3h6" /><path d="M10 3v7L4 20a2 2 0 0 0 1.7 3h12.6A2 2 0 0 0 20 20l-6-10V3" /><path d="M7 15h10" /></>} />;
const IconBug = (p) => <Icon {...p} d={<><path d="M8 2l2 2M16 2l-2 2" /><path d="M12 7a5 5 0 0 0-5 5v4a5 5 0 0 0 10 0v-4a5 5 0 0 0-5-5z" /><path d="M12 12v6M7 12H3M21 12h-4M7 17l-3 2M20 19l-3-2M7 7 4 5M20 5l-3 2" /></>} />;
const IconLock = (p) => <Icon {...p} d={<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>} />;
const IconLayers = (p) => <Icon {...p} d={<><path d="m12 3 9 5-9 5-9-5 9-5z" /><path d="m3 13 9 5 9-5" /><path d="m3 18 9 5 9-5" /></>} />;
const IconGitBranch = (p) => <Icon {...p} d={<><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></>} />;
const IconClock = (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>} />;
const IconSparkle = (p) => <Icon {...p} d={<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2" />} />;
const IconMenu = (p) => <Icon {...p} d={<><path d="M4 7h16M4 12h16M4 17h16" /></>} />;
const IconX = (p) => <Icon {...p} d={<><path d="M6 6l12 12M18 6 6 18" /></>} />;

window.Icons = {
  IconDownload, IconArrowRight, IconArrowUpRight, IconCheck, IconTerminal,
  IconGithub, IconLinkedin, IconMail, IconGauge, IconZap, IconDatabase,
  IconGlobe, IconBraces, IconFlask, IconBug, IconLock, IconLayers,
  IconGitBranch, IconClock, IconSparkle, IconMenu, IconX
};
