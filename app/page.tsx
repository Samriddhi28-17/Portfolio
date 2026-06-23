'use client'
import { useEffect, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────
type ModalData = {
  title: string
  subtitle?: string
  content: React.ReactNode
} | null

// ── Data ───────────────────────────────────────────────────────────────────
const NAV_LINKS = ['About', 'Experience', 'Projects', 'Research', 'Skills', 'Blog', 'Contact']

const EXPERIENCE = [
  {
    id: 'exp1',
    role: 'Summer Research Fellow (IAS SRFP)',
    org: 'IEM Computational Intelligence Lab',
    period: 'May 2026 – July 2026',
    location: 'Bangalore, Karnataka, IN',
    summary: 'Leveraging deep learning architectures for representation analysis and latent-space evaluation in medical neuroimaging.',
    tags: ['Deep Learning', 'Neuroimaging', 'PyTorch', 'Medical AI'],
    detail: [
      'Conducting representation analysis on medical neuroimaging encoders to evaluate latent-space features and model robust optimization across varied cohorts.',
    ]
  }
]

const PROJECTS = [
  {
    id: 'proj1',
    title: 'PhishNet',
    tagline: 'ML-powered phishing URL detection engine',
    duration: '3 months',
    status: 'Completed',
    summary: 'Real-time classifier that detects phishing URLs with 94% accuracy using ensemble methods.',
    tags: ['Python', 'Scikit-learn', 'Flask', 'Cyber Sec'],
    architecture: [
      { layer: 'Data Ingestion', detail: 'Web crawling via Scrapy — 200k labelled URLs' },
      { layer: 'Feature Engineering', detail: 'Lexical, host-based & content features (58 total)' },
      { layer: 'Model Ensemble', detail: 'Random Forest + XGBoost stacking' },
      { layer: 'API Layer', detail: 'Flask REST endpoint with rate limiting' },
      { layer: 'Frontend', detail: 'Browser extension for real-time alerts' },
    ],
    detail: 'PhishNet addresses the growing threat of phishing attacks by providing a lightweight, deployable ML pipeline. The system ingests URLs, extracts 58 hand-crafted features spanning lexical patterns, DNS metadata, and page content signals, then runs them through a stacked ensemble. The final model achieves 94.2% accuracy with a false-positive rate below 2%, making it viable for real browser extension deployment.',
  },
  {
    id: 'proj2',
    title: 'GestureOS',
    tagline: 'Hand gesture interface for hands-free desktop control',
    duration: '2 months',
    status: 'In Progress',
    summary: 'MediaPipe + OpenCV pipeline mapping 12 distinct gestures to OS-level commands.',
    tags: ['Python', 'MediaPipe', 'OpenCV', 'HCI'],
    architecture: [
      { layer: 'Capture', detail: 'Webcam stream at 30fps via OpenCV' },
      { layer: 'Landmark Detection', detail: 'MediaPipe Hands — 21 keypoints per hand' },
      { layer: 'Gesture Classifier', detail: 'LSTM sequence model, 12 gesture classes' },
      { layer: 'Command Mapper', detail: 'PyAutoGUI OS action dispatcher' },
      { layer: 'Feedback Layer', detail: 'On-screen HUD with confidence score' },
    ],
    detail: 'GestureOS explores natural human-computer interaction by replacing peripheral devices with hand gestures. A MediaPipe landmark extractor feeds 21 keypoint coordinates into a lightweight LSTM that classifies gesture sequences in ~40ms. Recognised gestures dispatch OS commands through PyAutoGUI. The project is being extended with adaptive learning to personalise gesture mappings per user.',
  },
  {
    id: 'proj3',
    title: 'CrawlMind',
    tagline: 'Autonomous web crawler with semantic topic clustering',
    duration: '6 weeks',
    status: 'Completed',
    summary: 'Scrapy-based crawler that auto-clusters harvested pages by semantic topic using sentence embeddings.',
    tags: ['Python', 'Scrapy', 'SBERT', 'NLP'],
    architecture: [
      { layer: 'Crawl Engine', detail: 'Scrapy with politeness & dedup middleware' },
      { layer: 'Text Extraction', detail: 'Trafilatura for clean body text' },
      { layer: 'Embedding', detail: 'Sentence-BERT (all-MiniLM-L6-v2)' },
      { layer: 'Clustering', detail: 'HDBSCAN on 384-dim embedding space' },
      { layer: 'Visualisation', detail: 'UMAP 2D projection + Plotly dashboard' },
    ],
    detail: 'CrawlMind automates the discovery and organisation of web content. After crawling, each page is embedded using Sentence-BERT and clustered via HDBSCAN. A UMAP projection renders the semantic landscape as an interactive 2D scatter plot, letting users explore topic neighbourhoods visually. Built as a research tool for content gap analysis.',
  },
]
/*
const RESEARCH = [
  {
    id: 'res1',
    title: 'Real-Time Hand Gesture Recognition for Accessibility Interfaces',
    status: 'Under Review',
    venue: 'IEEE Access',
    year: '2025',
    summary: 'Proposes a lightweight LSTM architecture for real-time gesture classification on edge devices, targeting accessibility applications.',
    tags: ['HCI', 'Edge ML', 'Accessibility'],
    abstract: 'This paper presents a real-time hand gesture recognition system designed for resource-constrained edge devices. We propose a two-stage pipeline combining MediaPipe landmark extraction with a compact LSTM classifier (< 2MB) that achieves 96.4% accuracy across 12 gesture classes at 28fps on a Raspberry Pi 4. We evaluate the system in the context of accessibility tools for users with motor impairments, demonstrating significant usability improvements over traditional peripheral-based interfaces.',
  },
  {
    id: 'res2',
    title: 'Adversarial Robustness of Phishing Detection Models Under Feature Poisoning',
    status: 'Working Paper',
    venue: 'Targeting USENIX Security',
    year: '2025',
    summary: 'Investigates how adversarial feature manipulation can evade ML-based phishing classifiers, and proposes defence mechanisms.',
    tags: ['Cyber Sec', 'Adversarial ML', 'Security'],
    abstract: 'ML-based phishing detectors are increasingly deployed in production security systems, yet their robustness to adversarial inputs remains understudied. We systematically evaluate five popular classifiers under feature-space attacks and demonstrate evasion rates of up to 67% with minimal attacker knowledge. We then propose a certified defence based on randomised smoothing adapted for URL feature spaces, reducing evasion rates to below 12%.',
  },
  {
    id: 'res3',
    title: 'Semantic Drift in Continuously Crawled Web Corpora',
    status: 'In Preparation',
    venue: 'Targeting ACL Findings',
    year: '2026',
    summary: 'Studies how topic distributions shift over time in live-crawled corpora and the downstream effect on NLP model performance.',
    tags: ['NLP', 'Web Mining', 'ML'],
    abstract: 'Web-crawled corpora underpin many large language models, yet the temporal dynamics of these corpora are poorly understood. This work introduces a longitudinal study of semantic drift across three continuously crawled domains over 18 months. We quantify drift using Jensen-Shannon divergence on SBERT embedding distributions and show that models fine-tuned on static snapshots degrade measurably within 6 months, motivating adaptive retraining schedules.',
  },
]
*/
const SKILL_GROUPS = [
  { group: 'Machine Learning', skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'HuggingFace', 'MLflow', 'ONNX'] },
  { group: 'Data & NLP', skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'NLTK', 'SpaCy'] },
  { group: 'HCI & Vision', skills: ['OpenCV', 'MediaPipe', 'UMAP', 'Plotly', 'Streamlit', 'Gradio', 'Raspberry Pi', 'Arduino'] },
  { group: 'Cyber Security', skills: ['Kali Linux', 'Wireshark', 'Nmap', 'Burp Suite', 'Metasploit', 'OWASP', 'CTF', 'Network Analysis'] },
  { group: 'Engineering', skills: ['Git', 'Docker', 'FastAPI', 'Flask', 'Linux', 'REST APIs', 'SQL', 'MongoDB'] },
]

