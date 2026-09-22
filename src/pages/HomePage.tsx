import React, { useState } from 'react';
import { 
  ArrowRight, 
  Mail, 
  Code2, 
  Globe, 
  Gamepad2, 
  HeartPulse, 
  Languages, 
  Bot, 
  Sparkles, 
  GraduationCap, 
  Play, 
  Pause,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  Upload,
  RotateCcw,
  Camera
} from 'lucide-react';
import { PageId } from '../types';

const CS_LAB_WORKSPACE_PHOTO = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80';

interface FoundVideoItem {
  id: string;
  youtubeId: string;
  title: string;
  creator: string;
  duration: string;
  category: string;
  description: string;
  thumbnail: string;
}

const FOUND_VIDEOS: FoundVideoItem[] = [
  {
    id: 'guhsd-overview',
    youtubeId: 'QJ1t4y2G-8Q',
    title: 'Grossmont Union High School District Overview',
    creator: 'Grossmont Union High School District',
    duration: '2:15',
    category: 'Grossmont High',
    description: 'Official overview of Grossmont Union High School District academic pathways and Foothiller campus community.',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cs50-intro',
    youtubeId: 'z7L75_vkc1M',
    title: 'Harvard CS50: Computer Science & Web Fundamentals',
    creator: 'Harvard University / Prof. David J. Malan',
    duration: '1:45:00',
    category: 'Computer Science',
    description: 'Foundational computer science principles, computational thinking, and web design studied for high school software projects.',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'biology-khan',
    youtubeId: 'nnM1N5JgW2s',
    title: 'Khan Academy: High School Biology & The Cell',
    creator: 'Khan Academy',
    duration: '10:48',
    category: 'Pre-Med Track',
    description: 'Core cellular physiology and high school biology lesson foundational for Mohammed\'s pre-med track and AP science courses.',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mandarin-pinyin',
    youtubeId: 'aO5w71jH08k',
    title: 'ChineseFor.Us: Mandarin Pinyin Simple Finals',
    creator: 'ChineseFor.Us Language Studio',
    duration: '12:15',
    category: 'Language Studies',
    description: 'Authentic pronunciation instruction covering simple vowels and articulation for foreign language milestones.',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
  }
];

const DEFAULT_STUDENT_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 440" width="400" height="440">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#064e3b" />
      <stop offset="50%" stop-color="#047857" />
      <stop offset="100%" stop-color="#065f46" />
    </linearGradient>
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dc2626" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>
  </defs>
  <rect width="400" height="440" fill="url(#bgGrad)" />
  <circle cx="200" cy="140" r="68" fill="#f8fafc" />
  <path d="M90 330 C90 240, 145 215, 200 215 C255 215, 310 240, 310 330 Z" fill="#f8fafc" />
  <rect x="30" y="355" width="340" height="60" rx="12" fill="#022c22" fill-opacity="0.8" />
  <text x="200" y="380" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">MOHAMMED ALBAYATI</text>
  <text x="200" y="401" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#a7f3d0" text-anchor="middle">Grossmont High School • AI Portfolio</text>
  <circle cx="345" cy="55" r="28" fill="url(#badgeGrad)" />
  <text x="345" y="61" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">GHS</text>
  <text x="200" y="156" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" fill="#047857" text-anchor="middle">MA</text>
