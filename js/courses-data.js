/* ==========================================================================
   COURSES DATA — edit content here, never in the layout files.
   Each course powers course.html?course=<slug>
   Image placeholders: drop real JPGs at the paths below and they
   automatically replace the placeholder boxes.
   ========================================================================== */

const WHATSAPP = "2349058177116";
const EMAIL = "info@ignistech.org";

const COURSES = {
  "web-development": {
    title: "Web Development",
    icon: "code",
    tagline: "From your first line of HTML to a deployed, portfolio-ready website.",
    details: {
      duration: "Flexible — learn at your own pace",
      level: "Beginner friendly",
      format: "Live on Google Meet & Microsoft Teams + In-person (Lagos)",
      outcome: "3 portfolio projects + certificate",
    },
    roadmap: [
      {
        title: "Web Foundations",
        bullets: [
          "HTML structure and semantic tags",
          "CSS styling, colors and typography",
          "The box model and positioning",
          "Building your first static page",
        ],
      },
      {
        title: "Responsive & Modern CSS",
        bullets: [
          "Flexbox layouts",
          "CSS Grid",
          "Mobile-first responsive design",
          "Tailwind CSS & Bootstrap",
          "Animations and transitions",
        ],
      },
      {
        title: "JavaScript Essentials",
        bullets: [
          "Variables, functions and logic",
          "DOM manipulation",
          "Events and interactivity",
          "Mini projects: calculator, to-do app",
        ],
      },
      {
        title: "Building Real Projects",
        bullets: [
          "Planning a multi-page website",
          "Working with forms",
          "Git & GitHub version control",
          "Deploying to the web (Netlify / Vercel)",
        ],
      },
      {
        title: "Portfolio & Next Steps",
        bullets: [
          "Polishing your 3 best projects",
          "Introduction to React & modern frameworks",
          "Setting up your GitHub profile",
          "Freelance and employment pathways",
        ],
      },
    ],
    buildDesc:
      "A complete multi-page portfolio website with a working contact form — live on the internet and ready to show clients or employers.",
    images: {
      hero: "assets/courses/web-development-hero.jpg",
      build: "assets/courses/web-development-build.jpg",
      classroom: "assets/courses/web-development-classroom.jpg",
    },
  },

  wordpress: {
    title: "WordPress",
    icon: "layout-template",
    tagline: "Launch professional websites without writing a line of code.",
    details: {
      duration: "Flexible — learn at your own pace",
      level: "Beginner friendly",
      format: "Live on Google Meet & Microsoft Teams + In-person (Lagos)",
      outcome: "1 live business website + certificate",
    },
    roadmap: [
      {
        title: "WordPress Basics",
        bullets: [
          "Hosting, domains and how they connect",
          "Installing WordPress",
          "The dashboard tour",
          "Users, settings and security basics",
        ],
      },
      {
        title: "Themes & Design",
        bullets: [
          "Choosing and installing themes",
          "The Customizer and theme options",
          "Building pages with Elementor",
          "Responsive editing for mobile",
        ],
      },
      {
        title: "Content & Functionality",
        bullets: [
          "Pages, posts and menus",
          "Essential plugins",
          "Contact forms",
          "SEO fundamentals",
        ],
      },
      {
        title: "Launch & Maintain",
        bullets: [
          "Speed and security optimization",
          "Backups and updates",
          "Launching the live site",
          "Maintenance and handoff",
        ],
      },
    ],
    buildDesc:
      "A complete business website for a real or sample client — mobile-ready, SEO-friendly and live on a real domain.",
    images: {
      hero: "assets/courses/wordpress-hero.jpg",
      build: "assets/courses/wordpress-build.jpg",
      classroom: "assets/courses/wordpress-classroom.jpg",
    },
  },

  "ai-automation": {
    title: "AI & Automation",
    icon: "cpu",
    tagline: "Master the AI tools shaping the future of work.",
    details: {
      duration: "Flexible — learn at your own pace",
      level: "Beginner – Intermediate",
      format: "Live on Google Meet & Microsoft Teams + In-person (Lagos)",
      outcome: "AI workflow toolkit + capstone project",
    },
    roadmap: [
      {
        title: "AI Foundations",
        bullets: [
          "How AI and large language models work",
          "What AI can and cannot do",
          "Safety, ethics and good habits",
          "Choosing the right tool for the task",
        ],
      },
      {
        title: "Prompt Engineering",
        bullets: [
          "Writing structured, effective prompts",
          "Iterating and refining outputs",
          "ChatGPT, Claude and Gemini in practice",
          "Real-world prompt workflows",
        ],
      },
      {
        title: "AI for Business",
        bullets: [
          "Content creation and copywriting",
          "Research and summarizing",
          "Data analysis with AI",
          "Documents and presentations",
        ],
      },
      {
        title: "Visual & Creative AI",
        bullets: [
          "Midjourney and image generation basics",
          "Editing and refining AI images",
          "Creating branding assets",
          "Copyright and usage rules",
        ],
      },
      {
        title: "Automation",
        bullets: [
          "Workflow tools: Zapier and Make",
          "Connecting apps and automating tasks",
          "AI + web development basics",
          "Capstone: build a real automation",
        ],
      },
    ],
    buildDesc:
      "Your own AI workflow toolkit plus a working automation that saves you (or a client) hours every week.",
    images: {
      hero: "assets/courses/ai-automation-hero.jpg",
      build: "assets/courses/ai-automation-build.jpg",
      classroom: "assets/courses/ai-automation-classroom.jpg",
    },
  },

  "e-commerce": {
    title: "E-Commerce",
    icon: "shopping-cart",
    tagline: "Start and grow an online store that actually sells.",
    details: {
      duration: "Flexible — learn at your own pace",
      level: "Beginner friendly",
      format: "Live on Google Meet & Microsoft Teams + In-person (Lagos)",
      outcome: "A live online store + marketing plan",
    },
    roadmap: [
      {
        title: "E-Commerce Foundations",
        bullets: [
          "Online business models explained",
          "Choosing what to sell",
          "Store platforms compared",
          "Payments and logistics in Nigeria",
        ],
      },
      {
        title: "Building Your Store",
        bullets: [
          "Shopify / WooCommerce setup",
          "Product pages that convert",
          "Payments with Paystack / Flutterwave",
          "Shipping and delivery options",
        ],
      },
      {
        title: "Product Photography & Content",
        bullets: [
          "Phone photography basics",
          "Editing product photos",
          "Writing descriptions that sell",
          "Pricing strategy",
        ],
      },
      {
        title: "Marketing Your Store",
        bullets: [
          "Social media selling",
          "Selling on WhatsApp Business",
          "Ads basics",
          "Email and repeat customers",
        ],
      },
      {
        title: "Operations & Growth",
        bullets: [
          "Order management",
          "Customer service that retains",
          "Reading your analytics",
          "Scaling what works",
        ],
      },
    ],
    buildDesc:
      "A live online store with real products, working payments, and your first marketing campaign ready to run.",
    images: {
      hero: "assets/courses/e-commerce-hero.jpg",
      build: "assets/courses/e-commerce-build.jpg",
      classroom: "assets/courses/e-commerce-classroom.jpg",
    },
  },
};
