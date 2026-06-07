import { motion } from 'framer-motion'
import { Sparkles, Star } from 'lucide-react'
import { Badge, Card } from '@/components/ui'
import { MOCK_PROFILE, MOCK_GENERATED } from '@/data/mockProfile'

// ── Built from central mock data — update mockProfile.js to change showcase ──
const MOCK = {
  name:   MOCK_PROFILE.basicInfo.name,
  title:  MOCK_PROFILE.basicInfo.title,
  skills: MOCK_PROFILE.skills.slice(0, 5),
  about:  MOCK_GENERATED.about,
  resume: MOCK_GENERATED.resumeSummary,
  readme: MOCK_GENERATED.readme,
}

const ShowcaseSection = () => (
  <section id="showcase" className="py-24 px-4">
    <div className="max-w-6xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <Badge variant="green" className="mb-4">
          <Star size={11} /> Live output
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          See what AI generates for you
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl mx-auto">
          Real output from a real profile — portfolio card, ATS resume, and full GitHub README.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <Card variant="default" padding="none" className="overflow-hidden">
            <div className="h-28 bg-gradient-to-br from-brand-600 to-purple-600 p-5 flex flex-col justify-end relative">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.3),transparent_60%)]" />
              <div className="w-11 h-11 rounded-full border-2 border-white/40 bg-white/20 backdrop-blur-sm mb-1.5" />
              <p className="text-white font-bold text-sm leading-none">{MOCK.name}</p>
              <p className="text-white/70 text-xs mt-0.5">{MOCK.title}</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="dp-section-label mb-2">About</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-4">
                  {MOCK.about}
                </p>
              </div>
              <div>
                <p className="dp-section-label mb-2">Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {MOCK.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-md text-xs font-medium bg-brand-500/10 text-brand-600 dark:text-brand-400">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <Badge variant="brand"><Sparkles size={10} /> AI Generated</Badge>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 flex flex-col gap-5"
        >
          <Card variant="default" padding="md">
            <div className="flex items-center justify-between mb-3">
              <p className="dp-section-label">Resume Summary</p>
              <Badge variant="green">ATS-Optimised</Badge>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{MOCK.resume}</p>
          </Card>

          <Card variant="default" padding="md">
            <div className="flex items-center justify-between mb-3">
              <p className="dp-section-label">GitHub README</p>
              <Badge variant="gray">Markdown</Badge>
            </div>
            <pre className="font-mono text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg p-4 leading-relaxed overflow-hidden line-clamp-8 whitespace-pre-wrap">
              {MOCK.readme}
            </pre>
          </Card>
        </motion.div>

      </div>
    </div>
  </section>
)

export default ShowcaseSection