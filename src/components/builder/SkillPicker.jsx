import { useState } from 'react'
import { Search, X, Plus } from 'lucide-react'
import { Tag } from '@/components/ui'
import { SKILLS_BY_CATEGORY } from '@/data/skillsData'
import { normalizeSkill, categorizeSkill } from '@/utils/normalize'
import cn from '@/utils/cn'

const SkillPicker = ({ selected, onChange }) => {
  const [query,    setQuery]    = useState('')
  const [category, setCategory] = useState('All')
  const [custom,   setCustom]   = useState('')

  const categories  = ['All', ...Object.keys(SKILLS_BY_CATEGORY)]
  const allSkills   = Object.values(SKILLS_BY_CATEGORY).flat()
  const pool        = category === 'All' ? allSkills : (SKILLS_BY_CATEGORY[category] ?? [])
  const filtered    = query
    ? pool.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : pool
  const isSelected  = (s) => selected.includes(s)

  const toggle = (skill) => {
    const norm = normalizeSkill(skill)
    onChange(isSelected(norm)
      ? selected.filter(s => s !== norm)
      : [...selected, norm]
    )
  }

  // Add custom skill on Enter
  const handleCustomAdd = () => {
    const trimmed = custom.trim()
    if (!trimmed) return
    const norm = normalizeSkill(trimmed)
    if (!isSelected(norm)) {
      onChange([...selected, norm])
    }
    setCustom('')
  }

  const handleCustomKey = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleCustomAdd() }
  }

  return (
    <div className="space-y-4">

      {/* Selected tags */}
      {selected.length > 0 && (
        <div>
          <p className="dp-section-label mb-2">Selected ({selected.length})</p>
          <div className="flex flex-wrap gap-1.5">
            {selected.map(s => (
              <Tag key={s} color="brand" onRemove={() => toggle(s)}>{s}</Tag>
            ))}
          </div>
        </div>
      )}

      {/* Custom skill input */}
      <div>
        <p className="dp-section-label mb-2">Add custom skill</p>
        <div className="flex gap-2">
          <input
            value={custom}
            onChange={e => setCustom(e.target.value)}
            onKeyDown={handleCustomKey}
            placeholder="Type any skill and press Enter (e.g. Spring Security)"
            className="dp-input flex-1"
          />
          <button
            type="button"
            onClick={handleCustomAdd}
            disabled={!custom.trim()}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus size={15} /> Add
          </button>
        </div>
        {custom.trim() && (
          <p className="text-xs text-zinc-400 mt-1.5">
            Will be categorized as:{' '}
            <span className="text-brand-500 font-medium">{categorizeSkill(custom.trim())}</span>
          </p>
        )}
      </div>

      {/* Preset search */}
      <div>
        <p className="dp-section-label mb-2">Or pick from suggestions</p>
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search skills…"
            className="dp-input pl-9"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          {categories.map(cat => (
            <button
              key={cat} type="button"
              onClick={() => { setCategory(cat); setQuery('') }}
              className={cn(
                'px-3 py-1 rounded-lg text-xs font-medium transition-all',
                category === cat
                  ? 'bg-brand-500 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill grid */}
        <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto p-1 scrollbar-hide">
          {filtered.length === 0 && (
            <p className="text-sm text-zinc-400 py-3 w-full text-center">
              No matches. Use "Add custom skill" above.
            </p>
          )}
          {filtered.map(skill => (
            <button
              key={skill} type="button"
              onClick={() => toggle(skill)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-medium border transition-all',
                isSelected(skill)
                  ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/30'
                  : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
              )}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

export default SkillPicker