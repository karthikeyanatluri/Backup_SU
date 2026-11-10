import { engineeringDepartmentsData, DepartmentItem } from './engineeringDepartments';

export type SchoolId = 'engineering' | 'science' | 'management' | 'arts-commerce' | 'law';

export interface SchoolFilterTab {
  id: string;
  label: string;
  matchIds?: string[];
}

export interface SchoolPageConfig {
  id: SchoolId;
  name: string;
  shortName: string;
  route: string;
  searchPlaceholder: string;
  filterTabs: SchoolFilterTab[];
  departments: DepartmentItem[];
}

export const scienceDepartmentsData: DepartmentItem[] = [
  {
    id: 'mca',
    name: 'Master of Computer Applications',
    code: 'MCA',
    japaneseName: '計算機応用学科',
    alphabeticalOrder: 1,
    domain: 'Enterprise Software & Cloud Engineering',
    themeColor: '#3a9fe8',
    tagline: 'Enterprise Software Architectures, Databases & Distributed Cloud Platforms',
    description:
      'Postgraduate specialization in full-stack software architecture, scalable relational & NoSQL databases, cloud-native microservices, and enterprise engineering.',
    flagshipLab: 'MCA Enterprise Software & Cloud Center',
    totalPrizePool: '₹60,000',
    studentStrength: '240+ Students',
    facultyMentor: 'Dr. R. Subba Rao, Ph.D.',
    studentLead: {
      name: 'K. Sai Kiran',
      phone: '+91 98485 11209',
      email: 'mca.supragna2k27@vrsiddhartha.ac.in',
    },
    events: [
      {
        id: 'mca-1',
        name: 'FullStack Showdown',
        category: 'Flagship',
        tagline: 'Speed Web & Cloud App Architecture Sprint',
        prizePool: '₹25,000',
        schedule: 'Day 1 | 10:30 AM - 02:30 PM',
        venue: 'MCA Software Lab 1',
        teamSize: '2 - 3 Members',
        about:
          'Developers receive rapid enterprise product specifications and build a functional full-stack application with persistent database integration in 4 hours.',
        rules: [
          'Any modern web framework and database stack is permitted.',
          'Applications must include authentication, REST/GraphQL endpoints, and live persistence.',
          'Evaluated on architecture clarity, UI polish, and deployment readiness.',
        ],
        coordinators: [
          { name: 'M. Harika', contact: '+91 94901 67231' },
          { name: 'S. Karthik', contact: '+91 81255 34901' },
        ],
        highlightBadge: 'Flagship Build',
      },
      {
        id: 'mca-2',
        name: 'DB Architect & Query Clash',
        category: 'Technical',
        tagline: 'High-Volume SQL Optimization & Schema Mastery',
        prizePool: '₹15,000',
        schedule: 'Day 2 | 02:00 PM - 04:30 PM',
        venue: 'MCA Lab 2',
        teamSize: '1 - 2 Members',
        about:
          'Solve complex relational normalization challenges and optimize million-record analytical queries to eliminate bottlenecks and table locks.',
        rules: [
          'Evaluated on PostgreSQL and MySQL benchmark datasets.',
          'Execution time and indexing strategy determine leaderboard rankings.',
        ],
        coordinators: [{ name: 'T. Naga Raju', contact: '+91 90102 44812' }],
      },
      {
        id: 'mca-3',
        name: 'Cloud & Microservices Sprint',
        category: 'Hackathon',
        tagline: 'Containerized API Design & Resilience Testing',
        prizePool: '₹20,000',
        schedule: 'Day 2 | 10:00 AM - 01:30 PM',
        venue: 'MCA Enterprise Center',
        teamSize: '2 - 4 Members',
        about:
          'Architect fault-tolerant microservices using containers, message queues, and automated API gateway routing under simulated load.',
        rules: [
          'Dockerized deliverables required.',
          'Judged on throughput under stress tests and error recovery.',
        ],
        coordinators: [{ name: 'P. Alekhya', contact: '+91 88864 21900' }],
      },
    ],
  },
  {
    id: 'bsc-cs',
    name: 'B.Sc (Honours) Computer Science',
    code: 'B.Sc CS',
    japaneseName: '数理情報学科',
    alphabeticalOrder: 2,
    domain: 'Statistical Computing & Algorithmic Sciences',
    themeColor: '#2980b9',
    tagline: 'Empirical Reasoning, Algorithmic Precision & Computational Science',
    description:
      'Undergraduate honours program uniting core computer science, data analytics, mathematical modeling, and computational problem solving.',
    flagshipLab: 'Honours Computational & Data Analytics Studio',
    totalPrizePool: '₹45,000',
    studentStrength: '300+ Students',
    facultyMentor: 'Dr. P. Vijaya Lakshmi, Ph.D.',
    studentLead: {
      name: 'N. Rishitha',
      phone: '+91 97044 65210',
      email: 'bsccs.supragna2k27@vrsiddhartha.ac.in',
    },
    events: [
      {
        id: 'bsc-1',
        name: 'Statistical Analytics Challenge',
        category: 'Flagship',
        tagline: 'Predictive Modeling & Empirical Hypothesis Testing',
        prizePool: '₹15,000',
        schedule: 'Day 1 | 02:30 PM - 05:00 PM',
        venue: 'Science Block Hall 2',
        teamSize: '1 - 3 Members',
        about:
          'Uncover latent patterns and validate empirical research hypotheses from raw multi-dimensional datasets using statistical inference and regression.',
        rules: [
          'Python, R, or MATLAB statistical suites permitted.',
          'Submissions scored on statistical rigor and interpretive clarity.',
        ],
        coordinators: [
          { name: 'V. Pranathi', contact: '+91 93980 12456' },
          { name: 'A. Deepak', contact: '+91 79955 81203' },
        ],
        highlightBadge: 'Analytics Challenge',
      },
      {
        id: 'bsc-2',
        name: 'Algorithmic Reasoning Clash',
        category: 'Technical',
        tagline: 'Foundational Data Structures & Discrete Logic Contest',
        prizePool: '₹15,000',
        schedule: 'Day 2 | 11:00 AM - 02:00 PM',
        venue: 'CS Honours Computing Lab',
        teamSize: '1 - 2 Members',
        about:
          'Competitive problem-solving event focused on combinatorics, graph traversal, greedy algorithms, and complexity optimization.',
        rules: [
          'Accepted languages: C, C++, Python, Java.',
          'Time and memory limits strictly enforced on automated judge.',
        ],
        coordinators: [{ name: 'K. Jaswanth', contact: '+91 91215 77890' }],
      },
      {
        id: 'bsc-3',
        name: 'Quantum & Computational Science Conclave',
        category: 'Technical',
        tagline: 'Exploring Scientific Computing, Optics & Logic Simulation',
        prizePool: '₹15,000',
        schedule: 'Day 2 | 10:30 AM - 01:30 PM',
        venue: 'Science Seminar Hall',
        teamSize: '1 - 2 Members',
        about:
          'Present scientific simulations and computational models spanning cryptography, numerical methods, and quantum gate logic.',
        rules: [
          'Live simulation walkthrough or working notebook required.',
          'Judged on mathematical formulation and innovation.',
        ],
        coordinators: [{ name: 'D. Keerthana', contact: '+91 98661 43298' }],
      },
    ],
  },
];

