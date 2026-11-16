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
      kind: "projects",
      label: "Projects",
      title: "My Projects",
      summary:
        "A repeatable loop: understand people, frame the problem, explore, prototype, then test and refine.",
      position: { x: 660, y: 500 },
      metrics: [
        { value: "5", label: "stages" },
        { value: "Weekly", label: "user tests" },
        { value: "Data +", label: "empathy" },
      ],
      links: ["case-onboarding", "case-dashboard"],
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
      id: "case-onboarding",
      kind: "case",
      label: "Case 01",
      title: "Fintech onboarding",
      summary:
        "Redesigned sign-up and KYC for a mobile wallet: nine steps down to four, with every error state rewritten.",
      position: { x: 1040, y: 260 },
      metrics: [
        { value: "+38%", label: "activation" },
        { value: "−24%", label: "drop-off" },
        { value: "10 wks", label: "timeline" },
      ],
      links: ["case-system"],
      caseArt: "mobile",
      project: {
        role: "Lead UX Designer",
        team: "2 designers · 4 engineers · 1 PM",
        duration: "10 weeks",
        challenge: "Nine sign-up and KYC steps caused most new users to quit before their account was activated.",
        solution:
          "Cut the flow to four steps, moved ID upload behind progressive disclosure, and rewrote every error state with a clear recovery action.",
        highlights: [
          "Task-based usability tests with 18 participants",
          "Prototype refined over three test rounds",
          "Error-message library reused in five other flows",
        ],
        technologies: ["Figma", "FigJam", "Maze", "Lottie", "React Native", "Storybook", "Mixpanel", "Notion"],
      },
    },
    {
      id: "case-dashboard",
      kind: "case",
      label: "Case 02",
      title: "Clinic dashboard",
      summary:
        "A scheduling dashboard for clinic staff. After shadowing 14 users, the most common task went down to two clicks.",
      position: { x: 1100, y: 650 },
      metrics: [
        { value: "−52%", label: "task time" },
        { value: "14", label: "interviews" },
        { value: "8 wks", label: "timeline" },
      ],
      links: ["case-system"],
      badge: "−52%",
      caseArt: "dashboard",
    },
    {
      id: "case-system",
      kind: "case",
      label: "Case 03",
      title: "Design system",
      summary:
        "A token-based component library with documentation, accessibility checks and a contribution workflow.",
      position: { x: 1440, y: 440 },
      metrics: [
        { value: "120", label: "components" },
        { value: "−60%", label: "handoff time" },
        { value: "AA", label: "WCAG" },
      ],
      links: [],
      badge: "−60%",
      caseArt: "system",
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
