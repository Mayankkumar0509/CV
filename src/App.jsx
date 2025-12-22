// src/App.jsx — Final corrected version
// Features included:
// - Auto dark mode detection
// - Loading screen
// - Particle background (react-tsparticles)
// - Scroll progress bar
// - Framer Motion animations + page transitions
// - Project modal popups
// - Responsive / mobile-friendly layout
// - Skills section
// - Floating contact button

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function App() {
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [deploying, setDeploying] = useState(false);
  const [deployResp, setDeployResp] = useState(null);
  const [form, setForm] = useState({
    email: "23f1003168@ds.study.iitm.ac.in",
    secret: "",
    task: "demo-task",
    round: 1,
    brief: "Simple demo deployment",
    checks: ["Loads without errors"],
    attachments: [],
    evaluation_url: "",
  });

  const apiEndpoint = "https://llm-deploy-platform.onrender.com/api-endpoint";

  // Auto Dark Mode Detection (system preference)
  useEffect(() => {
    try {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(Boolean(prefersDark));
    } catch (e) {
      setDark(false);
    }
  }, []);

  // Apply or remove `.dark` on <html>
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  // Loading screen timeout
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  // Scroll progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset || 0;
      const height = document.body.scrollHeight - window.innerHeight || 1;
      setScrollProgress(Math.max(0, Math.min(100, (scrollTop / height) * 100)));
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // particles init for performance
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  // Deployment API call
  async function handleDeploy(e) {
    e.preventDefault();
    setDeploying(true);
    setDeployResp(null);
    try {
      const payload = {
        email: form.email,
        secret: form.secret,
        task: form.task,
        round: Number(form.round),
        brief: form.brief,
        checks: form.checks,
        attachments: [],
        evaluation_url: form.evaluation_url || undefined,
      };

      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({ status: res.status }));
      setDeployResp({ ok: res.ok, status: res.status, body: data });
    } catch (err) {
      setDeployResp({ ok: false, error: String(err) });
    } finally {
      setDeploying(false);
    }
  }

  // Project list
  const projects = [
    {
      title: "LLM GitHub Pages Deployment System",
      desc: "FastAPI + Gemini LLM automated deployment system.",
      details: "Automates repo creation, updates, and GitHub Pages activation.",
      link: "https://github.com/Mayankkumar0509/TDS_Project1",
    },
    {
      title: "Quiz Master V2",
      desc: "Full system with Flask + Redis + Celery + Vue.js.",
      details: "Admin dashboard, user quizzes, CSV export, email reports.",
      link: "https://github.com/Mayankkumar0509/MAD-2-Quiz-Master---V2",
    },
    {
      title: "Quiz Master V1",
      desc: "Flask-based multi-user quiz management.",
      details: "Admin CRUD, quizzes, chapters, and score tracking.",
      link: "https://github.com/Mayankkumar0509/MAD-I-Quiz-Master---V1",
    },
  ];

  // Skills groups
  const skillsGroups = [
    { cat: "Programming Languages", list: ["Python", "Java", "JavaScript", "SQL"] },
    { cat: "Web Development", list: ["HTML", "CSS", "Tailwind", "React", "Vue.js", "Flask", "FastAPI", "Jinja2"] },
    { cat: "Backend & APIs", list: ["REST API Design", "Auth Systems", "Async Tasks", "GitHub API", "Gemini LLM Integration"] },
    { cat: "Databases", list: ["SQLite", "SQLAlchemy ORM"] },
    { cat: "Tools", list: ["Git", "GitHub", "Vite", "Celery", "Redis", "Postman"] },
    { cat: "Machine Learning", list: ["Basics of ML", "LLM Prompting", "Automated Code Generation"] },
    { cat: "Other Skills", list: ["Deployment", "Debugging", "Linux/WSL", "DSA Basics"] },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-all duration-300 relative overflow-x-hidden">

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 h-1 bg-blue-600 z-50" style={{ width: `${scrollProgress}%` }} />

      {/* Particle background (kept light on mobile) */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="fixed inset-0 -z-10 pointer-events-none"
        options={{
          particles: {
            number: { value: 45 },
            size: { value: { min: 1, max: 3 } },
            move: { speed: 0.8 },
            links: { enable: true, color: "#3b82f6", distance: 120 },
            opacity: { value: 0.7 },
          },
          detectRetina: true,
        }}
      />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && (
          <motion.div className="fixed inset-0 flex justify-center items-center bg-gray-100 dark:bg-gray-800 z-50" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <motion.div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ loop: Infinity, ease: "linear", duration: 1 }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {!loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>

            {/* HEADER */}
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20 transition-all duration-300">
              <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Mayank Kumar</h1>
                <div className="flex items-center gap-3">
                  <nav className="hidden md:block text-sm">
                    <a href="#about" className="mr-4">About</a>
                    <a href="#projects" className="mr-4">Projects</a>
                    <a href="#deploy" className="mr-4">LLM Demo</a>
                    <a href="#skills" className="mr-4">Skills</a>
                    <a href="#contact" className="mr-4">Contact</a>
                  </nav>
                  <button onClick={() => setDark(!dark)} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                    {dark ? "☀️ Light" : "🌙 Dark"}
                  </button>
                </div>
              </div>
            </header>

            {/* ABOUT */}
            <section className="max-w-5xl mx-auto px-6 py-10" id="about">
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                <div className="md:flex md:items-center md:justify-between">
                  <div>
                    <h2 className="text-3xl font-bold">Hi — I’m Mayank</h2>
                    <p className="mt-3 text-gray-600 dark:text-gray-300">BS Data Science student at IIT Madras. I build full-stack applications, LLM automation pipelines, and quiz platforms.</p>
                    <div className="mt-4 space-x-3">
                      <a href="/Mayank_Kumar_Resume.pdf" download className="px-4 py-2 bg-blue-600 text-white rounded">Download CV</a>
                      <a href="https://github.com/Mayankkumar0509" target="_blank" rel="noreferrer" className="px-4 py-2 border rounded">GitHub</a>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-0 flex-shrink-0">
                    <img src="/Mayank.jpg" alt="Mayank" className="w-36 h-48 object-cover rounded-lg shadow-md" />
                  </div>
                </div>
              </motion.div>
            </section>

            {/* PROJECTS */}
            <section className="max-w-5xl mx-auto px-6" id="projects">
              <h3 className="text-2xl font-semibold mb-4">Projects</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((p, i) => (
                  <motion.div key={i} className="p-4 bg-white dark:bg-gray-800 rounded shadow cursor-pointer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} onClick={() => setModal(p)}>
                    <h4 className="font-semibold">{p.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{p.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* PROJECT MODAL */}
            <AnimatePresence>
              {modal && (
                <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.div className="bg-white dark:bg-gray-800 p-6 rounded w-11/12 max-w-md shadow-lg" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold">{modal.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{modal.details}</p>
                      </div>
                      <button onClick={() => setModal(null)} className="ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200">✕</button>
                    </div>

                    <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                      <p>{modal.desc}</p>
                      <div className="mt-3">
                        <a href={modal.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">View Repository</a>
                      </div>
                    </div>

                    <div className="mt-6 text-right">
                      <button onClick={() => setModal(null)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">Close</button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LLM DEPLOY DEMO */}
            <section className="max-w-5xl mx-auto px-6 mt-10" id="deploy">
              <h3 className="text-2xl font-semibold">LLM Deployment Demo</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Trigger your FastAPI deployment workflow directly from this portfolio.</p>

              <form onSubmit={handleDeploy} className="mt-4 grid gap-3 md:grid-cols-2">
                <input className="p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                <input className="p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700" placeholder="Secret" value={form.secret} onChange={e => setForm({...form, secret: e.target.value})} />
                <input className="p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700" placeholder="Task ID" value={form.task} onChange={e => setForm({...form, task: e.target.value})} />
                <select className="p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700" value={form.round} onChange={e => setForm({...form, round: e.target.value})}>
                  <option value={1}>Round 1</option>
                  <option value={2}>Round 2</option>
                </select>

                <textarea className="p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 md:col-span-2" rows={4} placeholder="Brief / description" value={form.brief} onChange={e => setForm({...form, brief: e.target.value})}></textarea>

                <div className="md:col-span-2 flex items-center gap-3">
                  <button type="submit" disabled={deploying} className="px-4 py-2 bg-green-600 text-white rounded">{deploying ? 'Deploying...' : 'Trigger Deploy'}</button>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Endpoint: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{apiEndpoint}</code></div>
                </div>

                <div className="md:col-span-2">
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs text-gray-700 dark:text-gray-200">{deployResp ? JSON.stringify(deployResp, null, 2) : 'Response will appear here'}</pre>
                </div>
              </form>
            </section>

            {/* SKILLS SECTION */}
            <section className="max-w-5xl mx-auto px-6 mt-12" id="skills">
              <h3 className="text-2xl font-semibold mb-4">Skills</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {skillsGroups.map((group, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                    <h4 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">{group.cat}</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {group.list.map((item, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* CONTACT */}
            <section className="max-w-5xl mx-auto px-6 mt-12 mb-20" id="contact">
              <h3 className="text-2xl font-semibold">Contact</h3>
              <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-white dark:bg-gray-800 rounded shadow-sm"> <strong>Email</strong><div className="mt-1">23f1003168@ds.study.iitm.ac.in</div></div>
                <div className="p-3 bg-white dark:bg-gray-800 rounded shadow-sm"> <strong>Phone</strong><div className="mt-1">9204636108</div></div>
                <div className="p-3 bg-white dark:bg-gray-800 rounded shadow-sm"> <strong>Location</strong><div className="mt-1">Jamshedpur, Jharkhand</div></div>
              </div>
            </section>

            {/* Floating Contact Button */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=23f1003168@ds.study.iitm.ac.in"
              target="_blank"
              class="fixed right-6 bottom-6 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
            >
              ✉️
            </a>

            {/* FOOTER */}
            <footer className="bg-white dark:bg-gray-800 border-t py-4">
              <div className="max-w-5xl mx-auto px-6 text-sm text-center text-gray-500">Built by Mayank Kumar — <a href="https://github.com/Mayankkumar0509" target="_blank" rel="noreferrer" className="text-blue-600">GitHub</a></div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
