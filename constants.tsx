import React from 'react';
import { Database, Brain, BarChart3, Code2, LineChart, FileSpreadsheet, Mic2, Cpu, Braces, Presentation, Landmark, Bot, Github, Linkedin, Instagram } from 'lucide-react';
import { Project, ExperienceItem, SkillGroup, CaseStudy } from './types';

export const HERO_DATA = {
  name: "Khushal Sinhmar",
  role: "Data Science Aspirant",
  tagline: "Transforming Foundational Knowledge into Data-Driven Solutions",
  description: "A BCA graduate specialized in core computing, currently mastering Data Science at Analytics Labs. I build intelligent systems—like my Personal AI Buddy—that combine technical rigor with an analytical mindset rooted in Economics.",
  // Professional placeholder image
  avatarUrl: './profile.jpg' 
};

export const SOCIAL_LINKS = [
  { 
    label: "GitHub", 
    href: "https://github.com/Flute22", 
    icon: <Github className="w-6 h-6" /> 
  },
  { 
    label: "Instagram", 
    href: "https://www.instagram.com/nextgenkhushal", 
    icon: <Instagram className="w-6 h-6" /> 
  },
  { 
    label: "LinkedIn", 
    href: "https://www.linkedin.com/in/khushal-sinhmar", 
    icon: <Linkedin className="w-6 h-6" /> 
  }
];

