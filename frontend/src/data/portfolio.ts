import type { PortfolioData } from "@/types/portfolio";

/** Hard-coded portfolio content. Replace with your own details. */
export const portfolioData: PortfolioData = {
  owner: { name: "Hevindu Tilakasena", initials: "HT", role: "Agent and Computational Social Science Enthusiast" },
  nodes: [
    {
      id: "start",
      kind: "hub",
      label: "Hevindu Tilakasena",
      title: "Hi, I’m Hevindu Tilakasena",
      summary:
        `
            Highly motivated and curious AI professional, graduated with a Bachelor of Science (Honours) in Artificial
            Intelligence, with one year of hands-on industry experience at well reputed company as an Intern and Consultant. Possess a
            strong foundation in Machine Learning, Artificial Intelligence, and Software Engineering, with experience developing and
            supporting intelligent, data-driven solutions. A fast learner curiousity driven person who is exploring agent technology as well as
            aspects of computational social sciences with agent based technology.
            Scroll, or click any node, to explore my work.
        `,
      position: { x: 520, y: 0 },
      metrics: [
        { value: "1+  yrs", label: "Experience" },
        { value: "12", label: "Projects" },
        { value: "1", label: "Publications" },
        { value: "1", label: "Certifications" },
      ],
      links: ["about", "contact"],
    },
    {
      id: "about",
      kind: "about",
      label: "About",
      title: "About me",
      summary:
        "Focused on agent technology, my work centers on building and exploring autonomous agent solutions alongside emerging industry standards. Alongside this technical exploration, I conduct computational social science research to analyze complex social dynamics and behaviors.",
      position: { x: 520, y: 150 },
      metrics: [
        { value: "Research", label: "on Computational Social Science" },
        { value: "3.63 / 4.00", label: "Second Upper Class" },
        { value: "EN / SI", label: "languages" },
      ],
      links: ["projects", "experience", "publication"],
    },
    {
      id: "projects",
      kind: "projectsHub",
      label: "Projects",
      title: "Projects",
      summary: "Two areas of work: AI-based products and software-engineering projects. Pick one to see the details.",
      position: { x: 700, y: 500 },
      metrics: [],
      links: ["ai-projects", "se-projects"],
    },
    {
      id: "ai-projects",
      kind: "projects",
      label: "AI Projects",
      title: "AI-based projects",
      summary:
        "Machine-learning and LLM features designed end to end: from data and prompts to the interface people actually use.",
      position: { x: 1040, y: 260 },
      metrics: [],
      links: ["projects"],
      collection: {
        art: "ai",
        projects: [
          {
            id: "ai-triage",
            title: "Smart triage assistant",
            year: 2025,
            status: "Shipped",
            role: "Lead UX designer",
            summary: "A conversational assistant that routes patient requests to the right clinic team.",
            challenge: "Front-desk staff spent hours manually sorting free-text requests.",
            approach: "Mapped 40 request types, designed prompt flows and confidence-aware fallbacks, and tested with staff weekly.",
            outcome: "Manual sorting dropped by 58% and routing accuracy reached 91%.",
            technologies: ["Python", "FastAPI", "LangChain", "OpenAI API", "Next.js"],
            links: [{ label: "Case study", url: "https://example.com/triage" }],
          },
          {
            id: "ai-insights",
            title: "Document insights",
            year: 2024,
            status: "Shipped",
            role: "Product designer",
            summary: "Extracts key fields and risks from long contracts and shows them as scannable summaries.",
            challenge: "Analysts needed to read 60-page documents to find a handful of clauses.",
            approach: "Designed highlight-and-verify interactions so people can trust, correct and train the model.",
            outcome: "Review time fell from 45 to 12 minutes per document.",
            technologies: ["Python", "PyTorch", "spaCy", "FastAPI", "PostgreSQL"],
            links: [{ label: "Live demo", url: "https://example.com/insights" }],
          },
          {
            id: "ai-feedback",
            title: "Design feedback classifier",
            year: 2024,
            status: "Prototype",
            role: "Designer & developer",
            summary: "Clusters user feedback into themes so research findings are ready in minutes.",
            challenge: "Synthesising hundreds of survey comments was slow and inconsistent.",
            approach: "Prototyped a classifier and a Figma plugin that tags comments directly on the board.",
            outcome: "Cut synthesis time by 70% in a pilot with two product teams.",
            technologies: ["Python", "scikit-learn", "Hugging Face", "Figma API"],
          },
        ],
      },
    },
    {
      id: "se-projects",
      kind: "projects",
      label: "SE Projects",
      title: "Software engineering projects",
      summary:
        "Production web and mobile products where I shaped the UX and built the front end alongside engineers.",
      position: { x: 1100, y: 650 },
      metrics: [],
      links: ["projects"],
      collection: {
        art: "se",
        projects: [
          {
            id: "se-onboarding",
            title: "Fintech onboarding app",
            year: 2025,
            status: "Shipped",
            role: "Lead UX designer",
            summary: "Mobile sign-up and KYC flow for a digital wallet.",
            challenge: "Nine steps caused most new users to quit before activation.",
            approach: "Cut the flow to four steps, moved ID upload behind progressive disclosure and rewrote error states.",
            outcome: "Activation up 38% and drop-off down 24%.",
            technologies: ["React Native", "TypeScript", "Storybook", "Mixpanel"],
            links: [{ label: "Case study", url: "https://example.com/onboarding" }],
          },
          {
            id: "se-dashboard",
            title: "Clinic scheduling dashboard",
            year: 2024,
            status: "Shipped",
            role: "Product designer",
            summary: "Web dashboard for clinic staff to manage appointments and resources.",
            challenge: "The most common task needed eight clicks and several screens.",
            approach: "Shadowed 14 users, rebuilt the information architecture and shipped a keyboard-first scheduler.",
            outcome: "The most common task now takes two clicks, a 52% time saving.",
            technologies: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
          },
          {
            id: "se-system",
            title: "Design system library",
            year: 2023,
            status: "Shipped",
            role: "Design systems lead",
            summary: "A token-based component library shared by four product teams.",
            challenge: "Inconsistent UI and slow design-to-code handoff.",
            approach: "Defined tokens, built accessible components and documented contribution rules.",
            outcome: "120 components, WCAG AA, and 60% faster handoff.",
            technologies: ["React", "TypeScript", "Storybook", "Figma Tokens"],
            links: [{ label: "Storybook", url: "https://example.com/storybook" }],
          },
        ],
      },
    },
    {
      id: "experience",
      kind: "experience",
      label: "Experience",
      title: "My Experience",
      summary:
        "I have one year of hands-on industry experience at well reputed company in Sri Lanka as 6 month Intern and 6 month Consultant. I mainly worked in Data and AI team, building AI and data solutions based on customer requirements.",
      position: { x: 500, y: 500 },
      metrics: [
        { value: "3", label: "Production-Level Projects" },
        { value: "3", label: "POC Level Projects" },
        { value: "1", label: "Certifications Earned" },
      ],
      links: [],
      details: [
        {
          id: "experience-1",
          label: "Internship",
          title: "Internship at H One (pvt) Ltd",
          kind: "internship",
          venue: "H One (pvt) Ltd, Colombo, Sri Lanka",
          year: 2025,
          summary: "Worked as an Intern in Data and AI team, mainly worked on building POC level AI and data solutions based on customer requirements.",
        },
        {
          id: "experience-2",
          label: "Consultancy",
          title: "Consultancy at H One (pvt) Ltd",
          kind: "consultancy",
          venue: "H One (pvt) Ltd, Colombo, Sri Lanka",
          year: 2026,
          summary: "Worked as an Intern in Data and AI team, mainly worked on building AI and data solutions based on customer requirements.",
        },
      ],
    },
    {
      id: "publication",
      kind: "publication",
      label: "Publication",
      title: "My Publication",
      summary:
        "My pubications are mainly focused on computation social science with agent based technology.",
      position: { x: 360, y: 500 },
      metrics: [
        { value: "1", label: "Publications" },
        { value: "1", label: "Awards" },
      ],
      links: [],
      details: [
       {
          id: "publication-1",
          label: "CSSA 2026 - Publication",
          title: "An Agent-Based Model of Social Media Trust Dynamics, Organizational Reputation Evolution and Network-Driven Donation Fulfillment in Disaster Response",
          kind: "publication",
          venue: "CSSA 2026, Santa Fe, New Mexico, USA",
          year: 2026,
          summary: "This paper presents an agent-based model to understand the dynamics of social media trust, organizational reputation, and network-driven donation fulfillment in disaster response scenarios inspired by ditwah cyclone affected in Sri Lanka in November 2026 .",
          awards: ["EPISTEMIX Social Science Impact Award "],
          url: "#",
        },
      ]
    },
    {
      id: "contact",
      kind: "contact",
      label: "Contact",
      title: "Let’s work together",
      summary:
        "Open to full-time AI / ML / Agentic roles. hevinduharshana@gmail.com· Behance · LinkedIn · Dribbble.",
      position: { x: -100, y: 150 },
      metrics: [
        { value: "Open", label: "to work" },
        { value: "LinkedIn", label: "Hevindu Tilakasena" },
        { value: "Github", label: "Hevb890" },
      ],
      links: [],
    },
  ],
  satellites: [
    { label: "Research", parentId: "process", offset: { x: -140, y: 120 }, step: 1 },
    { label: "Define", parentId: "process", offset: { x: -60, y: 170 }, step: 2 },
    { label: "Ideate", parentId: "process", offset: { x: 60, y: 170 }, step: 3 },
    { label: "Prototype", parentId: "process", offset: { x: 140, y: 110 }, step: 4 },
    { label: "Test", parentId: "process", offset: { x: 150, y: 0 }, step: 5 },
  ],
};