const CERTIFICATIONS = [
  { id: 'cert1', title: 'Machine Learning Specialization', issuer: 'DeepLearning.AI · Coursera', year: '2024', driveLink: '#' },
  { id: 'cert2', title: 'TensorFlow Developer Certificate', issuer: 'Google · TensorFlow', year: '2024', driveLink: '#' },
  { id: 'cert3', title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', year: '2023', driveLink: '#' },
  { id: 'cert4', title: 'Python for Data Science & ML', issuer: 'Udemy · Jose Portilla', year: '2023', driveLink: '#' },
  { id: 'cert5', title: 'Deep Learning with PyTorch', issuer: 'IBM · Coursera', year: '2024', driveLink: '#' },
]

const EXTRACURRICULARS = [
  {
    id: 'extra1',
    title: 'Graphic Design',
    icon: '◈',
    summary: 'Creating visual identities, event posters, and digital assets for college clubs and personal projects. Proficient in Adobe Illustrator, Figma, and Canva Pro.',
    tags: ['Illustrator', 'Figma', 'Canva', 'Typography', 'Branding'],
    link: null,
  },
  {
    id: 'extra2',
    title: 'Technical Writing',
    icon: '◇',
    summary: 'Writing articles on ML concepts, cybersecurity, and HCI on Medium. Focus on making complex technical ideas accessible to broader audiences.',
    tags: ['Medium', 'Documentation', 'ML Explainers', 'Research Summaries'],
    link: 'https://medium.com/@samriddhibagchi',
  },
]

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/samriddhibagchi', icon: 'in' },
  { label: 'Gmail', href: 'mailto:samriddhib.contact@gmail.com', icon: '@' },
  { label: 'Twitter', href: 'https://x.com/samriddhibagchi', icon: '𝕏' },
  { label: 'Medium', href: 'https://medium.com/@samriddhibagchi', icon: 'M' },
  { label: 'GitHub', href: 'https://github.com/samriddhibagchi', icon: 'gh' },
]

