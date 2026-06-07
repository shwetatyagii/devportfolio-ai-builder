import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui'

const PILLS = ['No credit card required', 'Free AI generation', '3 premium templates']

const container = { animate: { transition: { staggerChildren: 0.09 } } }
const item = {
  initial:  { opacity: 0, y: 22 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const HeroSection = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden">

    {/* Background glow */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-500/10 dark:bg-brand-500/15 blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/8 blur-[80px]" />
    </div>

    <motion.div
      variants={container}
      initial="initial"
      animate="animate"
      className="relative z-10 max-w-4xl mx-auto"
    >
      {/* AI badge */}
      <motion.div variants={item} className="flex justify-center mb-6">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-brand-500/30 bg-brand-500/8 text-brand-600 dark:text-brand-400">
          <Sparkles size={12} className="animate-pulse" />
          Powered by Google Gemini AI
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={item}
        className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.08] mb-6"
      >
        Build your developer
        <br />
        <span className="gradient-text">brand with AI</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        variants={item}
        className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        Generate professional portfolios, GitHub READMEs, and resume summaries in minutes.
        Stop staring at a blank page — let AI do the heavy lifting.
      </motion.p>

      {/* CTAs */}
      <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
        <Link to="/signup">
          <Button size="lg" rightIcon={<ArrowRight size={18} />} className="w-full sm:w-auto">
            Get Started Free
          </Button>
        </Link>
        <Button
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto"
          onClick={() => scrollTo('how-it-works')}
        >
          See How It Works
        </Button>
      </motion.div>

      {/* Social proof */}
      <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {PILLS.map(text => (
          <span key={text} className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
            {text}
          </span>
        ))}
      </motion.div>
    </motion.div>

  </section>
)

export default HeroSection