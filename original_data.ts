export interface FestEvent {
  id: number;
  name: string;
  category: string;
  type: "Technical" | "Cultural" | "Management" | "Spot";
  tagline: string;
  about: string;
  description: string;
  club_name: string;
  venue: string;
  schedule: string;
  prizePool: string;
  image_url: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  japaneseName: string;
  tagline: string;
  description: string;
  icon: string;
  events: FestEvent[];
}

export interface School {
  id: string;
  name: string;
  shortName: string;
  code: string;
  japaneseTitle: string;
  tagline: string;
  description: string;
  icon: string;
  themeColor: string;
  departments: Department[];
}

export const schoolsData: School[] = [
  {
    id: "engineering",
    name: "School of Engineering",
    shortName: "Engineering",
    code: "SOE",
    japaneseTitle: "工学部",
    tagline: "Pioneering Innovation, Engineering Tomorrow",
    description: "V.R. Siddhartha School of Engineering brings cutting-edge technological competitions spanning Artificial Intelligence, Computing, Robotics, Electronics, and Core Engineering.",
    icon: "⚙️",
    themeColor: "#e8813a",
    departments: [
      {
        id: "cse",
        name: "Computer Science and Engineering",
        code: "CSE",
        japaneseName: "計算機工学科",
        tagline: "Code, Compile, Conquer",
        description: "The forefront of software engineering, algorithms, and next-gen computing solutions.",
        icon: "💻",
        events: [
          {
            id: 101,
            name: "Code Genesis",
            category: "Technical",
            type: "Technical",
            tagline: "National Level 24-Hour Hackathon",
            about: "A battle of wits and endurance where brilliant developers build real-world software solutions within 24 hours.",
            description: "Teams tackle intense problem statements in Web3, AI, and Cloud Infrastructure. Evaluated on innovation, scalability, and code architecture.",
            club_name: "CSE Technical Association",
            venue: "Computing Complex - Lab 4",
            schedule: "Day 1 - 10:00 AM onwards",
            prizePool: "₹50,000",
            image_url: "/images/events/clean_base/drama.png",
          },
          {
            id: 102,
            name: "Bug Hunt & Reverse Engg",
            category: "Technical",
            type: "Technical",
            tagline: "Find the Glitch, Crack the Core",
            about: "Deep dive into production-grade codebases to uncover security flaws, memory leaks, and logic vulnerabilities.",
            description: "Participants are given obfuscated codebases with hidden flaws. Points are awarded based on speed, patch efficiency, and vulnerability analysis.",
            club_name: "CodeCrypt Guild",
            venue: "Lab 2, Turing Block",
            schedule: "Day 2 - 11:30 AM",
            prizePool: "₹25,000",
            image_url: "/images/events/clean_base/drama.png",
          },
          {
            id: 103,
            name: "Algo-Mania Challenge",
            category: "Technical",
            type: "Technical",
            tagline: "Ultimate Competitive Programming",
            about: "Fast-paced algorithmic duel testing data structures, dynamic programming, and mathematical problem-solving.",
            description: "High-octane ICPC-style contest with strict time limits. Test your algorithmic thinking under intense clock pressure.",
            club_name: "ACM Student Chapter",
            venue: "Main Computing Center",
            schedule: "Day 1 - 02:00 PM",
            prizePool: "₹30,000",
            image_url: "/images/events/clean_base/drama.png",
          }
        ]
      },
      {
        id: "aids",
        name: "Artificial Intelligence & Data Science",
        code: "AI & DS",
        japaneseName: "人工知能学科",
        tagline: "Decoding Intelligence from Data",
        description: "Specialized in deep learning, generative artificial intelligence, computer vision, and predictive analytics.",
        icon: "🤖",
        events: [
          {
            id: 104,
            name: "AI Odyssey",
            category: "Technical",
            type: "Technical",
            tagline: "GenAI Model Building Competition",
            about: "Build and deploy multimodal AI agents, LLM pipelines, and computer vision systems for societal impact.",
            description: "Teams fine-tune open models, implement RAG architectures, and demonstrate live inference against judge benchmarks.",
            club_name: "Neural Nexus Society",
            venue: "AI Center of Excellence",
            schedule: "Day 1 - 11:00 AM",
            prizePool: "₹35,000",
            image_url: "/images/events/clean_base/drama.png",
          },
          {
            id: 105,
            name: "Data Viz Summit",
            category: "Technical",
            type: "Technical",
            tagline: "Visual Storytelling through Big Data",
            about: "Transform complex real-world datasets into compelling interactive analytical dashboards.",
            description: "Participants receive massive unorganized data dumps and must extract actionable insights using modern visualization stacks.",
            club_name: "DataCraft Club",
            venue: "Seminar Hall 1",
            schedule: "Day 2 - 01:30 PM",
            prizePool: "₹20,000",
            image_url: "/images/events/clean_base/drama.png",
          }
        ]
      },
      {
        id: "it",
        name: "Information Technology",
        code: "IT",
        japaneseName: "情報技術学科",
        tagline: "Securing Networks, Scaling Systems",
        description: "Excellence in cybersecurity, cloud architectures, network protocols, and distributed platforms.",
        icon: "🌐",
        events: [
          {
            id: 106,
            name: "CyberShield CTF",
            category: "Technical",
            type: "Technical",
            tagline: "Capture The Flag Cybersecurity War",
            about: "Offensive and defensive cybersecurity contest covering cryptography, web exploitation, and network forensics.",
            description: "Jeopardy-style CTF challenge testing ethical hacking skills across real target servers and sandbox containers.",
            club_name: "CyberSec Clan",
            venue: "IT Systems Lab 3",
            schedule: "Day 1 - 01:00 PM",
            prizePool: "₹30,000",
            image_url: "/images/events/clean_base/drama.png",
          }
        ]
      },
      {
        id: "ece",
        name: "Electronics & Communication Engineering",
        code: "ECE",
        japaneseName: "電子通信学科",
        tagline: "Signals, Silicon, and Communication",
        description: "VLSI, embedded microcontrollers, robotics, and high-frequency wireless communications.",
        icon: "📡",
        events: [
          {
            id: 107,
            name: "ElectroBlitz: Circuit Quest",
            category: "Technical",
            type: "Technical",
            tagline: "Rapid Circuit Synthesis & Debugging",
            about: "Hardware debugging, breadboard wiring, and analog/digital waveform synthesis under real-time constraints.",
            description: "Decode faulty PCB designs, optimize signal-to-noise ratios, and construct custom RF circuits.",
            club_name: "IEEE Student Branch",
            venue: "VLSI & Embedded Lab",
            schedule: "Day 2 - 10:00 AM",
            prizePool: "₹25,000",
            image_url: "/images/events/clean_base/drama.png",
          },
          {
            id: 108,
            name: "RoboRace & RoboWars",
            category: "Technical",
            type: "Technical",
            tagline: "Battle of Autonomous & RC Machines",
            about: "Custom-built robotics clash in high-speed obstacle arena races and tactical combat rings.",
            description: "Robots navigate terrain obstacles, water trenches, and mechanical bridges to post the quickest lap times.",
            club_name: "Robotics Club",
            venue: "Central Open Arena",
            schedule: "Day 2 - 02:30 PM",
            prizePool: "₹40,000",
            image_url: "/images/events/clean_base/drama.png",
          }
        ]
      },
      {
        id: "eee",
        name: "Electrical & Electronics Engineering",
        code: "EEE",
        japaneseName: "電気工学科",
        tagline: "Powering Tomorrow with Smart Energy",
        description: "Smart grids, renewable energy transformations, power electronics, and electrical machine control.",
        icon: "⚡",
        events: [
          {
            id: 109,
            name: "SparkInnovate: Green Power",
            category: "Technical",
            type: "Technical",
            tagline: "Next-Gen Clean Energy Solutions",
            about: "Prototype model display for smart EV charging, solar micro-inverters, and power grid stability.",
            description: "Showcase working electrical prototypes addressing carbon emissions and energy distribution efficiency.",
            club_name: "Power Systems Society",
            venue: "Electrical Machines Hall",
            schedule: "Day 1 - 03:00 PM",
            prizePool: "₹20,000",
            image_url: "/images/events/clean_base/drama.png",
          }
        ]
      },
      {
        id: "me",
        name: "Mechanical Engineering",
        code: "ME",
        japaneseName: "機械工学科",
        tagline: "Design, Dynamics, and Manufacturing",
        description: "Thermal engineering, advanced CAD/CAM robotics, additive manufacturing, and aerodynamics.",
        icon: "🏎️",
        events: [
          {
            id: 110,
            name: "CAD Design Clash",
            category: "Technical",
            type: "Technical",
            tagline: "Parametric 3D Modeling Marathon",
            about: "Speed drafting and stress simulation of aerodynamic automobile and aerospace components.",
            description: "Transform complex engineering sketches into production-ready 3D CAD assemblies using SolidWorks and Fusion 360.",
            club_name: "SAE Collegiate Club",
            venue: "CAD/CAM Workstation Lab",
            schedule: "Day 2 - 11:00 AM",
            prizePool: "₹25,000",
            image_url: "/images/events/clean_base/drama.png",
          }
        ]
      },
      {
        id: "ce",
        name: "Civil Engineering",
        code: "CE",
        japaneseName: "土木工学科",
        tagline: "Constructing Sustainable Horizons",
        description: "Structural design, earthquake resistance, smart town planning, and environmental hydraulics.",
        icon: "🏗️",
        events: [
          {
            id: 111,
            name: "BridgeCraft: Truss Challenge",
            category: "Technical",
            type: "Technical",
            tagline: "Maximum Strength, Minimum Weight",
            about: "Design and build lightweight structural bridges subjected to hydraulic destructive load testing.",
            description: "Balsa wood and acoustic truss structures tested to failure on computerized load frames to measure strength-to-weight ratio.",
            club_name: "Civil Engineers Guild",
            venue: "Structures Testing Bay",
            schedule: "Day 1 - 01:30 PM",
            prizePool: "₹20,000",
            image_url: "/images/events/clean_base/drama.png",
          }
        ]
      },
      {
        id: "eie",
        name: "Electronics & Instrumentation Engineering",
        code: "EIE",
        japaneseName: "電子計測工学科",
        tagline: "Sensors, Automation, and Telemetry",
        description: "Industrial IoT, PLC/SCADA automation, biomedical instrumentation, and sensor fusion.",
        icon: "🎛️",
        events: [
          {
            id: 112,
            name: "SensorVerse Expo",
            category: "Technical",
            type: "Technical",
            tagline: "Industrial IoT and Smart Automation",
            about: "Hands-on sensor calibration, telemetry transmission, and industrial automation control.",
            description: "Program automated sorting lines, PID temperature controllers, and wireless telemetry networks.",
            club_name: "ISA Student Section",
            venue: "Instrumentation Lab 1",
            schedule: "Day 2 - 03:00 PM",
            prizePool: "₹20,000",
            image_url: "/images/events/clean_base/drama.png",
          }
        ]
      }
    ]
  },
  {
    id: "science",
    name: "School of Science",
    shortName: "Science",
    code: "SOS",
    japaneseTitle: "理学部",
    tagline: "Pure Science, Algorithmic Precision & Discovery",
    description: "Bridging foundational sciences with computational mathematics, data science, and advanced technological research.",
    icon: "🔬",
    themeColor: "#3a9fe8",
    departments: [
      {
        id: "mca",
        name: "Computer Applications (MCA)",
        code: "MCA",
        japaneseName: "計算機応用学科",
        tagline: "Enterprise Software & Cloud Platforms",
        description: "Advanced full-stack systems, database architectures, and distributed enterprise microservices.",
        icon: "💻",
        events: [
          {
            id: 201,
            name: "FullStack Showdown",
            category: "Technical",
            type: "Technical",
            tagline: "Speed Web & Mobile App Synthesis",
            about: "Rapid end-to-end web architecture build challenge with live database persistence.",
            description: "Developers receive rapid product specs and must deliver a functional full-stack MVP within 4 hours.",
            club_name: "MCA Tech Forum",
            venue: "MCA Software Lab 1",
            schedule: "Day 1 - 10:30 AM",
            prizePool: "₹25,000",
            image_url: "/images/events/clean_base/music.png",
          },
          {
            id: 202,
            name: "DB Architect & Query Clash",
            category: "Technical",
            type: "Technical",
            tagline: "High-Volume SQL & Schema Mastery",
            about: "Solve complex relational normalization and optimize million-record analytical queries.",
            description: "Participants tune query execution plans, design schema migrations, and eliminate table locks.",
            club_name: "DataSys Club",
            venue: "MCA Lab 2",
            schedule: "Day 2 - 02:00 PM",
            prizePool: "₹15,000",
            image_url: "/images/events/clean_base/music.png",
          }
        ]
      },
      {
        id: "bsc-cs",
        name: "Data Science & Computing (B.Sc)",
        code: "B.Sc DS",
        japaneseName: "数理情報学科",
        tagline: "Empirical Reasoning & Mathematical Logic",
        description: "Specialized in statistical inference, stochastic modeling, and scientific computing.",
        icon: "📊",
        events: [
          {
            id: 203,
            name: "Statistical Analytics Challenge",
            category: "Technical",
            type: "Technical",
            tagline: "Predictive Analytics & Hypothesis Testing",
            about: "Statistical modeling challenge evaluating regressions, ANOVA, and Bayesian inference models.",
            description: "Competitors uncover latent patterns and validate empirical research hypotheses from raw clinical datasets.",
            club_name: "Math-Stat Society",
            venue: "Science Block Hall 2",
            schedule: "Day 1 - 02:30 PM",
            prizePool: "₹15,000",
            image_url: "/images/events/clean_base/music.png",
          }
        ]
      },
      {
        id: "basic-sciences",
        name: "Applied Sciences & Humanities",
        code: "BSH",
        japaneseName: "基礎科学・人文学系",
        tagline: "The Bedrock of Scientific Exploration",
        description: "Physics, Chemistry, Applied Mathematics, and Environmental Sciences fostering research acumen.",
        icon: "⚛️",
        events: [
          {
            id: 204,
            name: "Quantum Quest: Physics Conclave",
            category: "Technical",
            type: "Technical",
            tagline: "Exploring Optics, Quantum & Materials",
            about: "Interactive lab demonstrations and theoretical physics paper presentations.",
            description: "Showcase breakthrough ideas in semiconductors, optics, quantum computing, and smart nanomaterials.",
            club_name: "Science Circle",
            venue: "Physics Auditorium",
            schedule: "Day 2 - 10:30 AM",
            prizePool: "₹15,000",
            image_url: "/images/events/clean_base/music.png",
          }
        ]
      }
    ]
  },
  {
    id: "management",
    name: "School of Management",
    shortName: "Management",
    code: "SOM",
    japaneseTitle: "経営学部",
    tagline: "Leadership, Strategy, and Enterprise",
    description: "Nurturing executive acumen, financial engineering, startup entrepreneurship, and global business strategies.",
    icon: "📈",
    themeColor: "#b23ae8",
    departments: [
      {
        id: "mba",
        name: "Business Administration (MBA)",
        code: "MBA",
        japaneseName: "経営学科",
        tagline: "The Executive Leadership Crucible",
        description: "Strategic decision-making, corporate governance, venture capital, and operations leadership.",
        icon: "💼",
        events: [
          {
            id: 301,
            name: "Best Manager: The Chanakya",
            category: "Management",
            type: "Management",
            tagline: "The Ultimate Test of Leadership & Grit",
            about: "A grueling multi-stage test of stress management, situational ethics, negotiation, and corporate strategy.",
            description: "Contestants face rapid-fire press conferences, board-room crisis simulations, and turnaround presentations.",
            club_name: "Management Executive Club",
            venue: "MBA Executive Boardroom",
            schedule: "Day 1 & Day 2 - Full Day",
            prizePool: "₹35,000",
            image_url: "/images/events/clean_base/photography.png",
          },
          {
            id: 302,
            name: "PitchFest: Startup Crucible",
            category: "Management",
            type: "Management",
            tagline: "Turn Ideas into Funded Enterprises",
            about: "Pitch your disruptive business concept to prominent venture capitalists and angel investors.",
            description: "Teams present financial forecasts, market TAM/SAM, unit economics, and go-to-market strategies.",
            club_name: "E-Cell (Entrepreneurship Cell)",
            venue: "Incubation Center Auditorium",
            schedule: "Day 2 - 11:00 AM",
            prizePool: "₹40,000",
            image_url: "/images/events/clean_base/photography.png",
          }
        ]
      },
      {
        id: "finance",
        name: "Financial Management & Analytics",
        code: "FMA",
        japaneseName: "金融管理学科",
        tagline: "Capital Markets & FinTech Strategy",
        description: "Portfolio optimization, derivatives pricing, algorithmic trading, and corporate valuation.",
        icon: "💹",
        events: [
          {
            id: 303,
            name: "Wall Street Wizard",
            category: "Management",
            type: "Management",
            tagline: "Virtual High-Frequency Equity Trading",
            about: "Real-time stock simulation with live breaking news feeds, volatility spikes, and asset balancing.",
            description: "Manage a multi-crore virtual portfolio across equities, commodities, and derivatives under live market shocks.",
            club_name: "FinTech Society",
            venue: "Financial Analytics Terminal",
            schedule: "Day 1 - 01:00 PM",
            prizePool: "₹20,000",
            image_url: "/images/events/clean_base/photography.png",
          }
        ]
      },
      {
        id: "marketing-hr",
        name: "Marketing & Human Resource Management",
        code: "MHR",
        japaneseName: "マーケティング・人事学科",
        tagline: "Brand Identity & Organizational Psychology",
        description: "Brand positioning, viral consumer psychology, talent acquisition, and mediation.",
        icon: "🎯",
        events: [
          {
            id: 304,
            name: "BrandStorm: Ad-Mad Reel",
            category: "Management",
            type: "Management",
            tagline: "Creative Product Marketing Challenge",
            about: "Create a viral 60-second commercial and brand repositioning campaign for bizarre products.",
            description: "Teams receive random obscure products and must deliver a complete multi-platform advertising blitz.",
            club_name: "Marketing Mavericks",
            venue: "Media Studio Hall",
            schedule: "Day 2 - 02:00 PM",
            prizePool: "₹20,000",
            image_url: "/images/events/clean_base/photography.png",
          }
        ]
      }
    ]
  },
  {
    id: "arts-commerce",
    name: "School of Arts & Commerce",
    shortName: "Arts & Commerce",
    code: "SOAC",
    japaneseTitle: "文学・商業学部",
    tagline: "Culture, Economics, and Artistic Brilliance",
    description: "Showcasing performing arts, economic literature, cultural expression, oratorical mastery, and media arts.",
    icon: "🎭",
    themeColor: "#e83a7a",
    departments: [
      {
        id: "commerce",
        name: "Department of Commerce",
        code: "COM",
        japaneseName: "商学科",
        tagline: "Auditing, Taxation, and Global Trade",
        description: "Corporate accounting, forensic financial auditing, taxation, and international trade policies.",
        icon: "🪙",
        events: [
          {
            id: 401,
            name: "TaxAudit & Commerce Conclave",
            category: "Technical",
            type: "Management",
            tagline: "Forensic Accounting & Corporate Tax Audit",
            about: "Solve simulated corporate balance sheet discrepancies and navigate GST/tax compliance traps.",
            description: "Teams act as external auditors investigating fraudulent ledgers and cross-border trade invoices.",
            club_name: "Commerce Guild",
            venue: "Commerce Block - Hall 4",
            schedule: "Day 1 - 11:30 AM",
            prizePool: "₹18,000",
            image_url: "/images/events/clean_base/dance.png",
          }
        ]
      },
      {
        id: "arts-media",
        name: "Economics & Media Studies",
        code: "EMS",
        japaneseName: "経済・メディア学科",
        tagline: "Economic Discourse & Visual Journalism",
        description: "Macroeconomic policy analysis, documentary filmmaking, photography, and investigative storytelling.",
        icon: "🎬",
        events: [
          {
            id: 402,
            name: "Short Film & Documentary Fest",
            category: "Cultural",
            type: "Cultural",
            tagline: "Cinematic Storytelling on the Big Screen",
            about: "Screening original cinematic short films exploring culture, youth, and social transformation.",
            description: "Entries judged on cinematography, sound design, narrative screenwriting, and directorial vision.",
            club_name: "Film & Cine Society",
            venue: "Campus Cinema Hall",
            schedule: "Day 2 - 04:00 PM",
            prizePool: "₹25,000",
            image_url: "/images/events/clean_base/dance.png",
          },
          {
            id: 403,
            name: "PhotoJournal: Lens of Truth",
            category: "Cultural",
            type: "Cultural",
            tagline: "Spot Photography & Photo-Storytelling",
            about: "Capture the vibrant atmosphere, emotions, and untold moments across the fest grounds.",
            description: "Photographers submit a photo-story of 5 curated frames demonstrating artistic composition and lighting.",
            club_name: "Photography Club",
            venue: "Campus-Wide",
            schedule: "Day 1 & Day 2",
            prizePool: "₹15,000",
            image_url: "/images/events/clean_base/dance.png",
          }
        ]
      },
      {
        id: "languages",
        name: "English & Foreign Languages",
        code: "EFL",
        japaneseName: "外国語・文学科",
        tagline: "Oratory, Debate, and Literary Expression",
        description: "Parliamentary debating, creative literature, expressive poetry, and theatrical drama.",
        icon: "📜",
        events: [
          {
            id: 404,
            name: "Parliamentary Debate",
            category: "Cultural",
            type: "Cultural",
            tagline: "The Clash of Oratorical Titans",
            about: "Asian Parliamentary format debating on contentious global, political, and philosophical motions.",
            description: "Teams battle through knock-out rounds defending Prime Minister and Leader of Opposition stances.",
            club_name: "Literary & Debating Society",
            venue: "Senate Chamber",
            schedule: "Day 1 - 02:00 PM",
            prizePool: "₹20,000",
            image_url: "/images/events/clean_base/dance.png",
          },
          {
            id: 405,
            name: "Street Play (Nukkad Natak)",
            category: "Cultural",
            type: "Cultural",
            tagline: "Voice of the Streets, Soul of Drama",
            about: "High-energy open-air street drama raising awareness on contemporary social and environmental themes.",
            description: "Judged on vocal projection, synchrony, musical rhythm, script impact, and crowd engagement.",
            club_name: "Dramatics Club",
            venue: "Open Air Amphitheatre",
            schedule: "Day 2 - 03:30 PM",
            prizePool: "₹30,000",
            image_url: "/images/events/clean_base/dance.png",
          },
          {
            id: 406,
            name: "Battle of the Bands",
            category: "Cultural",
            type: "Cultural",
            tagline: "Electric Rhythms, Unstoppable Melodies",
            about: "College bands go head-to-head across rock, fusion, indie, and classical genres.",
            description: "Live pro-audio stage performance judged on tight arrangements, vocal dynamics, and stage presence.",
            club_name: "Music Guild",
            venue: "Main Festival Stage",
            schedule: "Day 2 - 06:30 PM",
            prizePool: "₹45,000",
            image_url: "/images/events/clean_base/dance.png",
          }
        ]
      }
    ]
  },
  {
    id: "law",
    name: "School of Law",
    shortName: "Law",
    code: "SOL",
    japaneseTitle: "法学部",
    tagline: "Justice, Advocacy, and Constitutional Integrity",
    description: "Fostering skilled legal advocates, constitutional scholars, corporate arbitrators, and cyber jurisprudence experts.",
    icon: "⚖️",
    themeColor: "#48c774",
    departments: [
      {
        id: "constitutional-law",
        name: "Constitutional & Administrative Law",
        code: "CAL",
        japaneseName: "憲法・行政法学科",
        tagline: "Defending Rights, Upholding Democracy",
        description: "Constitutional interpretation, civil liberties, administrative tribunals, and PIL advocacy.",
        icon: "🏛️",
        events: [
          {
            id: 501,
            name: "National Moot Court Competition",
            category: "Technical",
            type: "Technical",
            tagline: "Appellate Advocacy Before Former High Court Judges",
            about: "Prestigious moot court simulation on fundamental constitutional rights and state actions.",
            description: "Teams draft petitioner and respondent memorials and present oral arguments before legal luminaries.",
            club_name: "Moot Court Society",
            venue: "Moot Court Hall 1",
            schedule: "Day 1 & Day 2",
            prizePool: "₹40,000",
            image_url: "/images/events/clean_base/misc.png",
          },
          {
            id: 502,
            name: "Constitutional Law Conclave",
            category: "Technical",
            type: "Technical",
            tagline: "Legal Quiz & Landmark Case Analysis",
            about: "Fast-paced legal quiz covering Indian Constitutional amendments, landmark verdicts, and jurisprudence.",
            description: "Buzzer rounds testing recall of historic case citations, legal maxims, and statutory interpretations.",
            club_name: "Jurists Circle",
            venue: "Law Seminar Hall",
            schedule: "Day 1 - 03:30 PM",
            prizePool: "₹15,000",
            image_url: "/images/events/clean_base/misc.png",
          }
        ]
      },
      {
        id: "corporate-law",
        name: "Corporate & Commercial Law",
        code: "CCL",
        japaneseName: "企業・商法学科",
        tagline: "Contractual Drafting, M&A, and Arbitration",
        description: "Cross-border mergers, intellectual property transactions, securities regulations, and mediation.",
        icon: "📜",
        events: [
          {
            id: 503,
            name: "Client Counseling & Arbitration",
            category: "Technical",
            type: "Technical",
            tagline: "Simulated Commercial Dispute Resolution",
            about: "Advise distressed corporate clients and negotiate commercial settlements in real-time mediation.",
            description: "Student attorneys interview clients, assess contractual liabilities, and negotiate dispute settlements.",
            club_name: "ADR & Mediation Cell",
            venue: "Arbitration Chamber",
            schedule: "Day 2 - 11:30 AM",
            prizePool: "₹20,000",
            image_url: "/images/events/clean_base/misc.png",
          }
        ]
      },
      {
        id: "cyber-law",
        name: "Criminal & Cyber Law",
        code: "CRCL",
        japaneseName: "刑事・サイバー法学科",
        tagline: "Forensic Evidence, Cybercrime, and Justice",
        description: "Digital forensics, cyber warfare statutes, criminal psychology, and penal code trials.",
        icon: "🛡️",
        events: [
          {
            id: 504,
            name: "Crime Scene Investigation (CSI)",
            category: "Technical",
            type: "Technical",
            tagline: "Forensic Deduction & Criminal Prosecution",
            about: "Analyze staged crime scenes, collect physical and digital trace evidence, and build a watertight charge sheet.",
            description: "Teams examine fingerprint impressions, encrypted mobile logs, and forensic timelines to identify the perpetrator.",
            club_name: "Forensic & Criminal Law Club",
            venue: "Forensics Simulation Lab",
            schedule: "Day 2 - 02:00 PM",
            prizePool: "₹25,000",
            image_url: "/images/events/clean_base/misc.png",
          }
        ]
      }
    ]
  }
];

// Flat export for backwards compatibility with any component expecting archiveEvents
export const archiveEvents = schoolsData.flatMap(school =>
  school.departments.flatMap(dept =>
    dept.events.map(event => ({
      id: event.id,
      name: event.name,
      category: event.category.toLowerCase(),
      about: event.about,
      description: event.description,
      club_name: event.club_name,
      venue: event.venue,
      image_url: event.image_url,
      schoolName: school.name,
      departmentName: dept.name,
    }))
  )
);


