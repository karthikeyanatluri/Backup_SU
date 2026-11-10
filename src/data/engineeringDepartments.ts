export interface CompetitionEvent {
  id: string;
  name: string;
  category:
    | 'Flagship'
    | 'Technical'
    | 'Hackathon'
    | 'Design & Build'
    | 'Robotics / Combat'
    | 'Management'
    | 'Cultural'
    | 'Legal';
  tagline: string;
  prizePool: string;
  schedule: string;
  venue: string;
  teamSize: string;
  about: string;
  rules: string[];
  coordinators: { name: string; contact: string }[];
  highlightBadge?: string;
}

export interface EngineeringDepartment {
  id: string;
  name: string;
  code: string;
  japaneseName: string;
  alphabeticalOrder: number;
  domain: string;
  themeColor: string;
  tagline: string;
  description: string;
  flagshipLab: string;
  totalPrizePool: string;
  studentStrength: string;
  facultyMentor: string;
  studentLead: { name: string; phone: string; email: string };
  events: CompetitionEvent[];
}

export type DepartmentItem = EngineeringDepartment;

export const engineeringDepartmentsData: EngineeringDepartment[] = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    code: "AI",
    japaneseName: "人工知能学科",
    alphabeticalOrder: 1,
    domain: "Computing & Cognitive Systems",
    themeColor: "#e67e22",
    tagline: "Advancing Artificial Intelligence, Machine Learning & Modern Data Systems",
    description: "At the leading edge of modern cognitive engineering, AI & DS encompasses generative models, intelligent autonomous systems, computer vision, and large-scale predictive analytics.",
    flagshipLab: "NVIDIA Deep Learning & AI Center of Excellence",
    totalPrizePool: "₹85,000",
    studentStrength: "480+ Students",
    facultyMentor: "Dr. K. Srinivas, Ph.D.",
    studentLead: {
      name: "Aditya Varma",
      phone: "+91 98480 22311",
      email: "ai.supragna2k27@vrsiddhartha.ac.in",
    },
    events: [
      {
        id: "ai-1",
        name: "AI Odyssey: Model Building Hackathon",
        category: "Flagship",
        tagline: "Build Autonomous Multimodal Agents & Intelligent Pipelines",
        prizePool: "₹40,000",
        schedule: "Day 1 | 10:30 AM - 04:30 PM",
        venue: "Turing Lab 1, Tech Block",
        teamSize: "2 - 4 Members",
        about: "Compete to develop multimodal AI workflows, fine-tuned domain models, and practical application pipelines with live latency and accuracy evaluation.",
        rules: [
          "Open-source models and standard inference tools are permitted.",
          "Evaluation is based on model performance, reasoning benchmarks, and UI quality.",
          "Final presentation with live demo required before the evaluation panel."
        ],
        coordinators: [
          { name: "S. Harshitha", contact: "+91 94401 23891" },
          { name: "P. Rohith", contact: "+91 81255 90123" }
        ],
        highlightBadge: "Flagship Event"
      },
      {
        id: "ai-2",
        name: "Neural Vision Challenge",
        category: "Technical",
        tagline: "Computer Vision & Visual Pattern Recognition",
        prizePool: "₹25,000",
        schedule: "Day 2 | 11:00 AM - 02:00 PM",
        venue: "Vision Computing Center",
        teamSize: "1 - 3 Members",
        about: "Develop real-time models to detect anomalies, track objects, and process high-speed image streams under variable lighting and noise constraints.",
        rules: [
          "Evaluation dataset provided at the start of the competition.",
          "Standard GPU compute environments provided to all participants.",
          "Submissions tested on unseen validation data."
        ],
        coordinators: [
          { name: "M. Tanuja", contact: "+91 99890 44521" }
        ]
      },
      {
        id: "ai-3",
        name: "Data Viz Summit",
        category: "Technical",
        tagline: "Analytical Storytelling from Complex Big Data",
        prizePool: "₹20,000",
        schedule: "Day 2 | 02:30 PM - 05:00 PM",
        venue: "Seminar Hall 2",
        teamSize: "1 - 2 Members",
        about: "Transform complex real-world data dumps into interactive, high-clarity analytical dashboards that deliver actionable insights.",
        rules: [
          "Any modern visualization stack is accepted.",
          "Judged on analytical accuracy, clarity, and visual presentation."
        ],
        coordinators: [
          { name: "V. Sai Kumar", contact: "+91 89190 77412" }
        ]
      }
    ]
  },
  {
    id: "ce",
    name: "Civil Engineering",
    code: "CE",
    japaneseName: "土木工学科",
    alphabeticalOrder: 2,
    domain: "Structural & Environmental Engineering",
    themeColor: "#27ae60",
    tagline: "Constructing Resilient Foundations & Sustainable Horizons",
    description: "Focusing on sustainable structural engineering, earthquake-resistant design, modern urban infrastructure planning, and environmental hydraulics.",
    flagshipLab: "Heavy Structures & Material Testing Bay",
    totalPrizePool: "₹65,000",
    studentStrength: "360+ Students",
    facultyMentor: "Dr. N. R. K. Murthy, Ph.D.",
    studentLead: {
      name: "Tarun Chowdary",
      phone: "+91 97011 88922",
      email: "ce.supragna2k27@vrsiddhartha.ac.in",
    },
    events: [
      {
        id: "ce-1",
        name: "BridgeCraft: Structural Truss Challenge",
        category: "Design & Build",
        tagline: "Maximizing Strength-to-Weight Efficiency Under Load",
        prizePool: "₹25,000",
        schedule: "Day 1 | 01:00 PM - 05:00 PM",
        venue: "Structural Mechanics Lab",
        teamSize: "2 - 4 Members",
        about: "Design and assemble an intricate truss bridge using specified lightweight materials, tested on hydraulic load frames to measure ultimate load-to-weight ratio.",
        rules: [
          "Standard construction materials provided on site.",
          "Geometric constraints for span and clearance strictly enforced.",
          "Highest load-to-weight ratio wins."
        ],
        coordinators: [
          { name: "B. Kalyan", contact: "+91 93478 51230" },
          { name: "K. Tejaswini", contact: "+91 70134 98711" }
        ],
        highlightBadge: "High Participation"
      },
      {
        id: "ce-2",
        name: "Seismic Design Challenge",
        category: "Flagship",
        tagline: "Multi-Storey Structural Resistance Simulation",
        prizePool: "₹25,000",
        schedule: "Day 2 | 10:30 AM - 01:30 PM",
        venue: "Structural Dynamics Center",
        teamSize: "2 - 3 Members",
        about: "Construct multi-storey models evaluated on shake tables simulating seismic harmonic waves to test base shear and dynamic stability.",
        rules: [
          "Standard dimensional parameters provided before kickoff.",
          "Evaluated on survival time and vibration damping performance."
        ],
        coordinators: [
          { name: "D. Sravan", contact: "+91 80081 22904" }
        ]
      },
      {
        id: "ce-3",
        name: "Urban Infrastructure CAD Expo",
        category: "Technical",
        tagline: "BIM & CAD Planning for Future Smart Cities",
        prizePool: "₹15,000",
        schedule: "Day 2 | 02:00 PM - 04:30 PM",
        venue: "Civil CAD Computing Suite",
        teamSize: "1 - 2 Members",
        about: "Design sustainable urban layouts, transportation intersections, and stormwater drainage systems using modern CAD software.",
        rules: [
          "CAD software: AutoCAD or Civil 3D.",
          "Deliverables include layout plans and elevation profiles."
        ],
        coordinators: [
          { name: "Y. Anusha", contact: "+91 91772 33481" }
        ]
      }
    ]
  },
  {
    id: "cse",
    name: "Computer Science & Engineering",
    code: "CSE",
    japaneseName: "計算機工学科",
    alphabeticalOrder: 3,
    domain: "Software & Distributed Computing",
    themeColor: "#8e44ad",
    tagline: "Innovating Software Architectures, Algorithms & Modern Cloud Platforms",
    description: "The core computing division addressing high-performance distributed systems, algorithm design, system security, and full-stack software development.",
    flagshipLab: "High Performance Computing & Cloud Lab",
    totalPrizePool: "₹1,05,000",
    studentStrength: "720+ Students",
    facultyMentor: "Dr. Ch. Anuradha, Ph.D.",
    studentLead: {
      name: "Gautham Krishna",
      phone: "+91 94901 33455",
      email: "cse.supragna2k27@vrsiddhartha.ac.in",
    },
    events: [
      {
        id: "cse-1",
        name: "Code Genesis: 24-Hour Hackathon",
        category: "Hackathon",
        tagline: "National Level Overnight Software Development Marathon",
        prizePool: "₹50,000",
        schedule: "Day 1 10:00 AM - Day 2 10:00 AM",
        venue: "Main Computing Complex",
        teamSize: "3 - 4 Members",
        about: "24-hour sprint to build innovative, functional solutions across Web3, Cloud Infrastructure, Developer Tooling, and Smart Applications.",
        rules: [
          "Work must begin after problem statements are announced.",
          "Repositories will be monitored for commit progress.",
          "Judged by senior software professionals on design, implementation, and feasibility."
        ],
        coordinators: [
          { name: "R. Sai Teja", contact: "+91 91212 34567" },
          { name: "N. Priyanka", contact: "+91 88865 43210" }
        ],
        highlightBadge: "₹50,000 Prize"
      },
      {
        id: "cse-2",
        name: "Bug Hunt & Reverse Engineering",
        category: "Technical",
        tagline: "Identify Glitches, Trace Vulnerabilities & Optimize Execution",
        prizePool: "₹25,000",
        schedule: "Day 2 | 11:30 AM - 02:00 PM",
        venue: "Lab 2, Turing Block",
        teamSize: "1 - 2 Members",
        about: "Analyze codebases and binaries to discover logic errors, security vulnerabilities, and memory leaks within strict time limits.",
        rules: [
          "Standard disassemblers and debugging tools permitted.",
          "Points awarded based on speed and patch quality."
        ],
        coordinators: [
          { name: "V. Karthik", contact: "+91 97003 44122" }
        ]
      },
      {
        id: "cse-3",
        name: "Algo-Mania Challenge",
        category: "Technical",
        tagline: "ICPC-Style Competitive Programming Contest",
        prizePool: "₹30,000",
        schedule: "Day 1 | 02:00 PM - 05:00 PM",
        venue: "Central Computing Lab",
        teamSize: "1 - 2 Members",
        about: "Speed programming battle covering data structures, graph theory, mathematical logic, and dynamic programming.",
        rules: [
          "Time penalty applied for incorrect submissions.",
          "Accepted languages: C++, Java, Python."
        ],
        coordinators: [
          { name: "P. Vignesh", contact: "+91 90520 89123" }
        ]
      }
    ]
  },
  {
    id: "ece",
    name: "Electronics & Communication Engineering",
    code: "ECE",
    japaneseName: "電子通信学科",
    alphabeticalOrder: 5,
    domain: "VLSI, Embedded Systems & Telecommunications",
    themeColor: "#c0392b",
    tagline: "Connecting Silicon Microelectronics, Wireless Communications & Robotics",
    description: "Covering advanced VLSI circuit design, high-frequency antenna systems, embedded robotics, signal processing, and next-generation telecommunications.",
    flagshipLab: "Cadence VLSI Design & Robotics Prototyping Bay",
    totalPrizePool: "₹95,000",
    studentStrength: "600+ Students",
    facultyMentor: "Dr. P. V. Subbaiah, Ph.D.",
    studentLead: {
      name: "Sanjay Namburi",
      phone: "+91 96180 77123",
      email: "ece.supragna2k27@vrsiddhartha.ac.in",
    },
    events: [
      {
        id: "ece-1",
        name: "RoboWars: Combat Arena",
        category: "Robotics / Combat",
        tagline: "Heavyweight RC Combat Robotics in the Enclosed Arena",
        prizePool: "₹45,000",
        schedule: "Day 2 | 02:00 PM - 06:00 PM",
        venue: "Central Open Arena",
        teamSize: "2 - 5 Members",
        about: "Custom-built RC combat robots clash in a secured arena equipped with pneumatic weapons, spinning cutters, and wedges.",
        rules: [
          "15kg and 30kg weight categories.",
          "Failsafe switches mandatory on all machines.",
          "Knockout tournament rules apply."
        ],
        coordinators: [
          { name: "L. Dinesh", contact: "+91 99591 66723" },
          { name: "A. Meghana", contact: "+91 87900 44192" }
        ],
        highlightBadge: "Arena Combat"
      },
      {
        id: "ece-2",
        name: "ElectroBlitz: Circuit Design Quest",
        category: "Technical",
        tagline: "Hardware Circuit Synthesis, Debugging & Testing",
        prizePool: "₹25,000",
        schedule: "Day 1 | 11:00 AM - 02:00 PM",
        venue: "VLSI & Embedded Lab",
        teamSize: "2 Members",
        about: "Decode complex circuit schematics, build functional breadboard prototypes, and troubleshoot signal distortions under time limits.",
        rules: [
          "Components and measuring instruments provided on-site.",
          "Evaluated on circuit functionality, neatness, and completion time."
        ],
        coordinators: [
          { name: "M. Naveen", contact: "+91 91771 88204" }
        ]
      },
      {
        id: "ece-3",
        name: "Silicon Die: Sub-Micron VLSI Challenge",
        category: "Technical",
        tagline: "Digital Design & RTL Synthesis in Verilog",
        prizePool: "₹25,000",
        schedule: "Day 2 | 10:00 AM - 01:00 PM",
        venue: "EDA Workstation Lab",
        teamSize: "1 - 2 Members",
        about: "Implement digital IP cores, optimize area and timing constraints, and simulate logic blocks using industry-standard EDA tools.",
        rules: [
          "EDA synthesis suite provided on lab systems.",
          "Scored on timing closure, power consumption, and gate count."
        ],
        coordinators: [
          { name: "B. Srikanth", contact: "+91 81211 44550" }
        ]
      }
    ]
  },
  {
    id: "eee",
    name: "Electrical & Electronics Engineering",
    code: "EEE",
    japaneseName: "電気工学科",
    alphabeticalOrder: 4,
    domain: "Power Systems & Renewable Energy",
    themeColor: "#d35400",
    tagline: "Powering Smart Grids, Electric Mobility & Sustainable Energy",
    description: "Dedicated to power electronic converters, smart microgrids, electric vehicle powertrain technologies, and renewable power integration.",
    flagshipLab: "Power Systems Simulation & Electric Drives Center",
    totalPrizePool: "₹60,000",
    studentStrength: "400+ Students",
    facultyMentor: "Dr. M. Suman, Ph.D.",
    studentLead: {
      name: "B. Venkatesh",
      phone: "+91 98492 55677",
      email: "eee.supragna2k27@vrsiddhartha.ac.in",
    },
    events: [
      {
        id: "eee-1",
        name: "SparkInnovate: Green Energy Prototype Expo",
        category: "Flagship",
        tagline: "Hardware Working Models for Clean Energy & Smart Grids",
        prizePool: "₹25,000",
        schedule: "Day 1 | 02:00 PM - 05:30 PM",
        venue: "Electrical Machines Pavilion",
        teamSize: "2 - 4 Members",
        about: "Display functioning hardware models in EV charging, solar MPPT tracking, battery management, and grid energy stabilization.",
        rules: [
          "Working demonstration is mandatory.",
          "Adherence to electrical safety guidelines required.",
          "Judged on innovation, efficiency, and commercial feasibility."
        ],
        coordinators: [
          { name: "K. Bhanu Prakash", contact: "+91 95531 22441" },
          { name: "T. Swetha", contact: "+91 83091 55672" }
        ],
        highlightBadge: "Hardware Demo"
      },
      {
        id: "eee-2",
        name: "VoltSurge: Microgrid Simulation Challenge",
        category: "Technical",
        tagline: "MATLAB/Simulink Power Grid Transient Analysis",
        prizePool: "₹20,000",
        schedule: "Day 2 | 10:30 AM - 01:00 PM",
        venue: "Power Systems Simulation Bay",
        teamSize: "1 - 2 Members",
        about: "Model power flow, tune control loops, and stabilize frequency during grid fault scenarios using simulation software.",
        rules: [
          "Base system model provided at start.",
          "Tasks evaluated on voltage recovery and harmonic compliance."
        ],
        coordinators: [
          { name: "G. Mahesh", contact: "+91 79934 11200" }
        ]
      },
      {
        id: "eee-3",
        name: "Circuit Master Duel",
        category: "Technical",
        tagline: "Rapid Breadboard Synthesis of Analog & Power Circuits",
        prizePool: "₹15,000",
        schedule: "Day 2 | 02:00 PM - 04:30 PM",
        venue: "Measurements & Instrumentation Lab",
        teamSize: "2 Members",
        about: "Wire, calibrate, and verify analog filters and switching power circuits against target specifications.",
        rules: [
          "Speed and circuit accuracy both factored into scoring."
        ],
        coordinators: [
          { name: "J. Hemanth", contact: "+91 94411 99823" }
        ]
      }
    ]
  },
  {
    id: "eie",
    name: "Electronics & Instrumentation Engineering",
    code: "EIE",
    japaneseName: "電子計測工学科",
    alphabeticalOrder: 6,
    domain: "Sensors, Automation & Industrial IoT",
    themeColor: "#16a085",
    tagline: "Sensors, Automation, Biomedical Telemetry & Industrial IoT",
    description: "Bridging physical sensor transducers with intelligent digital automation, process control loops, PLC/SCADA architecture, and biomedical instrumentation.",
    flagshipLab: "Process Control & Industrial Automation Center",
    totalPrizePool: "₹65,000",
    studentStrength: "320+ Students",
    facultyMentor: "Dr. G. N. Swamy, Ph.D.",
    studentLead: {
      name: "K. Sai Praneeth",
      phone: "+91 95022 11844",
      email: "eie.supragna2k27@vrsiddhartha.ac.in",
    },
    events: [
      {
        id: "eie-1",
        name: "SensorVerse: Industrial IoT & Automation Expo",
        category: "Flagship",
        tagline: "PLC, SCADA & Wireless Telemetry Process Control",
        prizePool: "₹25,000",
        schedule: "Day 1 | 01:30 PM - 05:00 PM",
        venue: "Instrumentation & Process Control Lab",
        teamSize: "2 - 4 Members",
        about: "Calibrate industrial transducers, design automated sorting lines with PLC ladder logic, and stream sensor telemetry over MQTT to cloud dashboards.",
        rules: [
          "Standard PLC workbenches and sensor kits provided on-site.",
          "Evaluation based on tuning precision, safety interlocks, and telemetry latency."
        ],
        coordinators: [
          { name: "P. Rajesh", contact: "+91 94911 33201" },
          { name: "M. Bhavya", contact: "+91 81210 77654" }
        ],
        highlightBadge: "Automation Arena"
      },
      {
        id: "eie-2",
        name: "BioSensing & Biomedical Instrumentation Challenge",
        category: "Technical",
        tagline: "Biopotential Amplification & Physiological Signal Acquisition",
        prizePool: "₹20,000",
        schedule: "Day 2 | 10:30 AM - 01:30 PM",
        venue: "Biomedical Instrumentation Center",
        teamSize: "1 - 3 Members",
        about: "Design low-noise instrumentation amplifiers, analog notch filters, and digital signal processing pipelines for ECG and EMG physiological signals.",
        rules: [
          "Instrumentation components and digital storage oscilloscopes provided.",
          "Judged on noise rejection ratio (CMRR), signal stability, and filter response."
        ],
        coordinators: [
          { name: "S. Divya", contact: "+91 98481 99023" }
        ]
      },
      {
        id: "eie-3",
        name: "Transducer Quest: Sensor Calibration Duel",
        category: "Technical",
        tagline: "Rapid Sensor Interfacing & Signal Conditioning",
        prizePool: "₹20,000",
        schedule: "Day 2 | 02:00 PM - 04:30 PM",
        venue: "Measurements & Transducers Lab",
        teamSize: "2 Members",
        about: "Diagnose, linearize, and interface temperature, pressure, strain, and optical sensors with microcontrollers under time constraints.",
        rules: [
          "Components and calibration standards provided at start.",
          "Scored on linearity, precision, and completion speed."
        ],
        coordinators: [
          { name: "V. Harish", contact: "+91 99660 44189" }
        ]
      }
    ]
  },
  {
    id: "me",
    name: "Mechanical Engineering",
    code: "ME",
    japaneseName: "機械工学科",
    alphabeticalOrder: 7,
    domain: "Aerospace, Manufacturing & Robotics",
    themeColor: "#c0392b",
    tagline: "Shaping Advanced Manufacturing, Dynamics & Thermal Systems",
    description: "Advancing mechanical design, computational fluid dynamics, aerodynamics, automated CNC manufacturing, and automotive mobility.",
    flagshipLab: "Central Production Workshops & Wind Tunnel Facility",
    totalPrizePool: "₹75,000",
    studentStrength: "500+ Students",
    facultyMentor: "Dr. K. Ravindra, Ph.D.",
    studentLead: {
      name: "Chaitanya Sai",
      phone: "+91 97033 44566",
      email: "me.supragna2k27@vrsiddhartha.ac.in",
    },
    events: [
      {
        id: "me-1",
        name: "CAD Design Clash: 3D Modeling Sprint",
        category: "Technical",
        tagline: "Parametric 3D Modeling & FEA Stress Analysis",
        prizePool: "₹25,000",
        schedule: "Day 1 | 01:30 PM - 05:00 PM",
        venue: "CAD/CAM Workstation Lab",
        teamSize: "1 - 2 Members",
        about: "Convert 2D design specifications into fully constrained 3D parametric models and perform finite element stress analysis under load.",
        rules: [
          "Software: SolidWorks or Fusion 360.",
          "Evaluated on geometric accuracy, feature hierarchy, and modeling speed."
        ],
        coordinators: [
          { name: "T. Akhil", contact: "+91 94944 88123" },
          { name: "P. Bhavani", contact: "+91 80084 77610" }
        ],
        highlightBadge: "CAD Challenge"
      },
      {
        id: "me-2",
        name: "AeroX: Wind Tunnel & Glider Derby",
        category: "Flagship",
        tagline: "Aerodynamic Airfoil Design & Subsonic Testing",
        prizePool: "₹30,000",
        schedule: "Day 2 | 11:00 AM - 03:00 PM",
        venue: "Fluids Lab & Main Campus Oval",
        teamSize: "2 - 4 Members",
        about: "Fabricate lightweight aerodynamic gliders tested in our subsonic wind tunnel and launched for maximum flight endurance.",
        rules: [
          "Span and weight restrictions apply.",
          "Scored on flight distance, stability, and aerodynamic design."
        ],
        coordinators: [
          { name: "V. Praneeth", contact: "+91 91219 00412" }
        ]
      },
      {
        id: "me-3",
        name: "Junkyard Wars: Mechanism Fabrication",
        category: "Design & Build",
        tagline: "Rapid Prototyping from Reclaimed Workshop Materials",
        prizePool: "₹20,000",
        schedule: "Day 2 | 02:30 PM - 05:30 PM",
        venue: "Central Mechanical Foundry Yard",
        teamSize: "3 - 5 Members",
        about: "Fabricate mechanical launcher mechanisms within 180 minutes using provided scrap components and standard workshop tools.",
        rules: [
          "Workshop tools and personal safety equipment provided.",
          "Target projectile accuracy determines final ranking."
        ],
        coordinators: [
          { name: "M. Durga Prasad", contact: "+91 96420 33901" }
        ]
      }
    ]
  }
];
