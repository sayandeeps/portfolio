export const profile = {
  name: "Sayandeep Sharma",
  firstName: "Sayandeep",
  initials: "SS",
  eyebrow: "5G Core · Test Automation · Full-Stack",
  role: "Software Engineer, R&D",
  intro:
    "I automate 5G Core testing at Telaverge, covering subscriber provisioning, authentication, and registration across network functions.",
  introSecondary:
    "I also build full-stack web applications and am exploring data pipelines with Python, SQL, and Azure.",
  location: "Kolkata, India",
  email: "sayandeep11@gmail.com",
  connectBlurb:
    "I'm always interested in interesting engineering problems, software projects, and opportunities to learn and build. Whether you're looking to collaborate, discuss technology, or share an opportunity, feel free to reach out.",
};

export const socials = [
  { name: "GitHub", href: "https://github.com/sayandeeps" },
  // TODO: replace with your real LinkedIn profile URL.
  { name: "LinkedIn", href: "https://www.linkedin.com/in/sayandeep-sharma" },
];

export const stats = [
  { value: 10, suffix: "+", label: "Projects" },
  { value: 2, suffix: "+", label: "Years of development experience" },
  { value: 3, suffix: "", label: "Internships & professional experiences" },
  { value: 10, suffix: "+", label: "Technologies & tools" },
];

export const about = [
  "At Telaverge, I turn 3GPP specifications into automated integration and regression tests for UDM, UDR, and AUSF. I build reusable test modules with Python and Regal, benchmark 5G Core simulators, and investigate failures using logs and protocol traces.",
  "My web development work spans React and Next.js interfaces, REST API integrations, and PHP and SQL backends. My projects include a drag-and-drop form builder with submission tracking and a workflow for reconstructing 3D models from photos.",
];

export const skills = [
  {
    group: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Redux Toolkit",
      "Tailwind CSS",
    ],
  },
  {
    group: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "Python",
      "Flask",
      "PHP",
      "CodeIgniter",
      "REST APIs",
    ],
  },
  {
    group: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "MongoDB Atlas", "Prisma"],
  },
  {
    group: "Cloud & DevOps",
    items: [
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Nginx",
      "Linux",
      "Ansible",
      "Terraform",
    ],
  },
  {
    group: "Data Engineering",
    items: [
      "Python",
      "SQL",
      "PySpark",
      "Azure Data Factory",
      "Azure Databricks",
      "Azure Synapse Analytics",
      "Data Modeling",
    ],
  },
  {
    group: "Tools",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Helm",
      "Prometheus",
      "Grafana",
    ],
  },
];

export const education = [
  {
    school: "Narula Institute of Technology",
    degree: "B.Tech in Information Technology",
    period: "2021 – 2025",
  },
];

