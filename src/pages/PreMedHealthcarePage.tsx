import React from 'react';
import { 
  HeartPulse, 
  Stethoscope, 
  Bot, 
  UserCheck, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  Building2,
  BookOpen
} from 'lucide-react';

export const PreMedHealthcarePage: React.FC = () => {
  return (
    <div id="premed-healthcare-page" className="py-8 space-y-10">
      {/* Header Banner */}
      <section className="bg-white rounded-2xl border border-emerald-200 p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-bl-full pointer-events-none" />

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold">
            <HeartPulse className="w-3.5 h-3.5 text-red-600" />
            <span>Choice Page #1 • Descriptive Filename: PreMedHealthcarePage.tsx</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 tracking-tight leading-tight">
            Caring for the Sick: Pre-Med Journey & Human-Centered AI in Healthcare
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Why Mohammed Albayati is dedicated to entering the medical field, treating patients as living human beings with dignity, and leveraging artificial intelligence as a support tool rather than a replacement for doctors.
          </p>
        </div>
      </section>

      {/* Main Philosophy: Why I Want to Help the Sick */}
      <section className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-md">
            <UserCheck className="w-4 h-4 text-emerald-700" />
            <span>Core Motivation</span>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 leading-snug">
            "I Want to Help People Like a Real Person, Face-to-Face"
          </h2>

          <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
            <p>
              When people are sick, injured, or facing frightening medical diagnoses, they do not just need an algorithm printing a probability score. They need a physician who listens attentively, understands their emotional vulnerability, and stands beside them during their hardest hours.
            </p>
            <p>
              My ambition to study medicine was born from this desire to provide genuine comfort and clinical healing. Growing up and witnessing how health challenges affect families motivated me to pursue the demanding path of a high school student preparing for pre-med coursework.
            </p>
            <p>
              By mastering biology, physiology, and chemistry, I want to earn the medical privilege of placing a stethoscope to a patient’s chest, diagnosing ailments accurately, and helping save lives in my community.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden shadow-md border-2 border-emerald-200 group">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
              alt="Physician caring for patient with compassion"
              className="w-full h-80 object-cover group-hover:scale-103 transition-transform duration-300"
            />
            <div className="bg-emerald-950 p-4 text-white">
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Compassionate Medicine</div>
              <div className="text-sm font-semibold">Healing Through Science and Empathy</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI in Healthcare vs Human Physician Matrix */}
      <section className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-red-700 bg-red-100 px-3 py-1 rounded-md mb-2">
            <Bot className="w-4 h-4 text-red-600" />
            <span>Modern Technology & Medical Ethics</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
            How AI Transforms Healthcare & Why the Human Doctor is Irreplaceable
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1">
            As a student in an AI development class, I analyze how artificial intelligence optimizes healthcare without diminishing the doctor-patient relationship.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-emerald-900 text-white">
                <th className="p-3.5 font-bold">Medical Function</th>
                <th className="p-3.5 font-bold">Role of AI Assistance</th>
                <th className="p-3.5 font-bold bg-emerald-950">Role of the Human Physician (M.D.)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-700">
              <tr className="hover:bg-zinc-50">
                <td className="p-3.5 font-semibold text-zinc-900">Medical Imaging & Diagnostics</td>
                <td className="p-3.5">Scans thousands of CT, MRI, and X-ray images in seconds to highlight subtle micro-lesions.</td>
                <td className="p-3.5 font-medium text-emerald-950 bg-emerald-50/40">Integrates patient history, lifestyle, and physical examination to confirm diagnosis and avoid false positives.</td>
              </tr>
              <tr className="hover:bg-zinc-50">
                <td className="p-3.5 font-semibold text-zinc-900">Drug Discovery & Interaction</td>
                <td className="p-3.5">Models molecular bindings and predicts dangerous pharmaceutical contraindications.</td>
                <td className="p-3.5 font-medium text-emerald-950 bg-emerald-50/40">Tailors treatment plans around individual patient allergies, financial realities, and comfort.</td>
              </tr>
              <tr className="hover:bg-zinc-50">
                <td className="p-3.5 font-semibold text-zinc-900">Patient Communication & Care</td>
                <td className="p-3.5">Automates appointment reminders, transcription of clinical notes, and chart summaries.</td>
                <td className="p-3.5 font-medium text-emerald-950 bg-emerald-50/40">Delivers difficult news with compassion, holds a trembling hand, and inspires hope and trust.</td>
              </tr>
              <tr className="hover:bg-zinc-50">
                <td className="p-3.5 font-semibold text-zinc-900">Surgical Interventions</td>
                <td className="p-3.5">Provides robotic stabilization and real-time biometric telemetry overlays.</td>
                <td className="p-3.5 font-medium text-emerald-950 bg-emerald-50/40">Exercises split-second surgical judgment when unexpected anatomical complications arise.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Pre-Med Preparation Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-900 text-base">
            AP Biology & Science Foundation
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Building deep knowledge in molecular genetics, cellular respiration, and homeostasis. Aiming for a 4+ on the AP exam at Grossmont High School.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-900 text-base">
            San Diego Hospital Volunteering
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Targeting hundreds of volunteer and shadowing hours at local San Diego medical facilities (Sharp Healthcare, Scripps, and UC San Diego Health).
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-900 text-base">
            Ethical Healthcare Leadership
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Preparing to advocate for underserved patients and ensure modern medical breakthroughs benefit all communities equally.
          </p>
        </div>
      </section>
    </div>
  );
};
