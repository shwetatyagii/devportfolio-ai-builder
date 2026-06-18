import { motion } from 'framer-motion'
import { Sparkles, Code2, FileText, Layers, Zap, Download } from 'lucide-react'
import { Card, Badge } from '@/components/ui'

const FEATURES = [
  {
    icon: Sparkles, color: 'text-brand-500 bg-brand-500/10',
    title: 'AI Portfolio Generator',
    desc: 'Professional about sections, hero copy, and project descriptions written by Gemini AI in seconds.',
  },
  {
    icon: Code2, color: 'text-emerald-500 bg-emerald-500/10',
    title: 'GitHub README Builder',
    desc: 'Beautiful, structured READMEs generated from your profile — with badges, tables, and skill icons.',
  },
  {
    icon: FileText, color: 'text-blue-500 bg-blue-500/10',
    title: 'Resume Summary',
    desc: 'ATS-optimised resume summaries tailored to your tech stack, projects, and career goals.',
  },
  {
    icon: Layers, color: 'text-violet-500 bg-violet-500/10',
    title: '5 Premium Templates',
    desc: 'Minimal, Modern SaaS, Glassmorphism, Corporate ATS, and Developer Terminal — each recruiter-ready.',
  },
  {
    icon: Zap, color: 'text-amber-500 bg-amber-500/10',
    title: 'One-Click Generation',
    desc: 'Fill your profile once, generate portfolio + resume + README + bio in a single click.',
  },
  {
    icon: Download, color: 'text-cyan-500 bg-cyan-500/10',
    title: 'Export Anywhere',
    desc: 'Copy to clipboard, download as markdown, or export as PDF. Share your portfolio instantly.',
  },
]

const FeaturesSection = () => (
  <section id="features" className="py-24 px-4">
    <div className="max-w-6xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <Badge variant="brand" className="mb-4">Features</Badge>
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Everything you need to stand out
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl mx-auto text-lg">
          Stop spending hours writing portfolio content. Let AI generate it in seconds.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map(({ icon: Icon, color, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
          >
            <Card
              variant="default"
              padding="md"
              className="h-full hover:border-zinc-300 dark:hover:border-zinc-600 hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon size={21} />
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">{title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
)

export default FeaturesSection