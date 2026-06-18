import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Badge, Button } from '@/components/ui'

const TEMPLATES = [
  {
    id: 'minimal',
    name: 'Minimal Professional',
    desc: 'Clean typography, generous whitespace. Built for enterprise and traditional companies.',
    tag: 'Most professional',
    tagVariant: 'gray',
    bars: ['bg-zinc-900 dark:bg-zinc-100 w-20', 'bg-zinc-200 dark:bg-zinc-700 w-28', 'bg-zinc-100 dark:bg-zinc-800 w-16'],
    headerBg: 'bg-white dark:bg-zinc-950',
    accent: 'bg-zinc-900 dark:bg-white',
  },
  {
    id: 'modern',
    name: 'Modern SaaS',
    desc: 'Dark cards, indigo accents, bold headings. Built for startups and product companies.',
    tag: 'Most popular',
    tagVariant: 'brand',
    bars: ['bg-brand-500 w-20', 'bg-zinc-700 w-28', 'bg-zinc-600 w-16'],
    headerBg: 'bg-zinc-950',
    accent: 'bg-brand-500',
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism Dev',
    desc: 'Frosted glass on deep gradient canvas. Stands out from every other portfolio.',
    tag: 'Most unique',
    tagVariant: 'purple',
    bars: ['bg-brand-400 w-20', 'bg-purple-400/60 w-28', 'bg-cyan-400/50 w-16'],
    headerBg: 'bg-[#0d0015]',
    accent: 'bg-gradient-to-r from-brand-500 to-purple-600',
  },
  {
    id: 'corporate',
    name: 'Corporate ATS',
    desc: 'Two-column professional layout. Dark header, skill sidebar. Built for MNC and enterprise.',
    tag: 'Most enterprise',
    tagVariant: 'blue',
    // customPreview completely overrides the default bar rendering
    customPreview: (
      <div className="h-36 overflow-hidden">
        {/* Dark header strip */}
        <div className="bg-slate-800 px-3 py-2.5">
          <div className="h-2.5 bg-slate-400 rounded-full w-20 mb-1.5" />
          <div className="h-1.5 bg-slate-600 rounded-full w-28 mb-2" />
          <div className="flex gap-1.5">
            {[48, 60, 40].map((w, i) => (
              <div key={i} className="h-1 bg-slate-600 rounded-full" style={{ width: w }} />
            ))}
          </div>
        </div>
        {/* Two-column body */}
        <div className="grid grid-cols-[36px_1fr] bg-slate-50 h-full">
          {/* Left sidebar */}
          <div className="bg-slate-100 px-1.5 py-2 space-y-1.5 border-r border-slate-200">
            {[70, 50, 80, 40, 60].map((w, i) => (
              <div key={i} className="h-1 bg-slate-300 rounded" style={{ width: `${w}%` }} />
            ))}
          </div>
          {/* Right content */}
          <div className="px-2 py-2 space-y-1.5">
            {[90, 75, 85, 60, 70].map((w, i) => (
              <div key={i} className="h-1 bg-slate-200 rounded" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'terminal',
    name: 'Developer Terminal',
    desc: 'VSCode-inspired terminal aesthetic. Instantly memorable for engineering roles.',
    tag: 'Most distinctive',
    tagVariant: 'green',
    customPreview: (
      <div className="h-36 overflow-hidden" style={{ background: '#1e1e2e' }}>
        {/* Title bar with dots */}
        <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: '#181825', borderBottom: '1px solid #313244' }}>
          <span className="w-2 h-2 rounded-full" style={{ background: '#f38ba8' }} />
          <span className="w-2 h-2 rounded-full" style={{ background: '#fab387' }} />
          <span className="w-2 h-2 rounded-full" style={{ background: '#a6e3a1' }} />
          <span className="ml-2 text-[8px]" style={{ color: '#6c7086', fontFamily: 'monospace' }}>
            portfolio.sh
          </span>
        </div>
        {/* Terminal content */}
        <div className="px-3 py-2.5 space-y-1.5">
          {[
            { prompt: true, width: '70%' },
            { prompt: false, width: '85%' },
            { prompt: false, width: '60%' },
            { prompt: true, width: '75%' },
            { prompt: false, width: '50%' },
          ].map((line, i) => (
            <div key={i} className="flex items-center gap-1.5">
              {line.prompt && (
                <span className="text-[7px] flex-shrink-0" style={{ color: '#a6e3a1', fontFamily: 'monospace' }}>➜</span>
              )}
              <div
                className="h-1 rounded"
                style={{
                  background: line.prompt ? '#a6e3a1' : '#313244',
                  width: line.width,
                  opacity: line.prompt ? 0.8 : 1,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

const TemplatesPreviewSection = () => (
  <section
    id="templates"
    className="py-24 px-4 bg-zinc-50/60 dark:bg-zinc-900/40 border-y border-zinc-200/60 dark:border-zinc-800/60"
  >
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <Badge variant="amber" className="mb-4">Templates</Badge>
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Choose your developer identity
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl mx-auto">
          Five distinct visual styles — from minimal to terminal. Switch anytime, content adapts instantly.
        </p>
      </motion.div>

      {/* Template grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
        {TEMPLATES.map(({ id, name, desc, tag, tagVariant, bars, headerBg, accent, customPreview }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-1 transition-all duration-200 h-full flex flex-col">

              {/* ── Visual preview ────────────────────────────────── */}
              {customPreview ? (
                // Custom preview for templates that need special rendering
                <div className="rounded-t-xl overflow-hidden flex-shrink-0">
                  {customPreview}
                </div>
              ) : (
                // Default bar-based preview for standard templates
                <div className={`h-36 ${headerBg} p-4 flex-shrink-0`}>
                  <div
                    className={`h-3 rounded-full mb-3 ${accent}`}
                    style={{ width: 80 }}
                  />
                  {bars.map((cls, j) => (
                    <div key={j} className={`h-2 rounded-full mb-1.5 ${cls}`} />
                  ))}
                  <div className="flex gap-1.5 mt-3">
                    {[40, 56, 32].map((w, j) => (
                      <div
                        key={j}
                        className={`h-6 rounded-md ${accent}`}
                        style={{ width: w, opacity: j === 0 ? 1 : 0.3 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Info panel ───────────────────────────────────── */}
              <div className="p-4 bg-white dark:bg-zinc-900 flex-1">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm leading-tight">
                    {name}
                  </p>
                  <Badge variant={tagVariant} className="flex-shrink-0 text-[10px] whitespace-nowrap">
                    {tag}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <Link to="/signup">
          <Button variant="secondary" rightIcon={<ArrowRight size={15} />}>
            Try all templates free
          </Button>
        </Link>
      </motion.div>

    </div>
  </section>
)

export default TemplatesPreviewSection