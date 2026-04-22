// All content lives here — easy to swap out for DB fetches later
const { IconGlobe, IconBraces, IconGauge, IconDatabase, IconFlask, IconBug, IconLock, IconLayers, IconGitBranch, IconClock, IconSparkle } = window.Icons;

window.DATA = {
  nav: [
    { id: 'work', label: 'Work' },
    { id: 'skills', label: 'Skills' },
    { id: 'performance', label: 'Performance' },
    { id: 'notes', label: 'Notes' },
    { id: 'contact', label: 'Contact' },
  ],

  skills: [
    {
      icon: IconGlobe,
      category: 'Web',
      tools: [
        { name: 'Selenium', level: 95 },
        { name: 'Playwright', level: 88 },
        { name: 'Cypress', level: 72 },
        { name: 'WebdriverIO', level: 65 },
      ],
    },
    {
      icon: IconBraces,
      category: 'API',
      tools: [
        { name: 'Rest-Assured', level: 92 },
        { name: 'Postman / Newman', level: 90 },
        { name: 'Karate DSL', level: 70 },
        { name: 'GraphQL testing', level: 60 },
      ],
    },
    {
      icon: IconGauge,
      category: 'Performance',
      tools: [
        { name: 'Apache JMeter', level: 94 },
        { name: 'k6', level: 80 },
        { name: 'Gatling', level: 62 },
        { name: 'Grafana / InfluxDB', level: 78 },
      ],
    },
    {
      icon: IconDatabase,
      category: 'Database',
      tools: [
        { name: 'MongoDB', level: 90 },
        { name: 'PostgreSQL', level: 82 },
        { name: 'MySQL', level: 75 },
        { name: 'Redis', level: 60 },
      ],
    },
  ],

  projects: [
    {
      id: 'fintech',
      index: '01',
      name: 'Fintech Automation Framework',
      stack: ['Java', 'Selenium', 'TestNG', 'Maven', 'Jenkins'],
      description: 'End-to-end regression framework covering account opening, KYC, transfer and card issuance flows for a regional retail bank. Page-Object + DataProvider architecture, parallel execution across 4 browsers.',
      metric: 'Reduced regression cycle from 18h → 4h',
      metricDelta: '-78%',
      status: 'Production',
      repo: 'github.com/farhadpasha/fintech-fw',
      primaryTag: 'E2E',
    },
    {
      id: 'api-suite',
      index: '02',
      name: 'API Validation Suite',
      stack: ['Rest-Assured', 'Java', 'MongoDB', 'JUnit 5', 'Allure'],
      description: 'Contract + behavioural testing for 60+ REST endpoints with Mongo assertions to verify persisted state after each call. Schema drift detection via JSON-schema snapshots in CI.',
      metric: 'Caught 14 contract regressions pre-release',
      metricDelta: '+14',
      status: 'Production',
      repo: 'github.com/farhadpasha/api-suite',
      primaryTag: 'API',
    },
    {
      id: 'modern-web',
      index: '03',
      name: 'Modern Web Testing',
      stack: ['Playwright', 'TypeScript', 'Node', 'GitHub Actions'],
      description: 'High-speed automation suite for a React/Next.js SPA with heavy async state. Component-level selectors, network stubbing, and trace-viewer-first debugging. Shards across 6 workers.',
      metric: 'Full suite runs in 6m 12s',
      metricDelta: '−65% vs Selenium',
      status: 'Active',
      repo: 'github.com/farhadpasha/modern-web',
      primaryTag: 'SPA',
    },
    {
      id: 'perf-suite',
      index: '04',
      name: 'Performance & Load Suite',
      stack: ['JMeter', 'InfluxDB', 'Grafana', 'Docker'],
      description: 'Distributed load test stack modelling real traffic shapes — ramp, spike, soak. Live dashboards per tenant; PagerDuty alerts on p95 SLOs. Validated stability under 5k+ concurrent users.',
      metric: 'Sustained 5,200 VUs @ p95 < 480ms',
      metricDelta: '5.2k VU',
      status: 'Active',
      repo: 'github.com/farhadpasha/perf-suite',
      primaryTag: 'Load',
    },
  ],

  tips: [
    {
      tag: 'Selectors',
      icon: IconBug,
      title: 'Stop locating by CSS class',
      body: 'CSS classes shift with every design pass. Anchor on role, accessible name, or a dedicated data-testid. Your test suite stops breaking for cosmetic reasons.',
      read: '2 min',
    },
    {
      tag: 'Flakiness',
      icon: IconClock,
      title: 'Replace sleep() with explicit waits',
      body: 'Thread.sleep() is a bet. WebDriverWait.until(condition) is a contract. Half of all flakes I have triaged in 3 years trace back to hard sleeps hiding real race conditions.',
      read: '3 min',
    },
    {
      tag: 'API',
      icon: IconBraces,
      title: 'Assert on the database, not only the response',
      body: 'A 200 OK only means the server did not crash. Open Mongo, check the side effect. That is the difference between functional and integration testing.',
      read: '4 min',
    },
    {
      tag: 'Load',
      icon: IconGauge,
      title: 'Think in p95, not averages',
      body: 'Averages mask the 5% of users having a terrible time. Design every load-test report around p95 and p99 latency. Single number SLOs produce single number answers.',
      read: '3 min',
    },
    {
      tag: 'CI/CD',
      icon: IconGitBranch,
      title: 'Fail fast, retry smart',
      body: 'Run unit tests before e2e. Retry only known-flaky specs with a cap of 2. Never retry assertion failures — they are bugs, not noise.',
      read: '2 min',
    },
    {
      tag: 'Culture',
      icon: IconSparkle,
      title: 'Write the bug report you want to receive',
      body: 'Steps, expected, actual, environment, logs, a 10s screen recording. A clear ticket saves 40 minutes of back-and-forth and earns engineering trust.',
      read: '2 min',
    },
  ],

  socials: {
    linkedin: { url: 'https://www.linkedin.com/in/farhadpasha', handle: 'linkedin.com/in/farhadpasha' },
    github: { url: 'https://github.com/FarhadPashayev', handle: 'github.com/FarhadPashayev' },
    email: { url: 'mailto:pasaferhad@gmail.com', handle: 'pasaferhad@gmail.com' },
  },
};
