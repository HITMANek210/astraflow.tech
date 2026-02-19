export const translations = {
  // Navigation
  nav: {
    about: "About",
    services: "Services",
    process: "Process",
    portfolio: "Portfolio",
    contact: "Contact",
    bookCall: "Book a Free Call",
  },

  // Hero Section
  hero: {
    title: "Filip Wyrembak",
    subtitle: "Security Analyst at ING | I Help Build Brands That Stand Out",
    description: "Building brands that get noticed and drive results with clear messaging and real stories.",
    bookCall: "Book a Free Call",
    viewProcess: "View My Process",
    scrollToNext: "Scroll to next section",
  },

  // About Section
  about: {
    title: "Why Work With Me",
    description: "I bring a unique combination of analytical rigor and creative thinking to help you build a personal brand that stands out.",
    differentiators: {
      clearFocus: {
        title: "Clear Focus",
        description: "I combine analytical thinking from security work with creative brand building to achieve concrete, measurable outcomes.",
      },
      actionOriented: {
        title: "Action-Oriented",
        description: "No fluff - just practical solutions you can implement right away to build trust and credibility.",
      },
      authenticApproach: {
        title: "Authentic Approach",
        description: "Your brand should reflect who you truly are. I help you tell your story in a way that resonates and builds trust.",
      },
      provenResults: {
        title: "Proven Results",
        description: "Results you can see - not in slide decks, but in real numbers. Every project I take on has a measurable goal: more clients, better visibility, a stronger brand.",
      },
    },
  },

  // Services Section
  services: {
    title: "What I Offer",
    items: {
      brandBuilding: {
        name: "Brand Building",
        description: "Define your unique value and market position with clarity and confidence.",
      },
      contentAuthority: {
        name: "Content & Trust",
        description: "Build trust with content that speaks to the right people.",
      },
      onlinePresence: {
        name: "Online Presence",
        description: "Build and grow your social media presence and website so they work together and tell one clear story.",
      },
      oneOnOne: {
        name: "One-on-One Guidance",
        description: "Personal coaching to refine your messaging and amplify your impact.",
      },
    },
  },

  // Process Section
  process: {
    title: "How It Works (3 Steps)",
    steps: {
      discovery: {
        number: "01",
        title: "Discovery",
        description: "We dig into your goals, audience, and current messaging to find what truly sets you apart.",
      },
      strategy: {
        number: "02",
        title: "Strategy",
        description: "I put together a simple plan with clear milestones and next steps.",
      },
      execution: {
        number: "03",
        title: "Execution",
        description: "We implement together, refining as results come in and adjusting course to maximize impact.",
      },
    },
  },

  // Portfolio Section
  portfolio: {
    title: "What It Looks Like in Practice",
    subtitle: "Results, not promises.",
    caseStudy: "Case Study",
    nutritionist: {
      title: "The Nutritionist Platform",
      client: "Client",
      clientName: "Private Nutrition Practice",
      goal: "The Challenge",
        goalDescription: "Every diet was built by hand. Every client was managed one by one. The practice had hit a ceiling - the only way to grow was a system that could work without her.",
      before: "Before",
      after: "After",
      solution: "The Solution",
      solutionDescription: "Instead of patching existing tools, I built a system tailored to exactly how the nutritionist works and wants to grow.",
      result: "The Results",
      beforeItems: {
        manualCalculations: "Every diet calculated by hand - hours of work per patient",
        limitedCapacity: "Admin overhead capping capacity at a few dozen patients",
        noScalability: "Trading time for money with no path to growth",
        bottlenecked: "No system working when the nutritionist wasn't",
      },
      afterItems: {
        digitalAuthority: "An automated system serving more than 200 patients at once",
        algorithmicEngine: "Algorithm generates precise diets in seconds",
        platformUSP: "The platform became the main differentiator of the brand",
        leadMagnet: "Clients find and stay because of the system - not ads",
      },
      solutionItems: {
        algorithmicEngine: {
          title: "Algorithmic Engine",
          description: "Calorie and macro calculator generating precise patient diets in seconds",
        },
        patientPanel: {
          title: "Patient Panel",
          description: "Intuitive progress-tracking interface - fewer questions, less churn, more engagement",
        },
        brandInfrastructure: {
          title: "Brand Infrastructure",
          description: "Technology as the core differentiator that sets this nutritionist apart from every competitor",
        },
      },
      results: {
        activeUsers: "Active Patients",
        activeUsersDesc: "Onboarded and managed in the system",
        timeReduction: "Time Saved",
        timeReductionDesc: "Manual calculations eliminated",
        scalability: "Capacity",
        scalabilityDesc: "No limit on concurrent patients",
      },
      cta: "Want something like this for your brand?",
    },
  },

  // Credentials Section
  credentials: {
    greeting: "Hello",
    description1: "I'm Filip Wyrembak, a Security Analyst at ING, where I work daily to protect digital systems and infrastructure. Beyond security work, I help people build personal brands that stand out and create opportunities. I focus on clear thinking, clear messaging, and real stories.",
    description2: "I've worked with founders, executives, and experts across industries, helping them clarify their message, strengthen their voice, and build credibility that supports business results.",
    description3: "Every brand is unique, and so is every approach. Let's build yours together!",
    bookCall: "Book a Free Call",
    stats: {
      activeUsers: "Active Platform Users",
      timeReduction: "Time Reduction",
      clientResults: "Client Results",
    },
  },

  // Final CTA Section
  finalCta: {
    title: "Ready to Turn Your Expertise Into a Strong Reputation?",
    bookCall: "Book a Free Call",
    description: "Free 30-minute consultation. No strings attached.",
  },

  // Contact Page
  contact: {
    title: "Let's Build Your Brand Together",
    description: "Book a free 30-minute call to talk through your goals and explore how I can help. No pitch, no pressure - just an honest conversation about your brand.",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your.email@example.com",
      companyTitle: "Company/Title",
      companyTitleOptional: "(optional)",
      companyTitlePlaceholder: "Your company or job title",
      challenge: "What's your biggest branding challenge?",
      challengeOptional: "(optional)",
      challengePlaceholder: "Select an option...",
      challengeOptions: {
        visibility: "Growing my visibility",
        messaging: "Sharpening my message",
        credibility: "Building credibility",
        other: "Other",
      },
      message: "Message",
      messagePlaceholder: "Tell me about your project or question...",
      send: "Send Message",
      sending: "Sending...",
      success: "Thank you! Your message has been sent. I'll get back to you soon.",
      error: "Something went wrong. Please try again or reach out via email.",
      reachOut: "Or reach out directly:",
    },
  },

  // Footer
  footer: {
    builtBy: "Built by: Filip Wyrembak",
    copyright: "All rights reserved.",
  },

  // Common
  common: {
    selectOption: "Select an option...",
  },
};

export type Translations = typeof translations;