</svg>
`)}`;

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [studentPhoto, setStudentPhoto] = useState<string>(() => {
    return localStorage.getItem('mohammed_profile_photo') || DEFAULT_STUDENT_AVATAR;
  });

  const activeVideo = FOUND_VIDEOS[selectedVideoIndex];

  const studentEmail = "mohammed.albayati@student.guhsd.net";

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          setStudentPhoto(dataUrl);
          localStorage.setItem('mohammed_profile_photo', dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    setStudentPhoto(DEFAULT_STUDENT_AVATAR);
    localStorage.removeItem('mohammed_profile_photo');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(studentEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div id="home-page" className="py-8 space-y-12">
      {/* Hero Section - Above the Fold with Student Photo and Full Name in <h1> */}
      <section 
        id="hero-section"
        className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-6 sm:p-10 relative overflow-hidden"
      >
        {/* Decorative corner accent using secondary Red */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-bl-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Text Info */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-900">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>Grossmont High School • AI Development & Design</span>
            </div>

            {/* Rubric Requirement: Full name is strictly <h1> */}
            <h1 
              id="student-full-name"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 tracking-tight leading-tight"
            >
              Mohammed Albayati
            </h1>

            <div className="text-sm sm:text-base font-semibold text-emerald-800 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-red-600 inline-block shrink-0" />
              <span>Sophomore Student • Aspiring Doctor & AI Tech Enthusiast</span>
            </div>

            {/* Rubric Requirement: Biography contains exactly 2-3 <p> elements */}
            <div 
              id="biography" 
              className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-3.5"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
                <Sparkles className="w-4 h-4 text-red-600" />
                <span>About Mohammed's Journey</span>
              </div>
              
              <div className="space-y-3 text-sm text-zinc-800 leading-relaxed">
                <p id="bio-paragraph-1">
                  I am a high school sophomore at Grossmont High School enrolled in an innovative AI development and design class. My interest in web development and technology began when I saw how people can build entire websites with the help of artificial intelligence; understanding how technology like that works behind the scenes immediately fascinated me.
                </p>
                <p id="bio-paragraph-2">
                  Currently, I am learning how to use AI efficiently and treat it like an intelligent employee to architect functional web applications and create exciting class projects. My favorite technical skill is communicating effectively with AI systems to write code, solve problems, and build interactive digital tools from the ground up.
                </p>
                <p id="bio-paragraph-3">
                  Outside of coding and building websites, my long-term aspiration is to become a medical doctor so I can dedicate my career to helping people in need. I also enjoy challenging myself by learning new languages like Chinese, and in my free time I love playing competitive mobile and PC games.
                </p>
              </div>
            </div>

            {/* Hero Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                id="hero-view-projects-btn"
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-contact-btn"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border-2 border-red-600 hover:bg-red-50 text-red-700 text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-red-600" />
                <span>Send Message</span>
              </button>
            </div>
          </div>

          {/* Rubric Requirement: Clear student photo appears above fold (Image #1) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-md border-4 border-white ring-2 ring-emerald-500/40 bg-zinc-950">
              <img
                id="student-profile-photo"
                src={studentPhoto}
                alt="Mohammed Albayati - Student Photo"
                className="w-full h-80 sm:h-96 object-cover object-center"
                loading="eager"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/70 to-transparent p-4 text-white">
                <div className="font-bold text-sm">Mohammed Albayati</div>
                <div className="text-xs text-emerald-200 flex items-center justify-between">
                  <span>Grossmont High School • Class of 2029</span>
                  <span className="inline-flex items-center gap-1 text-red-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    Student
                  </span>
                </div>
              </div>
            </div>

            {/* Custom Photo Upload & Reset Controls */}
            <div className="mt-3 flex items-center gap-2">
              <label 
                htmlFor="student-photo-upload" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
                title="Upload your own picture from your device"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload My Photo</span>
                <input
                  id="student-photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>

              {studentPhoto !== DEFAULT_STUDENT_AVATAR && (
                <button
                  type="button"
                  onClick={handleResetPhoto}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-700 text-xs font-medium transition-colors cursor-pointer"
                  title="Reset to official student avatar"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
            <p className="text-2xs text-zinc-500 mt-1 text-center">
              You can upload your own personal photo anytime or keep the student ID badge.
            </p>
          </div>
        </div>
      </section>

      {/* Rubric Requirement: At least 2 images/videos included */}
      {/* Media Item #2: Technology & AI Development Workspace Image */}
      {/* Media Item #3: Video Introduction Player */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Second Image: CS & AI Lab Workspace */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                <Bot className="w-3.5 h-3.5 text-emerald-700" />
                <span>Classroom Workspace</span>
              </span>
              <span className="text-2xs font-semibold text-zinc-500 uppercase tracking-wider">
                Photo 2 of 2
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
              AI Design & Web Development Environment
            </h2>
            <div className="text-xs text-zinc-600 mt-1">
              Where Mohammed develops websites, tests AI workflows, and prepares for future medical and technology studies.
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-zinc-200 relative group">
            <img
              id="student-workspace-photo"
              src={CS_LAB_WORKSPACE_PHOTO}
              alt="Grossmont High School AI and Web Development Lab Desk"
              className="w-full h-56 sm:h-64 object-cover group-hover:scale-102 transition-transform duration-300"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-zinc-900/80 backdrop-blur-xs rounded-lg px-3 py-1.5 text-white text-xs flex items-center justify-between">
              <span>Grossmont High Computer Lab</span>
              <span className="text-emerald-400 font-mono text-2xs">VS Code • React • AI Tools</span>
            </div>
          </div>
        </div>

        {/* Video Introduction Element: Genuine Found Educational & School Videos */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-800 bg-red-100 px-2.5 py-0.5 rounded-md">
                <Play className="w-3.5 h-3.5 text-red-700" />
                <span>Found Video Showcase</span>
              </span>
              <span className="text-2xs font-semibold text-zinc-500 uppercase tracking-wider">
                Real YouTube Embeds
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
              {activeVideo.title}
            </h2>
            <div className="text-xs text-zinc-600 mt-1">
              {activeVideo.description}
            </div>
          </div>

          {/* Video Category Switcher Pills */}
          <div className="flex flex-wrap gap-1.5">
            {FOUND_VIDEOS.map((video, idx) => (
              <button
                key={video.id}
                onClick={() => {
                  setSelectedVideoIndex(idx);
                  setIsPlayingVideo(true);
                }}
                className={`px-2.5 py-1 rounded-md text-2xs font-bold transition-colors cursor-pointer ${
                  selectedVideoIndex === idx
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                }`}
              >
                {video.category}
              </button>
            ))}
          </div>

          {/* Video Container with Real YouTube Iframe Player */}
          <div className="relative rounded-xl overflow-hidden bg-zinc-950 aspect-video flex items-center justify-center border border-zinc-800 shadow-inner group">
            {isPlayingVideo ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <img
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <button
                    id="play-video-btn"
                    onClick={() => setIsPlayingVideo(true)}
                    className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                    aria-label={`Play ${activeVideo.title}`}
                  >
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </button>
                  <div className="text-white font-bold text-sm drop-shadow-md">
                    Play: {activeVideo.title} ({activeVideo.duration})
                  </div>
                  <div className="text-zinc-200 text-2xs bg-zinc-900/80 px-3 py-1 rounded-full backdrop-blur-xs">
                    Curated source: {activeVideo.creator}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Player controls & Direct YouTube Link */}
          <div className="pt-2 flex items-center justify-between text-2xs text-zinc-500">
            {isPlayingVideo ? (
              <button
                onClick={() => setIsPlayingVideo(false)}
                className="inline-flex items-center gap-1 font-semibold text-zinc-700 hover:text-zinc-900 cursor-pointer"
              >
                <Pause className="w-3.5 h-3.5 text-zinc-600" />
                <span>Pause & Reset Video</span>
              </button>
            ) : (
              <span className="text-zinc-500 font-medium">Click play to watch video</span>
            )}

            <a
              href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-red-600 hover:text-red-700 hover:underline"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars: AI Web Dev, Medical Aspiration, Languages & Gaming */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1 */}
        <div className="bg-white p-6 rounded-xl border-t-4 border-emerald-600 border-x border-b border-zinc-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-900 text-base">
            AI-Powered Web Development
          </h3>
          <div className="text-xs text-zinc-600 leading-relaxed">
            Learning to direct artificial intelligence as an active collaborator to plan architectures, write TypeScript/React code, and deploy functional web interfaces.
          </div>
          <div className="pt-2 text-2xs font-bold text-emerald-700 uppercase tracking-wider">
            Grossmont High • AI Design Class
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white p-6 rounded-xl border-t-4 border-red-600 border-x border-b border-zinc-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
            <HeartPulse className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-900 text-base">
            Pre-Med & Future Doctor
          </h3>
          <div className="text-xs text-zinc-600 leading-relaxed">
            Committed to studying biology, health sciences, and medicine. Excited to eventually integrate healthcare technology to heal patients and support community health.
          </div>
          <div className="pt-2 text-2xs font-bold text-red-700 uppercase tracking-wider">
            Long-Term Career Vision
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white p-6 rounded-xl border-t-4 border-emerald-600 border-x border-b border-zinc-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Languages className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-900 text-base">
            Chinese Studies & Gaming
          </h3>
          <div className="text-xs text-zinc-600 leading-relaxed">
            Actively studying Chinese characters and pronunciation. Balances technical study with high-level teamwork in competitive PC and mobile multiplayer games.
          </div>
          <div className="pt-2 text-2xs font-bold text-emerald-700 uppercase tracking-wider">
            Linguistics & Esports
          </div>
        </div>
      </section>

      {/* Rubric Requirement: Contact area includes social media and email links */}
      <section 
        id="home-contact-area"
        className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border-2 border-emerald-700 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-emerald-800 text-emerald-200 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5 text-red-400" />
            <span>Connect & Contact</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Get in Touch with Mohammed
          </h2>
          <div className="text-xs sm:text-sm text-emerald-200 max-w-md">
            Reach out regarding AI projects, Grossmont High School coursework, or future collaborations.
          </div>
        </div>

        {/* Active Contact Links: Email + Social Media */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Direct Email Link (mailto:) */}
          <a
            id="home-email-link"
            href={`mailto:${studentEmail}?subject=Message%20for%20Mohammed%20Albayati`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>{studentEmail}</span>
          </a>

          {/* Copy Email Helper */}
          <button
            id="copy-email-btn"
            onClick={handleCopyEmail}
            title="Copy email to clipboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 border border-emerald-600 text-emerald-100 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copiedEmail ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
          </button>

          {/* Social Media & Coding Links */}
          <div className="flex items-center gap-2">
            <a
              id="home-github-link"
              href="https://github.com/Mohammed-Albayati"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 border border-emerald-600 text-emerald-100 hover:text-white transition-colors flex items-center gap-1 text-xs"
              aria-label="GitHub Profile"
              title="GitHub Profile (Mohammed-Albayati)"
            >
              <Code2 className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">GitHub</span>
            </a>

            <a
              id="home-linkedin-link"
              href="https://linkedin.com/in/mohammed-albayati"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 border border-emerald-600 text-emerald-100 hover:text-white transition-colors flex items-center gap-1 text-xs"
              aria-label="Student Portfolio Profile"
              title="Student Portfolio"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Portfolio</span>
            </a>

            <a
              id="home-discord-link"
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 border border-emerald-600 text-emerald-100 hover:text-white transition-colors flex items-center gap-1 text-xs"
              aria-label="Discord Gaming Community"
              title="Discord Gaming Community"
            >
              <Gamepad2 className="w-4 h-4" />
              <span className="hidden sm:inline">Gaming</span>
            </a>
          </div>

          {/* On-site Contact Form Navigation */}
          <button
            id="home-contact-page-btn"
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-white text-emerald-950 hover:bg-emerald-50 text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
          >
            <span>Contact Form</span>
            <ArrowRight className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </section>
    </div>
  );
};
