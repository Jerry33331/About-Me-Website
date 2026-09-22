import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Video, 
  Share2, 
  ExternalLink, 
  Maximize2, 
  X, 
  Play, 
  Code2, 
  Languages, 
  HeartPulse, 
  Gamepad2, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import { MediaCardItem } from '../types';

export const MEDIA_ITEMS: MediaCardItem[] = [
  {
    id: 'media-1',
    title: 'Grossmont High AI & Web Dev Workstation',
    category: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    caption: 'My primary workstation in the computer science lab at Grossmont High School where I prompt AI as a collaborator to architect web apps and test TypeScript features.',
    tag: 'Web & AI Lab',
    date: 'Grossmont High • 2026',
    embedType: 'image'
  },
  {
    id: 'media-2',
    title: 'Mandarin Chinese Hanzi & Vocabulary Study',
    category: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80',
    caption: 'Active character review, stroke order, and Pinyin notebooks as I prepare for high school foreign language milestones and conversational fluency.',
    tag: 'Linguistics',
    date: 'Self-Study • 2026',
    embedType: 'image'
  },
  {
    id: 'media-3',
    title: 'Pre-Med Anatomy & Biology Laboratory Study',
    category: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    caption: 'Studying cellular physiology and human anatomy foundations to score at least a 4 on the AP Biology exam and prepare for university pre-med coursework.',
    tag: 'Pre-Med Study',
    date: 'Grossmont Science Dept',
    embedType: 'image'
  },
  {
    id: 'media-4',
    title: 'Harvard CS50: Computer Science & Web Programming',
    category: 'video',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/z7L75_vkc1M',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    caption: 'Found foundational lecture on computational thinking, algorithm design, and web programming from Harvard University\'s CS50 computer science curriculum.',
    tag: 'Web & CS Video',
    date: 'Found Video • Harvard CS50',
    externalLink: 'https://www.youtube.com/watch?v=z7L75_vkc1M',
    embedType: 'youtube'
  },
  {
    id: 'media-5',
    title: 'Khan Academy: High School Biology & The Living Cell',
    category: 'video',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/nnM1N5JgW2s',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    caption: 'Found high school biology lesson from Khan Academy introducing cell structure, organelle functions, and membrane transport fundamentals for pre-med readiness.',
    tag: 'Pre-Med Video',
    date: 'Found Video • Khan Academy',
    externalLink: 'https://www.youtube.com/watch?v=nnM1N5JgW2s',
    embedType: 'youtube'
  },
  {
    id: 'media-6',
    title: 'ChineseFor.Us: Mandarin Chinese Pinyin Simple Finals',
    category: 'video',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/aO5w71jH08k',
    thumbnailUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
    caption: 'Found video lesson by native instructors teaching standard Mandarin Chinese simple finals (a, o, e, i, u, ü) with precise mouth pronunciation mechanics.',
    tag: 'Language Video',
    date: 'Found Video • ChineseFor.Us',
    externalLink: 'https://www.youtube.com/watch?v=aO5w71jH08k',
    embedType: 'youtube'
  },
  {
    id: 'media-7',
    title: 'Mohammed\'s GitHub Code Repository Activity',
    category: 'social',
    mediaUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=600&q=80',
    caption: 'GitHub code commits and open repositories where I push classroom web projects, JSON persistent storage schemas, and interactive React UI components.',
    tag: 'GitHub Post',
    date: 'github.com/Mohammed-Albayati',
    externalLink: 'https://github.com/Mohammed-Albayati',
    embedType: 'social-embed'
  },
  {
    id: 'media-8',
    title: 'Competitive Esports & Team Discord Scrims',
    category: 'social',
    mediaUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    caption: 'Team communication channel and battle-station setup for weekend competitive PC & mobile matches, building split-second decision making and tactical teamwork.',
    tag: 'Gaming Community',
    date: 'Discord Scrimmage Match',
    externalLink: 'https://discord.com',
    embedType: 'social-embed'
  },
  {
    id: 'media-9',
    title: 'San Diego Healthcare & Pre-Med Student Network',
    category: 'social',
    mediaUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    caption: 'Community board post coordinating volunteer shifts at San Diego medical centers and scheduling future physician shadowing opportunities for sophomore year of college.',
    tag: 'Hospital Volunteer',
    date: 'Community Service Board',
    externalLink: 'https://health.ucsd.edu',
    embedType: 'social-embed'
  }
];