export const SKILLS_DATA: SkillGroup[] = [
  {
    category: "Foundation & Scripting",
    items: [
      { name: "Python (Pandas, NumPy, Scikit-Learn)", description: "The backbone of modern data science for manipulation and modeling." },
      { name: "SQL (Relational Databases, Schema Design)", description: "Architecting efficient queries and robust database structures." },
      { name: "C++ & Java (BCA Academic Core)", description: "Deep understanding of memory management and algorithm optimization." }
    ],
    icon: <Code2 className="w-6 h-6 text-primary" />
  },
  {
    category: "Data Intelligence",
    items: [
      { name: "Exploratory Data Analysis (EDA)", description: "Uncovering hidden patterns and anomalies before modeling begins." },
      { name: "Supervised & Unsupervised Learning", description: "Building predictive models using regression, classification, and clustering." },
      { name: "Statistical Hypothesis Testing", description: "Validating business assumptions with rigorous statistical frameworks." }
    ],
    icon: <Brain className="w-6 h-6 text-secondary" />
  },
  {
    category: "Analytical Context",
    items: [
      { name: "Economic Theory & Market Trends", description: "Applying macro/microeconomic principles to interpret market signals." },
      { name: "Behavioral Data Analysis", description: "Decoding user intent and engagement through interaction logs." },
      { name: "Data Storytelling & Visualization", description: "Translating complex datasets into actionable strategic narratives." }
    ],
    icon: <Landmark className="w-6 h-6 text-accent" />
  },
  {
    category: "Emerging Tech",
    items: [
      { name: "Natural Language Processing (NLP)", description: "Processing and generating human language for sentiment and context." },
      { name: "LLM & AI Agent Integration", description: "Leveraging large language models to automate complex workflows." },
      { name: "Interactive Dashboarding (Power BI)", description: "Creating real-time, interactive visualizations for stakeholder monitoring." }
    ],
    icon: <Bot className="w-6 h-6 text-primary" />
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-ds",
    role: "Data Science Specialization",
    company: "Analytics Labs",
    period: "2025 - Ongoing",
    description: "Intensive training in advanced analytics, focusing on transforming raw data into business intelligence. Mastering predictive modeling, data mining, and engineering pipelines.",
    skills: ["Machine Learning", "Advanced SQL", "Predictive Modeling"]
  },
  {
    id: "exp-ai-buddy",
    role: "Project Developer",
    company: "Personal AI Buddy Project",
    period: "2024 - Present",
    description: "Developing a natural-language AI companion. Implementing NLP techniques to create a context-aware assistant capable of managing personal workflows and knowledge.",
    skills: ["Python", "NLP", "API Integration", "Automation"]
  },
  {
    id: "exp-bca",
    role: "Bachelor of Computer Applications (BCA)",
    company: "Academic Foundation",
    period: "2022 - 2025",
    description: "Built a solid technical foundation in software engineering, database management systems (DBMS), and algorithm design. Graduating with a focus on data-centric computing.",
    skills: ["DBMS", "Data Structures", "System Design"]
  },
  {
    id: "exp-econ",
    role: "Economics & Logic Explorer",
    company: "Independent Study",
    period: "Ongoing",
    description: "Self-driven study of economic principles to enhance data interpretation. Applying micro/macroeconomic frameworks to solve complex business logic problems.",
    skills: ["Economics", "Statistical Analysis", "Logic"]
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-ai-buddy",
    title: "Personal AI Buddy",
    category: "ML",
    description: "A customized AI assistant designed to streamline personal workflows and manage knowledge bases through natural language interaction.",
    metrics: [
      { label: "Response Latency", value: "< 2s" },
      { label: "Framework", value: "LLM-Based" }
    ],
    tags: ["NLP", "Python", "Automation"],
    link: "https://github.com/Flute22",
    chartData: [
      { name: 'W1', value: 20 },
      { name: 'W2', value: 45 },
      { name: 'W3', value: 75 },
      { name: 'W4', value: 95 },
    ]
  },
  {
    id: "proj-1",
    title: "Economic Impact Analysis",
    category: "Analytics",
    description: "A data study investigating how regional economic shifts correlate with consumer spending patterns using public financial datasets.",
    metrics: [
      { label: "Data points", value: "30k+" },
      { label: "Accuracy", value: "82%" }
    ],
    tags: ["Python", "Economics", "Visualization"],
    link: "https://github.com/Flute22",
    chartData: [
      { name: 'Jan', value: 400 },
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 200 },
      { name: 'Apr', value: 278 },
      { name: 'May', value: 189 },
      { name: 'Jun', value: 150 },
    ]
  },
  {
    id: "proj-sentiment",
    title: "Market Sentiment Tracker",
    category: "Engineering",
    description: "Real-time pipeline processing social media feeds to gauge market sentiment for crypto assets.",
    metrics: [
      { label: "Latency", value: "< 50ms" },
      { label: "Volume", value: "1TB/day" }
    ],
    tags: ["Kafka", "Spark", "AWS"],
    link: "https://github.com/Flute22",
    chartData: [
      { name: '00:00', value: 30 },
      { name: '06:00', value: 45 },
      { name: '12:00', value: 85 },
      { name: '18:00', value: 60 },
    ]
  },
  {
    id: "proj-health",
    title: "Healthcare Resource Optimizer",
    category: "Analytics",
    description: "Predictive model for hospital bed allocation during peak seasons using historical admission data.",
    metrics: [
      { label: "Efficiency", value: "+15%" },
      { label: "MAE", value: "2.3" }
    ],
    tags: ["R", "Tableau", "Forecasting"],
    link: "https://github.com/Flute22",
    chartData: [
      { name: 'Q1', value: 80 },
      { name: 'Q2', value: 65 },
      { name: 'Q3', value: 45 },
      { name: 'Q4', value: 90 },
    ]
  }
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: "cs-1",
    title: "Synthesizing Economics & Data",
    description: "An exploration of how understanding market dynamics provides a strategic framework for interpreting raw analytical outputs.",
    keyInsights: [
      { text: "Economic models act as a validation layer for ML predictions.", visualType: 'transformation' },
      { text: "Identified market-driven anomalies in standard demand datasets.", visualType: 'growth' }
    ],
    link: "#"
  },
  {
    id: "cs-2",
    title: "The Logic of the Transition",
    description: "Documenting how core BCA principles in DBMS and algorithms facilitated a rapid mastery of Data Science fundamentals.",
    keyInsights: [
      { text: "Applied database normalization concepts to large-scale data cleaning.", visualType: 'network' },
      { text: "Systematic approach to debugging complex analytical pipelines.", visualType: 'reduction' }
    ],
    link: "#"
  }
];