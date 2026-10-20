import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  Router as WouterRouter,
} from "wouter";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Bot,
  Boxes,
  Building2,
  Code2,
  GraduationCap,
  Hotel,
  Menu,
  MessageSquareText,
  PenTool,
  ShoppingBasket,
  Sparkles,
  Workflow,
  X,
  Zap,
  Globe2,
  HeartPulse,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    desc: "Business applications, internal management systems, custom dashboards and web applications built around your workflows.",
  },
  {
    icon: Bot,
    title: "AI Solutions and Integration",
    desc: "AI-powered assistants, natural-language experiences and integrations that bring useful AI into existing processes.",
  },
  {
    icon: Workflow,
    title: "Business Process Automation",
    desc: "Workflow automation, API integrations and data synchronization to reduce repetitive manual work.",
  },
  {
    icon: Boxes,
    title: "Management Systems",
    desc: "Industry-specific tools for hospitality, education, retail and the operational work between them.",
  },
  {
    icon: ShoppingBasket,
    title: "E-commerce and Digital Commerce",
    desc: "Online storefronts, product catalog experiences, ordering and business-specific sales workflows.",
  },
  {
    icon: PenTool,
    title: "Digital Experience and Creative Services",
    desc: "Website design and development, UI/UX, digital content and creative support for a clearer online presence.",
  },
];
const industries = [
  {
    icon: Hotel,
    title: "Hospitality & Hotels",
    text: "Streamline room, reservation, billing and day-to-day operational workflows.",
  },
  {
    icon: GraduationCap,
    title: "Education & Schools",
    text: "Organize student information, attendance, administration and reporting.",
  },
  {
    icon: ShoppingBasket,
    title: "Retail & Commerce",
    text: "Simplify product, inventory, sales and order workflows.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Operations",
    text: "Explore administrative and inventory workflows, shaped around requirements and applicable privacy obligations.",
  },
  {
    icon: Building2,
    title: "General Business Operations",
    text: "Connect systems, automate repetitive tasks and improve visibility into operations.",
  },
];
type Project = {
  slug: string;
  title: string;
  category: string;
  status: string;
  description: string;
  href: string;
  detail: string;
  filter: string;
  planned?: boolean;
  external?: boolean;
};
const projects: Project[] = [
  {
    slug: "highfly-hospitality",
    title: "HighFly Hospitality",
    category: "Hospitality Technology / Hotel Management",
    status: "In development",
    filter: "Hospitality",
    href: "https://github.com/faizan102418/highfly-hospitality.git",
    description:
      "A cloud-first, multi-tenant hotel PMS foundation for rooms and statuses, guests, reservations, front-desk check-in/out and transfers, folios, billing and payments, housekeeping, and audit logging.",
    detail:
      "A cloud-first, multi-tenant hotel property management system foundation. The repository describes room and status management, guest records, reservations, front-desk check-in/out and transfers, folios, billing and payments, housekeeping workflows, and audit logging. This project is in development and is not presented as a live deployment.",
  },
  {
    slug: "centralized-student-information-system",
    title: "Centralized Student Information System",
    category: "Education Technology / AI Application",
    status: "Academic project / prototype",
    filter: "Education",
    href: "https://github.com/faizan102418/Centralized-Student-Information-system.git",
    description:
      "An academic RAG student-record chatbot using MySQL, Chroma, Hugging Face embeddings, Groq and Streamlit. The README describes role-based account types.",
    detail:
      "An academic project prototype that combines student records with a retrieval-augmented generation chatbot. Its described stack includes MySQL, Chroma, Hugging Face embeddings, Groq and a Streamlit interface. The repository README describes role-based account types. No particular privacy, security or answer-accuracy guarantees are implied.",
  },
  {
    slug: "baba-store",
    title: "Baba Store",
    category: "Retail / Commerce",
    status: "Repository project",
    filter: "Retail",
    href: "https://github.com/faizan102418/Baba_Store.git",
    description:
      "An English/Urdu grocery POS and shop-ledger project covering inventory, sales, customer and supplier credit tracking, and reporting.",
    detail:
      "A repository project for an English/Urdu grocery point-of-sale and shop ledger. Described areas include inventory, sales, customer and supplier credit tracking, and reporting. This is presented as a project repository, not as a verified commercial deployment.",
  },
  {
    slug: "google-ai-studio-prototype",
    title: "Google AI Studio app prototype",
    category: "Artificial Intelligence / Application Prototype",
    status: "Prototype",
    filter: "AI",
    href: "https://ai.studio/apps/4bf20ca4-25f0-4eed-8765-de6070370213",
    description:
      "An application prototype created in Google AI Studio. Its specific functionality has not been verified, so no further feature claims are made.",
    detail:
      "An application prototype created using Google AI Studio. Its specific functionality could not be verified, so this listing intentionally stays neutral.",
    external: true,
  },
  {
    slug: "school-management-system",
    title: "School Management System",
    category: "Education Technology / Planned Client Solution",
    status: "Planned Solution",
    filter: "Education",
    href: "/contact",
    planned: true,
    description:
      "A proposed school platform. Requirements and final scope are to be defined with the client; possible areas are proposals, not implemented features.",
    detail:
      "A planned client solution. Requirements are to be finalized with the client. Possible areas for discussion include student and teacher records, attendance, examinations and timetables, fees, role-based dashboards, and parent/student communication. These are proposed capabilities, not implemented features.",
  },
];
type TeamMember = {
  name: string;
  role: string;
  subtitle?: string;
  description: string;
  image?: string;
  initials?: string;
  links: { label: string; href: string; external?: boolean }[];
};
const teamMembers: TeamMember[] = [
  {
    name: "Imran Khan",
    role: "Chief Executive Officer",
    description: "Chief Executive Officer and principal investor driving the strategic growth and overarching vision of HighFly AI. Imran Khan combines executive leadership with capital backing to support next-generation software development, ensuring our technology, infrastructure, and market strategies align for long-term global success.",
    image: "/team/imran-khan.jpeg",
    links: [
      { label: "Email", href: "mailto:anfalimran61@gmail.com" },
      { label: "WhatsApp", href: "https://wa.me/923319024014", external: true },
    ],
  },
  {
    name: "Muhammad Faizan Sajid",
    role: "Chief Technology Officer (CTO)",
    description: "Co-Founder & CTO driving the core architecture, cloud infrastructure, and AI capabilities of our platforms. Muhammad Faizan Sajid specializes in building highly scalable backend systems and seamless DevOps pipelines, turning complex technical challenges into robust, production-ready software solutions.",
    image: "/team/faizan-sajid.jpeg",
    links: [
      { label: "Email", href: "mailto:m.faizansajid102418@gmail.com" },
      { label: "WhatsApp", href: "https://wa.me/923091995456", external: true },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/faizan102418/",
        external: true,
      },
      {
        label: "Website",
        href: "https://faizan-sajid.vercel.app/",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/faizan102418",
        external: true,
      },
    ],
  },
  {
    name: "Muhammad Shayan Sajid",
    role: "Chief Marketing Officer (CMO)",
    description: "Co-Founder & CMO driving the growth, digital marketing strategy, and market positioning for our software solutions. Muhammad Shayan Sajid specializes in e-commerce scaling and digital acquisition, helping businesses optimize their online presence and transform traffic into sustainable revenue.",
    image: "/team/shayan-sajid.jpeg",
    links: [
      { label: "Email", href: "mailto:mshayansajid1122@gmail.com" },
      { label: "WhatsApp", href: "https://wa.me/923265790051", external: true },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/shanankhan/",
        external: true,
      },
      {
        label: "Portfolio",
        href: "https://shanan-portfolio.vercel.app/",
        external: true,
      },
    ],
  },
  {
    name: "Salman Sajid",
    role: "Intern — Digital Marketing & Video Editing",
    description: "Supporting digital marketing initiatives and multimedia content creation for our growth strategies. Salman Sajid specializes in video editing and digital marketing execution, producing engaging visual assets that enhance our brand presence and optimize client campaigns for maximum engagement.",
    initials: "SS",
    links: [],
  },
];
const serviceDetails = [
  [
    "Custom Web Application Development",
    "Disconnected tools and manual work can make everyday processes harder to manage.",
    "Purpose-built web applications, management systems and dashboards can bring key workflows into one considered experience.",
    "Internal portals, business applications, customer-facing tools and operational dashboards.",
    "A solution shaped around real workflows can improve clarity, reduce duplicate effort and make information easier to use.",
    "We clarify users and requirements, agree a practical scope, then design, build, test and refine with feedback.",
  ],
  [
    "AI Application Development and Integration",
    "AI can be difficult to apply when a clear use case and fit with existing work are not established.",
    "We explore and develop AI-powered applications or integrate suitable AI capabilities into a broader workflow.",
    "Natural-language interfaces, AI assistants, document and information workflows.",
    "A well-scoped application may make selected information or tasks easier to access and work with.",
    "We identify the use case, data boundaries and integration needs, then prototype, evaluate and refine.",
  ],
  [
    "RAG Systems and Knowledge Assistants",
    "Finding relevant information across a knowledge base can involve repeated searching and context switching.",
    "Retrieval-augmented generation can pair information retrieval with a conversational interface when appropriate to the data and task.",
    "Internal knowledge discovery, document exploration and record-oriented question interfaces.",
    "Potentially more direct access to selected source material, with quality dependent on the content and implementation.",
    "We assess source material, retrieval needs and user expectations before designing and evaluating a fit-for-purpose prototype.",
  ],
  [
    "Workflow and Business Automation",
    "Repetitive handoffs and disconnected systems can consume time and introduce avoidable re-entry.",
    "Automation can connect steps, systems and data through agreed workflows and integrations.",
    "API integrations, data synchronization, notifications and recurring operational tasks.",
    "A tailored workflow may reduce manual repetition and make process steps more visible.",
    "We map the current process, prioritize opportunities, confirm system access and build/test the chosen flow.",
  ],
  [
    "Hospitality and Hotel Management Software",
    "Room, guest, reservation, front-desk and billing work can be spread across separate processes.",
    "Custom hotel management software can coordinate agreed operational workflows in one system.",
    "Room status, guest records, reservations, front desk, folios and housekeeping workflows.",
    "A centralized workflow may help teams coordinate operational information more consistently.",
    "We review property operations, define role and process needs, then scope, build and iterate.",
  ],
  [
    "Education and School Management Systems",
    "Student and administrative information can be difficult to coordinate across everyday school operations.",
    "A management system can organize selected records and processes according to institutional needs.",
    "Student records, attendance, schedules, examinations, fee workflows and communication are possible scope areas.",
    "The right scope can make information and processes more organized for the institution.",
    "We work with stakeholders to confirm requirements, prioritize the first release and validate workflows.",
  ],
  [
    "Retail, Inventory, and Commerce Solutions",
    "Product, stock, sales and credit workflows can be cumbersome to coordinate.",
    "Retail software can bring selected point-of-sale, inventory and ledger processes into a suitable digital workflow.",
    "Inventory tracking, sales, customer/supplier balances and operational reporting.",
    "Purpose-built tools may help teams see and manage key shop information in one place.",
    "We map retail routines and devices, confirm requirements and build a focused, testable solution.",
  ],
  [
    "E-commerce and Business Websites",
    "Customers need a clear way to understand a business, browse offerings or start an order.",
    "Websites and storefronts can present products and services with navigation and workflows matched to the business.",
    "Business websites, online catalogs, storefronts and ordering flows.",
    "A clear digital experience can make offerings easier to explore and provide a useful path to action.",
    "We align content, experience and technical needs, then design, build and refine the site.",
  ],
  [
    "UI/UX and Digital Experience Design",
    "A product can be difficult to use when its structure and interaction patterns do not match user needs.",
    "Research-informed interface design can clarify journeys, information hierarchy and interaction.",
    "Discovery, flows, interface systems, responsive layouts and usability refinement.",
    "More coherent experiences can make digital tools easier to understand and navigate.",
    "We learn the context, map key journeys, prototype and iterate through review.",
  ],
  [
    "Digital Creative and Marketing Support",
    "Digital communications can feel inconsistent when content and visual direction are disconnected.",
    "Creative support can help shape digital content and experiences that align with the organization’s goals.",
    "Website content support, social creative and digital campaign assets.",
    "A consistent presentation can help people understand what the organization offers.",
    "We clarify audience, channels and brand materials, then agree deliverables and a review approach.",
  ],
];
const serviceOptions = [
  "Custom Software Development",
  "AI Application Development",
  "Business Automation",
  "Hospitality Management System",
  "School Management System",
  "Retail or E-commerce Solution",
  "Website Development",
  "UI/UX or Creative Services",
  "Other",
];
const navItems = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Our Work", "/work"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

