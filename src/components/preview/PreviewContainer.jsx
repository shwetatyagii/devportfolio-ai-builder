import { LayoutTemplate, FileText, BookOpen } from 'lucide-react'
import PortfolioPreview from './PortfolioPreview'
import ResumePreview    from './ResumePreview'
import ReadmePreview    from './ReadmePreview'
import cn from '@/utils/cn'

const TABS = [
  { id: 'portfolio', label: 'Portfolio', icon: LayoutTemplate },
  { id: 'resume',    label: 'Resume',    icon: FileText       },
  { id: 'readme',    label: 'README',    icon: BookOpen       },
]

// Now CONTROLLED — parent (PreviewPage) owns activeTab
const PreviewContainer = ({ profile, generated, selectedTemplate, activeTab, onTabChange }) => (
  <div>
    {/* Tab bar */}
    <div className="flex gap-1 mb-6 bg-zinc-100 dark:bg-zinc-800/60 p-1 rounded-xl w-fit">
      {TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            activeTab === id
              ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
          )}
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>

    {/* Content */}
    {activeTab === 'portfolio' && (
      <div id="print-portfolio">
        <PortfolioPreview
          profile={profile}
          generated={generated}
          selectedTemplate={selectedTemplate}
        />
      </div>
    )}
    {activeTab === 'resume' && (
      <div id="print-resume">
        <ResumePreview profile={profile} generated={generated} />
      </div>
    )}
    {activeTab === 'readme' && (
      <div id="print-readme">
        <ReadmePreview content={generated?.githubReadme} />
      </div>
    )}
  </div>
)

export default PreviewContainer