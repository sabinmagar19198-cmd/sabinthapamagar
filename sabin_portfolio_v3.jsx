import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const SKILLS = [
  { icon: "📡", title: "Communication & Antenna Systems", desc: "Wireless communication theory, antenna design, propagation analysis, satellite communication, and RF & microwave engineering.", tags: ["RF Engineering", "Propagation & Antenna", "Satellite Comms", "Wireless Systems"] },
  { icon: "🔌", title: "Embedded Systems & IoT", desc: "Microprocessor and embedded system design, Raspberry Pi programming, IoT integration, sensor interfacing, and real-time control systems.", tags: ["Raspberry Pi", "IoT", "Microprocessors", "Embedded C"] },
  { icon: "⚙️", title: "Industrial Automation", desc: "PLC programming (Siemens & Delta), HMI configuration, SCADA systems, industrial switchgears, and sensor-based automation design.", tags: ["Siemens PLC", "Delta PLC", "HMI", "SCADA"] },
  { icon: "💻", title: "Programming & Algorithms", desc: "Object-oriented programming, data structures & algorithms, database management, and computer network fundamentals.", tags: ["C / C++", "Python", "OOP", "Data Structures", "SQL"] },
  { icon: "🔬", title: "Electronics & Circuit Design", desc: "Digital logic design, electronic devices & circuits, control systems, signal processing, and advanced electronics engineering.", tags: ["Digital Logic", "Circuit Analysis", "Control Systems", "Signal Processing"] },
  { icon: "📊", title: "Big Data & Information Systems", desc: "Information systems design, big data technologies, multimedia systems, telecommunication networks, and operating systems.", tags: ["Big Data", "Telecom Systems", "OS", "Multimedia"] },
];

const PROJECTS = [
  { num: "01", kicker: "Final Year Project · Embedded Systems", title: "IoT-Based Smart Monitoring System", desc: "Raspberry Pi-based IoT system integrating multiple sensors for real-time data acquisition, remote monitoring, and automated alert generation via wireless communication protocols.", tech: ["Raspberry Pi", "Python", "MQTT", "Sensors", "IoT"], status: "done", statusLabel: "Completed" },
  { num: "02", kicker: "Robotics Competition · HEX-2023", title: "Autonomous Robo Race Vehicle", desc: "Designed and built an autonomous robot for the HEX-2023 Robo Race at Himalaya College of Engineering. Motor control, sensor-based navigation, and real-time obstacle detection.", tech: ["Microcontroller", "Motor Driver", "IR Sensors", "C/C++"], status: "done", statusLabel: "Completed · HEX-2023" },
  { num: "03", kicker: "PLC & Industrial Automation", title: "Industrial Automation Control System", desc: "PLC-based industrial control system using Siemens and Delta PLCs with HMI panel programming and SCADA integration, applied from 60-hour KEC training.", tech: ["Siemens PLC", "Delta PLC", "HMI", "SCADA", "Ladder Logic"], status: "done", statusLabel: "Completed · KEC Lab" },
  { num: "04", kicker: "Personal Project · IoT Security", title: "ESP32 RFID Access Control System", desc: "Implemented an ESP32-based RFID authentication system with real-time monitoring dashboard, exposing and addressing vulnerabilities in low-cost access control deployments.", tech: ["ESP32", "RFID", "MicroPython", "Firebase"], status: "progress", statusLabel: "In Progress" },
];

