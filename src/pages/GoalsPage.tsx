import React from 'react';
import { Target, CheckCircle2, Clock, Award, Compass } from 'lucide-react';
import { PlaceholderTag } from '../components/common/PlaceholderTag';
import { PlaceholderImage } from '../components/common/PlaceholderImage';

export const GoalsPage: React.FC = () => {
  const goalSections = [
    {
      id: 'short-term',
      timeframe: 'Short-Term Goals (Current Semester)',
      color: 'emerald',
      tag: '[Insert Semester Web Dev & Academic Goals Here]',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
      milestones: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Vestibulum ante ipsum primis in faucibus orci luctus.',
        'Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.'
      ]
    },
    {
      id: 'medium-term',
      timeframe: 'Medium-Term Goals (High School Graduation)',
      color: 'red',
      tag: '[Insert High School Extracurricular & Subject Goals Here]',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem.',
      milestones: [
        'Proin ut ligula vel nunc egestas porttitor.',
        'Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.',
        'Fusce ac turpis quis ligula lacinia aliquet.'
      ]
    },
    {
      id: 'long-term',
      timeframe: 'Long-Term Aspirations (College & Career)',
      color: 'emerald',
      tag: '[Insert College, Career & Lifelong Dreams Here]',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
      milestones: [
        'Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.',
        'Pellentesque congue. Ut in risus volutpat libero pharetra tempor.',
        'Cras vestibulum bibendum augue. Praesent egestas leo in pede.'
      ]
    }
  ];

  return (
    <div id="goals-page" className="py-10 space-y-10">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-200 shadow-2xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
          <Target className="w-3.5 h-3.5 text-emerald-700" />
          <span>Academic & Personal Aspirations</span>
        </div>
        <h1 className="text-3xl font-extrabold text-emerald-950 tracking-tight">
          Mohammed's Goals & Milestones
        </h1>
        <p className="text-sm text-zinc-600 mt-2 max-w-2xl leading-relaxed">
          This page outlines my short-term, medium-term, and long-term academic and personal objectives. Content sections currently contain clearly labeled placeholders and lorem ipsum text ready to be replaced with my personal writing.
        </p>
      </div>

      {/* Goal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goalSections.map((section) => (
          <div
            key={section.id}
            className={`bg-white rounded-2xl p-6 border shadow-2xs flex flex-col justify-between ${
              section.color === 'red'
                ? 'border-t-4 border-red-600 border-x-zinc-200 border-b-zinc-200'
                : 'border-t-4 border-emerald-600 border-x-zinc-200 border-b-zinc-200'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    section.color === 'red'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  <Award className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-zinc-900 text-sm">
                  {section.timeframe}
                </h2>
              </div>

              <PlaceholderTag label={section.tag} />

              <p className="text-xs text-zinc-600 leading-relaxed mt-3 mb-4 italic">
                {section.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-zinc-100">
                <span className="text-2xs font-bold uppercase tracking-wider text-zinc-400">
                  Target Milestones (Placeholder):
                </span>
                {section.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                        section.color === 'red' ? 'text-red-600' : 'text-emerald-600'
                      }`}
                    />
                    <span>{milestone}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 text-2xs text-zinc-400 flex items-center justify-between">
              <span>Status: In Progress</span>
              <span className="font-mono">Draft v1.0</span>
            </div>
          </div>
        ))}
      </div>

      {/* Media or Certificate Placeholder Box */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 space-y-4">
        <h3 className="font-bold text-zinc-900 text-base flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-700" />
          <span>Goal Evidence & Achievement Showcase</span>
        </h3>
        <p className="text-xs text-zinc-500">
          Upload certificates, project badges, awards, or study schedule diagrams here.
        </p>
        <PlaceholderImage
          label="[Placeholder: Academic / Extracurricular Achievement Evidence]"
          dimensions="800 × 400"
          type="image"
          className="h-56"
        />
      </div>
    </div>
  );
};