function Meta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, content: string, property = false) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let tag = document.head.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement("meta");
        property
          ? tag.setAttribute("property", name)
          : tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
  }, [title, description]);
  return null;
}
function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand-link"
          aria-label="HighFly AI home"
          data-testid="link-home-logo"
        >
          <img
            src="/highfly-ai-logo.png"
            alt="HighFly AI — Smarter Business. Higher Possibilities."
          />
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map(([name, path]) => (
            <Link
              key={path}
              href={path}
              aria-current={location === path ? "page" : undefined}
              data-testid={`link-nav-${name.toLowerCase().replaceAll(" ", "-")}`}
            >
              {name}
            </Link>
          ))}
        </nav>
        <Link
          className="button button-primary header-cta"
          href="/contact"
          data-testid="link-header-contact"
        >
          Discuss Your Project <ArrowRight />
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
          data-testid="button-mobile-menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-menu"
          aria-label="Mobile navigation"
        >
          {navItems.map(([name, path]) => (
            <Link
              key={path}
              href={path}
              aria-current={location === path ? "page" : undefined}
              data-testid={`mobile-nav-${name.toLowerCase().replaceAll(" ", "-")}`}
            >
              {name}
            </Link>
          ))}
          <Link
            className="button button-primary"
            href="/contact"
            data-testid="mobile-nav-contact-cta"
          >
            Discuss Your Project <ArrowRight />
          </Link>
        </nav>
      )}
    </header>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" aria-label="HighFly AI home">
              <img
                className="footer-logo"
                src="/highfly-ai-logo.png"
                alt="HighFly AI"
              />
            </Link>
            <p>
              Practical software, AI applications and automation for the work
              businesses do every day.
            </p>
            <div className="footer-contact-links">
              <a href="mailto:m.faizansajid102418@gmail.com">
                m.faizansajid102418@gmail.com
              </a>
              <a href="tel:+923091995456">+92 309 1995456</a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            {navItems.slice(1).map(([n, p]) => (
              <Link key={p} href={p}>
                {n}
              </Link>
            ))}
            <Link href="/privacy">Privacy Policy</Link>
          </div>
          <div className="footer-column">
            <h3>Capabilities</h3>
            <Link href="/services">Custom software</Link>
            <Link href="/services">AI applications</Link>
            <Link href="/services">Business automation</Link>
            <Link href="/services">Management systems</Link>
          </div>
          <div className="footer-column">
            <h3>Selected work</h3>
            {projects.slice(0, 4).map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`}>
                {p.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} HighFly AI. All rights reserved.
          </span>
          <span>Smarter Business. Higher Possibilities.</span>
        </div>
      </div>
    </footer>
  );
}
function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}
function PageHero({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="inner-hero">
      <div className="container">
        <Eyebrow>{label}</Eyebrow>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
function SectionHead({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <Eyebrow>{label}</Eyebrow>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
function ProjectArtwork({ index }: { index: number }) {
  return (
    <div
      className={`project-art art-${index}`}
      aria-label="Illustrative visual, not a screenshot of the project"
    >
      <div className="project-art-inner">
        <div className="mock-top">
          <b className="mock-brand" />
          <span className="mock-dots">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="mock-bars">
          <i style={{ height: "48%" }} />
          <i style={{ height: "76%" }} />
          <i style={{ height: "59%" }} />
          <i style={{ height: "91%" }} />
          <i style={{ height: "67%" }} />
          <i style={{ height: "82%" }} />
        </div>
      </div>
      <span className="illustrative">
        ILLUSTRATIVE VISUAL · NOT A PRODUCT SCREENSHOT
      </span>
    </div>
  );
}
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const href = project.planned
    ? "/work/school-management-system"
    : `/work/${project.slug}`;
  return (
    <article
      className="project-card"
      data-testid={`card-project-${project.slug}`}
    >
      <ProjectArtwork index={index} />
      <div className="project-card-body">
        <span className="project-kicker">{project.category}</span>
        <h3>{project.title}</h3>
        <span className={`status ${project.planned ? "planned" : ""}`}>
          {project.status}
        </span>
        <p>{project.description}</p>
        <div className="project-footer">
          <Link
            className="text-link"
            href={href}
            data-testid={`link-project-${project.slug}`}
          >
            {project.planned ? "Discuss a similar solution" : "Project details"}{" "}
            <ArrowRight />
          </Link>
          {project.external && (
            <a
              className="text-link"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Google AI Studio app in a new tab"
            >
              Open app <ArrowDownRight />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
function HomePage() {
  return (
    <Layout>
      <Meta
        title="HighFly AI | Smarter Business. Higher Possibilities."
        description="Custom software, AI applications and business automation for practical challenges across hospitality, education, retail and business operations."
      />
      <main>
        <section className="hero">
          <div className="hero-grid" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <Eyebrow>Practical technology. Real business needs.</Eyebrow>
              <h1>
                Build Smarter.
                <br />
                Automate More.
                <br />
                <span>Grow Faster.</span>
              </h1>
              <p>
                From custom software and AI-powered applications to business
                automation, HighFly AI helps turn complex challenges into
                practical digital solutions.
              </p>
              <div className="hero-actions">
                <Link
                  className="button button-primary"
                  href="/contact"
                  data-testid="link-hero-contact"
                >
                  Discuss Your Project <ArrowRight />
                </Link>
                <Link
                  className="button button-outline"
                  href="/work"
                  data-testid="link-hero-work"
                >
                  Explore Our Work <ArrowRight />
                </Link>
              </div>
              <div className="capability-line">
                CUSTOM SOFTWARE · ARTIFICIAL INTELLIGENCE · BUSINESS AUTOMATION
                · DIGITAL SOLUTIONS
              </div>
            </div>
            <div
              className="hero-art"
              aria-label="Abstract visual illustrating connected business technology"
            >
              <div className="orbit">
                <span className="orbit-dot" />
              </div>
              <div className="hero-mark">
                <div className="hero-core">
                  <Sparkles />
                </div>
                <span className="hero-coordinate">HF / 01</span>
              </div>
              <div className="hero-note note-a">
                <Code2 />
                <span>
                  Built around your work
                  <span className="note-label">SOFTWARE THAT FITS</span>
                </span>
              </div>
              <div className="hero-note note-b">
                <Zap />
                <span>
                  Useful by design
                  <span className="note-label">AI WITH A PURPOSE</span>
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="section services-preview">
          <div className="container">
            <SectionHead
              label="What we do"
              title="Technology Solutions Built Around Your Business"
              description="We combine thoughtful design, practical engineering, and intelligent technology to build solutions around your goals."
            />
            <div className="service-grid">
              {services.map((s) => (
                <article className="service-card" key={s.title}>
                  <div className="icon-box">
                    <s.icon />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Link className="text-link" href="/services">
                    Explore service <ArrowRight />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section industry-section">
          <div className="container">
            <SectionHead
              label="Where we help"
              title="Solutions for Real-World Business Challenges"
              description="Digital systems are most useful when they start with the way people actually work. We explore solutions across industries and operational teams."
            />
            <div className="industry-grid">
              {industries.map((i) => (
                <article className="industry-card" key={i.title}>
                  <i.icon />
                  <h3>{i.title}</h3>
                  <p>{i.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section projects-section">
          <div className="container">
            <SectionHead
              label="Selected work"
              title="Selected Work and Digital Solutions"
              description="Explore projects that demonstrate our approach to software, AI, and practical business problem-solving."
            />
            <div className="project-grid">
              {projects.slice(0, 3).map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <Link className="button button-ghost" href="/work">
                Explore all work <ArrowRight />
              </Link>
            </div>
          </div>
        </section>
        <section className="section why-section">
          <div className="container">
            <SectionHead
              label="Why HighFly AI"
              title="Technology That Solves Practical Problems"
              description="Useful technology starts with understanding the context it needs to serve."
            />
            <div className="values-grid">
              {[
                [
                  "01",
                  "Business-First Thinking",
                  "We begin by understanding your goals, constraints, and day-to-day challenges.",
                ],
                [
                  "02",
                  "Tailored Development",
                  "We design solutions around your workflows rather than forcing your business into a generic template.",
                ],
                [
                  "03",
                  "Practical AI Adoption",
                  "We focus on AI applications that have a clear use case and fit the needs of the business.",
                ],
                [
                  "04",
                  "Long-Term Collaboration",
                  "We aim to build maintainable solutions and work collaboratively as requirements evolve.",
                ],
              ].map((v) => (
                <article className="value" key={v[0]}>
                  <span className="value-num">{v[0]} / PRINCIPLE</span>
                  <h3>{v[1]}</h3>
                  <p>{v[2]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section process-section">
          <div className="container">
            <SectionHead
              label="A thoughtful process"
              title="From Idea to Working Solution"
              description="A clear path from understanding the challenge to refining a useful solution."
            />
            <div className="process-grid">
              {[
                [
                  "01",
                  "Discover",
                  "Understand the business, user needs, challenges, and desired outcomes.",
                ],
                [
                  "02",
                  "Plan",
                  "Define requirements, priorities, scope, technical approach, and delivery milestones.",
                ],
                [
                  "03",
                  "Build",
                  "Design, develop, test, and refine the solution through feedback.",
                ],
                [
                  "04",
                  "Improve",
                  "Support agreed improvements, maintenance, and future enhancements.",
                ],
              ].map((p) => (
                <article className="process-step" key={p[0]}>
                  <span className="step-marker">{p[0]}</span>
                  <h3>{p[1]}</h3>
                  <p>{p[2]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <CallToAction />
      </main>
    </Layout>
  );
}
function CallToAction() {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <Eyebrow>Start with the challenge</Eyebrow>
          <h2>Have an Idea? Let’s Build It.</h2>
          <p>
            Tell us what you’re trying to solve. We’ll discuss your requirements
            and explore a suitable digital solution.
          </p>
        </div>
        <div className="cta-actions">
          <Link className="button button-primary" href="/contact">
            Discuss Your Project <ArrowRight />
          </Link>
          <Link className="button button-ghost" href="/services">
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
function TeamSection() {
  return (
    <section className="team-section" aria-labelledby="team-heading">
      <div className="container">
        <div className="team-heading">
          <Eyebrow>Our team</Eyebrow>
          <h2 id="team-heading">The people behind HighFly AI</h2>
          <p>
            Leadership, software development and digital growth capabilities,
            working together to build practical solutions.
          </p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <article className="team-card" key={member.name}>
              <div className="team-photo">
                {member.image ? (
                  <img src={member.image} alt={member.name} />
                ) : (
                  <div
                    className="team-avatar"
                    role="img"
                    aria-label={`Initials for ${member.name}; portrait not supplied`}
                  >
                    <span>{member.initials}</span>
                    <small>Portrait not supplied</small>
                  </div>
                )}
              </div>
              <div className="team-card-content">
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                {member.subtitle && (
                  <p className="team-subtitle">{member.subtitle}</p>
                )}
                <p className="team-bio">{member.description}</p>
                {member.links.length > 0 && (
                  <div
                    className="team-links"
                    aria-label={`${member.name} contact and profile links`}
                  >
                    {member.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function ServicesPage() {
  return (
    <Layout>
      <Meta
        title="Services | HighFly AI"
        description="Explore custom web applications, AI development, RAG assistants, automation, management systems, e-commerce, websites and digital experience services from HighFly AI."
      />
      <main>
        <PageHero
          label="Services"
          title="Technology for the way your business works."
          description="A practical range of software, AI and digital services. Scope, timelines, pricing, integrations and maintenance depend on the requirements of each project."
        />
        <section className="services-detail">
          <div className="container">
            <div className="service-detail-grid">
              {serviceDetails.map((s, i) => {
                const Icon = [
                  Code2,
                  Bot,
                  MessageSquareText,
                  Workflow,
                  Hotel,
                  GraduationCap,
                  ShoppingBasket,
                  Globe2,
                  PenTool,
                  Sparkles,
                ][i];
                return (
                  <article className="service-detail-card" key={s[0]}>
                    <div className="icon-box">
                      <Icon />
                    </div>
                    <div>
                      <h2>{s[0]}</h2>
                      <h4>The challenge</h4>
                      <p>{s[1]}</p>
                      <h4>How we can help</h4>
                      <p>{s[2]}</p>
                      <h4>Typical use cases</h4>
                      <p>{s[3]}</p>
                      <h4>Potential benefits</h4>
                      <p>{s[4]}</p>
                      <h4>Engagement process</h4>
                      <p>{s[5]}</p>
                      <Link className="text-link" href="/contact">
                        Discuss this service <ArrowRight />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="scope-note">
              <strong>Project-specific scope:</strong> Any listed use case is a
              possibility, not a guaranteed deliverable. Requirements,
              estimates, integrations and ongoing support are confirmed for each
              engagement.
            </div>
          </div>
        </section>
        <CallToAction />
      </main>
    </Layout>
  );
}
function WorkPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "AI", "Hospitality", "Education", "Retail"];
  const filtered = projects.filter(
    (p) => filter === "All" || p.filter === filter,
  );
  return (
    <Layout>
      <Meta
        title="Our Work | HighFly AI"
        description="Browse HighFly AI software and AI project repositories, prototypes and planned solutions, with clear and accurate project status."
      />
      <main>
        <PageHero
          label="Our work"
          title="Digital solutions, built for real workflows."
          description="A selection of software repositories, an application prototype and a planned client solution. Project statuses are stated plainly; illustrative visuals are not product screenshots."
        />
        <section className="work-page">
          <div className="container">
            <div
              className="filter-row"
              role="group"
              aria-label="Filter projects by category"
            >
              {filters.map((f) => (
                <button
                  className="filter-button"
                  type="button"
                  key={f}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  data-testid={`filter-${f.toLowerCase()}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="work-grid">
              {filtered.map((p, i) => (
                <ProjectCard project={p} index={i} key={p.slug} />
              ))}
            </div>
            <div className="scope-note">
              All visuals are clearly marked illustrative and are not
              screenshots or evidence of deployed software. School Management
              System is a planned solution and is not counted as completed work.
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return <NotFoundPage />;
  const repoLabel = project.external
    ? "Open Google AI Studio prototype"
    : "View project repository";
  return (
    <Layout>
      <Meta
        title={`${project.title} | HighFly AI Work`}
        description={project.description}
      />
      <main className="detail-page">
        <div className="container">
          <Link href="/work" className="back-link">
            <ArrowLeft /> Back to selected work
          </Link>
          <div className="detail-layout">
            <div>
              <Eyebrow>{project.category}</Eyebrow>
              <h1>{project.title}</h1>
              <span className={`status ${project.planned ? "planned" : ""}`}>
                {project.status}
              </span>
              <p className="lead">{project.detail}</p>
              <div className="detail-notice">
                {project.planned
                  ? "Planned solution — requirements to be finalized with the client. The feature areas described are proposed only."
                  : project.status === "In development"
                    ? "In development — this is a project foundation, not a live deployment."
                    : project.status === "Academic project / prototype"
                      ? "Academic project/prototype — no privacy, security or accuracy guarantees are implied."
                      : project.status === "Repository project"
                        ? "Repository project — not presented as a verified commercial deployment."
                        : "Prototype — functionality has not been verified; the description remains neutral."}
              </div>
              <ProjectArtwork index={3} />
            </div>
            <aside className="detail-panel">
              <h2>Project information</h2>
              <p>
                <strong>Category</strong>
                <br />
                {project.category}
              </p>
              <p>
                <strong>Status</strong>
                <br />
                {project.status}
              </p>
              {project.planned ? (
                <>
                  <p>
                    Possible capabilities remain subject to requirements and
                    scope discussions.
                  </p>
                  <Link href="/contact" className="button button-primary">
                    Discuss a similar solution <ArrowRight />
                  </Link>
                </>
              ) : (
                <a
                  className="button button-primary"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repoLabel} <ArrowDownRight />
                </a>
              )}
            </aside>
          </div>
        </div>
      </main>
    </Layout>
  );
}
function AboutPage() {
  return (
    <Layout>
      <Meta
        title="About HighFly AI | Practical Technology"
        description="Learn about HighFly AI's mission, capabilities, team and practical approach to building custom software, AI applications and automation around real business needs."
      />
      <main>
        <PageHero
          label="About HighFly AI"
          title="Building Useful Technology for a Smarter Future"
          description="HighFly AI focuses on developing practical digital solutions that help organizations modernize workflows, improve access to information, and make better use of technology."
        />
        <section className="about-section">
          <div className="container">
            <div className="about-lead">
              <div>
                <Eyebrow>Purpose & direction</Eyebrow>
                <h2>Useful technology should start with a real need.</h2>
                <p>
                  Our work spans custom software, AI-powered applications,
                  business automation, and industry-specific systems. We focus
                  on understanding the people, processes and constraints around
                  each challenge before choosing an approach.
                </p>
                <p>
                  Our mission is to make useful technology more accessible by
                  building thoughtful software and AI solutions around real
                  business needs.
                </p>
                <p>
                  Our vision is to help businesses and institutions operate more
                  effectively through dependable digital products and
                  intelligent automation.
                </p>
              </div>
              <aside className="mission-box">
                <span>Development philosophy</span>
                <p>
                  Start with the work. Choose technology that serves it. Build
                  with room to learn.
                </p>
              </aside>
            </div>
            <div className="about-cards">
              {[
                [
                  "Our approach",
                  "We listen to the context, clarify the problem and define requirements before settling on a technical solution.",
                ],
                [
                  "Core capabilities",
                  "Custom applications, practical AI experiences, RAG systems, workflow automation and digital product design.",
                ],
                [
                  "Industries of interest",
                  "Hospitality, education, retail, healthcare operations and organizations with processes ready to improve.",
                ],
                [
                  "Build thoughtfully",
                  "Scope and delivery are shaped by project needs. We aim for maintainable systems and transparent trade-offs.",
                ],
                [
                  "Collaborate openly",
                  "We plan milestones, share progress and use feedback to refine the work as requirements evolve.",
                ],
                [
                  "No one-size-fits-all",
                  "The right solution depends on users, existing systems, privacy obligations, budget and priorities.",
                ],
              ].map(([title, text]) => (
                <article className="about-card" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <TeamSection />
        <CallToAction />
      </main>
    </Layout>
  );
}
type FormValues = {
  name: string;
  email: string;
  description: string;
  service: string;
  company: string;
  phone: string;
  budget: string;
  timeline: string;
  notes: string;
  website: string;
  consent: boolean;
};
function ContactPage() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    description: "",
    service: "",
    company: "",
    phone: "",
    budget: "",
    timeline: "",
    notes: "",
    website: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;
  const update = (key: keyof FormValues, value: string | boolean) =>
    setValues((v) => ({ ...v, [key]: value }));
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback("");
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!values.email.trim()) next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Enter a valid email address.";
    if (!values.description.trim())
      next.description = "Please describe your project or business challenge.";
    if (!values.service) next.service = "Choose the type of service you need.";
    if (!values.consent)
      next.consent = "Please agree before sending your enquiry.";
    setErrors(next);
    if (Object.keys(next).length) return;
    if (!endpoint) {
      setFeedback(
        "Your enquiry has not been sent. Resend is connected, but a verified sending domain and the server-side sender address are not configured yet. Please use the direct contact details on this page instead.",
      );
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "omit",
        body: JSON.stringify(values),
      });
      const result: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const message =
          result &&
          typeof result === "object" &&
          "error" in result &&
          typeof result.error === "string"
            ? result.error
            : "We could not submit your enquiry. Please contact HighFly AI directly.";
        throw new Error(message);
      }
      if (
        !result ||
        typeof result !== "object" ||
        !("accepted" in result) ||
        result.accepted !== true
      ) {
        throw new Error(
          "We could not confirm email acceptance. Please contact HighFly AI directly.",
        );
      }
      setFeedback("Your enquiry was accepted for email delivery.");
      setValues({
        name: "",
        email: "",
        description: "",
        service: "",
        company: "",
        phone: "",
        budget: "",
        timeline: "",
        notes: "",
        website: "",
        consent: false,
      });
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "We could not submit your enquiry. Please contact HighFly AI directly.",
      );
    } finally {
      setLoading(false);
    }
  };
  const input = (
    key: keyof FormValues,
    label: string,
    required = false,
    type = "text",
    placeholder = "",
    maxLength?: number,
  ) => (
    <div className="field">
      <label htmlFor={`contact-${key}`}>
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={`contact-${key}`}
        data-testid={`input-${key}`}
        type={type}
        value={values[key] as string}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `error-${key}` : undefined}
        onChange={(e) => update(key, e.target.value)}
      />
      {errors[key] && (
        <span className="form-error" id={`error-${key}`}>
          {errors[key]}
        </span>
      )}
    </div>
  );
  return (
    <Layout>
      <Meta
        title="Contact HighFly AI | Discuss Your Project"
        description={
          endpoint
            ? "Tell HighFly AI about your software, AI or automation project."
            : "Tell HighFly AI about your project. Contact form delivery is not yet configured, so submissions are not transmitted."
        }
      />
      <main>
        <PageHero
          label="Contact"
          title="Tell Us About Your Project"
          description="Share your goals, challenges, and initial requirements. We'll use the information to understand your project and discuss possible next steps."
        />
        <section className="contact-section">
          <div className="container contact-layout">
            <div className="contact-copy">
              <Eyebrow>Let’s talk about the work</Eyebrow>
              <h2>Start with what you’re trying to solve.</h2>
              <p>
                There’s no need to have every detail worked out. A clear
                description of the challenge and what you hope to improve is a
                useful beginning.
              </p>
              <div className="form-warning">
                <strong>
                  {endpoint
                    ? "Contact endpoint configured — delivery must be tested before launch."
                    : "Contact form delivery is not enabled."}
                </strong>
                {endpoint
                  ? "The form sends project details to HighFly AI’s server-side endpoint, which uses Resend for email processing. Avoid sending confidential or sensitive information."
                  : "Resend is connected, but this account has no verified sending domain configured. Submissions are not transmitted until a verified sender and the server-side setting are in place. Do not include sensitive information."}
              </div>
              <section
                className="contact-details-placeholder"
                aria-labelledby="contact-details-heading"
              >
                <h3 id="contact-details-heading">Company contact</h3>
                <p>Reach HighFly AI by email, phone or WhatsApp.</p>
                <div className="company-contact-methods">
                  <a href="mailto:m.faizansajid102418@gmail.com">
                    <span>Email</span>m.faizansajid102418@gmail.com
                  </a>
                  <a href="tel:+923091995456">
                    <span>Phone</span>+92 309 1995456
                  </a>
                  <a
                    href="https://wa.me/923091995456"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>WhatsApp</span>Message HighFly AI
                  </a>
                </div>
              </section>
            </div>
            <form className="contact-form" onSubmit={submit} noValidate>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: 1,
                  height: 1,
                  padding: 0,
                  margin: -1,
                  overflow: "hidden",
                  clip: "rect(0, 0, 0, 0)",
                  whiteSpace: "nowrap",
                  border: 0,
                }}
              >
                <label htmlFor="contact-website">Leave this field empty</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={(e) => update("website", e.target.value)}
                />
              </div>
              <div className="form-grid">
                {input("name", "Full name", true, "text", "Your name", 120)}
                {input(
                  "email",
                  "Email address",
                  true,
                  "email",
                  "you@example.com",
                  254,
                )}
                {input(
                  "company",
                  "Company or organization",
                  false,
                  "text",
                  "Optional",
                  160,
                )}
                {input(
                  "phone",
                  "WhatsApp or phone number",
                  false,
                  "tel",
                  "Optional",
                  40,
                )}
                <div className="field">
                  <label htmlFor="contact-service">
                    Type of service needed *
                  </label>
                  <select
                    id="contact-service"
                    data-testid="input-service"
                    value={values.service}
                    onChange={(e) => update("service", e.target.value)}
                    aria-invalid={!!errors.service}
                  >
                    <option value="">Choose a service</option>
                    {serviceOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <span className="form-error">{errors.service}</span>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="contact-budget">Project budget range</label>
                  <select
                    id="contact-budget"
                    data-testid="input-budget"
                    value={values.budget}
                    onChange={(e) => update("budget", e.target.value)}
                  >
                    <option value="">Select if known</option>
                    <option>Not sure yet</option>
                    <option>Under $2,500</option>
                    <option>$2,500 – $10,000</option>
                    <option>$10,000 – $25,000</option>
                    <option>Above $25,000</option>
                  </select>
                </div>
                <div className="field full">
                  <label htmlFor="contact-description">
                    Project or business description *
                  </label>
                  <textarea
                    id="contact-description"
                    data-testid="input-description"
                    value={values.description}
                    maxLength={4000}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="What are you trying to solve or improve?"
                    aria-invalid={!!errors.description}
                  />
                  {errors.description && (
                    <span className="form-error">{errors.description}</span>
                  )}
                </div>
                <div className="field full">
                  <label htmlFor="contact-timeline">Desired timeline</label>
                  <input
                    id="contact-timeline"
                    data-testid="input-timeline"
                    value={values.timeline}
                    maxLength={120}
                    onChange={(e) => update("timeline", e.target.value)}
                    placeholder="Optional"
                  />
                </div>
                <div className="field full">
                  <label htmlFor="contact-notes">Additional notes</label>
                  <textarea
                    id="contact-notes"
                    data-testid="input-notes"
                    value={values.notes}
                    maxLength={4000}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Anything else we should know?"
                  />
                </div>
              </div>
              <label className="consent-row">
                <input
                  type="checkbox"
                  checked={values.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  aria-invalid={!!errors.consent}
                  aria-describedby={
                    errors.consent ? "error-consent" : undefined
                  }
                />
                <span>
                  I agree that HighFly AI may use my contact details to respond.
                  If delivery is enabled, my enquiry will be processed by
                  HighFly AI’s server and Resend for email delivery. I have read
                  the <Link href="/privacy">Privacy Policy</Link>.
                </span>
              </label>
              {errors.consent && (
                <span className="form-error" id="error-consent">
                  {errors.consent}
                </span>
              )}
              {feedback && (
                <div
                  className="form-feedback"
                  role="status"
                  aria-live="polite"
                  data-testid="status-form-feedback"
                >
                  {feedback}
                </div>
              )}
              <div className="submit-row">
                <button
                  type="submit"
                  className="button button-primary"
                  disabled={loading}
                  data-testid="button-submit-contact"
                >
                  {loading ? "Submitting…" : "Submit project details"}{" "}
                  {!loading && <ArrowRight />}
                </button>
                <small>Required fields are marked *.</small>
              </div>
            </form>
          </div>
        </section>
      </main>
    </Layout>
  );
}
function PrivacyPage() {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;
  return (
    <Layout>
      <Meta
        title="Privacy Policy | HighFly AI"
        description="Privacy information for the HighFly AI website, including the current status of contact form transmission and handling of information entered by visitors."
      />
      <main>
        <PageHero
          label="Privacy"
          title="Privacy Policy"
          description="A straightforward explanation of this website’s current information practices."
        />
        <article className="container privacy-content">
          <p>
            <strong>
              Review status: confirm and date this policy before launch.
            </strong>
          </p>
          <h2>Contact form</h2>
          <p>
            {endpoint
              ? "Contact delivery is enabled for this build. The form sends project details to HighFly AI’s API, which uses Resend to email the inquiry to m.faizansajid102418@gmail.com. Do not send sensitive personal, financial, student, health or confidential business information."
              : "The server-side contact route is implemented, but this website build does not enable it until a sender on a verified Resend domain is configured. Form submissions are not transmitted. Do not enter sensitive personal, financial, student, health or confidential business information."}
          </p>
          <h2>Information entered</h2>
          <p>
            {endpoint
              ? "The endpoint processes the name, email, service and project description, plus any optional company, phone, budget, timeline and notes provided. The endpoint does not store inquiry contents in a separate database. Resend processes the email, and messages may remain in the recipient’s mailbox and Resend account under their applicable settings."
              : "When delivery is disabled, information typed into the form remains in the browser and is not sent by this website. If delivery is enabled, the fields described above are sent to HighFly AI’s API and Resend for the purpose of responding to the inquiry."}
          </p>
          <h2>Operational safeguards</h2>
          <p>
            When delivery is enabled, the API uses the request IP address for
            an in-memory limit of five submissions per 15 minutes. It does not
            log form contents. Contact details are used to respond to the
            project inquiry.
          </p>
          <h2>Cookies and tracking</h2>
          <p>
            This implementation does not add analytics, advertising trackers, or
            non-essential cookies.
          </p>
          <h2>Third-party links</h2>
          <p>
            Project links may lead to third-party websites, including GitHub and
            Google AI Studio. Those services have their own privacy practices
            and terms.
          </p>
          <h2>Questions and updates</h2>
          <p>
            For privacy-related questions, email{" "}
            <a href="mailto:m.faizansajid102418@gmail.com">
              m.faizansajid102418@gmail.com
            </a>
            . Review this policy against HighFly AI’s actual data handling and
            applicable requirements before launch.
          </p>
        </article>
      </main>
    </Layout>
  );
}
function NotFoundPage() {
  return (
    <Layout>
      <Meta
        title="Page Not Found | HighFly AI"
        description="The page could not be found. Return to HighFly AI or explore services and selected work."
      />
      <main className="not-found container">
        <Eyebrow>404 · Not found</Eyebrow>
        <h1>That page isn’t here.</h1>
        <p>
          The address may have changed or the page may no longer be available.
        </p>
        <Link href="/" className="button button-primary">
          Back to home <ArrowRight />
        </Link>
      </main>
    </Layout>
  );
}
function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/work" component={WorkPage} />
      <Route path="/work/:slug" component={ProjectDetailPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}
export default App;