export const managementDepartmentsData: DepartmentItem[] = [
  {
    id: 'mba',
    name: 'Business Administration',
    code: 'MBA',
    japaneseName: '経営学科',
    alphabeticalOrder: 1,
    domain: 'Executive Strategy, Finance & Entrepreneurship',
    themeColor: '#b23ae8',
    tagline: 'Executive Leadership, Venture Strategy, Capital Markets & Brand Craft',
    description:
      'Cultivating strategic business leaders through crisis management simulations, venture capital pitch arenas, live equity trading, and brand strategy battles.',
    flagshipLab: 'MBA Executive Boardroom & Bloomberg Analytics Terminal',
    totalPrizePool: '₹1,15,000',
    studentStrength: '360+ Students',
    facultyMentor: 'Dr. M. Rajeshwari, Ph.D.',
    studentLead: {
      name: 'S. Abhiram Verma',
      phone: '+91 98482 33190',
      email: 'mba.supragna2k27@vrsiddhartha.ac.in',
    },
    events: [
      {
        id: 'mba-1',
        name: 'Best Manager: The Chanakya',
        category: 'Flagship',
        tagline: 'The Ultimate Test of Executive Leadership & Grit',
        prizePool: '₹35,000',
        schedule: 'Day 1 & Day 2 | 09:30 AM - 05:00 PM',
        venue: 'MBA Executive Boardroom',
        teamSize: 'Individual',
        about:
          'A grueling multi-stage test of stress management, situational ethics, corporate negotiation, press conferences, and boardroom turnaround strategy.',
        rules: [
          'Individual participation only; formal business attire mandatory.',
          'Includes preliminary aptitude, crisis role-play, and final executive panel interview.',
        ],
        coordinators: [
          { name: 'R. Siddharth', contact: '+91 94408 12345' },
          { name: 'K. Manasa', contact: '+91 81799 54321' },
        ],
        highlightBadge: 'Flagship Title',
      },
      {
        id: 'mba-2',
        name: 'PitchFest: Startup Crucible',
        category: 'Management',
        tagline: 'Turn Scalable Ideas into Investable Enterprises',
        prizePool: '₹40,000',
        schedule: 'Day 2 | 11:00 AM - 04:00 PM',
        venue: 'Incubation Center Auditorium',
        teamSize: '2 - 4 Members',
        about:
          'Pitch disruptive business concepts to angel investors and venture capitalists, defending financial projections, TAM/SAM analysis, and unit economics.',
        rules: [
          '10-minute pitch deck followed by 5-minute investor Q&A.',
          'Financial model sheet must be submitted 24 hours before event.',
        ],
        coordinators: [{ name: 'P. Nikhil', contact: '+91 90001 88776' }],
        highlightBadge: '₹40,000 Prize',
      },
      {
        id: 'mba-3',
        name: 'Wall Street Wizard',
        category: 'Management',
        tagline: 'Virtual High-Frequency Equity & Portfolio Trading',
        prizePool: '₹20,000',
        schedule: 'Day 1 | 01:00 PM - 04:30 PM',
        venue: 'Financial Analytics Terminal',
        teamSize: '1 - 2 Members',
        about:
          'Manage a virtual multi-crore portfolio across equities, commodities, and derivatives under live breaking news shocks and volatility spikes.',
        rules: [
          'Trading executes inside the campus market simulator.',
          'Evaluated on net portfolio ROI and risk-adjusted Sharpe ratio.',
        ],
        coordinators: [{ name: 'G. Vasavi', contact: '+91 99492 66712' }],
      },
      {
        id: 'mba-4',
        name: 'BrandStorm: Ad-Mad Reel',
        category: 'Management',
        tagline: 'Creative Product Positioning & Viral Advertising Blitz',
        prizePool: '₹20,000',
        schedule: 'Day 2 | 02:00 PM - 05:00 PM',
        venue: 'Media Studio Hall',
        teamSize: '3 - 5 Members',
        about:
          'Receive unpredictable product briefs on the spot and deliver a high-impact 60-second commercial storyboard and brand positioning campaign.',
        rules: [
          'Original jingle, taglines, and live enactment expected.',
          'Judged on humor, consumer insight, and recall value.',
        ],
        coordinators: [{ name: 'T. Harshavardhan', contact: '+91 83412 90876' }],
      },
    ],
  },
];