const ACHIEVEMENTS = [
  { year: "2025 · KEC · TU", title: "B.E. Provisional Certificate — First Division", org: "Tribhuvan University, Office of the Controller of Examinations, Balkhu, Kathmandu. Roll No: 34611 · Reg. No: 3-2-368-202-2020." },
  { year: "2025 · KEC", title: "Character Certificate — Good Conduct", org: "Kantipur Engineering College, Dhapakhel, Lalitpur. First Division in Electronics, Communication & Information Engineering (2077–2081 B.S.)." },
  { year: "June–July 2023 · KEC RTCD", title: "Certificate — Raspberry Pi with IoT", org: "60-hour training by Research, Training & Consultancy Division, Kantipur Engineering College. Hands-on IoT system development with Raspberry Pi." },
  { year: "June 2024 · KEC Automation Lab", title: "Certificate — Industrial Automation", org: "60-hour course covering Industrial Switchgears, Sensors, Siemens & Delta PLC, HMI, and SCADA (Erasmus+ eACCESS Project)." },
  { year: "HEX-2023 · Himalaya COE", title: "Certificate of Appreciation — Robo Race", org: "Awarded by Himalaya Robotics Club for participating in the HEX-2023 Robo Race competition." },
  { year: "January 2023 · NCE", title: "Certificate of Appreciation — YATRA 4.0 Robo Sumo", org: "Participated in Robo Sumo at YATRA 4.0 \"Stage of Innovation\" organized by NCE Robotics Club, 20–21 January 2023." },
  { year: "December 2023 · ICT Mela 4.0", title: "Certificate of Achievement — Robo Soccer 1.0", org: "Awarded for participating in Robo Soccer 1.0 at ICT Mela 4.0, Kumaripati, Lalitpur. Organized by Virinchi College." },
  { year: "16 April 2026 · Pearson", title: "PTE Academic — Overall Score 68", org: "Score Report Code: 4519728AJB · Test Centre: LA GRANDEE International College, Nepal (Centre ID: 88209). Valid until 16 Apr 2028." },
];

const TRANSCRIPT = [
  { year: "Year I — Part 1 & 2", total: "1500 marks · 949 total", subjects: [
    ["Engineering Mathematics I", "59/100"], ["Engineering Physics", "50/100"], ["Physics Lab", "21/50"],
    ["Engineering Drawing I", "82/100"], ["Drawing Lab", "35/50"], ["Workshop Technology", "21/50"],
    ["Computer Programming", "58/100"], ["Programming Lab", "35/50"],
    ["Engineering Mathematics II", "52/100"], ["Engineering Chemistry", "60/100"],
    ["Chemistry Lab", "22/50"], ["Drawing II", "71/100"], ["Electrical Circuit", "75/100"],
    ["Circuit Lab", "22/50"], ["Applied Mechanics", "60/100"],
    ["Engineering Mathematics III", "52/100"], ["Probability & Statistics", "59/100"],
  ]},
  { year: "Year III — Part 1 & 2", total: "1600 marks · 1036 total", subjects: [
    ["Engineering Economics", "49/100"], ["Comp. Organisation & Arch.", "55/100"], ["Computer Org. (Prac)", "21/50"],
    ["Database Management Systems", "65/100"], ["Database (Prac)", "46/50"], ["Operating Systems", "46/100"],
    ["OS (Prac)", "23/50"], ["Computer Network", "58/100"], ["Filter Design", "50/100"],
    ["Filter Design (Prac)", "62/50"], ["Embedded System", "53/100"], ["Embedded System (Prac)", "23/50"],
    ["Project Management", "46/100"], ["OOSE Engineering", "50/100"], ["Propagation & Antenna", "69/100"],
    ["Communication Systems", "47/100"], ["Communication Sys. (Prac)", "50/50"],
  ]},
  { year: "Year IV — Part 1 & 2", total: "1425 marks · 899 total", subjects: [
    ["Digital Signal Analysis", "24/100"], ["Artificial Intelligence", "52/100"], ["AI (Prac)", "23/50"],
    ["Project I", "45/50"], ["Wireless Communication", "47/100"], ["RF & Microwave Engineering", "51/100"],
    ["Satellite Communication", "20/100"], ["Satellite Comms (Prac)", "46/50"],
    ["Information Systems", "35/100"], ["Big Data Technologies", "50/100"], ["Multimedia System", "67/100"],
    ["Multimedia (Prac)", "23/50"], ["Telecommunications", "92/100"], ["Telecommunications (Prac)", "45/50"],
    ["Project II", "51/50"], ["Energy, Environment & Society", "22/100"],
  ]},
];

const PTE_SCORES = [
  { skill: "Listening", score: 75 },
  { skill: "Reading", score: 65 },
  { skill: "Writing", score: 64 },
  { skill: "Speaking", score: 60 },
];

// ─── HOOKS ──────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0 }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} style={{ transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)" }}>
      {children}
    </div>
  );
}

function Kicker({ label }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-7 h-px bg-blue-500" />
      <span className="font-mono text-xs text-blue-400 tracking-widest uppercase">{label}</span>
    </div>
  );
}

