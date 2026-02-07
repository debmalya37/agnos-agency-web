// lib/servicesData.ts

export const SERVICES_DATA: Record<string, any> = {
  "web-development": {
    title: "Web Development",
    hero: {
      headline: "High-Performance Websites Built To Convert Visitors Into Enquiries",
      subheadline: "We design and build custom websites focused on speed, SEO, and conversion rates. Stop losing customers to slow, ugly sites.",
      cta: "Book a Private Website Consultation",
      trustText: "Trusted by serious founders across India & UK"
    },
    showcase: {
      title: "Websites That Instantly Signal Trust & Status",
      subtitle: "The world treats you differently when you look the part.",
      images: [
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80", // Desktop mockup
        "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&q=80"  // Mobile mockup
      ]
    },
    painPoint: {
      title: "Most Websites Look Fine But Don't Sell",
      points: [
        "Generic templates that look cheap",
        "Slow loading times killing SEO",
        "Confusing navigation that loses leads",
        "No clear call-to-action strategy"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    features: [
      { title: "Design", desc: "Premium UI/UX that aligns with your brand identity." },
      { title: "Build", desc: "Clean, scalable code using Next.js and Tailwind." },
      { title: "Strategy", desc: "Conversion-focused layouts to maximize ROI." }
    ],
    audience: {
      forYou: ["You value brand perception", "You want higher conversion rates", "You are ready to scale"],
      notForYou: ["You want a $50 template", "You don't care about mobile users", "You want a quick fix"]
    }
  },

  "marketing": {
    title: "Performance Marketing",
    hero: {
      headline: "Data-Driven Marketing That Floods Your Calendar With Qualified Leads",
      subheadline: "Stop burning cash on ads that don't work. We build predictable revenue engines using Meta, Google, and LinkedIn ads.",
      cta: "Get Your Free Marketing Audit",
      trustText: "Generating 10k+ leads for clients annually"
    },
    showcase: {
      title: "Campaigns That Dominate The Feed",
      subtitle: "Stop the scroll with creative that demands attention.",
      images: [
        "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80", 
        "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&q=80"
      ]
    },
    painPoint: {
      title: "Why Most Ad Campaigns Fail",
      points: [
        "Targeting the wrong audience",
        "Weak ad creatives with no hook",
        "Landing pages that don't convert",
        "Focusing on vanity metrics like 'Likes'"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    features: [
      { title: "Paid Ads", desc: "Meta & Google campaigns optimized for ROAS." },
      { title: "Content", desc: "High-impact visuals and copy that sells." },
      { title: "Analytics", desc: "Deep tracking to know exactly where money goes." }
    ],
    audience: {
      forYou: ["You have a proven product", "You want predictable growth", "You have a marketing budget"],
      notForYou: ["You don't have product-market fit", "You want viral fame overnight", "You refuse to test new angles"]
    }
  },

  "technology-saas": {
    title: "SaaS Product Development",
    hero: {
      headline: "Scalable SaaS Architectures Built For Millions of Users",
      subheadline: "From MVP to Enterprise Scale. We engineer robust cloud-native applications that are secure, fast, and maintainable.",
      cta: "Discuss Your Product Architecture",
      trustText: "Powering startups funded by top VCs"
    },
    showcase: {
      title: "Software That Feels Like Magic",
      subtitle: "Seamless performance, intuitive dashboards, and rock-solid uptime.",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
      ]
    },
    painPoint: {
      title: "Technical Debt Kills Startups",
      points: [
        "Spaghetti code that can't scale",
        "Security vulnerabilities leaking data",
        "Slow feature rollout due to bad architecture",
        "Developer turnover due to messy codebase"
      ],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
    },
    features: [
      { title: "Architecture", desc: "Microservices or Monoliths designed for your stage." },
      { title: "DevOps", desc: "CI/CD pipelines and automated testing." },
      { title: "Security", desc: "Enterprise-grade data protection and compliance." }
    ],
    audience: {
      forYou: ["You are building a complex platform", "You need high reliability", "You are planning to raise funding"],
      notForYou: ["You just need a simple brochure site", "You use no-code tools only", "You don't prioritize security"]
    }
  }
};