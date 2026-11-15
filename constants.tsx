import type {
  AboutData,
  CaseStudy,
  ExperienceItem,
  HeroData,
  NavLink,
  Project,
  ProjectCategory,
  SkillGroup,
  SocialLink,
} from './types';

export const SITE_NAME = 'Khushal Sinhmar';
export const CONTACT_EMAIL = 'khushalsinhmar@gmail.com';
export const RESUME_URL = '/Resume.pdf';
export const RESUME_FILE_NAME = 'Khushal_Sinhmar_Resume.pdf';

/** Order matches the page. */
export const NAV_LINKS: NavLink[] = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Case Studies', id: 'case-studies' },
  { label: 'Contact', id: 'contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { kind: 'github', label: 'GitHub', href: 'https://github.com/Flute22' },
  { kind: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/khushal-sinhmar' },
];

export const HERO_DATA: HeroData = {
  name: SITE_NAME,
  eyebrow: 'Data Analyst · Open to opportunities',
  headline: 'Turning complex data into actionable business intelligence.',
  description:
    'I take raw, messy datasets through ETL and modeling to dashboards that decision-makers actually use, working in SQL, Power BI, Excel and Python.',
  primaryCta: 'View work',
  secondaryCta: 'Contact',
  current: {
    title: 'Data Science Professional Program',
    organisation: 'AnalytixLabs',
    period: 'Oct 2025 – Oct 2026',
  },
  featuredStat: {
    value: '82%',
    text: 'more revenue from "Low Fat" than "Regular" items, found in the Blinkit sales dashboard',
  },
  secondaryStat: {
    value: '$1.20M',
    text: 'in sales tracked across 8,500+ retail items',
  },
  stack: ['SQL', 'Power BI', 'DAX', 'Excel', 'Python', 'Pandas', 'Star Schema'],
};

export const ABOUT_DATA: AboutData = {
  title: 'Clarity through precision.',
  paragraphs: [
    'Modern businesses are drowning in data but starving for insights. I specialize in bridging this gap — transforming complex, raw datasets into actionable business intelligence through end-to-end data lifecycles.',
    "Whether it's engineering a Star Schema in Power BI, writing advanced T-SQL with window functions, or building interactive Excel dashboards that track $1M+ in sales, my goal is always the same: clarity through precision.",
  ],
  pillars: [
    {
      number: '01',
      title: 'Data Exploration',
      description:
        'Transforming raw, messy datasets into clean, structured foundations through rigorous ETL processes and data standardization.',
    },
    {
      number: '02',
      title: 'Business Intelligence',
      description:
        'Building interactive Power BI dashboards and Excel reports with custom KPIs that reveal actionable insights for strategic decisions.',
    },
    {
      number: '03',
      title: 'Stakeholder Communication',
      description:
        'Translating technical findings into clear, compelling narratives that empower non-technical leadership to make data-driven decisions.',
    },
  ],
};

export const SKILLS_TITLE = 'What I work with';

export const SKILLS_DATA: SkillGroup[] = [
  {
    category: 'Data Visualization',
    tag: 'BI',
    description:
      'Interactive dashboards with custom KPIs, time intelligence and dynamic reports for stakeholders.',
    items: [
      'Power BI',
      'DAX',
      'Power Query',
      'Excel',
      'Pivot Tables',
      'Dashboards',
      'Slicers',
      'Data Storytelling',
    ],
  },
  {
    category: 'Databases & Languages',
    tag: 'Code',
    description: 'Complex queries, data manipulation and schema design for fast analysis.',
    items: [
      'SQL',
      'T-SQL',
      'Window Functions',
      'CTEs',
      'Python',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Schema Design',
    ],
  },
  {
    category: 'Data Methodology',
    tag: 'Process',
    description:
      'End-to-end pipelines, from extraction and cleaning to modeling and validation.',
    items: [
      'ETL',
      'Data Cleaning',
      'Star Schema Modeling',
      'Statistical Analysis',
      'Feature Engineering',
    ],
  },
  {
    category: 'Core Concepts',
    tag: 'Domain',
    description:
      "Business areas I've analyzed: revenue, inventory, distribution and customers.",
    items: [
      'Financial Reporting',
      'Trend Analysis',
      'Supply Chain Analytics',
      'Customer Segmentation',
      'Market Analysis',
    ],
  },
];

export const PROJECTS_TITLE = 'Selected work';

/** Filter tabs above the project list. */
export const PROJECT_FILTERS: { key: 'All' | ProjectCategory; label: string }[] = [
  { key: 'All', label: 'All' },
  { key: 'BI', label: 'Power BI' },
  { key: 'SQL', label: 'SQL' },
  { key: 'Excel', label: 'Excel' },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-retail-bi',
    category: 'BI',
    badge: 'Power BI',
    title: 'Retail Business Intelligence Dashboard',
    link: 'https://github.com/Flute22/Power-BI-Dashboards',
    problem:
      'Sales, geographic and product data sat in separate sources, which hid weekly and monthly sales volatility.',
    approach:
      "Integrated the three sources into a Star Schema, then built custom DAX KPIs such as 'Net Units' plus Time Intelligence measures.",
    tools: ['Power BI', 'DAX', 'Power Query', 'ETL', 'Star Schema'],
    metrics: [
      { value: '100%', label: 'Data integrity' },
      { value: 'Star', label: 'Schema' },
    ],
    outcome: 'One model tracking weekly and monthly sales volatility across all sources.',
  },
  {
    id: 'proj-mobile-sql',
    category: 'SQL',
    badge: 'SQL',
    title: 'Mobile Manufacturer Sales Trends',
    link: 'https://github.com/Flute22/SQL_Mastery/tree/main/Mobile%20manufactured%20data%20analysis',
    problem:
      'Identify the top-selling manufacturers and how spending by top-tier customers changed year over year.',
    approach:
      'Wrote T-SQL with CTEs and joins across five relational tables; DENSE_RANK() ranked manufacturers and LAG() measured YoY growth.',
    tools: ['SQL', 'T-SQL', 'CTEs', 'Window Functions', 'Joins'],
    metrics: [
      { value: '5', label: 'Tables joined' },
      { value: 'YoY', label: 'Analysis' },
    ],
    outcome:
      'Ranked manufacturers and a year-over-year spending growth view for top-tier customers.',
  },
  {
    id: 'proj-blinkit',
    category: 'Excel',
    badge: 'Excel',
    title: 'Blinkit Supply Chain & Sales Dashboard',
    link: 'https://github.com/Flute22/Excel-Dashboards',
    problem:
      '8,500+ retail items with inconsistent categorical data made sales reporting unreliable.',
    approach:
      'Standardized the categorical data, then built interactive dashboards with Pivot Tables and Slicers.',
    tools: ['Excel', 'Pivot Tables', 'Slicers', 'Data Cleaning'],
    metrics: [
      { value: '$1.20M', label: 'Total sales' },
      { value: '8.5K+', label: 'Items processed' },
    ],
    outcome: "'Low Fat' products generated 82% more revenue than 'Regular' items.",
  },
];

