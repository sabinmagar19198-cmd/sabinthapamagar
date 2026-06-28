/* ══════════════════════════════════════════════
   main.js — Sabin Thapa Magar Portfolio
   ══════════════════════════════════════════════ */

/* ── NAV: scroll highlight + active link ── */
(function () {
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // scrolled class for nav bg
    nav.classList.toggle('scrolled', window.scrollY > 40);

    // active nav link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
})();

/* ── MOBILE NAV ── */
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  const btn = document.querySelector('.hamburger');
  nav.classList.toggle('open');
  btn.classList.toggle('open');
}
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
  document.querySelector('.hamburger').classList.remove('open');
}

/* ── FADE-UP INTERSECTION OBSERVER ── */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
})();

/* ── TYPEWRITER HERO ── */
(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const text = el.dataset.text || el.textContent;
  el.textContent = '';

  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, 65);
    } else {
      // remove blinking cursor after done
      setTimeout(() => el.style.borderRight = 'none', 1000);
    }
  }
  setTimeout(type, 600);
})();

/* ── TOAST ── */
function showToast(msg, color) {
  color = color || 'var(--green)';
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.borderColor = color;
  t.style.color = color;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

/* ── CONTACT FORM (Netlify) ── */
function submitContactForm(e) {
  if (e) e.preventDefault();
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  if (!name || !email || !message) {
    showToast('Please fill in Name, Email and Message.', '#ef4444');
    return;
  }

  const form = document.getElementById('contact-form');
  const data = new FormData(form);

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString(),
  })
    .then(() => {
      document.getElementById('form-success').style.display = 'block';
      form.reset();
      showToast('Message sent! Sabin will reply soon. 🎉');
    })
    .catch(() => {
      showToast('Something went wrong. Please email directly.', '#ef4444');
    });
}

/* ── CHAT BUBBLE ── */
(function () {
  const chatAnswers = {
    education: "🎓 Sabin holds a B.E. in Electronics, Communication & Information Engineering from Kantipur Engineering College (TU), graduating in 2025 with First Division (65.19%). He also completed +2 Science from Pokhara Secondary School (CGPA 3.03) and SEE from Shree Birethanti Secondary School (GPA 3.25).",
    skills:    "💻 Core skills: Embedded Systems & IoT (Raspberry Pi, sensors), Industrial Automation (Siemens & Delta PLC, HMI, SCADA), Communication & RF Engineering, Programming (C/C++, Python, OOP), and Digital Electronics & Signal Processing.",
    projects:  "🔧 Major projects: (1) Virtual Eyewear Try-On System — Computer Vision & AR (Final Year, 2025). (2) Home Automation System — wireless microcontroller (Minor Project, 2024). Also built robots for HEX-2023, YATRA 4.0, and ICT Mela 4.0 competitions.",
    available: "📅 Yes! Sabin is open to engineering roles, embedded systems work, IoT projects, research collaborations, and further study abroad. Reach out directly!",
    pte:       "🌐 PTE Academic Score — Overall: 68. Listening: 75, Reading: 65, Speaking: 60, Writing: 64. Tested: 16 April 2026. Valid until: 16 April 2028.",
    nec:       "📋 Sabin holds a B.E. from TU (KEC) and is eligible and actively preparing for NEC AEiE (Associate Engineer — Electronics, Communication & Information Engineering) licensing.",
    contact:   "📬 Email: sabin7magar@gmail.com | WhatsApp: +977 984077145. He typically replies within 24 hours. You can also use the Contact form on this site.",
  };

  function addMsg(text, sender) {
    const body = document.getElementById('chat-body');
    const d = document.createElement('div');
    d.className = 'chat-msg ' + sender;
    const b = document.createElement('div');
    b.className = 'chat-bubble-msg';
    b.textContent = text;
    d.appendChild(b);
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }

  window.toggleChat = function () {
    const w = document.getElementById('chat-widget');
    const n = document.getElementById('chat-notif');
    w.classList.toggle('open');
    if (n) n.style.display = 'none';
  };

  window.chatAnswer = function (key) {
    addMsg(chatAnswers[key], 'bot');
    const qb = document.getElementById('quick-btns');
    if (qb) qb.style.display = 'none';
  };

  window.sendChatMsg = function () {
    const inp = document.getElementById('chat-input');
    const val = inp.value.trim();
    if (!val) return;
    addMsg(val, 'user');
    inp.value = '';
    setTimeout(() => {
      const lower = val.toLowerCase();
      let reply = "Thanks for your message! For a detailed answer, please use the contact form below or reach out via Email or WhatsApp. Sabin replies within 24 hours. 😊";
      if (/education|degree|college|university|school/.test(lower))       reply = chatAnswers.education;
      else if (/skill|plc|python|iot|embed|know/.test(lower))            reply = chatAnswers.skills;
      else if (/project|work|built|robot/.test(lower))                   reply = chatAnswers.projects;
      else if (/available|hire|job|open/.test(lower))                    reply = chatAnswers.available;
      else if (/pte|english|ielts|score|proficiency/.test(lower))        reply = chatAnswers.pte;
      else if (/nec|licens/.test(lower))                                 reply = chatAnswers.nec;
      else if (/contact|reach|email|whatsapp|phone/.test(lower))         reply = chatAnswers.contact;
      addMsg(reply, 'bot');
    }, 600);
  };

  // show notif dot after 3s
  setTimeout(() => {
    const n = document.getElementById('chat-notif');
    if (n && !document.getElementById('chat-widget').classList.contains('open')) {
      n.style.display = 'block';
    }
  }, 3000);
})();
