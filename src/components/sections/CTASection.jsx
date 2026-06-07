import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

const CTASection = () => (
  <section className="py-24 px-4">
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl overflow-hidden"
      >
        {/* Gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-500 to-purple-600" />
        {/* Glow orb */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-purple-300/10 blur-2xl" />

        <div className="relative z-10 p-10 md:p-16 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold mb-6">
            <Sparkles size={12} />
            Free to start — no credit card required
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Ready to build your developer brand?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            Join developers landing better jobs with AI-powered portfolios. It takes 5 minutes.
          </p>

          <Link to="/signup">
            <button className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-brand-600 bg-white hover:bg-zinc-50 transition-all duration-200 shadow-2xl hover:-translate-y-0.5 text-base">
              Get Started Free
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
)

export default CTASection