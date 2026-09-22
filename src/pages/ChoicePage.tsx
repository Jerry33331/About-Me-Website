import React from 'react';
import { Sparkles, HelpCircle, Heart, Star, ExternalLink, Play } from 'lucide-react';
import { PlaceholderImage } from '../components/common/PlaceholderImage';
import { PlaceholderTag } from '../components/common/PlaceholderTag';

export const ChoicePage: React.FC = () => {
  return (
    <div id="choice-page" className="py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-red-200 shadow-2xs relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold mb-3 border border-red-200">
          <Sparkles className="w-3.5 h-3.5 text-red-600" />
          <span>Student Elective Page</span>
        </div>

        <h1 className="text-3xl font-extrabold text-emerald-950 tracking-tight">
          [Student Choice Page: Topic of Mohammed's Passion]
        </h1>

        <p className="text-sm text-zinc-600 mt-2 max-w-2xl leading-relaxed">
          This is the dedicated <strong>Choice Page</strong> required by your project rubric. In web development class, students choose a personal interest to design a custom page for (such as a favorite sport, hobby, creative writing, robotics, photography, or music).
        </p>

        {/* Student Note Callout */}
        <div className="mt-5 p-4 rounded-xl bg-emerald-50/70 border border-emerald-300 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-900 leading-relaxed">
            <strong>Note for Mohammed:</strong> You can replace this template with whatever topic you choose for your assignment. All text below uses placeholder Lorem Ipsum and media frames so you don't lose points for missing structure!
          </div>
        </div>
      </div>

      {/* Main Choice Article Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Narrative Content */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 space-y-6">
          <div>
            <PlaceholderTag label="[Insert Choice Topic Headline Here]" />
            <h2 className="text-2xl font-bold text-zinc-900 mt-2">
              Lorem Ipsum Dolor Sit Amet Consectetur
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              [Insert date / category / subtitle placeholder]
            </p>
          </div>

          <div className="space-y-4 text-sm text-zinc-600 leading-relaxed italic">
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            </p>
            <p>
              "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
            <p>
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
            </p>
          </div>

          {/* Inline placeholder image */}
          <div className="pt-2">
            <PlaceholderImage
              label="[Placeholder: Topic Visual / Gallery Image 1]"
              dimensions="800 × 450"
              type="image"
              className="h-60"
            />
          </div>

          <div className="space-y-4 text-sm text-zinc-600 leading-relaxed italic">
            <p>
              "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."
            </p>
          </div>
        </div>

        {/* Right Column: Fast Facts & Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4 shadow-2xs">
            <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
              <Star className="w-4 h-4 text-red-600" />
              <span>Topic Quick Facts (Placeholder)</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                <span className="font-semibold text-zinc-700 block">[Topic Highlight 1]</span>
                <span className="text-zinc-500 italic">Lorem ipsum dolor sit amet</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                <span className="font-semibold text-zinc-700 block">[Topic Highlight 2]</span>
                <span className="text-zinc-500 italic">Consectetur adipiscing elit</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                <span className="font-semibold text-zinc-700 block">[Topic Highlight 3]</span>
                <span className="text-zinc-500 italic">Integer nec odio praesent libero</span>
              </div>
            </div>
          </div>

          {/* Real Found Video Embed in Elective/Choice Page */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-2xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                Found YouTube Video
              </span>
              <span className="text-2xs text-zinc-500 font-medium">Real Media</span>
            </div>
            
            <h4 className="font-bold text-zinc-900 text-sm">
              Grossmont Union High School District Campus Overview
            </h4>
            
            <div className="rounded-xl overflow-hidden aspect-video bg-zinc-950 border border-zinc-200">
              <iframe
                src="https://www.youtube-nocookie.com/embed/QJ1t4y2G-8Q"
                title="Grossmont Union High School District Overview"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            <p className="text-2xs text-zinc-500 leading-relaxed">
              Curated found video from Grossmont Union High School District highlighting Foothiller traditions, academic electives, and campus life.
            </p>

            <a
              href="https://www.youtube.com/watch?v=QJ1t4y2G-8Q"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-2xs font-bold text-red-600 hover:text-red-700"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
