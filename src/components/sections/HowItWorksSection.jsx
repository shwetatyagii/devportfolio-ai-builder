import { motion } from 'framer-motion'
import { ClipboardList, Sparkles, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui'

const STEPS = [
  {
    icon: ClipboardList,
    ringColor: 'border-brand-500/30',
    iconColor: 'text-brand-500 bg-brand-500/10',
    title: 'Fill your profile',
    desc: 'Complete the 8-step guided form — your name, skills, projects, experience, and career goals. Takes about 5 minutes.',
  },
  {
    icon: Sparkles,
    ringColor: 'border-violet-500/30',
    iconColor: 'text-violet-500 bg-violet-500/10',
    title: 'AI generates everything',
    desc: 'Gemini AI reads your profile and produces a professional portfolio, resume summary, GitHub README, and bio.',
  },
  {
    icon: Share2,
    ringColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-500 bg-emerald-500/10',
    title: 'Export and share',
    desc: 'Copy to clipboard, download as markdown, or export PDF. Paste directly into your portfolio site or GitHub.',
  },
]

const HowItWorksSection = () => (
  <section
    id="how-it-works"
    className="py-24 px-4 bg-zinc-50/60 dark:bg-zinc-900/40 border-y border-zinc-200/60 dark:border-zinc-800/60"
  >
    <div className="max-w-5xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <Badge variant="purple" className="mb-4">How it works</Badge>
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          From blank page to portfolio in 3 steps
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-lg mx-auto">
          No design skills. No writing skills. Just your info — AI does the rest.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">

        {/* Connector line — desktop only */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute top-10 left-[calc(16.66%+32px)] right-[calc(16.66%+32px)] h-px bg-gradient-to-r from-brand-500/30 via-violet-500/30 to-emerald-500/30"
        />

        {STEPS.map(({ icon: Icon, ringColor, iconColor, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.13 }}
            className="flex flex-col items-center text-center relative"
          >
            {/* Step badge */}
            <div className="relative mb-6">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 ${ringColor} bg-white dark:bg-zinc-900 ${iconColor}`}>
                <Icon size={28} />
              </div>
              <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-2 border-white dark:border-zinc-900">
                {i + 1}
              </span>
            </div>

            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-lg mb-2">{title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">{desc}</p>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
)

export default HowItWorksSection