import { useState, useEffect, useCallback } from 'react'
import {
  X, RefreshCw, ChevronDown, ChevronUp,
  Plus, Trash2, Check, Pencil,
} from 'lucide-react'
import { Badge } from '@/components/ui'
import useDebounce from '@/hooks/useDebounce'
import cn from '@/utils/cn'

// ── Shared input styles ───────────────────────────────────────────────────────
const CLS = {
  input:
    'w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 ' +
    'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm ' +
    'focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 ' +
    'transition-colors placeholder-zinc-300 dark:placeholder-zinc-600',
  textarea:
    'w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 ' +
    'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm ' +
    'focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 ' +
    'transition-colors placeholder-zinc-300 dark:placeholder-zinc-600 resize-none',
}

// ── Character counter ─────────────────────────────────────────────────────────
const CharCount = ({ current, max }) => (
  <p className={cn(
    'text-[10px] text-right mt-1 tabular-nums',
    current > max * 0.9 ? 'text-amber-500' : 'text-zinc-300 dark:text-zinc-600'
  )}>
    {current}/{max}
  </p>
)

// ── Collapsible section ───────────────────────────────────────────────────────
const EditorSection = ({
  title, badge, badgeVariant = 'gray', isOpen, onToggle,
  onRegenerate, isRegenerating, children,
}) => (
  <div className="border-b border-zinc-100 dark:border-zinc-800">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-100">{title}</span>
        <Badge variant={badgeVariant} className="text-[9px] px-1.5 py-0">{badge}</Badge>
      </div>
      <div className="flex items-center gap-1.5">
        {onRegenerate && isOpen && (
          <span
            role="button"
            tabIndex={0}
            onClick={e => { e.stopPropagation(); onRegenerate() }}
            onKeyDown={e => e.key === 'Enter' && (e.stopPropagation(), onRegenerate())}
            className={cn(
              'flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg transition-colors select-none',
              isRegenerating
                ? 'text-zinc-400 cursor-wait'
                : 'text-brand-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 cursor-pointer'
            )}
          >
            <RefreshCw size={11} className={isRegenerating ? 'animate-spin' : ''} />
            {isRegenerating ? 'AI…' : 'Re-gen'}
          </span>
        )}
        {isOpen
          ? <ChevronUp  size={15} className="text-zinc-400 flex-shrink-0" />
          : <ChevronDown size={15} className="text-zinc-400 flex-shrink-0" />
        }
      </div>
    </button>

    {isOpen && (
      <div className="px-5 pb-5 space-y-1">
        {children}
      </div>
    )}
  </div>
)

