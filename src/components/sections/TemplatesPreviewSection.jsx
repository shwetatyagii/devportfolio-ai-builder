import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Badge, Button } from '@/components/ui'

const TEMPLATES = [
  {
    id: 'minimal',
    name: 'Minimal Professional',
    desc: 'Clean typography, generous whitespace. Built for enterprise and traditional companies.',
    tag: 'Most professional', tagVariant: 'gray',
    bars: ['bg-zinc-900 dark:bg-zinc-100 w-20', 'bg-zinc-200 dark:bg-zinc-700 w-28', 'bg-zinc-100 dark:bg-zinc-800 w-16'],
    headerBg: 'bg-white dark:bg-zinc-950',
    accent: 'bg-zinc-900 dark:bg-white',
  },
  {
    id: 'modern',
    name: 'Modern SaaS',
    desc: 'Dark cards, indigo accents, bold headings. Built for startups and product companies.',
    tag: 'Most popular', tagVariant: 'brand',
    bars: ['bg-brand-500 w-20', 'bg-zinc-700 w-28', 'bg-zinc-600 w-16'],
    headerBg: 'bg-zinc-950',
    accent: 'bg-brand-500',
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism Dev',
    desc: 'Frosted glass on deep gradient canvas. Stands out from every other portfolio.',
    tag: 'Most unique', tagVariant: 'purple',
    bars: ['bg-brand-400 w-20', 'bg-purple-400/60 w-28', 'bg-cyan-400/50 w-16'],
    headerBg: 'bg-[#0d0015]',
    accent: 'bg-gradient-to-r from-brand-500 to-purple-600',
  },
]

const TemplatesPreviewSection = () => (
  <section id="templates" className="py-24 px-4 bg-zinc-50/60 dark:bg-zinc-900/40 border-y border-zinc-200/60 dark:border-zinc-800/60">
    <div className="max-w-6xl mx-auto">

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
          Three distinct visual styles. Switch anytime — your content adapts instantly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {TEMPLATES.map(({ id, name, desc, tag, tagVariant, bars, headerBg, accent }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
          >
            <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-1 transition-all duration-200">
              {/* Visual preview */}
              <div className={`h-36 ${headerBg} p-4`}>
                <div className={`h-3 rounded-full mb-3 ${accent} ${bars[0].split(' ')[1]}`} style={{ width: 80 }} />
                {bars.map((cls, j) => (
                  <div key={j} className={`h-2 rounded-full mb-1.5 ${cls}`} />
                ))}
                <div className="flex gap-1.5 mt-3">
                  {[40, 56, 32].map((w, j) => (
                    <div key={j} className={`h-6 rounded-md ${accent} opacity-${j === 0 ? '100' : '30'}`} style={{ width: w }} />
                  ))}
                </div>
              </div>
              {/* Info */}
              <div className="p-4 bg-white dark:bg-zinc-900">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">{name}</p>
                  <Badge variant={tagVariant} className="flex-shrink-0 text-[11px]">{tag}</Badge>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

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