function Tag({ children }) {
  return <span className="font-mono text-xs text-blue-300 bg-blue-900/30 border border-blue-800/50 px-2 py-0.5 rounded-sm">{children}</span>;
}

function StatusDot({ status }) {
  const colors = { done: "text-emerald-400", progress: "text-amber-400", planned: "text-slate-500" };
  return <span className={`flex items-center gap-1.5 text-xs font-medium tracking-wide ${colors[status] || colors.planned}`}><span className="w-1.5 h-1.5 rounded-full bg-current" />{status === "done" ? "Completed" : status === "progress" ? "In Progress" : "Planned"}</span>;
}

// ─── NAV ────────────────────────────────────────────────────────────────────
function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["About", "Skills", "Projects", "Achievements", "Transcript", "Contact"];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8 md:px-16 transition-all duration-300 ${scrolled ? "bg-slate-950/95 backdrop-blur-xl border-b border-blue-950/60 shadow-lg shadow-black/20" : "bg-transparent"}`}>
      <a href="#hero" className="font-serif text-lg font-semibold text-white tracking-tight">Sabin<span className="text-blue-400">.</span></a>
      <ul className="hidden md:flex gap-9 list-none">
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} className={`text-xs tracking-widest uppercase transition-colors duration-200 ${active === l.toLowerCase() ? "text-blue-400" : "text-slate-400 hover:text-white"}`}>{l}</a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="hidden md:inline-flex text-xs tracking-widest uppercase text-blue-400 border border-blue-700/60 px-5 py-2 hover:bg-blue-500 hover:text-slate-950 hover:border-blue-500 transition-all duration-200 font-medium">Hire Me</a>
      <button onClick={() => setOpen(o => !o)} className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1">
        <span className="block w-5 h-px bg-slate-300 transition-all" style={{ transform: open ? "rotate(45deg) translateY(5px)" : "none" }} />
        <span className="block w-5 h-px bg-slate-300 transition-all" style={{ opacity: open ? 0 : 1 }} />
        <span className="block w-5 h-px bg-slate-300 transition-all" style={{ transform: open ? "rotate(-45deg) translateY(-5px)" : "none" }} />
      </button>
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-slate-950/98 backdrop-blur-xl border-b border-blue-950/50 py-4 md:hidden">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="block px-8 py-3 text-sm text-slate-300 hover:text-blue-400 tracking-wider uppercase">{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  const [typed, setTyped] = useState("");
  const titles = ["B.E. Electronics Engineer", "IoT Systems Builder", "Embedded Systems Developer", "Aspiring Cybersecurity Engineer"];
  const [ti, setTi] = useState(0);
  const [phase, setPhase] = useState("type");
  useEffect(() => {
    const t = titles[ti];
    let i = typed.length;
    if (phase === "type") {
      if (i < t.length) { const id = setTimeout(() => setTyped(t.slice(0, i + 1)), 55); return () => clearTimeout(id); }
      else { const id = setTimeout(() => setPhase("hold"), 1800); return () => clearTimeout(id); }
    }
    if (phase === "hold") { const id = setTimeout(() => setPhase("erase"), 400); return () => clearTimeout(id); }
    if (phase === "erase") {
      if (typed.length > 0) { const id = setTimeout(() => setTyped(t => t.slice(0, -1)), 28); return () => clearTimeout(id); }
      else { setTi(n => (n + 1) % titles.length); setPhase("type"); }
    }
  }, [typed, phase, ti]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden" style={{ background: "linear-gradient(160deg, #040810 0%, #070d1a 50%, #04080f 100%)" }}>
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(79,142,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,1) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      {/* Glows */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(79,142,247,0.07) 0%, transparent 65%)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(232,184,75,0.04) 0%, transparent 65%)", transform: "translate(-30%, 30%)" }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 py-20">
        <div className="grid md:grid-cols-[1fr_300px] gap-16 items-center">
          {/* Left */}
          <div>
            <FadeUp>
              <div className="inline-flex items-center gap-2.5 bg-blue-950/40 border border-blue-700/25 px-4 py-2 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-blue-300 tracking-widest uppercase">Available for opportunities</span>
              </div>
            </FadeUp>
            <FadeUp delay={80}>
              <h1 className="font-serif text-5xl md:text-6xl font-medium text-white leading-tight tracking-tight mb-6">
                Sabin<br /><span className="text-blue-400">Thapa Magar</span>
              </h1>
            </FadeUp>
            <FadeUp delay={160}>
              <div className="h-8 mb-6">
                <span className="font-mono text-base text-slate-300">{typed}<span className="animate-pulse text-blue-400">|</span></span>
              </div>
            </FadeUp>
            <FadeUp delay={240}>
              <p className="text-slate-400 text-base leading-relaxed max-w-lg mb-10 font-light">
                B.E. graduate in Electronics, Communication & Information Engineering from Kantipur Engineering College, Tribhuvan University. Building real hardware systems — from IoT monitoring to industrial automation — with a focus on embedded security.
              </p>
            </FadeUp>
            <FadeUp delay={320}>
              <div className="flex flex-wrap gap-3 mb-10">
                <a href="#projects" className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-semibold text-xs tracking-widest uppercase px-7 py-3 transition-all duration-200 hover:-translate-y-0.5">View Projects</a>
                <a href="#contact" className="border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-blue-400 font-medium text-xs tracking-widest uppercase px-7 py-3 transition-all duration-200">Get in Touch</a>
                <a href="#transcript" className="border border-slate-700/50 hover:border-slate-500 text-slate-500 hover:text-slate-300 font-medium text-xs tracking-widest uppercase px-7 py-3 transition-all duration-200">Transcript</a>
              </div>
            </FadeUp>
            <FadeUp delay={400}>
              <div className="flex gap-3 flex-wrap">
                {[["🎓", "TU · First Division"], ["🏆", "3× Robo Competitions"], ["📜", "PTE 68 · 2026"]].map(([icon, label]) => (
                  <div key={label} className="flex items-center gap-2 border border-slate-800 px-3 py-2 text-xs text-slate-400">
                    <span>{icon}</span><span>{label}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
          {/* Right card */}
          <FadeUp delay={200}>
            <div className="hidden md:block">
              <div className="relative w-64 mx-auto">
                {/* Corner markers */}
                {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
                  <div key={i} className={`absolute w-4 h-4 border-blue-500/60 ${cls}`} />
                ))}
                <div className="border border-slate-800 bg-slate-900/60 p-6 mx-2 my-2">
                  <div className="font-serif text-7xl text-blue-500/15 text-center font-medium py-6 leading-none">STM</div>
                  <div className="font-mono text-xs text-slate-600 text-center tracking-widest uppercase">Sabin Thapa Magar</div>
                </div>
                <div className="mt-4 space-y-2">
                  {[["65.19%", "Final Aggregate"], ["First", "Division"], ["2025", "Year of Pass"], ["PTE 68", "English Score"]].map(([num, lbl]) => (
                    <div key={lbl} className="flex justify-between items-center border border-slate-800/60 bg-slate-900/30 px-4 py-2">
                      <span className="font-mono text-sm text-blue-400 font-medium">{num}</span>
                      <span className="text-xs text-slate-500 tracking-wide">{lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ──────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-24" style={{ background: "#060b14" }}>
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <FadeUp><Kicker label="About" /></FadeUp>
        <FadeUp delay={60}><h2 className="font-serif text-4xl md:text-5xl font-medium text-white mb-4">Engineer. Builder. Curious.</h2></FadeUp>
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-16 mt-12">
          <FadeUp delay={120}>
            <div className="space-y-5 text-slate-400 text-[15px] leading-relaxed">
              <p>I am a B.E. graduate in Electronics, Communication and Information Engineering from <strong className="text-slate-200 font-medium">Kantipur Engineering College, Tribhuvan University</strong>. My engineering education covered digital and embedded systems, signal processing, computer networks, RF/microwave engineering, telecommunications, and AI/ML with Python and C/C++.</p>
              <p>What I value most is building real hardware that works under real constraints — from a Raspberry Pi sensor network to an autonomous competition robot. I find the intersection of hardware and security particularly compelling: understanding how physical systems can be exploited is something my hands-on embedded work has made concrete, not theoretical.</p>
              <p>I am passionate about bridging academic electronics with practical real-world applications — embedded hardware, industrial control systems, wireless communication, and the emerging challenge of securing the devices we build.</p>
            </div>
            <div className="mt-8 space-y-4">
              {[
                ["🏫", "Kantipur Engineering College · Tribhuvan University", "Reg. No: 3-2-368-202-2020 · Roll No: 27/BEI/2077"],
                ["🤖", "Robotics & IoT Competitions", "HEX-2023 Robo Race · YATRA 4.0 Robo Sumo · ICT Mela 4.0 Robo Soccer"],
                ["🏭", "Industrial Automation Certified", "60-hr PLC, HMI, SCADA · KEC Automation Lab (Erasmus+ eACCESS)"],
                ["🔌", "IoT Training Certified", "60-hr Raspberry Pi with IoT · KEC Research, Training & Consultancy Division"],
              ].map(([icon, title, sub]) => (
                <div key={title} className="flex gap-4 items-start">
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-blue-950/50 border border-blue-900/40 text-base">{icon}</div>
                  <div>
                    <div className="text-sm font-medium text-slate-200">{title}</div>
                    <div className="text-xs text-slate-500 mt-1 leading-relaxed">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={200}>
            <div className="space-y-5">
              <div className="border border-slate-800 bg-slate-900/40 p-6">
                <div className="font-mono text-xs text-blue-400 tracking-widest uppercase border-b border-slate-800 pb-4 mb-5">Education</div>
                <div className="space-y-5">
                  <div>
                    <div className="font-serif text-base text-white">B.E. · Electronics, Communication & Information Engineering</div>
                    <div className="text-xs text-blue-400 mt-1">Kantipur Engineering College · TU</div>
                    <div className="font-mono text-xs text-slate-500 mt-1">2020–2025 · First Division · 65.19%</div>
                  </div>
                  <div className="border-t border-slate-800 pt-4">
                    <div className="font-serif text-base text-white">SEE (Grade 10)</div>
                    <div className="text-xs text-blue-400 mt-1">Secondary Education Examination</div>
                    <div className="font-mono text-xs text-slate-500 mt-1">Nepal · Board Examinations</div>
                  </div>
                </div>
              </div>
              <div className="border border-slate-800 bg-slate-900/40 p-6">
                <div className="font-mono text-xs text-blue-400 tracking-widest uppercase border-b border-slate-800 pb-4 mb-5">PTE Academic Score</div>
                <div className="space-y-4">
                  {PTE_SCORES.map(({ skill, score }) => (
                    <div key={skill}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs text-slate-400">{skill}</span>
                        <span className="font-mono text-xs text-amber-400">{score}</span>
                      </div>
                      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${score}%`, background: "linear-gradient(90deg, #3b82f6, #e8b84b)" }} />
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-slate-800 pt-4 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-200">Overall</span>
                    <span className="font-mono text-xl text-amber-400 font-medium">68</span>
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">16 Apr 2026 · Valid until 16 Apr 2028<br />LA GRANDEE International College, Nepal</div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ─────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="py-24" style={{ background: "#040810" }}>
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <FadeUp><Kicker label="Technical Skills" /></FadeUp>
        <FadeUp delay={60}><h2 className="font-serif text-4xl md:text-5xl font-medium text-white mb-3">What I Know & Build With</h2></FadeUp>
        <FadeUp delay={100}><p className="text-slate-400 text-[15px] max-w-xl mb-14 leading-relaxed">Four years of engineering education plus hands-on training across embedded systems, communication, automation, and programming.</p></FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((s, i) => (
            <FadeUp key={s.title} delay={i * 70}>
              <div className="group relative border border-slate-800 bg-slate-900/30 p-7 hover:border-blue-700/50 hover:-translate-y-1 transition-all duration-300 h-full overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/60 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-2xl mb-4">{s.icon}</div>
                <div className="text-sm font-semibold text-white mb-2">{s.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed mb-5">{s.desc}</div>
                <div className="flex flex-wrap gap-1.5">{s.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ACHIEVEMENTS ────────────────────────────────────────────────────────────
function Achievements() {
  return (
    <section id="achievements" className="py-24" style={{ background: "#060b14" }}>
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <FadeUp><Kicker label="Certifications & Achievements" /></FadeUp>
        <FadeUp delay={60}><h2 className="font-serif text-4xl md:text-5xl font-medium text-white mb-3">Real Competitions. Real Training.</h2></FadeUp>
        <FadeUp delay={100}><p className="text-slate-400 text-[15px] max-w-xl mb-14 leading-relaxed">Certificates and recognitions earned during my engineering journey at KEC and beyond.</p></FadeUp>
        <div className="grid sm:grid-cols-2 gap-4">
          {ACHIEVEMENTS.map((a, i) => (
            <FadeUp key={a.title} delay={i * 50}>
              <div className="flex gap-5 border border-slate-800 bg-slate-900/20 p-6 hover:border-blue-800/50 transition-colors duration-200">
                <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-blue-950/50 border border-blue-900/30 text-lg">🏅</div>
                <div>
                  <div className="font-mono text-xs text-amber-400 tracking-wide mb-2">{a.year}</div>
                  <div className="text-sm font-semibold text-white mb-2">{a.title}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{a.org}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" className="py-24" style={{ background: "#040810" }}>
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <FadeUp><Kicker label="Projects" /></FadeUp>
        <FadeUp delay={60}><h2 className="font-serif text-4xl md:text-5xl font-medium text-white mb-3">What I Have Built</h2></FadeUp>
        <FadeUp delay={100}><p className="text-slate-400 text-[15px] max-w-xl mb-14 leading-relaxed">Engineering projects from my degree and personal exploration, covering hardware, software, and systems design.</p></FadeUp>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <FadeUp key={p.title} delay={i * 80}>
              <div className="group relative border border-slate-800 bg-slate-900/30 p-8 hover:border-blue-700/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/20 transition-all duration-300 pointer-events-none" />
                <div className="font-mono text-4xl text-slate-800 font-medium absolute top-6 right-7 leading-none select-none">{p.num}</div>
                <div className="font-mono text-xs text-blue-400 tracking-widest uppercase mb-3">{p.kicker}</div>
                <h3 className="font-serif text-xl text-white mb-3 leading-tight">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-5">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech.map(t => <span key={t} className="font-mono text-xs text-slate-500 border border-slate-800/80 px-2 py-0.5">{t}</span>)}
                </div>
                <StatusDot status={p.status} />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TRANSCRIPT ──────────────────────────────────────────────────────────────
function Transcript() {
  const [open, setOpen] = useState(null);
  return (
    <section id="transcript" className="py-24" style={{ background: "#060b14" }}>
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <FadeUp><Kicker label="Academic Transcript" /></FadeUp>
        <FadeUp delay={60}><h2 className="font-serif text-4xl md:text-5xl font-medium text-white mb-3">Subject-by-Subject Record</h2></FadeUp>
        <FadeUp delay={100}><p className="text-slate-400 text-[15px] max-w-xl mb-14 leading-relaxed">Complete marks record across all four years at Kantipur Engineering College, Tribhuvan University.</p></FadeUp>
        <FadeUp delay={150}>
          <div className="space-y-3 mb-10">
            {TRANSCRIPT.map((yr, yi) => (
              <div key={yr.year} className="border border-slate-800 overflow-hidden">
                <button onClick={() => setOpen(open === yi ? null : yi)} className="w-full flex items-center justify-between px-6 py-4 bg-slate-900/40 hover:bg-slate-900/70 transition-colors text-left">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-blue-400 tracking-widest uppercase">{yr.year}</span>
                    <span className="hidden sm:inline text-xs text-slate-600">{yr.total}</span>
                  </div>
                  <span className="font-mono text-sm text-slate-500 transition-transform duration-200" style={{ display: "inline-block", transform: open === yi ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {open === yi && (
                  <div className="px-6 pb-6 pt-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-3">
                      {yr.subjects.map(([name, score]) => (
                        <div key={name} className="border border-slate-800/60 bg-slate-900/20 px-3 py-3">
                          <div className="text-xs text-slate-400 leading-snug mb-2">{name}</div>
                          <div className="font-mono text-sm"><span className="text-blue-400">{score.split("/")[0]}</span><span className="text-slate-700">/{score.split("/")[1]}</span></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[["65.19%", "Final Aggregate"], ["First", "Division"], ["2025", "Year Passed (2082 B.S.)"], ["TU · KEC", "Institute"]].map(([val, lbl]) => (
              <div key={lbl} className="border border-slate-800 bg-slate-900/30 p-5 text-center">
                <div className="font-serif text-2xl text-blue-400 font-medium mb-1">{val}</div>
                <div className="text-xs text-slate-500 tracking-wide">{lbl}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── PTE SECTION ─────────────────────────────────────────────────────────────
function PTE() {
  return (
    <section id="pte" className="py-24" style={{ background: "#040810" }}>
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <FadeUp><Kicker label="English Proficiency" /></FadeUp>
        <FadeUp delay={60}><h2 className="font-serif text-4xl md:text-5xl font-medium text-white mb-3">PTE Academic Score</h2></FadeUp>
        <FadeUp delay={100}>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="border border-slate-800 bg-slate-900/30 p-8">
              <div className="font-mono text-xs text-blue-400 tracking-widest uppercase border-b border-slate-800 pb-4 mb-7">Score Breakdown</div>
              <div className="space-y-5">
                {[...PTE_SCORES, { skill: "Overall", score: 68, highlight: true }].map(({ skill, score, highlight }) => (
                  <div key={skill}>
                    <div className="flex justify-between mb-2">
                      <span className={`text-sm ${highlight ? "text-white font-medium" : "text-slate-400"}`}>{skill}</span>
                      <span className={`font-mono text-sm ${highlight ? "text-amber-400 text-lg" : "text-amber-400"}`}>{score}</span>
                    </div>
                    {highlight && <div className="border-t border-slate-800 -mt-1 mb-2" />}
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${score}%`, background: highlight ? "linear-gradient(90deg,#f59e0b,#3b82f6)" : "linear-gradient(90deg,#3b82f6,#6366f1)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="border border-slate-800 bg-slate-900/20 p-6">
                <div className="font-mono text-xs text-blue-400 tracking-widest uppercase mb-4">Test Details</div>
                <div className="space-y-3 text-sm">
                  {[["Test", "PTE Academic (Pearson)"], ["Date", "16 April 2026"], ["Valid Until", "16 April 2028"], ["Centre", "LA GRANDEE International College, Nepal"], ["Centre ID", "88209"], ["Score Code", "4519728AJB"], ["Taker ID", "PTE004528498"]].map(([k, v]) => (
                    <div key={k} className="flex gap-3">
                      <span className="text-slate-600 w-24 flex-shrink-0">{k}</span>
                      <span className="text-slate-300">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-emerald-900/40 bg-emerald-950/20 p-5 text-xs text-emerald-400/80 leading-relaxed">
                ✓ Score accepted for university applications in the UK, Australia, Canada, and other countries requiring proof of English proficiency.
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [botField, setBotField] = useState(""); // honeypot — must stay empty
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", msg: "Please fill Name, Email and Message." });
      return;
    }
    // Honeypot check — bots fill this, humans don't
    if (botField) return;

    setSending(true);
    setStatus(null);

    try {
      const body = new URLSearchParams({
        "form-name": "contact",
        "bot-field": botField,
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (res.ok) {
        setStatus({ type: "success", msg: "Message sent! Sabin will reply soon." });
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus({ type: "error", msg: `Submission failed (${res.status}). Please try again or email directly.` });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Network error. Please check your connection and try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24" style={{ background: "#060b14" }}>
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <FadeUp><Kicker label="Contact" /></FadeUp>
        <FadeUp delay={60}><h2 className="font-serif text-4xl md:text-5xl font-medium text-white mb-3">Get in Touch</h2></FadeUp>
        <FadeUp delay={100}><p className="text-slate-400 text-[15px] max-w-xl mb-14 leading-relaxed">Open to engineering roles, freelance projects, and graduate school conversations. I respond within a day.</p></FadeUp>
        <div className="grid md:grid-cols-[1fr_360px] gap-12">
          <FadeUp delay={150}>
            <div className="border border-slate-800 bg-slate-900/20 p-8">
              {/* Hidden fields Netlify needs to detect this form */}
              <input type="hidden" name="form-name" value="contact" />
              {/* Honeypot — hidden from real users, catches bots */}
              <div style={{ display: "none" }} aria-hidden="true">
                <label>Don't fill this out: <input name="bot-field" value={botField} onChange={e => setBotField(e.target.value)} /></label>
              </div>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {["name", "email"].map(field => (
                    <div key={field}>
                      <label className="block font-mono text-xs text-slate-500 tracking-widest uppercase mb-2">{field.charAt(0).toUpperCase() + field.slice(1)} *</label>
                      <input type={field === "email" ? "email" : "text"} name={field} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} placeholder={field === "name" ? "Your full name" : "your@email.com"} className="w-full bg-slate-900/60 border border-slate-800 focus:border-blue-600 outline-none px-4 py-3 text-sm text-slate-200 placeholder-slate-600 transition-colors duration-200" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block font-mono text-xs text-slate-500 tracking-widest uppercase mb-2">Subject</label>
                  <input type="text" name="subject" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="What's this about?" className="w-full bg-slate-900/60 border border-slate-800 focus:border-blue-600 outline-none px-4 py-3 text-sm text-slate-200 placeholder-slate-600 transition-colors duration-200" />
                </div>
                <div>
                  <label className="block font-mono text-xs text-slate-500 tracking-widest uppercase mb-2">Message *</label>
                  <textarea name="message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} placeholder="Describe your project, opportunity, or question..." className="w-full bg-slate-900/60 border border-slate-800 focus:border-blue-600 outline-none px-4 py-3 text-sm text-slate-200 placeholder-slate-600 transition-colors duration-200 resize-none" />
                </div>
                {status && (
                  <div className={`px-4 py-3 text-sm border ${status.type === "success" ? "text-emerald-400 border-emerald-900/50 bg-emerald-950/30" : "text-red-400 border-red-900/50 bg-red-950/20"}`}>{status.msg}</div>
                )}
                <button onClick={handleSubmit} disabled={sending} className="w-full bg-blue-500 hover:bg-blue-400 disabled:bg-slate-700 text-slate-950 disabled:text-slate-500 font-semibold text-xs tracking-widest uppercase py-3.5 transition-all duration-200">
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={200}>
            <div className="space-y-4">
              {[["📍", "Location", "Pokhara, Gandaki Pradesh, Nepal"], ["🎓", "Education", "B.E. ECIE · Kantipur Engineering College, TU"], ["🌐", "English", "PTE Academic · Overall 68 · Valid Apr 2028"], ["💼", "Status", "Open to remote work, freelance & MSc applications"]].map(([icon, lbl, val]) => (
                <div key={lbl} className="flex gap-4 border border-slate-800 bg-slate-900/20 p-5">
                  <span className="text-lg flex-shrink-0">{icon}</span>
                  <div>
                    <div className="font-mono text-xs text-slate-600 tracking-widest uppercase mb-1">{lbl}</div>
                    <div className="text-sm text-slate-300">{val}</div>
                  </div>
                </div>
              ))}
              <div className="border border-slate-800 bg-slate-900/20 p-5">
                <div className="font-mono text-xs text-slate-600 tracking-widest uppercase mb-3">Find Me Online</div>
                <div className="flex flex-wrap gap-2">
                  {["LinkedIn", "GitHub", "Facebook", "Instagram"].map(s => (
                    <span key={s} className="text-xs text-slate-500 border border-slate-800 hover:border-blue-700 hover:text-blue-400 px-3 py-1.5 transition-colors cursor-pointer">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-slate-900 py-8 px-8 md:px-16" style={{ background: "#040810" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-serif text-lg font-medium text-white">Sabin<span className="text-blue-400">.</span></div>
        <div className="font-mono text-xs text-slate-600">© 2026 Sabin Thapa Magar · sabinmgr.com.np</div>
        <div className="flex gap-6">
          {["About", "Projects", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-xs text-slate-600 hover:text-slate-400 tracking-wider uppercase transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen antialiased" style={{ fontFamily: "'Outfit', sans-serif", background: "#040810", color: "#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #040810; }
        ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 2px; }
        ::selection { background: rgba(59,130,246,0.3); }
        html { scroll-behavior: smooth; }
      `}</style>
      <Nav active={activeSection} />
      <Hero />
      <About />
      <Skills />
      <Achievements />
      <Projects />
      <Transcript />
      <PTE />
      <Contact />
      <Footer />
    </div>
  );
}