// ── Main component ────────────────────────────────────────────────────────────
const ContentEditor = ({
  isOpen,
  onClose,
  profile,
  generated,
  dispatch,
  onRegenerate,
  regenLoading = {},
}) => {
  const [local,         setLocal]         = useState(generated ?? {})
  const [saved,         setSaved]         = useState(false)
  const [openSections,  setOpenSections]  = useState({ about: true, resumeSummary: false })

  const debounced = useDebounce(local, 500)

  // Sync local state when external regeneration updates generated
  useEffect(() => {
    if (generated) setLocal(generated)
  }, [generated])

  // Auto-save debounced local to context
  useEffect(() => {
    if (!debounced || !isOpen) return
    dispatch({ type: 'UPDATE_GENERATED_SECTION', payload: debounced })
    setSaved(true)
    const t = setTimeout(() => setSaved(false), 1800)
    return () => clearTimeout(t)
  }, [debounced]) // eslint-disable-line

  const toggle = (key) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))

  // ── Field updaters ──────────────────────────────────────────────────────────
  const updateField = useCallback((key, value) => {
    setLocal(prev => ({ ...prev, [key]: value }))
  }, [])

  const updateProject = useCallback((i, field, value) => {
    setLocal(prev => ({
      ...prev,
      projects: {
        ...prev.projects,
        [String(i)]: { ...(prev.projects?.[String(i)] ?? {}), [field]: value },
      },
    }))
  }, [])

  const updateHighlight = useCallback((projIdx, hlIdx, value) => {
    setLocal(prev => {
      const proj = prev.projects?.[String(projIdx)] ?? {}
      const hl   = [...(proj.highlights ?? [])]
      hl[hlIdx]  = value
      return { ...prev, projects: { ...prev.projects, [String(projIdx)]: { ...proj, highlights: hl } } }
    })
  }, [])

  const addHighlight = useCallback((projIdx) => {
    setLocal(prev => {
      const proj = prev.projects?.[String(projIdx)] ?? {}
      return {
        ...prev,
        projects: {
          ...prev.projects,
          [String(projIdx)]: { ...proj, highlights: [...(proj.highlights ?? []), ''] },
        },
      }
    })
  }, [])

  const removeHighlight = useCallback((projIdx, hlIdx) => {
    setLocal(prev => {
      const proj = prev.projects?.[String(projIdx)] ?? {}
      return {
        ...prev,
        projects: {
          ...prev.projects,
          [String(projIdx)]: { ...proj, highlights: (proj.highlights ?? []).filter((_, i) => i !== hlIdx) },
        },
      }
    })
  }, [])

  const updateAchievement = useCallback((i, value) => {
    setLocal(prev => {
      const arr = [...(prev.achievements ?? [])]
      arr[i]    = value
      return { ...prev, achievements: arr }
    })
  }, [])

  const addAchievement = () =>
    setLocal(prev => ({ ...prev, achievements: [...(prev.achievements ?? []), ''] }))

  const removeAchievement = (i) =>
    setLocal(prev => ({ ...prev, achievements: (prev.achievements ?? []).filter((_, j) => j !== i) }))

  const projects = Array.isArray(profile?.projects) ? profile.projects : []

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div className="fixed right-0 top-0 h-screen w-full sm:max-w-[460px] z-50 flex flex-col bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl">

        {/* ── Panel header ──────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex-shrink-0 bg-white dark:bg-zinc-900">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-500/10 flex items-center justify-center">
              <Pencil size={14} className="text-brand-500" />
            </div>
            <div>
              <h2 className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">Edit Content</h2>
              <p className="text-[11px] text-zinc-400">Auto-saves · Preview updates live</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {saved && (
              <span className="flex items-center gap-1 text-xs text-emerald-500 font-medium">
                <Check size={12} /> Saved
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Scrollable sections ────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">

          {/* Tagline */}
          <EditorSection
            title="Tagline" badge="Hero" badgeVariant="brand"
            isOpen={!!openSections.tagline}
            onToggle={() => toggle('tagline')}
          >
            <input
              value={local.tagline ?? ''}
              onChange={e => updateField('tagline', e.target.value)}
              className={CLS.input}
              placeholder="Role | Skill1 · Skill2 · Skill3"
              maxLength={90}
            />
            <CharCount current={(local.tagline ?? '').length} max={90} />
          </EditorSection>

          {/* About */}
          <EditorSection
            title="About" badge="Portfolio" badgeVariant="green"
            isOpen={!!openSections.about}
            onToggle={() => toggle('about')}
            onRegenerate={() => onRegenerate('about')}
            isRegenerating={regenLoading.about}
          >
            <p className="text-[11px] text-zinc-400 mb-1.5">
              3–5 sentences · Professional · No autobiography
            </p>
            <textarea
              value={local.about ?? ''}
              onChange={e => updateField('about', e.target.value)}
              className={CLS.textarea}
              rows={6}
              placeholder="Write a professional about section..."
              maxLength={600}
            />
            <CharCount current={(local.about ?? '').length} max={600} />
          </EditorSection>

          {/* Resume Summary */}
          <EditorSection
            title="Resume Summary" badge="Resume" badgeVariant="amber"
            isOpen={!!openSections.resumeSummary}
            onToggle={() => toggle('resumeSummary')}
            onRegenerate={() => onRegenerate('resumeSummary')}
            isRegenerating={regenLoading.resumeSummary}
          >
            <p className="text-[11px] text-zinc-400 mb-1.5">
              Exactly 3 sentences · ATS-optimized · Action verbs
            </p>
            <textarea
              value={local.resumeSummary ?? ''}
              onChange={e => updateField('resumeSummary', e.target.value)}
              className={CLS.textarea}
              rows={5}
              placeholder="Results-driven developer with..."
              maxLength={450}
            />
            <CharCount current={(local.resumeSummary ?? '').length} max={450} />
          </EditorSection>

          {/* Bio */}
          <EditorSection
            title="LinkedIn Bio" badge="Bio" badgeVariant="gray"
            isOpen={!!openSections.bio}
            onToggle={() => toggle('bio')}
          >
            <p className="text-[11px] text-zinc-400 mb-1.5">2 sentences · Third person · LinkedIn-style</p>
            <textarea
              value={local.bio ?? ''}
              onChange={e => updateField('bio', e.target.value)}
              className={CLS.textarea}
              rows={3}
              placeholder="[Name] is a developer specialising in..."
              maxLength={200}
            />
            <CharCount current={(local.bio ?? '').length} max={200} />
          </EditorSection>

          {/* Projects */}
          {projects.map((p, i) => (
            <EditorSection
              key={i}
              title={`Project: ${p.name || `Project ${i + 1}`}`}
              badge="Projects"
              badgeVariant="purple"
              isOpen={!!openSections[`proj_${i}`]}
              onToggle={() => toggle(`proj_${i}`)}
              onRegenerate={i === 0 ? () => onRegenerate('projects') : null}
              isRegenerating={regenLoading.projects}
            >
              {i > 0 && (
                <p className="text-[10px] text-zinc-400 mb-2">
                  Regenerate updates all projects at once
                </p>
              )}

              <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-1">Description</p>
              <textarea
                value={local.projects?.[String(i)]?.description ?? ''}
                onChange={e => updateProject(i, 'description', e.target.value)}
                className={CLS.textarea}
                rows={4}
                placeholder="Professional project description..."
                maxLength={500}
              />
              <CharCount
                current={(local.projects?.[String(i)]?.description ?? '').length}
                max={500}
              />

              <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-3 mb-1.5">
                Impact Highlights
              </p>
              <div className="space-y-2">
                {(local.projects?.[String(i)]?.highlights ?? []).map((h, hi) => (
                  <div key={hi} className="flex gap-2">
                    <input
                      value={h}
                      onChange={e => updateHighlight(i, hi, e.target.value)}
                      className={cn(CLS.input, 'text-xs')}
                      placeholder="Impact or feature highlight..."
                    />
                    <button
                      type="button"
                      onClick={() => removeHighlight(i, hi)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addHighlight(i)}
                  className="flex items-center gap-1.5 text-xs text-brand-500 hover:text-brand-600 font-medium mt-1"
                >
                  <Plus size={13} /> Add highlight
                </button>
              </div>
            </EditorSection>
          ))}

          {/* Achievements */}
          <EditorSection
            title="Achievements" badge="All" badgeVariant="gray"
            isOpen={!!openSections.achievements}
            onToggle={() => toggle('achievements')}
          >
            <div className="space-y-2">
              {(local.achievements ?? []).length === 0 && (
                <p className="text-xs text-zinc-400 italic py-1">No achievements yet.</p>
              )}
              {(local.achievements ?? []).map((a, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={a}
                    onChange={e => updateAchievement(i, e.target.value)}
                    className={cn(CLS.input, 'text-xs')}
                    placeholder="Professional achievement..."
                  />
                  <button
                    type="button"
                    onClick={() => removeAchievement(i)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addAchievement}
                className="flex items-center gap-1.5 text-xs text-brand-500 hover:text-brand-600 font-medium mt-1"
              >
                <Plus size={13} /> Add achievement
              </button>
            </div>
          </EditorSection>

          {/* README */}
          <EditorSection
            title="GitHub README" badge="README" badgeVariant="green"
            isOpen={!!openSections.githubReadme}
            onToggle={() => toggle('githubReadme')}
            onRegenerate={() => onRegenerate('githubReadme')}
            isRegenerating={regenLoading.githubReadme}
          >
            <p className="text-[11px] text-zinc-400 mb-1.5">Markdown · Paste directly into GitHub</p>
            <textarea
              value={local.githubReadme ?? ''}
              onChange={e => updateField('githubReadme', e.target.value)}
              className={cn(CLS.textarea, 'font-mono text-[11px]')}
              rows={16}
              placeholder="# Your Name..."
            />
          </EditorSection>

        </div>

        {/* ── Panel footer ──────────────────────────────────────────────── */}
        <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800 flex-shrink-0 bg-zinc-50 dark:bg-zinc-900/80">
          <p className="text-[10px] text-zinc-400 text-center">
            ✦ All edits auto-save and update portfolio, resume &amp; README instantly
          </p>
        </div>
      </div>
    </>
  )
}

export default ContentEditor