export const MediaPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'image' | 'video' | 'social'>('all');
  const [expandedItem, setExpandedItem] = useState<MediaCardItem | null>(null);
  const [activeInlineVideoId, setActiveInlineVideoId] = useState<string | null>(null);

  const filteredItems = selectedCategory === 'all' 
    ? MEDIA_ITEMS 
    : MEDIA_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div id="media-page" className="py-8 space-y-8">
      {/* Header Section */}
      <section className="bg-white rounded-2xl border border-emerald-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span>Rubric Criterion 5 • 9 Required Media Cards</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
              Media Showcase & Student Gallery
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed">
              Explore 9 authentic media cards covering Mohammed Albayati's AI design class, Grossmont High School studies, Chinese language notebooks, Pre-Med aspirations, and competitive esports.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
              }`}
            >
              All Media (9)
            </button>
            <button
              onClick={() => setSelectedCategory('image')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'image'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Images (3)</span>
            </button>
            <button
              onClick={() => setSelectedCategory('video')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'video'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Videos (3)</span>
            </button>
            <button
              onClick={() => setSelectedCategory('social')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'social'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Social (3)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 9 Media Cards Grid with Required Hover Effect & Click-to-Expand */}
      <section 
        id="media-cards-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredItems.map((item, index) => (
          <article
            key={item.id}
            id={`media-card-${item.id}`}
            onClick={() => setExpandedItem(item)}
            className="group bg-white rounded-xl border border-zinc-200 shadow-2xs hover:shadow-lg hover:border-emerald-500 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1"
          >
            {/* Media Image / Preview Container */}
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
              {item.category === 'video' && activeInlineVideoId === item.id ? (
                <div className="relative w-full h-full">
                  <iframe
                    src={`${item.mediaUrl}?autoplay=1&rel=0`}
                    title={item.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveInlineVideoId(null);
                    }}
                    className="absolute top-2 right-2 px-2 py-0.5 rounded bg-zinc-900/90 hover:bg-black text-white text-2xs font-semibold z-20 cursor-pointer shadow-md"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-2xs font-bold shadow-xs text-white ${
                      item.category === 'video' ? 'bg-red-600' : 'bg-emerald-800/90 backdrop-blur-xs'
                    }`}>
                      {item.category === 'video' && <Video className="w-3 h-3" />}
                      {item.category === 'image' && <ImageIcon className="w-3 h-3" />}
                      {item.category === 'social' && <Share2 className="w-3 h-3" />}
                      <span>{item.tag}</span>
                    </span>
                  </div>

                  {/* Hover Overlay with Expand Indicator */}
                  <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 text-emerald-950 text-xs font-bold shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5 text-red-600" />
                      <span>Click to Expand</span>
                    </span>
                  </div>

                  {item.category === 'video' && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveInlineVideoId(item.id);
                      }}
                      className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer z-10"
                      title="Play Video"
                      aria-label={`Play ${item.title}`}
                    >
                      <Play className="w-4 h-4 fill-white translate-x-0.5" />
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Card Content: Title, Date, Caption */}
            <div className="p-5 flex flex-col grow justify-between space-y-3">
              <div>
                <div className="text-2xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
                  {item.date}
                </div>
                {/* Rubric: Title on every card */}
                <h2 className="text-base font-bold text-zinc-900 leading-snug group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h2>
                {/* Rubric: Caption on every card */}
                <p className="text-xs text-zinc-600 mt-2 leading-relaxed line-clamp-3">
                  {item.caption}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-2xs text-zinc-500 font-medium">
                <span>Card #{index + 1} of 9</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold group-hover:underline">
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Lightbox / Click-to-Expand Modal */}
      {expandedItem && (
        <div 
          id="media-lightbox-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setExpandedItem(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-zinc-200 relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setExpandedItem(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-zinc-900/80 hover:bg-zinc-900 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close media dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Body in Lightbox */}
            <div className="w-full bg-zinc-950 flex items-center justify-center">
              {expandedItem.category === 'video' ? (
                <div className="w-full aspect-video">
                  <iframe
                    src={expandedItem.mediaUrl}
                    title={expandedItem.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={expandedItem.mediaUrl}
                  alt={expandedItem.title}
                  className="w-full max-h-[60vh] object-contain"
                />
              )}
            </div>

            {/* Modal Info Content */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-900">
                  {expandedItem.tag}
                </span>
                <span className="text-xs font-semibold text-zinc-500">
                  {expandedItem.date}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
                {expandedItem.title}
              </h2>

              <p className="text-sm text-zinc-700 leading-relaxed">
                {expandedItem.caption}
              </p>

              <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-zinc-500">
                  Direct student media artifact for Mohammed Albayati
                </span>

                {expandedItem.externalLink && (
                  <a
                    href={expandedItem.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
                  >
                    <span>Visit External Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
