import React, { useState } from 'react';
import { 
  Languages, 
  Gamepad2, 
  Trophy, 
  Brain, 
  Zap, 
  Users, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  ChevronRight,
  RotateCw
} from 'lucide-react';

interface Flashcard {
  hanzi: string;
  pinyin: string;
  english: string;
  context: string;
}

export const LanguageAndGamingPage: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showEnglish, setShowEnglish] = useState(false);

  const sampleFlashcards: Flashcard[] = [
    {
      hanzi: '医生',
      pinyin: 'yī shēng',
      english: 'Doctor / Physician',
      context: 'Relates directly to Mohammed\'s medical career aspiration.'
    },
    {
      hanzi: '电脑',
      pinyin: 'diàn nǎo',
      english: 'Computer',
      context: 'Everyday technology used for AI design and coding.'
    },
    {
      hanzi: '团队合作',
      pinyin: 'tuán duì hé zuò',
      english: 'Teamwork / Collaboration',
      context: 'Essential skill in both medical care and competitive gaming.'
    },
    {
      hanzi: '坚持不懈',
      pinyin: 'jiān chí bù xiè',
      english: 'Perseverance / Determination',
      context: 'Motto for studying AP biology, learning Mandarin, and achieving a 517 MCAT.'
    }
  ];

  const handleNextCard = () => {
    setShowEnglish(false);
    setActiveCardIndex((prev) => (prev + 1) % sampleFlashcards.length);
  };

  const currentCard = sampleFlashcards[activeCardIndex];

  return (
    <div id="language-gaming-page" className="py-8 space-y-10">
      {/* Header Banner */}
      <section className="bg-white rounded-2xl border border-emerald-200 p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full pointer-events-none" />

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <Languages className="w-3.5 h-3.5 text-emerald-700" />
            <span>Choice Page #2 • Descriptive Filename: LanguageAndGamingPage.tsx</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 tracking-tight leading-tight">
            Linguistics & High-Speed Strategy: Learning Chinese & Competitive Gaming
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Exploring how mastering Mandarin Chinese characters trains memory and discipline, and how competitive PC and mobile esports build fast decision-making, strategic coordination, and mental stamina.
          </p>
        </div>
      </section>

      {/* Part 1: Learning Mandarin Chinese */}
      <section className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-md mb-2">
              <Languages className="w-4 h-4 text-emerald-700" />
              <span>Mandarin Chinese Studies</span>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900">
              Why Learning Chinese Sharpens Cognitive Discipline
            </h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-zinc-100 rounded-lg text-zinc-700">
            Language Passion
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-sm text-zinc-700 leading-relaxed">
            <p>
              Learning Chinese is one of the most intellectually rewarding challenges I have taken on outside of my AI design class. Unlike English, Mandarin is a tonal language where subtle differences in pitch change word meanings entirely, and writing requires memorizing stroke order, radicals, and logographic characters (Hanzi).
            </p>
            <p>
              This requires intense pattern recognition, visual memory, and patience—skills that directly reinforce my ability to understand complex code architectures and biological pathways in medicine. Being able to communicate in multiple languages will also make me a more empathetic doctor capable of treating diverse patient populations in California.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-950 block">4 Tonal Distinctions</span>
                <span className="text-emerald-800">Mastering flat, rising, dipping, and falling inflections.</span>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-950 block">Radical Decomposition</span>
                <span className="text-emerald-800">Breaking down characters into logical semantic components.</span>
              </div>
            </div>
          </div>

          {/* Interactive Flashcard Widget */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-2xl p-6 text-white shadow-md border border-emerald-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-2xs text-emerald-300 font-semibold mb-3">
                <span>MOHAMMED'S VOCABULARY DECK</span>
                <span>Card {activeCardIndex + 1} of {sampleFlashcards.length}</span>
              </div>

              {/* Flashcard Card Body */}
              <div 
                onClick={() => setShowEnglish(!showEnglish)}
                className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl p-6 text-center cursor-pointer hover:bg-white/15 transition-all min-h-[160px] flex flex-col items-center justify-center space-y-2"
                title="Click to flip card"
              >
                <div className="text-4xl font-extrabold text-white tracking-widest">
                  {currentCard.hanzi}
                </div>
                <div className="text-sm font-mono text-red-400 font-bold">
                  {currentCard.pinyin}
                </div>

                {showEnglish ? (
                  <div className="pt-2 text-base font-bold text-emerald-200 border-t border-white/20 w-full animate-fade-in">
                    {currentCard.english}
                  </div>
                ) : (
                  <div className="text-2xs text-emerald-300 italic pt-1">
                    (Tap to reveal English translation)
                  </div>
                )}
              </div>

              <div className="mt-3 text-2xs text-emerald-200 text-center italic">
                {currentCard.context}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-emerald-800 flex items-center justify-between">
              <button
                onClick={() => setShowEnglish(!showEnglish)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{showEnglish ? 'Hide English' : 'Reveal English'}</span>
              </button>

              <button
                onClick={handleNextCard}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <span>Next Character</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Competitive PC & Mobile Gaming */}
      <section className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-700 bg-red-100 px-3 py-1 rounded-md mb-2">
              <Gamepad2 className="w-4 h-4 text-red-600" />
              <span>Competitive Esports Strategy</span>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900">
              Esports, Mental Reaction Speeds & Tactical Coordination
            </h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-zinc-100 rounded-lg text-zinc-700">
            Strategy & Reflexes
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
                alt="Competitive Esports Gaming Station"
                className="w-full h-72 object-cover group-hover:scale-103 transition-transform duration-300"
              />
              <div className="bg-zinc-900 p-3 text-white text-xs flex items-center justify-between">
                <span>PC & Mobile Battle-Station</span>
                <span className="text-red-400 font-mono">Ranked Competitive Matches</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 text-sm text-zinc-700 leading-relaxed">
            <p>
              In competitive gaming across PC and mobile titles, success is never just about pressing buttons quickly. It requires deep spatial awareness, instantaneous tactical reassessments, resource budgeting, and clear verbal communication with teammates under extreme pressure.
            </p>
            <p>
              Playing competitive games has taught me how to stay calm when matches get chaotic, analyze post-match mistakes objectively, and coordinate diverse teammates toward a unified objective—the same composure required in high-stakes healthcare and medical environments.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
                <Zap className="w-4 h-4 text-red-600" />
                <div className="text-xs font-bold text-zinc-900">Sub-Second Reflexes</div>
                <div className="text-2xs text-zinc-600">Training hand-eye motor precision and quick reflexes.</div>
              </div>
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
                <Users className="w-4 h-4 text-emerald-700" />
                <div className="text-xs font-bold text-zinc-900">Voice Comms & Trust</div>
                <div className="text-2xs text-zinc-600">Delivering concise callouts and supporting teammates.</div>
              </div>
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
                <Brain className="w-4 h-4 text-red-600" />
                <div className="text-xs font-bold text-zinc-900">Adaptive Strategy</div>
                <div className="text-2xs text-zinc-600">Pivoting tactics when the opposition counters our plan.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
