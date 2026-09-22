import React from 'react';
import { 
  GraduationCap, 
  HeartPulse, 
  Stethoscope, 
  Calendar, 
  Building2, 
  Award, 
  CheckCircle2, 
  Target, 
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const FuturePage: React.FC = () => {
  const fiveYearPlan = [
    {
      year: 'Year 1 (Junior Year • Grossmont High)',
      title: 'AP Biology & Academic Rigor Demonstration',
      goalScore: 'AP Score: 4+',
      description: 'Excel in AP Biology with a target score of at least 4 on the national AP exam. Enroll in additional Advanced Placement coursework across mathematics and chemistry to prove to university admissions officers that I can handle heavy academic workloads and am not afraid of rigor.',
      focusAreas: ['AP Biology Mastery', 'Grossmont High STEM Leadership', 'High School GPA Optimization', 'AI Lab Project Portfolio'],
      accentColor: 'border-emerald-600'
    },
    {
      year: 'Year 2 (Senior Year • Grossmont High)',
      title: 'Graduation Class of 2029 & College Applications',
      goalScore: 'Class of 2029 Diploma',
      description: 'Proudly graduate from Grossmont High School with honors. Complete advanced high school requirements, continue Chinese language fluency practice, and submit applications to top California Pre-Med and Bioengineering programs.',
      focusAreas: ['Grossmont High Class of 2029 Graduation', 'College Essay & Application Submissions', 'Mandarin Chinese Language Milestone', 'Pre-Med Readiness Portfolio'],
      accentColor: 'border-red-600'
    },
    {
      year: 'Year 3 (College Freshman Year)',
      title: 'Pre-Med / Biology or Bioengineering Matriculation',
      goalScore: 'Top University Enrollment',
      description: 'Matriculate into a competitive undergraduate Pre-Med, Biology, or Bioengineering degree program at preferred universities: SDSU, UCLA, or UC Irvine. Establish a high undergraduate GPA in organic chemistry and cellular biology.',
      focusAreas: ['Target Colleges: SDSU, UCLA, UC Irvine', 'Foundational Pre-Med STEM Curriculum', 'University Student Health Organizations', 'Bioengineering & AI in Medicine Studies'],
      accentColor: 'border-emerald-600'
    },
    {
      year: 'Year 4 (College Sophomore Year)',
      title: 'Intensive Hospital Volunteering & Physician Shadowing',
      goalScore: 'Hundreds of Clinical Hours',
      description: 'Dedicate significant time to hospital volunteering, emergency department patient transport, and shadowing licensed physicians across surgical and internal medicine specialties to show medical school admissions that I have extensive hands-on clinical exposure.',
      focusAreas: ['Hospital Volunteer Shifts', 'Direct Physician Shadowing', 'Clinical Patient Care Interaction', 'Medical Ethics & Patient Empathy'],
      accentColor: 'border-red-600'
    },
    {
      year: 'Year 5 (College Junior Year)',
      title: 'MCAT Preparation & Medical School Applications',
      goalScore: 'Target MCAT Score: 517',
      description: 'Undergo rigorous full-time MCAT study and practice tests aiming for a 517 score. Prepare AMCAS medical school application packages, collect physician recommendation letters, and submit applications to accredited M.D. medical programs.',
      focusAreas: ['MCAT Target: 517', 'Primary AMCAS Application Packet', 'Letters of Evaluation from Doctors & Faculty', 'Medical School Interviews'],
      accentColor: 'border-emerald-600'
    }
  ];

  return (
    <div id="future-page" className="py-8 space-y-10">
      {/* Page Header */}
      <section className="bg-white rounded-2xl border border-emerald-200 p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full pointer-events-none" />

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <Target className="w-3.5 h-3.5 text-red-600" />
            <span>Rubric Criterion 6 • Academic & Career Vision</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 tracking-tight">
            Mohammed's 5-Year Journey & Medical Aspirations
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            A comprehensive, realistic roadmap taking Mohammed Albayati from Grossmont High School sophomore in AI design to high-scoring AP scholar, university Pre-Med student, and future licensed medical doctor.
          </p>
        </div>
      </section>

      {/* Realistic Long-Term Career Goal Feature Card */}
      <section 
        id="long-term-goal-card"
        className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-10 shadow-md border-2 border-emerald-700 relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600 text-white text-xs font-bold">
              <Stethoscope className="w-4 h-4" />
              <span>Realistic Long-Term Career Goal</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Graduate from Medical School with an M.D. & Become a Licensed Physician
            </h2>

            <p className="text-sm text-emerald-100 leading-relaxed">
              "My long-term goal is to graduate from medical school with my M.D. degree and become a licensed physician dedicated to caring for the sick and helping people in our communities. While artificial intelligence is rapidly transforming healthcare by aiding diagnostics and analyzing complex data, patients need human care, personal empathy, and a real doctor listening to them. I will bridge cutting-edge healthcare technology with compassionate bedside care."
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <div className="bg-emerald-800/80 px-3.5 py-1.5 rounded-lg border border-emerald-600/60 flex items-center gap-2 font-semibold">
                <Award className="w-4 h-4 text-emerald-300" />
                <span>Doctor of Medicine (M.D.)</span>
              </div>
              <div className="bg-emerald-800/80 px-3.5 py-1.5 rounded-lg border border-emerald-600/60 flex items-center gap-2 font-semibold">
                <HeartPulse className="w-4 h-4 text-red-400" />
                <span>Patient Care & Clinical Medicine</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-6 text-center space-y-3 w-full max-w-xs">
              <div className="w-16 h-16 rounded-2xl bg-red-600 text-white flex items-center justify-center mx-auto shadow-lg">
                <Stethoscope className="w-8 h-8" />
              </div>
              <div className="text-lg font-bold text-white">Target Universities</div>
              <div className="space-y-1 text-xs text-emerald-200">
                <div className="p-1.5 bg-white/10 rounded-md font-semibold text-white">SDSU (San Diego State)</div>
                <div className="p-1.5 bg-white/10 rounded-md font-semibold text-white">UCLA (Pre-Med Biology)</div>
                <div className="p-1.5 bg-white/10 rounded-md font-semibold text-white">UC Irvine (Bioengineering)</div>
              </div>
              <div className="text-2xs text-emerald-300 font-mono pt-1">MCAT Benchmark: 517 Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Year Chronological Story Timeline */}
      <section className="space-y-6">
        <div className="border-b border-zinc-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
              Chronological 5-Year Action Plan
            </h2>
            <p className="text-xs text-zinc-500">
              Step-by-step academic and clinical progression through high school graduation and university
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-zinc-100 rounded-full text-zinc-700">
            2026 – 2031 Timeline
          </span>
        </div>

        <div className="space-y-6">
          {fiveYearPlan.map((stage, idx) => (
            <div 
              key={idx}
              className={`bg-white rounded-xl border-l-4 ${stage.accentColor} border-y border-r border-zinc-200 p-6 shadow-2xs space-y-4`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                    0{idx + 1}
                  </span>
                  <div>
                    <span className="text-2xs font-bold uppercase tracking-wider text-emerald-700">
                      {stage.year}
                    </span>
                    <h3 className="text-lg font-bold text-zinc-900">
                      {stage.title}
                    </h3>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-bold shrink-0">
                  <Award className="w-3.5 h-3.5 text-red-600" />
                  <span>{stage.goalScore}</span>
                </span>
              </div>

              <p className="text-sm text-zinc-700 leading-relaxed">
                {stage.description}
              </p>

              <div className="pt-2">
                <div className="text-2xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  Key Action Steps & Milestones:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {stage.focusAreas.map((area, aIdx) => (
                    <div 
                      key={aIdx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Supporting Academic Photo Showcase */}
      <section className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
          Campus & Laboratory Aspirations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl overflow-hidden border border-zinc-200 group">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80"
              alt="University Pre-Med Campus"
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-3 bg-zinc-50 text-xs font-semibold text-zinc-800">
              Top UC & CSU Campuses (SDSU / UCLA / UCI)
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-zinc-200 group">
            <img
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80"
              alt="Biology and Chemistry Lab Equipment"
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-3 bg-zinc-50 text-xs font-semibold text-zinc-800">
              Advanced Biological & Organic Chemistry Labs
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-zinc-200 group">
            <img
              src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80"
              alt="Hospital Care and Physician Teamwork"
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-3 bg-zinc-50 text-xs font-semibold text-zinc-800">
              Hospital Shadowing & Direct Patient Healing
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
