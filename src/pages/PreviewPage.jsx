import { useContext, useState } from 'react'
import { useNavigate }          from 'react-router-dom'
import {
  ArrowLeft, Download, Sparkles, AlertTriangle, Info,
  FileText, FileJson, FileDown, RefreshCw, ChevronDown, Globe, FileCode, FileType, Pencil
} from 'lucide-react'
import toast from 'react-hot-toast'
import { PortfolioContext }   from '@/context/PortfolioContext'
import { Button, Badge, Modal } from '@/components/ui'
import PreviewContainer        from '@/components/preview/PreviewContainer'
import CopyButton              from '@/components/preview/CopyButton'
import { regenerateSection }   from '@/services/aiService'
import {
  printPDF,
  downloadMarkdown,
  downloadText,
  downloadJSON, downloadPortfolioHTML, downloadResumeDOCX,
} from '@/utils/exportUtils'
import ContentEditor from '@/components/preview/ContentEditor'


// ── Generation source badge ───────────────────────────────────────────────────
const SourceBadge = ({ source }) => {
  if (!source) return null
  if (source === 'ai') return (
    <Badge variant="green" className="gap-1.5">
      <Sparkles size={10} className="animate-pulse" /> Generated with Gemini AI
    </Badge>
  )
  if (source === 'error-fallback') return (
    <Badge variant="red" className="gap-1.5" title="Gemini was unavailable. Using smart template.">
      <AlertTriangle size={10} /> AI failed — template used
    </Badge>
  )
  return (
    <Badge variant="amber" className="gap-1.5" title="Add VITE_GEMINI_API_KEY for real AI.">
      <Info size={10} /> Smart template (no API key)
    </Badge>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
const PreviewPage = () => {
  const { state, dispatch } = useContext(PortfolioContext)
  const navigate = useNavigate()

  const [activeTab,    setActiveTab]    = useState('portfolio')
  const [exporting,    setExporting]    = useState(false)
  const [regenLoading, setRegenLoading] = useState({})
  const [showExports,  setShowExports]  = useState(false)
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  const { profile, generatedContent, selectedTemplate, generationSource } = state

  // Guard
  if (!generatedContent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto gap-4">
        <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <Sparkles size={28} className="text-zinc-400" />
        </div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Nothing generated yet
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
          Complete the 8-step builder and click Generate with AI to see your portfolio.
        </p>
        <Button leftIcon={<ArrowLeft size={16} />} onClick={() => navigate('/builder')}>
          Go to Builder
        </Button>
      </div>
    )
  }

  // ── Export handlers ─────────────────────────────────────────────────────────
  const safeName = profile.basicInfo?.name?.replace(/\s+/g, '_') ?? 'portfolio'

  const handlePDF = async () => {
    setExporting(true)
    const cls = activeTab === 'resume' ? 'print-resume' : 'print-portfolio'
    try {
      await printPDF(cls)

      toast('Tip: In the print dialog, uncheck "Headers and footers" for a clean PDF.', {
        icon: '💡',
        duration: 8000,
      })

      toast.success('PDF ready — use your browser\'s Save as PDF option')
    } finally {
      setExporting(false)
    }
  }

  const handleMarkdown = () => {
    downloadMarkdown(generatedContent.githubReadme ?? '', safeName)
    toast.success('README.md downloaded!')
  }

  const handleTextDownload = () => {
    // Build plain text from ResumePreview's logic
    const info = profile.basicInfo ?? {}
    const edu  = profile.education  ?? {}
    const aiProjects = generatedContent.projects ?? {}
    const lines = [
      info.name?.toUpperCase() ?? '',
      info.title ?? '',
      [info.location, info.email, info.github, info.linkedin].filter(Boolean).join(' | '),
      '', 'PROFESSIONAL SUMMARY',
      generatedContent.resumeSummary ?? '',
      '', 'TECHNICAL SKILLS',
      (profile.skills ?? []).join(' · '),
      '',
      ...(Array.isArray(profile.projects) && profile.projects.length > 0 ? [
        'PROJECTS',
        ...profile.projects.slice(0, 4).flatMap((p, i) => {
          const desc = aiProjects[String(i)]?.description ?? p.description ?? ''
          return [p.name, desc, `Stack: ${(p.techStack ?? []).join(', ')}`, '']
        }),
      ] : []),
      ...(edu.degree ? ['EDUCATION', `${edu.degree} in ${edu.branch}`, `${edu.college} · ${edu.year}`, ''] : []),
      ...((generatedContent.achievements ?? []).length > 0 ? [
        'ACHIEVEMENTS',
        ...(generatedContent.achievements ?? []).map(a => `• ${a}`),
      ] : []),
    ]
    downloadText(lines.join('\n'), safeName)
    toast.success('Resume.txt downloaded!')
  }

  const handleJSON = () => {
    downloadJSON(profile, generatedContent, safeName)
    toast.success('Portfolio backup downloaded!')
  }

  // ── Section regeneration ────────────────────────────────────────────────────
  const handleRegenerate = async (section) => {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      toast.error('Add VITE_GEMINI_API_KEY to regenerate with AI.')
      return
    }
    setRegenLoading(prev => ({ ...prev, [section]: true }))
    try {
      const result   = await regenerateSection(section, profile, generatedContent)
      const { _source, _model, ...updates } = result
      dispatch({ type: 'UPDATE_GENERATED_SECTION', payload: updates })
      toast.success(`${section === 'githubReadme' ? 'README' : section} regenerated!`)
    } catch (err) {
      toast.error(`Regeneration failed: ${err.message}`)
    } finally {
      setRegenLoading(prev => ({ ...prev, [section]: false }))
    }
  }

  const resumeText    = generatedContent.resumeSummary ?? ''
  const readmeText    = generatedContent.githubReadme  ?? ''

  const REGEN_SECTIONS = [
    { key: 'about',         label: 'About'    },
    { key: 'projects',      label: 'Projects' },
    { key: 'resumeSummary', label: 'Resume'   },
    { key: 'githubReadme',  label: 'README'   },
  ]

  return (
    <div className="space-y-6 max-w-5xl">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="space-y-3" data-no-print>

        {/* Row 1: back + title + export */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Button
              variant="ghost" size="sm" type="button"
              leftIcon={<ArrowLeft size={15} />}
              onClick={() => navigate('/builder')}
              className="flex-shrink-0"
            >
              <span className="hidden sm:inline">Builder</span>
            </Button>
            <div className="hidden sm:block w-px h-5 bg-zinc-200 dark:bg-zinc-700 flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 leading-none truncate">
                Portfolio Preview
              </h1>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 capitalize truncate">
                {profile.basicInfo?.name ?? 'Your portfolio'} · {selectedTemplate}
              </p>
            </div>
          </div>

          {/* ── Export dropdown ─────────────────────────────────────────── */}
          <div className="relative flex-shrink-0">
            <Button
              variant="secondary" size="sm" type="button"
              leftIcon={<Download size={14} />}
              rightIcon={<ChevronDown size={13} />}
              isLoading={exporting}
              onClick={() => setShowExports(p => !p)}
            >
              Export
            </Button>

            {showExports && (
              <div
                className="absolute right-0 top-full mt-1.5 w-60 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden"
                onMouseLeave={() => setShowExports(false)}
              >
                <div className="p-1.5">

                  {/* ── Portfolio exports ── */}
                  <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 px-2 py-1.5">Portfolio</p>

                  <button
                    onClick={() => { handlePDF(); setShowExports(false) }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left"
                  >
                    <FileDown size={15} className="text-brand-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-[13px]">Save as PDF</div>
                      <div className="text-[11px] text-zinc-400">Portfolio layout</div>
                    </div>
                  </button>

                  <button
                    onClick={async () => {
                      setShowExports(false)
                      const name = downloadPortfolioHTML(
                                                          profile,
                                                          generatedContent,
                                                          selectedTemplate
                                                        )
                      toast.success('Portfolio website downloaded! Open the .html file in any browser.')
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left"
                  >
                    <Globe size={15} className="text-emerald-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-[13px]">Portfolio Website (.html)</div>
                      <div className="text-[11px] text-zinc-400">Open in browser, deploy anywhere</div>
                    </div>
                  </button>

                  <div className="h-px bg-zinc-100 dark:bg-zinc-800 mx-2 my-1" />

                  {/* ── Resume exports ── */}
                  <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 px-2 py-1.5">Resume</p>

                  <button
                    onClick={async () => {
                      setShowExports(false)
                      setActiveTab('resume')
                      await new Promise(r => setTimeout(r, 80)) // allow tab switch
                      await printPDF('print-resume')
                      toast.success('Resume PDF saved!')
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left"
                  >
                    <FileDown size={15} className="text-violet-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-[13px]">Resume PDF</div>
                      <div className="text-[11px] text-zinc-400">ATS-friendly layout</div>
                    </div>
                  </button>

                  <button
                    onClick={async () => {
                      setShowExports(false)
                      const ok = await downloadResumeDOCX(profile, generatedContent)
                      if (ok) toast.success('Resume.docx downloaded — open in Word to edit!')
                      else toast.error('Install docx first: npm install docx')
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left"
                  >
                    <FileType size={15} className="text-blue-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-[13px]">Resume (.docx)</div>
                      <div className="text-[11px] text-zinc-400">Editable in Word / Google Docs</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { handleTextDownload(); setShowExports(false) }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left"
                  >
                    <FileText size={15} className="text-cyan-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-[13px]">Resume (.txt)</div>
                      <div className="text-[11px] text-zinc-400">ATS plain text</div>
                    </div>
                  </button>

                  <div className="h-px bg-zinc-100 dark:bg-zinc-800 mx-2 my-1" />

                  {/* ── Other ── */}
                  <button
                    onClick={() => { handleMarkdown(); setShowExports(false) }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left"
                  >
                    <FileCode size={15} className="text-green-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-[13px]">README.md</div>
                      <div className="text-[11px] text-zinc-400">GitHub profile README</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { handleJSON(); setShowExports(false) }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left"
                  >
                    <FileJson size={15} className="text-amber-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-[13px]">Portfolio backup (.json)</div>
                      <div className="text-[11px] text-zinc-400">Full data export</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: secondary actions — scrollable on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          <SourceBadge source={generationSource} />
          <CopyButton text={resumeText} label="Copy Summary" />
          <CopyButton text={readmeText} label="Copy README" />
          <Button
            variant="secondary"
            size="sm"
            type="button"
            leftIcon={<Pencil size={13} />}
            onClick={() => setIsEditorOpen(true)}
            className="flex-shrink-0 whitespace-nowrap"
          >
            Edit Content
          </Button>
        </div>

      </div>

      {/* ── Preview tabs (controlled) ─────────────────────────────────── */}
      <PreviewContainer
        profile={profile}
        generated={generatedContent}
        selectedTemplate={selectedTemplate}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* ── Section regeneration ─────────────────────────────────────── */}
      <div className="dp-card p-4" data-no-print>
        <div className="flex items-center justify-between mb-3">
          <p className="dp-section-label">Regenerate sections</p>
          <span className="text-xs text-zinc-400">
            {import.meta.env.VITE_GEMINI_API_KEY ? '✦ AI powered' : '⚠ Needs API key'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {REGEN_SECTIONS.map(({ key, label }) => (
            <Button
              key={key}
              variant="secondary"
              size="sm"
              isLoading={regenLoading[key]}
              leftIcon={!regenLoading[key] ? <RefreshCw size={13} /> : undefined}
              onClick={() => handleRegenerate(key)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* ── Template switcher ─────────────────────────────────────────── */}
      <div className="dp-card p-4 flex items-center justify-between gap-4" data-no-print>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Template: <strong className="text-zinc-900 dark:text-zinc-50 capitalize">{selectedTemplate}</strong>
        </p>
        <Button
          variant="ghost" size="sm" type="button"
          rightIcon={<ArrowLeft size={14} className="rotate-180" />}
          onClick={() => navigate('/templates')}
        >
          Change
        </Button>
      </div>

      {/* ── Inline content editor ─────────────────────────────────── */}
      <ContentEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        profile={profile}
        generated={generatedContent}
        dispatch={dispatch}
        onRegenerate={handleRegenerate}
        regenLoading={regenLoading}
      />

    </div>
  )
}

export default PreviewPage