export const artsCommerceDepartmentsData: DepartmentItem[] = [
  {
    id: 'arts-commerce-dept',
    name: 'Arts & Commerce',
    code: 'A&C',
    japaneseName: '文学・商業学科',
    alphabeticalOrder: 1,
    domain: 'Performing Arts, Literature, Media & Forensic Commerce',
    themeColor: '#e83a7a',
    tagline: 'Cultural Brilliance, Visual Journalism, Parliamentary Debate & Auditing',
    description:
      'Celebrating artistic mastery, stage drama, cinema, parliamentary rhetoric, forensic accounting, and economic discourse across cultural and commerce stages.',
    flagshipLab: 'Main Amphitheatre, Cinema Hall & Commerce Audit Studio',
    totalPrizePool: '₹1,53,000',
    studentStrength: '520+ Students',
    facultyMentor: 'Dr. L. Padmavathi, Ph.D.',
    studentLead: {
      name: 'N. Ananya Sharma',
      phone: '+91 98490 77812',
      email: 'artscommerce.supragna2k27@vrsiddhartha.ac.in',
    },
    events: [
      {
        id: 'ac-1',
        name: 'Battle of the Bands',
        category: 'Cultural',
        tagline: 'Electric Rhythms, Fusion & Live Acoustic Mastery',
        prizePool: '₹45,000',
        schedule: 'Day 2 | 06:30 PM - 09:30 PM',
        venue: 'Main Festival Stage',
        teamSize: '4 - 8 Members',
        about:
          'College bands compete live across rock, indie, classical fusion, and contemporary genres on a full pro-audio concert rig.',
        rules: [
          '20 minutes total stage time including sound check.',
          'Pre-recorded backing tracks are strictly prohibited; live instruments only.',
        ],
        coordinators: [
          { name: 'V. Rahul', contact: '+91 94922 55101' },
          { name: 'S. Meghana', contact: '+91 80088 12904' },
        ],
        highlightBadge: 'Grand Stage',
      },
      {
        id: 'ac-2',
        name: 'Street Play (Nukkad Natak)',
        category: 'Cultural',
        tagline: 'Voice of the Streets, Soul of Social Drama',
        prizePool: '₹30,000',
        schedule: 'Day 2 | 03:30 PM - 06:00 PM',
        venue: 'Open Air Amphitheatre',
        teamSize: '8 - 15 Members',
        about:
          'High-energy open-air theatrical performances spotlighting social reform, civic harmony, and contemporary culture without microphones.',
        rules: [
          'Acoustic percussion and traditional props allowed.',
          'Judged on vocal projection, ensemble synchrony, and script impact.',
        ],
        coordinators: [{ name: 'B. Srinath', contact: '+91 97015 33412' }],
      },
      {
        id: 'ac-3',
        name: 'Short Film & Documentary Fest',
        category: 'Cultural',
        tagline: 'Cinematic Storytelling & Soundscape Direction',
        prizePool: '₹25,000',
        schedule: 'Day 2 | 04:00 PM - 06:30 PM',
        venue: 'Campus Cinema Hall',
        teamSize: '2 - 6 Members',
        about:
          'Big-screen showcase of original student short films and documentaries judged on cinematography, editing, screenplay, and sound design.',
        rules: [
          'Maximum runtime 15 minutes including credits; English subtitles mandatory.',
          'Original background score and copyright-cleared audio required.',
        ],
        coordinators: [{ name: 'K. Teja', contact: '+91 91779 44501' }],
      },
      {
        id: 'ac-4',
        name: 'Parliamentary Debate',
        category: 'Cultural',
        tagline: 'The Clash of Oratorical Titans',
        prizePool: '₹20,000',
        schedule: 'Day 1 | 02:00 PM - 05:30 PM',
        venue: 'Senate Chamber',
        teamSize: '3 Members',
        about:
          'Asian Parliamentary format debating on complex global economic, policy, ethical, and philosophical motions with rapid rebuttals.',
        rules: [
          'Standard 3v3 Asian Parliamentary rules with 15-minute prep time.',
          'Judged on argumentation depth, Points of Information, and rebuttal agility.',
        ],
        coordinators: [{ name: 'P. Vaishnavi', contact: '+91 89198 77623' }],
      },
      {
        id: 'ac-5',
        name: 'TaxAudit & Commerce Conclave',
        category: 'Technical',
        tagline: 'Forensic Accounting & Corporate Tax Compliance',
        prizePool: '₹18,000',
        schedule: 'Day 1 | 11:30 AM - 02:30 PM',
        venue: 'Commerce Block - Hall 4',
        teamSize: '2 Members',
        about:
          'Act as external forensic auditors to uncover simulated balance sheet discrepancies, ledger anomalies, and cross-border GST compliance errors.',
        rules: [
          'Calculators permitted; statutory reference tables provided on-site.',
          'Scored on discrepancy detection accuracy and audit report clarity.',
        ],
        coordinators: [{ name: 'M. Sai Charan', contact: '+91 95501 23890' }],
      },
      {
        id: 'ac-6',
        name: 'PhotoJournal: Lens of Truth',
        category: 'Cultural',
        tagline: 'Spot Photography & Visual Narrative Essays',
        prizePool: '₹15,000',
        schedule: 'Day 1 & Day 2 | Full Festival',
        venue: 'Campus-Wide Pavilion',
        teamSize: 'Individual',
        about:
          'Document authentic moments, light interplay, and cultural stories across the fest grounds through a curated 5-frame photo essay.',
        rules: [
          'RAW files required alongside final JPEGs; zero AI generation or composite edits.',
          'Basic tonal color grading permitted only.',
        ],
        coordinators: [{ name: 'R. Vignesh', contact: '+91 99895 66102' }],
      },
    ],
  },
];