export const experience = [
  {
    role: "Software Engineer R&D",
    company: "Telaverge",
    period: "Aug 2024 – Present",
    stack: [
      "Python",
      "Regal Automation Framework",
      "Docker",
      "Kubernetes",
      "Open5GS",
      "MongoDB",
      "OpenSearch",
      "Kafka",
      "Logstash",
    ],
    bullets: [
      "Designed and automated end-to-end, integration, and Blackbox test cases for 5G Core network functions (UDM, UDR, AUSF) based on 3GPP specifications using the Regal automation framework.",
      "Identified test scenarios from functional specifications and translated them into automated validation and regression suites.",
      "Developed reusable automation modules and enhanced existing scripts to improve test coverage and execution efficiency.",
      "Validated REST API interactions, subscriber provisioning, authentication, and registration workflows across network functions.",
      "Executed benchmarking and validation of in-house 5G Core simulators through automated performance and functional testing.",
      "Worked with the OpenSearch, Kafka, and Logstash stack for log collection, querying, and KPI monitoring across distributed microservice pipelines.",
      "Performed root cause analysis of automation failures through application logs, protocol traces, and execution reports, collaborating closely with development teams to resolve defects.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "TrainingMug Pvt. Ltd.",
    period: "Dec 2023 – Present",
    bullets: [
      "Developed and maintained modern web applications using React and Next.js.",
      "Built responsive interfaces using Tailwind CSS.",
      "Worked with Redux Toolkit for application state management.",
      "Integrated REST APIs and backend services.",
      "Worked with TypeScript and modern frontend development practices.",
      "Contributed to production-oriented application development and debugging.",
    ],
  },
  {
    role: "Programmer Analyst Trainee",
    company: "Breadcrumbs Creative Studio",
    period: "Sep 2023 – Dec 2023",
    stack: ["PHP", "CodeIgniter", "SQL", "REST APIs"],
    bullets: [
      "Worked on web applications for an Australian client.",
      "Developed backend functionality using PHP and CodeIgniter.",
      "Built and integrated REST APIs.",
      "Worked with SQL databases and backend data handling.",
      "Assisted with debugging, maintenance, and feature development.",
    ],
  },
  {
    role: "Research Intern",
    company: "The Computer Noob",
    period: "Oct 2021 – Nov 2021",
    bullets: [
      "Conducted research on the significance of Space Complexity in software systems.",
      "Compared Space Complexity and Time Complexity.",
      "Studied algorithmic efficiency and resource utilization.",
      "Contributed to research documentation and technical analysis.",
    ],
  },
];

export const projectTags = ["All", "Web", "AI", "Blockchain", "Data", "Cloud"];

export const projects = [
  {
    id: "dynamic-forms",
    title: "Dynamic Forms Builder",
    summary:
      "A dynamic form-building platform that lets users create customized forms through a drag-and-drop interface.",
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "DnD Kit",
    ],
    features: [
      "Drag-and-drop form builder",
      "Multiple field types",
      "Form preview",
      "Shareable form URLs",
      "Submission tracking & validation",
    ],
    image: "/images/projects/5.png",
    tags: ["Web", "Data"],
    repo: null,
    live: null,
  },
  {
    id: "object-storage-3d",
    title: "3D Object Storage & Visualization",
    summary:
      "A web platform that turns multiple images of an object into a 3D model and stores the asset on IPFS.",
    stack: ["Next.js", "Object Capture", "IPFS", "3D"],
    features: [
      "Photogrammetry-based 3D reconstruction",
      "Web-based workflow",
      "3D model visualization",
      "Decentralized IPFS storage with shareable links",
    ],
    image: "/images/projects/1.png",
    tags: ["Web", "Blockchain"],
    repo: "https://github.com/sayandeeps/admin_diversion_2024",
    live: null,
  },
  {
    id: "3d-ecommerce",
    title: "3D E-Commerce Platform",
    summary:
      "An immersive e-commerce platform built around 3D product visualization and decentralized storage.",
    stack: ["React", "Node.js", "IPFS", "Solidity", "Polygon"],
    features: [
      "3D product presentation",
      "IPFS-based asset storage",
      "Solidity smart contract on Polygon",
      "Secure user-data handling",
    ],
    image: "/images/projects/2.png",
    tags: ["Web", "Blockchain"],
    repo: "https://github.com/sayandeeps/diversion2k24",
    live: "https://ecommerce-ten-pearl.vercel.app",
  },
  {
    id: "ai-ecommerce-assistant",
    title: "AI-Powered E-Commerce Assistant",
    summary:
      "An e-commerce platform combining AI-powered customer assistance with blockchain-based data handling.",
    stack: ["AI", "Blockchain", "Web Development"],
    features: [
      "AI-powered product assistance",
      "Product and delivery queries",
      "Interactive chat interface",
      "Personalized customer assistance",
    ],
    image: "/images/projects/3.png",
    tags: ["AI", "Blockchain"],
    repo: "https://github.com/sayandeeps/diversion2k24",
    live: "https://ecommerce-ten-pearl.vercel.app",
  },
  {
    id: "inventory-management",
    title: "Inventory Management System",
    summary:
      "A web-based inventory and sales management system that simplifies product and order management.",
    stack: ["CodeIgniter 4", "PHP", "MySQL"],
    features: [
      "Product management",
      "Inventory tracking",
      "Cart functionality",
      "Sales management",
    ],
    image: "/images/projects/4.png",
    tags: ["Web"],
    repo: "https://github.com/sayandeeps/Inventory-Management-System",
    live: null,
  },
  {
    id: "secure-aadhaar",
    title: "Secure Aadhaar Data Management",
    summary:
      "A secure dashboard for accessing and managing Aadhaar-related information through authenticated API integration.",
    stack: ["Next.js", "Firebase", "Appwrite", "API Integration"],
    features: [
      "Firebase OTP authentication",
      "API integration",
      "Interactive dashboard",
      "Secure storage with auth & authorization",
    ],
    image: "/images/projects/6.png",
    tags: ["Web", "Cloud"],
    repo: "https://github.com/sayandeeps/cn-work",
    live: "https://cn-work.vercel.app/logindev",
  },
];

export const currentFocus = {
  heading: "What I'm learning",
  blurb:
    "I’m learning how to design data models and build pipelines with Python, SQL, and Azure, including Azure Data Factory and PySpark on Databricks.",
  items: [
    "Data Engineering",
    "Python",
    "Advanced SQL",
    "Azure",
    "Azure Data Factory",
    "PySpark",
    "Databricks",
    "Data Modeling",
    "Kubernetes",
    "Docker",
    "Cloud Infrastructure",
    "DevOps",
    "Distributed Systems",
  ],
};

export const navLinks = [
  { title: "About", path: "#about" },
  { title: "Experience", path: "#experience" },
  { title: "Projects", path: "#projects" },
  { title: "Skills", path: "#skills" },
  { title: "Focus", path: "#focus" },
  { title: "Contact", path: "#contact" },
];