export const EXPERIENCE_TITLE = 'Experience & education';

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-ds',
    role: 'Data Science Professional Program',
    company: 'AnalytixLabs',
    period: 'Oct 2025 – Oct 2026',
    description:
      'Specialized training in Data Visualization with Excel, SQL, Power BI, and Python. Building end-to-end analytical solutions from ETL to dashboard delivery. Upcoming modules in Machine Learning and Generative AI.',
    skills: [
      'Power BI',
      'SQL',
      'Python',
      'Excel',
      'Statistics',
      'Mathematics',
      'Machine learning',
      'Generative AI',
      'MLOps',
    ],
  },
  {
    id: 'exp-bca',
    role: 'Bachelor of Computer Applications (BCA)',
    period: '2022 – 2025',
    description:
      'Built a strong technical foundation in software engineering, database management systems, and algorithm design with a focus on data-centric computing and analytical problem-solving.',
    skills: ['DBMS', 'Data Structures', 'Algorithms', 'System Design', 'Web development'],
  },
  {
    id: 'exp-achievements',
    role: 'Achievements & Leadership',
    company: 'Professional Growth',
    period: 'Ongoing',
    description:
      'Translated complex data discrepancies into clear business insights for inventory optimization. Recognized for developing high-efficiency Star Schemas that reduced query latency. Currently pursuing Data Science certification focusing on predictive modeling.',
    skills: ['Star Schema', 'Data Modeling', 'Business Insights', 'Certification'],
  },
];

export const CASE_STUDIES_TITLE = 'Case studies';

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'cs-1',
    title: 'From Raw Data to Business Strategy',
    description:
      'How a comprehensive ETL process and Star Schema design transformed fragmented retail data into a 360-degree view of business health for executive decision-making.',
    insights: [
      'Geographic standardization and missing-record handling ensured 100% data integrity across all sources.',
      "Custom DAX KPIs like 'Net Units' revealed hidden sales volatility masked by raw transaction counts.",
    ],
  },
  {
    id: 'cs-2',
    title: 'SQL-Driven Market Intelligence',
    description:
      'Leveraging advanced T-SQL techniques to uncover market dynamics, customer lifetime value, and the correlation between pricing strategies and regional sales volume.',
    insights: [
      'Window functions (LAG) revealed Year-Over-Year spending growth patterns for top-tier customers.',
      'EXCEPT operations isolated new market entrants, providing competitive intelligence insights.',
    ],
  },
];

export const CONTACT_DATA = {
  title: 'Ready to collaborate?',
  text: "I'm always open to discussing data strategy, analytical insights, or visualization projects.",
};
