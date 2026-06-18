import { useContext } from 'react'
import { useNavigate }  from 'react-router-dom'
import { CheckCircle2, ArrowRight, Sparkles, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { PortfolioContext }      from '@/context/PortfolioContext'
import { Button, Badge }         from '@/components/ui'
import MinimalTemplate           from '@/components/templates/MinimalTemplate'
import ModernTemplate            from '@/components/templates/ModernTemplate'
import GlassmorphismTemplate     from '@/components/templates/GlassmorphismTemplate'
import CorporateTemplate from '@/components/templates/CorporateTemplate'
import TerminalTemplate  from '@/components/templates/TerminalTemplate'
import { MOCK_PROFILE, MOCK_GENERATED } from '@/data/mockProfile'
import cn from '@/utils/cn'

const TEMPLATES = [
  {
    id:           'minimal',
    name:         'Minimal Professional',
    tag:          'Most professional',
    tagVariant:   'gray',
    desc:         'Clean typography, generous whitespace. Widely accepted at enterprise, finance, and traditional companies. ATS-friendly layout.',
    Component:    MinimalTemplate,
  },
  {
    id:           'modern',
    name:         'Modern SaaS',
    tag:          'Most popular',
    tagVariant:   'brand',
    desc:         'Dark cards, indigo accents, bold gradient heading. Built for startups, product companies, and tech-forward roles.',
    Component:    ModernTemplate,
  },
  {
    id:           'glassmorphism',
    name:         'Glassmorphism Dev',
    tag:          'Most unique',
    tagVariant:   'purple',
    desc:         'Frosted glass on a deep gradient canvas. Designed to stand out. Best for design-forward and frontend-focused roles.',
    Component:    GlassmorphismTemplate,
  },
  {
    id:          'corporate',
    name:        'Corporate ATS',
    tag:         'Most enterprise',
    tagVariant:  'blue',
    desc:        'Two-column dark-header layout. Left sidebar for skills and education. Built for MNC, finance, and consulting applications.',
    Component:   CorporateTemplate,
  },
  {
    id:          'terminal',
    name:        'Developer Terminal',
    tag:         'Most distinctive',
    tagVariant:  'green',
    desc:        'VSCode-inspired terminal aesthetic with monospace typography. Instantly memorable. Built for engineers who want to stand out.',
    Component:   TerminalTemplate,
  },
]

const TemplateCard = ({ template, isActive, onSelect, onUse }) => {
  const { id, name, tag, tagVariant, desc, Component } = template

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'rounded-2xl overflow-hidden border-2 transition-all duration-300',
        isActive
          ? 'border-brand-500 shadow-[0_0_30px_rgba(99,102,241,0.2)] dark:shadow-[0_0_40px_rgba(99,102,241,0.15)]'
          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5'
      )}
    >
      {/* ── Live template preview ── */}
      <div
        className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800"
        style={{ height: 280 }}
      >
        {/* Scaled-down template render */}
        <div
          className="absolute top-0 left-0 pointer-events-none select-none"
          style={{
            width:           '200%',
            transform:       'scale(0.5)',
            transformOrigin: 'top left',
          }}
        >
          <Component profile={MOCK_PROFILE} generated={MOCK_GENERATED} />
        </div>

        {/* Active badge overlay */}
        {isActive && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500 text-white text-[11px] font-bold shadow-lg">
            <CheckCircle2 size={11} />
            Active
          </div>
        )}

        {/* Subtle gradient at bottom to fade into info panel */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/60 dark:from-zinc-900/60 to-transparent pointer-events-none" />
      </div>

      {/* ── Info panel ── */}
      <div className="p-5 bg-white dark:bg-zinc-900">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-zinc-900 dark:text-zinc-50">{name}</h3>
          <Badge variant={tagVariant} className="flex-shrink-0 text-[11px] whitespace-nowrap">
            {tag}
          </Badge>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
          {desc}
        </p>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Eye size={14} />}
            onClick={() => onSelect(id)}
            className="flex-1"
          >
            Preview
          </Button>
          <Button
            variant={isActive ? 'secondary' : 'primary'}
            size="sm"
            leftIcon={isActive ? <CheckCircle2 size={14} /> : <Sparkles size={14} />}
            rightIcon={!isActive ? <ArrowRight size={13} /> : null}
            onClick={() => onUse(id)}
            className="flex-1"
          >
            {isActive ? 'Active' : 'Use This'}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

const TemplatesPage = () => {
  const { state, dispatch } = useContext(PortfolioContext)
  const navigate            = useNavigate()

  const handleSelect = (id) => {
    dispatch({ type: 'SET_TEMPLATE', payload: id })
    const meta = TEMPLATES.find(t => t.id === id)
    toast(`Previewing ${meta.name}`, { icon: '🎨' })
  }

  const handleUse = (id) => {
    dispatch({ type: 'SET_TEMPLATE', payload: id })
    const meta = TEMPLATES.find(t => t.id === id)
    toast.success(`${meta.name} selected!`)

    // Go to preview if content exists, otherwise go to builder
    if (state.generatedContent) {
      navigate('/preview')
    } else {
      navigate('/builder')
    }
  }

  return (
    <div className="space-y-8 max-w-5xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Templates</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
          Five distinct visual identities. Switch anytime — your AI-generated content automatically reflows into the new design.
        </p>
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {TEMPLATES.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            isActive={state.selectedTemplate === template.id}
            onSelect={handleSelect}
            onUse={handleUse}
          />
        ))}
      </div>

      {/* Info footer */}
      <div className="dp-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-0.5">
            Templates are content-agnostic
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Your AI-generated text, skills, and projects are identical across all templates.
            Only the visual presentation changes.
          </p>
        </div>

        {state.generatedContent ? (
          <Button
            variant="secondary"
            size="sm"
            rightIcon={<ArrowRight size={14} />}
            onClick={() => navigate('/preview')}
            className="flex-shrink-0"
          >
            View Portfolio
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            rightIcon={<ArrowRight size={14} />}
            onClick={() => navigate('/builder')}
            className="flex-shrink-0"
          >
            Build Portfolio
          </Button>
        )}
      </div>

    </div>
  )
}

export default TemplatesPage