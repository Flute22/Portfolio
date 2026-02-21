import React from 'react';
import { Database, Brain, BarChart3, LineChart, Github, Linkedin, Instagram } from 'lucide-react';
import { Project, ExperienceItem, SkillGroup, CaseStudy } from './types';

export const HERO_DATA = {
  name: "Khushal Sinhmar",
  role: "Aspiring Data Scientist",
  tagline: "Turning Complex Data into Actionable Business Intelligence",
  description: "Data-driven professional with a strong foundation in Data Science and Business Intelligence. Proficient in transforming complex, raw datasets into actionable insights using SQL, Power BI, Excel, and Python — from rigorous ETL processing to high-impact visualization.",
  avatarUrl: 'profile.jpg'
};

export const RESUME_DEFAULT_URL = '/Resume.pdf';
export const RESUME_STORAGE_KEY = 'portfolio_resume_data';

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
    category: "Data Visualization",
    items: [
      { name: "Power BI (DAX, Power Query)", description: "Building interactive dashboards with custom KPIs, time intelligence measures, and data modeling." },
      { name: "Microsoft Excel (Pivot Tables, Dashboards, Slicers)", description: "Creating dynamic reports and interactive dashboards for business stakeholders." },
      { name: "Data Storytelling & Reporting", description: "Translating complex datasets into compelling visual narratives for executive review." }
    ],
    icon: <BarChart3 className="w-6 h-6 text-primary" />
  },
  {
    category: "Databases & Languages",
    items: [
      { name: "SQL (T-SQL, Window Functions, CTEs)", description: "Architecting complex queries with DENSE_RANK, LAG, and multi-table joins for deep analysis." },
      { name: "Python (Data Analysis Libraries)", description: "Leveraging Pandas, NumPy, and Matplotlib for data manipulation and exploratory analysis." },
      { name: "Database Modeling & Schema Design", description: "Designing Star Schemas and relational models for optimized query performance." }
    ],
    icon: <Database className="w-6 h-6 text-secondary" />
  },
  {
    category: "Data Methodology",
    items: [
      { name: "ETL Processes & Data Cleaning", description: "End-to-end data pipelines — extraction, transformation, standardization, and quality assurance." },
      { name: "Star Schema Modeling", description: "Designing dimensional models that reduce query latency and enable efficient BI reporting." },
      { name: "Statistical Analysis & Feature Engineering", description: "Applying statistical methods to validate hypotheses and engineer meaningful features." }
    ],
    icon: <Brain className="w-6 h-6 text-accent" />
  },
  {
    category: "Core Concepts",
    items: [
      { name: "Financial Reporting & Trend Analysis", description: "Tracking revenue metrics, sales volatility, and KPIs across time periods." },
      { name: "Supply Chain Analytics", description: "Analyzing inventory performance, outlet segmentation, and distribution efficiency." },
      { name: "Customer Segmentation & Market Analysis", description: "Identifying spending patterns, customer lifetime value, and regional market dynamics." }
    ],
    icon: <LineChart className="w-6 h-6 text-primary" />
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-ds",
    role: "Data Science Professional Program",
    company: "AnalytixLabs",
    period: "Oct 2025 – Oct 2026",
    description: "Specialized training in Data Visualization with Excel, SQL, Power BI, and Python. Building end-to-end analytical solutions from ETL to dashboard delivery. Upcoming modules in Machine Learning and Generative AI.",
    skills: ["Power BI", "SQL", "Python", "Excel", "Statistics", "Mathematics", "Machine learning", "Generative AI", "MLOps (Machine Learning Operations)"]
  },
  {
    id: "exp-bca",
    role: "Bachelor of Computer Applications (BCA)",
    period: "2022 – 2025",
    description: "Built a strong technical foundation in software engineering, database management systems, and algorithm design with a focus on data-centric computing and analytical problem-solving.",
    skills: ["DBMS", "Data Structures", "Algorithms", "System Design", "Web development"]
  },
  {
    id: "exp-achievements",
    role: "Achievements & Leadership",
    company: "Professional Growth",
    period: "Ongoing",
    description: "Translated complex data discrepancies into clear business insights for inventory optimization. Recognized for developing high-efficiency Star Schemas that reduced query latency. Currently pursuing Data Science certification focusing on predictive modeling.",
    skills: ["Star Schema", "Data Modeling", "Business Insights", "Certification"]
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-retail-bi",
    title: "Retail Business Intelligence Dashboard",
    category: "BI",
    description: "Engineered a multi-source data model integrating Sales, Geographic, and Product data into a Star Schema. Built custom DAX KPIs including 'Net Units' and Time Intelligence measures to track weekly and monthly sales volatility.",
    metrics: [
      { label: "Data Integrity", value: "100%" },
      { label: "Schema", value: "Star" }
    ],
    tags: ["Power BI", "DAX", "Power Query", "ETL", "Star Schema"],
    link: "https://github.com/Flute22/Power-BI-Dashboards",
    chartData: [
      { name: 'W1', value: 320 },
      { name: 'W2', value: 480 },
      { name: 'W3', value: 390 },
      { name: 'W4', value: 560 },
    ]
  },
  {
    id: "proj-mobile-sql",
    title: "Mobile Manufacturer Sales Trends",
    category: "Analytics",
    description: "Architected complex T-SQL queries using CTEs and Joins across five relational tables. Applied DENSE_RANK() to identify top-selling manufacturers and LAG() for Year-Over-Year spending growth analysis of top-tier customers.",
    metrics: [
      { label: "Tables Joined", value: "5" },
      { label: "Analysis", value: "YoY" }
    ],
    tags: ["SQL", "T-SQL", "CTEs", "Window Functions", "Joins"],
    link: "https://github.com/Flute22/SQL_Mastery/tree/main/Mobile%20manufactured%20data%20analysis",
    chartData: [
      { name: 'Q1', value: 210 },
      { name: 'Q2', value: 340 },
      { name: 'Q3', value: 290 },
      { name: 'Q4', value: 450 },
    ]
  },
  {
    id: "proj-blinkit",
    title: "Blinkit Supply Chain & Sales Dashboard",
    category: "Excel",
    description: "Processed 8,500+ retail items, standardizing inconsistent categorical data to ensure accurate reporting. Built interactive dashboards tracking $1.20M in total sales. Identified that 'Low Fat' products generated 82% more revenue than 'Regular' items.",
    metrics: [
      { label: "Total Sales", value: "$1.20M" },
      { label: "Items Processed", value: "8.5K+" }
    ],
    tags: ["Excel", "Pivot Tables", "Slicers", "Data Cleaning"],
    link: "https://github.com/Flute22/Excel-Dashboards",
    chartData: [
      { name: 'Low Fat', value: 776 },
      { name: 'Regular', value: 425 },
    ]
  }
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: "cs-1",
    title: "From Raw Data to Business Strategy",
    description: "How a comprehensive ETL process and Star Schema design transformed fragmented retail data into a 360-degree view of business health for executive decision-making.",
    keyInsights: [
      { text: "Geographic standardization and missing-record handling ensured 100% data integrity across all sources.", visualType: 'transformation' },
      { text: "Custom DAX KPIs like 'Net Units' revealed hidden sales volatility masked by raw transaction counts.", visualType: 'growth' }
    ],
    link: "#"
  },
  {
    id: "cs-2",
    title: "SQL-Driven Market Intelligence",
    description: "Leveraging advanced T-SQL techniques to uncover market dynamics, customer lifetime value, and the correlation between pricing strategies and regional sales volume.",
    keyInsights: [
      { text: "Window functions (LAG) revealed Year-Over-Year spending growth patterns for top-tier customers.", visualType: 'network' },
      { text: "EXCEPT operations isolated new market entrants, providing competitive intelligence insights.", visualType: 'reduction' }
    ],
    link: "#"
  }
];