export const lawDepartmentsData: DepartmentItem[] = [
  {
    id: 'law-dept',
    name: 'Department of Law',
    code: 'LAW',
    japaneseName: '法学科',
    alphabeticalOrder: 1,
    domain: 'Constitutional Advocacy, Arbitration & Cyber Forensics',
    themeColor: '#48c774',
    tagline: 'Justice, Appellate Advocacy, Commercial Arbitration & Forensic Law',
    description:
      'Training sharp legal minds through appellate moot courts before esteemed jurists, commercial client counseling, constitutional quizzes, and forensic crime scene deduction.',
    flagshipLab: 'Moot Court Hall, Arbitration Chamber & Forensics Simulation Lab',
    totalPrizePool: '₹1,00,000',
    studentStrength: '340+ Students',
    facultyMentor: 'Dr. K. Suryanarayana, LL.D.',
    studentLead: {
      name: 'A. Pradyumna Rao',
      phone: '+91 98489 44120',
      email: 'law.supragna2k27@vrsiddhartha.ac.in',
    },
    events: [
      {
        id: 'law-1',
        name: 'National Moot Court Competition',
        category: 'Flagship',
        tagline: 'Appellate Advocacy Before Distinguished Jurists',
        prizePool: '₹40,000',
        schedule: 'Day 1 & Day 2 | 09:30 AM - 05:00 PM',
        venue: 'Moot Court Hall 1',
        teamSize: '3 Members (2 Speakers + 1 Researcher)',
        about:
          'Prestigious constitutional and statutory appellate simulation requiring exhaustive petitioner and respondent memorials alongside incisive oral arguments.',
        rules: [
          'Both Petitioner and Respondent written memorials due prior to preliminary rounds.',
          'Courtroom decorum and formal black-and-white advocate dress code mandatory.',
        ],
        coordinators: [
          { name: 'S. Nandini', contact: '+91 94402 88912' },
          { name: 'G. Karthikeya', contact: '+91 81214 55901' },
        ],
        highlightBadge: 'Flagship Moot',
      },
      {
        id: 'law-2',
        name: 'Crime Scene Investigation (CSI)',
        category: 'Legal',
        tagline: 'Forensic Deduction, Evidence Preservation & Charge Framing',
        prizePool: '₹25,000',
        schedule: 'Day 2 | 02:00 PM - 05:30 PM',
        venue: 'Forensics Simulation Lab',
        teamSize: '2 - 3 Members',
        about:
          'Examine staged crime scenes, inspect physical evidence, decode encrypted digital logs, and draft a watertight legal charge sheet under penal procedure.',
        rules: [
          'Strict chain-of-custody protocol during evidence inspection.',
          'Final dossier argued before prosecution review panel.',
        ],
        coordinators: [{ name: 'R. Chandana', contact: '+91 90521 33409' }],
        highlightBadge: 'Forensic Trial',
      },
      {
        id: 'law-3',
        name: 'Client Counseling & Arbitration',
        category: 'Legal',
        tagline: 'Simulated Commercial Dispute Resolution & Mediation',
        prizePool: '₹20,000',
        schedule: 'Day 2 | 11:30 AM - 03:00 PM',
        venue: 'Arbitration Chamber',
        teamSize: '2 Members',
        about:
          'Interview distressed corporate clients, identify contractual exposure, and negotiate pragmatic out-of-court settlement agreements in real time.',
        rules: [
          'Evaluated on empathy, legal risk mapping, and ADR settlement fairness.',
        ],
        coordinators: [{ name: 'P. Sravani', contact: '+91 97032 66189' }],
      },
      {
        id: 'law-4',
        name: 'Constitutional Law Conclave',
        category: 'Legal',
        tagline: 'National Legal Quiz & Landmark Jurisprudence Analysis',
        prizePool: '₹15,000',
        schedule: 'Day 1 | 03:30 PM - 06:00 PM',
        venue: 'Law Seminar Hall',
        teamSize: '2 Members',
        about:
          'Rapid-fire and analytical quiz spanning Constitutional amendments, landmark Supreme Court verdicts, legal maxims, and comparative jurisprudence.',
        rules: [
          'Written screening prelims followed by 4 buzzer and case-analysis stage rounds.',
        ],
        coordinators: [{ name: 'V. Lokesh', contact: '+91 88850 99123' }],
      },
    ],
  },
];