// ── Modal ──────────────────────────────────────────────────────────────────
function Modal({ data, onClose }: { data: ModalData; onClose: () => void }) {
  useEffect(() => {
    if (!data) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [data, onClose])
  if (!data) return null
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', animation: 'fadeIn 0.2s ease' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg)', border: '1px solid var(--border)', maxWidth: 700, width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: '2.5rem', boxShadow: '0 24px 80px rgba(0,0,0,0.25)', animation: 'slideUp 0.25s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300, lineHeight: 1.2, marginBottom: '0.3rem' }}>{data.title}</h2>
            {data.subtitle && <p style={{ fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{data.subtitle}</p>}
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-mute)', cursor: 'pointer', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, marginLeft: '1rem' }}>✕</button>
        </div>
        {data.content}
      </div>
    </div>
  )
}

// ── Architecture Diagram ───────────────────────────────────────────────────
function ArchDiagram({ layers }: { layers: { layer: string; detail: string }[] }) {
  const [active, setActive] = useState<number | null>(null)
  return (
    <div style={{ marginTop: '1.5rem' }}>
      <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>Architecture Layers</p>
      {layers.map((l, i) => (
        <div key={i}>
          <div onClick={() => setActive(active === i ? null : i)} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', cursor: 'pointer', background: active === i ? 'var(--bg2)' : 'transparent', border: '1px solid var(--border)', borderBottom: i < layers.length - 1 && active !== i ? 'none' : '1px solid var(--border)', transition: 'background 0.2s' }}>
            <span style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, background: active === i ? 'var(--accent)' : 'var(--bg2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: active === i ? 'var(--bg)' : 'var(--text-mute)', fontFamily: "'DM Mono', monospace", transition: 'all 0.2s' }}>{i + 1}</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', flex: 1 }}>{l.layer}</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--accent)', transition: 'transform 0.2s', display: 'inline-block', transform: active === i ? 'rotate(180deg)' : 'none' }}>▼</span>
          </div>
          {active === i && (
            <div style={{ padding: '0.8rem 1rem 0.8rem 3.5rem', background: 'var(--bg2)', border: '1px solid var(--border)', borderTop: 'none' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-mute)', lineHeight: 1.7 }}>{l.detail}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Status Badge ──────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    'Completed': '#7a9e7e', 'In Progress': '#b07d4a',
    'Under Review': '#9b7bb8', 'Working Paper': '#6a9bbf', 'In Preparation': '#7a6e61',
  }
  const c = colors[status] ?? '#7a6e61'
  return <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.2rem 0.6rem', border: `1px solid ${c}55`, color: c, background: `${c}15`, borderRadius: '2px' }}>{status}</span>
}

// ── Skill Group ───────────────────────────────────────────────────────────
function SkillGroup({ group, skills }: { group: string; skills: string[] }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div style={{ border: '1px solid var(--border)', padding: '1.4rem', transition: 'box-shadow 0.2s', boxShadow: expanded ? '0 4px 24px var(--shadow)' : 'none' }}>
      <div onClick={() => setExpanded(!expanded)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 400 }}>{group}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-mute)' }}>{skills.length} skills</span>
          <span style={{ fontSize: '0.65rem', color: 'var(--accent)', transition: 'transform 0.2s', display: 'inline-block', transform: expanded ? 'rotate(180deg)' : 'none' }}>▼</span>
        </div>
      </div>
      {expanded && (
        <div style={{ marginTop: '1.2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {skills.map(skill => (
            <span key={skill} style={{ fontSize: '0.68rem', letterSpacing: '0.08em', padding: '0.3rem 0.8rem', border: '1px solid var(--border)', color: 'var(--text-mute)', background: 'var(--bg2)', borderRadius: '2px', transition: 'all 0.15s', cursor: 'default' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-mute)' }}
            >{skill}</span>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Social Button ─────────────────────────────────────────────────────────
function SocialBtn({ label, href, icon }: { label: string; href: string; icon: string }) {
  return (
    <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" aria-label={label} title={label}
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: '1px solid var(--border)', color: 'var(--text-mute)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', background: 'var(--bg2)', transition: 'all 0.2s', fontFamily: "'DM Mono', monospace" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-mute)' }}
    >
      <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{icon}</span>
      <span>{label}</span>
    </a>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function Home() {
  const [modal, setModal] = useState<ModalData>(null)
  const [activeNav, setActiveNav] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.08 })
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    setTimeout(() => { document.querySelectorAll('.hero .fade-in').forEach(el => el.classList.add('visible')) }, 80)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS.map(n => document.getElementById(n.toLowerCase()))
      const scrollY = window.scrollY + 120
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i]; if (s && s.offsetTop <= scrollY) { setActiveNav(NAV_LINKS[i]); return }
      }
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const openExp = (exp: typeof EXPERIENCE[0]) => setModal({
    title: exp.role, subtitle: `${exp.org} · ${exp.period}`,
    content: (
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {exp.tags.map(t => <span key={t} style={{ fontSize: '0.62rem', padding: '0.2rem 0.6rem', background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text-mute)', borderRadius: 2 }}>{t}</span>)}
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {exp.detail.map((d, i) => (
            <li key={i} style={{ display: 'flex', gap: '0.8rem', fontSize: '0.8rem', lineHeight: 1.8, color: 'var(--text-mute)' }}>
              <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.1rem' }}>◆</span><span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  })

  const openAllExp = () => setModal({
    title: 'All Experience', subtitle: 'Full work history',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {EXPERIENCE.map(exp => (
          <div key={exp.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 400 }}>{exp.role}</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.06em' }}>{exp.org}</p>
              </div>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-mute)' }}>{exp.period}</p>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-mute)', lineHeight: 1.8, marginBottom: '0.8rem' }}>{exp.summary}</p>
            <button className="deep-dive-btn" onClick={() => openExp(exp)}>Details →</button>
          </div>
        ))}
      </div>
    )
  })

  const openProject = (proj: typeof PROJECTS[0]) => setModal({
    title: proj.title, subtitle: proj.tagline,
    content: (
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem', alignItems: 'center' }}>
          <StatusBadge status={proj.status} />
          <span style={{ fontSize: '0.62rem', color: 'var(--text-mute)', letterSpacing: '0.08em' }}>· {proj.duration}</span>
        </div>
        <p style={{ fontSize: '0.8rem', lineHeight: 1.9, color: 'var(--text-mute)', marginBottom: '0.5rem' }}>{proj.detail}</p>
        <ArchDiagram layers={proj.architecture} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.5rem' }}>
          {proj.tags.map(t => <span key={t} style={{ fontSize: '0.62rem', padding: '0.2rem 0.6rem', background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text-mute)', borderRadius: 2 }}>{t}</span>)}
        </div>
      </div>
    )
  })

  const openAllProj = () => setModal({
    title: 'All Projects', subtitle: 'Complete project list',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {PROJECTS.map(proj => (
          <div key={proj.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 400 }}>{proj.title}</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--accent)', fontStyle: 'italic' }}>{proj.tagline}</p>
              </div>
              <StatusBadge status={proj.status} />
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-mute)', lineHeight: 1.8, marginBottom: '0.8rem' }}>{proj.summary}</p>
            <button className="deep-dive-btn" onClick={() => openProject(proj)}>Architecture →</button>
          </div>
        ))}
      </div>
    )
  })

  const openResearch = (res: typeof RESEARCH[0]) => setModal({
    title: res.title, subtitle: `${res.venue} · ${res.year}`,
    content: (
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem', alignItems: 'center' }}>
          <StatusBadge status={res.status} />
          {res.tags.map(t => <span key={t} style={{ fontSize: '0.62rem', padding: '0.2rem 0.6rem', background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text-mute)', borderRadius: 2 }}>{t}</span>)}
        </div>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.6rem' }}>Abstract</p>
        <p style={{ fontSize: '0.8rem', lineHeight: 2, color: 'var(--text-mute)' }}>{res.abstract}</p>
      </div>
    )
  })

  const openAllRes = () => setModal({
    title: 'All Research', subtitle: 'Publications & working papers',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {RESEARCH.map(res => (
          <div key={res.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 400, flex: 1, lineHeight: 1.4 }}>{res.title}</p>
              <StatusBadge status={res.status} />
            </div>
            <p style={{ fontSize: '0.68rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>{res.venue} · {res.year}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-mute)', lineHeight: 1.8, marginBottom: '0.8rem' }}>{res.summary}</p>
            <button className="deep-dive-btn" onClick={() => openResearch(res)}>Read Abstract →</button>
          </div>
        ))}
      </div>
    )
  })

  const sectionStyle = { padding: '5rem 0', borderBottom: '1px solid var(--border)' }
  const PREVIEW = 2

  return (
    <>
      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        .deep-dive-btn {
          display:inline-flex;align-items:center;gap:0.4rem;
          font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;
          color:var(--accent);background:none;border:1px solid var(--accent);
          padding:0.4rem 1rem;cursor:pointer;font-family:'DM Mono',monospace;
          transition:background 0.2s,color 0.2s;
        }
        .deep-dive-btn:hover{background:var(--accent);color:var(--bg);}
        .see-all-btn {
          display:inline-flex;align-items:center;gap:0.5rem;
          font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;
          color:var(--text-mute);background:none;border:1px solid var(--border);
          padding:0.55rem 1.3rem;cursor:pointer;font-family:'DM Mono',monospace;
          transition:all 0.2s;margin-top:1.8rem;
        }
        .see-all-btn:hover{border-color:var(--accent);color:var(--accent);}
        .card-hover{transition:box-shadow 0.2s,transform 0.2s;}
        .card-hover:hover{box-shadow:0 6px 28px var(--shadow);transform:translateY(-2px);}
        @media(max-width:640px){
          .two-col{grid-template-columns:1fr !important;}
          .nav-links-list{display:none !important;}
        }
      `}</style>

      <Modal data={modal} onClose={() => setModal(null)} />

      {/* ── Nav ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border)', backdropFilter: 'blur(8px)', transition: 'background-color var(--transition)' }}>
        <div className="wrapper" style={{ display: 'flex', alignItems: 'center', height: 60, gap: '2rem' }}>
          <a href="#" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 600, color: 'var(--text)', letterSpacing: '0.02em', textDecoration: 'none', marginRight: 'auto' }}>
            Samriddhi Bagchi<span style={{ color: 'var(--accent)' }}>.</span>
          </a>
          <ul className="nav-links-list" style={{ display: 'flex', gap: '1.6rem', listStyle: 'none' }}>
            {NAV_LINKS.map(link => (
              <li key={link}>
                <a
                  href={link === 'Blog' ? 'https://medium.com/@samriddhibagchi' : `#${link.toLowerCase()}`}
                  target={link === 'Blog' ? '_blank' : undefined}
                  rel={link === 'Blog' ? 'noopener noreferrer' : undefined}
                  style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: activeNav === link ? 'var(--accent)' : 'var(--text-mute)', transition: 'color 0.2s', textDecoration: 'none' }}
                >{link}</a>
              </li>
            ))}
          </ul>
          <a href="#" style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.5rem 1.2rem', background: 'var(--accent)', color: 'var(--bg)', textDecoration: 'none', fontFamily: "'DM Mono', monospace", transition: 'opacity 0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.82'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
          >↓ Resume</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="hero" id="about" style={{ padding: '7rem 0 5rem', borderBottom: '1px solid var(--border)' }}>
        <div className="wrapper">
          <p className="fade-in hero-label">B.Tech CST · IEM Kolkata · 2025</p>
          <h1 className="fade-in" style={{ transitionDelay: '0.08s', fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 300, lineHeight: 1.02, letterSpacing: '-0.01em', marginBottom: '1.8rem' }}>
            Samriddhi<br /><em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Bagchi</em>
          </h1>
          <p className="fade-in" style={{ transitionDelay: '0.16s', fontSize: '0.85rem', lineHeight: 2, color: 'var(--text-mute)', maxWidth: 520, marginBottom: '0.8rem' }}>
            I build systems at the intersection of <strong style={{ color: 'var(--text)', fontWeight: 400 }}>machine intelligence</strong>, <strong style={{ color: 'var(--text)', fontWeight: 400 }}>physical environments</strong>, and <strong style={{ color: 'var(--text)', fontWeight: 400 }}>security</strong> — exploring how computation can feel more human and more robust simultaneously.
          </p>
          <p className="fade-in" style={{ transitionDelay: '0.2s', fontSize: '0.78rem', lineHeight: 1.9, color: 'var(--text-mute)', maxWidth: 480, marginBottom: '2.5rem' }}>
            Currently exploring: ML on edge devices, gesture-based HCI, and adversarial robustness in security models.
          </p>
          <div className="fade-in" style={{ transitionDelay: '0.28s', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#projects" style={{ display: 'inline-block', padding: '0.7rem 1.8rem', background: 'var(--accent)', color: 'var(--bg)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>View Projects</a>
            <a href="#contact" style={{ display: 'inline-block', padding: '0.7rem 1.8rem', border: '1px solid var(--border)', color: 'var(--text-mute)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>Get in Touch</a>
          </div>
        </div>
      </header>

      {/* ── Experience ── */}
      <section id="experience" style={sectionStyle}>
        <div className="wrapper">
          <p className="section-label fade-in">Experience</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {EXPERIENCE.slice(0, PREVIEW).map((exp, i) => (
              <article key={exp.id} className="fade-in card-hover" style={{ transitionDelay: `${i * 0.08}s`, border: '1px solid var(--border)', padding: '1.8rem', background: 'var(--card-bg)', backdropFilter: 'blur(4px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 400, marginBottom: '0.2rem' }}>{exp.role}</h3>
                    <p style={{ fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.08em' }}>{exp.org}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: '0.68rem', color: 'var(--text-mute)' }}>{exp.period}</p>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-mute)' }}>{exp.location}</p>
                  </div>
                </div>
                <p style={{ fontSize: '0.78rem', lineHeight: 1.8, color: 'var(--text-mute)', marginBottom: '1.2rem' }}>{exp.summary}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {exp.tags.map(t => <span key={t} style={{ fontSize: '0.6rem', padding: '0.2rem 0.5rem', background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text-mute)', borderRadius: 2 }}>{t}</span>)}
                  </div>
                  <button className="deep-dive-btn" onClick={() => openExp(exp)}>Deep Dive →</button>
                </div>
              </article>
            ))}
          </div>
          <button className="see-all-btn" onClick={openAllExp}>See All Experience ({EXPERIENCE.length}) →</button>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" style={sectionStyle}>
        <div className="wrapper">
          <p className="section-label fade-in">Projects</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
            {PROJECTS.slice(0, PREVIEW).map((proj, i) => (
              <article key={proj.id} className="fade-in card-hover" style={{ transitionDelay: `${i * 0.08}s`, border: '1px solid var(--border)', padding: '1.8rem', background: 'var(--card-bg)', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                  <p style={{ fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>0{i + 1}</p>
                  <StatusBadge status={proj.status} />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 400, marginBottom: '0.3rem' }}>{proj.title}</h3>
                <p style={{ fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.05em', marginBottom: '0.8rem', fontStyle: 'italic' }}>{proj.tagline}</p>
                <p style={{ fontSize: '0.75rem', lineHeight: 1.8, color: 'var(--text-mute)', marginBottom: '1.2rem', flex: 1 }}>{proj.summary}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
                  {proj.tags.map(t => <span key={t} style={{ fontSize: '0.6rem', padding: '0.2rem 0.5rem', background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text-mute)', borderRadius: 2 }}>{t}</span>)}
                </div>
                <button className="deep-dive-btn" onClick={() => openProject(proj)}>Architecture + Details →</button>
              </article>
            ))}
          </div>
          <button className="see-all-btn" onClick={openAllProj}>See All Projects ({PROJECTS.length}) →</button>
        </div>
      </section>

      {/* ── Research ── */}
      <section id="research" style={sectionStyle}>
        <div className="wrapper">
          <p className="section-label fade-in">Research</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {RESEARCH.slice(0, PREVIEW).map((res, i) => (
              <article key={res.id} className="fade-in card-hover" style={{ transitionDelay: `${i * 0.08}s`, border: '1px solid var(--border)', padding: '1.8rem', background: 'var(--card-bg)', backdropFilter: 'blur(4px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 400, lineHeight: 1.3, marginBottom: '0.4rem' }}>{res.title}</h3>
                    <p style={{ fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.06em' }}>{res.venue} · {res.year}</p>
                  </div>
                  <StatusBadge status={res.status} />
                </div>
                <p style={{ fontSize: '0.76rem', lineHeight: 1.8, color: 'var(--text-mute)', marginBottom: '1.2rem' }}>{res.summary}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {res.tags.map(t => <span key={t} style={{ fontSize: '0.6rem', padding: '0.2rem 0.5rem', background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text-mute)', borderRadius: 2 }}>{t}</span>)}
                  </div>
                  <button className="deep-dive-btn" onClick={() => openResearch(res)}>Read Abstract →</button>
                </div>
              </article>
            ))}
          </div>
          <button className="see-all-btn" onClick={openAllRes}>See All Research ({RESEARCH.length}) →</button>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" style={sectionStyle}>
        <div className="wrapper">
          <p className="section-label fade-in">Skills</p>
          <p className="fade-in" style={{ fontSize: '0.78rem', color: 'var(--text-mute)', marginBottom: '2rem', lineHeight: 1.8 }}>Click any group to expand its skill set.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {SKILL_GROUPS.map((sg, i) => (
              <div key={sg.group} className="fade-in" style={{ transitionDelay: `${i * 0.07}s` }}>
                <SkillGroup group={sg.group} skills={sg.skills} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section id="certifications" style={sectionStyle}>
        <div className="wrapper">
          <p className="section-label fade-in">Certifications</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {CERTIFICATIONS.map((cert, i) => (
              <div key={cert.id} className="fade-in card-hover" style={{ transitionDelay: `${i * 0.07}s`, border: '1px solid var(--border)', padding: '1.1rem 1.5rem', background: 'var(--card-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 400, marginBottom: '0.1rem' }}>{cert.title}</p>
                    <p style={{ fontSize: '0.67rem', color: 'var(--text-mute)', letterSpacing: '0.05em' }}>{cert.issuer}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-mute)', letterSpacing: '0.08em' }}>{cert.year}</span>
                  <a href={cert.driveLink} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '0.28rem 0.7rem', textDecoration: 'none', fontFamily: "'DM Mono', monospace", transition: 'all 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--bg)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
                  >↗ View</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Extracurriculars ── */}
      <section id="extracurriculars" style={sectionStyle}>
        <div className="wrapper">
          <p className="section-label fade-in">Beyond the Lab</p>
          <div className="two-col fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            {EXTRACURRICULARS.map(ex => (
              <article key={ex.id} className="card-hover" style={{ border: '1px solid var(--border)', padding: '2rem', background: 'var(--card-bg)', backdropFilter: 'blur(4px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.2rem', color: 'var(--accent)' }}>{ex.icon}</span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 400 }}>{ex.title}</h3>
                </div>
                <p style={{ fontSize: '0.78rem', lineHeight: 1.9, color: 'var(--text-mute)', marginBottom: '1.2rem' }}>{ex.summary}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: ex.link ? '1.2rem' : '0' }}>
                  {ex.tags.map(t => <span key={t} style={{ fontSize: '0.6rem', padding: '0.2rem 0.5rem', background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text-mute)', borderRadius: 2 }}>{t}</span>)}
                </div>
                {ex.link && (
                  <a href={ex.link} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', transition: 'gap 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = '0.6rem'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = '0.3rem'}
                  >Read on Medium →</a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={sectionStyle}>
        <div className="wrapper">
          <p className="section-label fade-in">Contact</p>
          <div className="two-col fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 300, lineHeight: 1.2, marginBottom: '1rem' }}>Let's build something that matters.</h2>
              <p style={{ fontSize: '0.78rem', lineHeight: 2, color: 'var(--text-mute)', marginBottom: '1.8rem' }}>
                Open to research collaborations, internships, and conversations about ML, HCI, or security.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {SOCIAL_LINKS.map(s => <SocialBtn key={s.label} {...s} />)}
              </div>
            </div>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={e => e.preventDefault()}>
              {[
                { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'hello@example.com' },
              ].map(f => (
                <div key={f.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label htmlFor={f.id} style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-mute)' }}>{f.label}</label>
                  <input id={f.id} type={f.type} placeholder={f.placeholder} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: "'DM Mono',monospace", fontSize: '0.78rem', padding: '0.7rem 0.9rem', outline: 'none' }} />
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <label htmlFor="message" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-mute)' }}>Message</label>
                <textarea id="message" rows={4} placeholder="What's on your mind?" style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: "'DM Mono',monospace", fontSize: '0.78rem', padding: '0.7rem 0.9rem', outline: 'none', resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ alignSelf: 'flex-start', padding: '0.7rem 1.8rem', background: 'var(--accent)', color: 'var(--bg)', border: 'none', fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ padding: '2.5rem 0' }}>
        <div className="wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.2rem' }}>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-mute)', letterSpacing: '0.05em' }}>© 2026 Samriddhi Bagchi</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {SOCIAL_LINKS.map(s => (
              <a key={s.label} href={s.href} target={s.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" aria-label={s.label} title={s.label}
                style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', color: 'var(--text-mute)', fontSize: '0.68rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s', fontFamily: "'DM Mono',monospace" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-mute)' }}
              >{s.icon}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
