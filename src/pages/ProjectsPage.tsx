import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Code2, Tag } from 'lucide-react';
import { PlaceholderImage } from '../components/common/PlaceholderImage';
import { PlaceholderTag } from '../components/common/PlaceholderTag';

export const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Web Development', 'Class Assignments', 'Creative Labs'];

  const projects = [
    {
      id: 'proj-1',
      title: 'Project 1: Personal Portfolio & About Me',
      category: 'Web Development',
      tag: '[Insert Project 1 Details Here]',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Express', 'JSON Storage'],
      featured: true
    },
    {
      id: 'proj-2',
      title: 'Project 2: Interactive Class Assignment',
      category: 'Class Assignments',
      tag: '[Insert Project 2 Details Here]',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      techStack: ['HTML5', 'CSS Grid', 'DOM Manipulation'],
      featured: false
    },
    {
      id: 'proj-3',
      title: 'Project 3: Creative Coding Experiment',
      category: 'Creative Labs',
      tag: '[Insert Project 3 Details Here]',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      techStack: ['JavaScript', 'Canvas / SVG', 'Animation'],
      featured: false
    },
    {
      id: 'proj-4',
      title: 'Project 4: Student Choice Showcase',
      category: 'Class Assignments',
      tag: '[Insert Project 4 Details Here]',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.',
      techStack: ['Responsive Design', 'Flexbox', 'Accessibility'],
      featured: false
    }
  ];

  const filteredProjects = projects.filter(
    p => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <div id="projects-page" className="py-10 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-200 shadow-2xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
          <FolderGit2 className="w-3.5 h-3.5 text-emerald-700" />
          <span>Student Showcase</span>
        </div>
        <h1 className="text-3xl font-extrabold text-emerald-950 tracking-tight">
          Mohammed's Projects & Assignments
        </h1>
        <p className="text-sm text-zinc-600 mt-2 max-w-2xl leading-relaxed">
          Here are my projects and coding assignments from web development class. Project visual banners, code snippets, and descriptions currently feature template placeholders and lorem ipsum.
        </p>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-zinc-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-2xs hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Visual Placeholder */}
              <div className="p-4 bg-zinc-50 border-b border-zinc-100">
                <PlaceholderImage
                  label={`[Placeholder: Screenshot for ${project.title}]`}
                  dimensions="600 × 350"
                  type="image"
                  className="h-44"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-2xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                      Current Milestone
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-zinc-900">
                  {project.title}
                </h3>

                <PlaceholderTag label={project.tag} />

                <p className="text-xs text-zinc-600 leading-relaxed italic">
                  "{project.description}"
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-2xs font-medium rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50/50 flex items-center justify-between text-xs">
              <span className="text-zinc-400 text-2xs">
                Status: In Progress
              </span>
              <span className="text-emerald-700 font-semibold text-2xs">
                [Insert Live Demo / Code Link]
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