export const schoolsConfigMap: Record<SchoolId, SchoolPageConfig> = {
  engineering: {
    id: 'engineering',
    name: 'School of Engineering',
    shortName: 'Engineering',
    route: '/engineering',
    searchPlaceholder: 'Search engineering departments or competitions...',
    filterTabs: [
      { id: 'all', label: 'All Departments (7)' },
      { id: 'software', label: 'Computing & AI (AI, CSE)', matchIds: ['ai', 'cse'] },
      { id: 'circuits', label: 'Circuits & Instrumentation (ECE, EEE, EIE)', matchIds: ['ece', 'eee', 'eie'] },
      { id: 'core', label: 'Core Infrastructure (CE, ME)', matchIds: ['ce', 'me'] },
    ],
    departments: engineeringDepartmentsData,
  },
  science: {
    id: 'science',
    name: 'School of Science',
    shortName: 'Science',
    route: '/science',
    searchPlaceholder: 'Search science departments or competitions...',
    filterTabs: [
      { id: 'all', label: 'All Departments (2)' },
      { id: 'pg', label: 'Postgraduate (MCA)', matchIds: ['mca'] },
      { id: 'ug', label: 'Undergraduate (B.Sc Honours)', matchIds: ['bsc-cs'] },
    ],
    departments: scienceDepartmentsData,
  },
  management: {
    id: 'management',
    name: 'School of Management',
    shortName: 'Management',
    route: '/management',
    searchPlaceholder: 'Search management programs or competitions...',
    filterTabs: [{ id: 'all', label: 'All Departments (1)' }],
    departments: managementDepartmentsData,
  },
  'arts-commerce': {
    id: 'arts-commerce',
    name: 'School of Arts & Commerce',
    shortName: 'Arts & Commerce',
    route: '/arts-commerce',
    searchPlaceholder: 'Search arts & commerce events or competitions...',
    filterTabs: [{ id: 'all', label: 'All Departments (1)' }],
    departments: artsCommerceDepartmentsData,
  },
  law: {
    id: 'law',
    name: 'School of Law',
    shortName: 'Law',
    route: '/law',
    searchPlaceholder: 'Search law competitions or legal events...',
    filterTabs: [{ id: 'all', label: 'All Departments (1)' }],
    departments: lawDepartmentsData,
  },
};

export const schoolNavigationList: { id: SchoolId; name: string; shortName: string; route: string }[] = [
  { id: 'engineering', name: 'School of Engineering', shortName: 'Engineering', route: '/engineering' },
  { id: 'science', name: 'School of Science', shortName: 'Science', route: '/science' },
  { id: 'management', name: 'School of Management', shortName: 'Management', route: '/management' },
  { id: 'arts-commerce', name: 'School of Arts & Commerce', shortName: 'Arts & Commerce', route: '/arts-commerce' },
  { id: 'law', name: 'School of Law', shortName: 'Law', route: '/law' },
];
