import { useState } from 'react'
import { PlusCircle, Trash2, Briefcase } from 'lucide-react'
import { Input, Textarea, Button, Card, Badge } from '@/components/ui'

const EMPTY_EXP = { company: '', role: '', type: 'Internship', duration: '', responsibilities: '' }
const TYPES     = ['Internship', 'Full-time', 'Part-time', 'Freelance']

const ExperienceStep = ({ defaultValues, onNext }) => {
  const [items, setItems] = useState(
    Array.isArray(defaultValues) && defaultValues.length > 0 ? defaultValues : []
  )

  const update = (i, field, value) =>
    setItems(prev => prev.map((exp, idx) => idx === i ? { ...exp, [field]: value } : exp))

  const add    = () => setItems(p => [...p, { ...EMPTY_EXP }])
  const remove = (i) => setItems(p => p.filter((_, idx) => idx !== i))

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext(items.filter(exp => exp.company.trim() || exp.role.trim()))
  }

  return (
    <form id="step-form" onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Work Experience</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              Internships, jobs, or freelance work. Fully optional — skip if you have none.
            </p>
          </div>
          <Badge variant="gray">Optional</Badge>
        </div>
      </div>

      {items.length === 0 && (
        <div className="text-center py-6 dp-card border-dashed">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
            No experience added yet — that's fine for freshers!
          </p>
          <Button type="button" variant="secondary" size="sm" leftIcon={<PlusCircle size={15} />} onClick={add}>
            Add Experience
          </Button>
        </div>
      )}

      {items.map((exp, i) => (
        <Card key={i} variant="elevated" padding="md" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-violet-500" />
              <span className="font-medium text-sm text-zinc-900 dark:text-zinc-50">Experience {i + 1}</span>
            </div>
            <Button variant="danger" size="xs" leftIcon={<Trash2 size={13} />} type="button" onClick={() => remove(i)}>
              Remove
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Company / Organisation" placeholder="Google, XYZ Startup…"
              value={exp.company} onChange={e => update(i, 'company', e.target.value)}
            />
            <Input
              label="Your Role" placeholder="Backend Developer Intern"
              value={exp.role} onChange={e => update(i, 'role', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Type selector */}
            <div>
              <label className="dp-label">Type</label>
              <div className="flex gap-1.5 flex-wrap">
                {TYPES.map(t => (
                  <button
                    key={t} type="button"
                    onClick={() => update(i, 'type', t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      exp.type === t
                        ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/30'
                        : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-500 border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="Duration" placeholder="June 2024 – Aug 2024"
              value={exp.duration} onChange={e => update(i, 'duration', e.target.value)}
            />
          </div>

          <Textarea
            label="Responsibilities" rows={2}
            placeholder="Built REST APIs with Spring Boot, integrated MySQL, improved response time by 30%…"
            value={exp.responsibilities} onChange={e => update(i, 'responsibilities', e.target.value)}
          />
        </Card>
      ))}

      {items.length > 0 && items.length < 5 && (
        <Button type="button" variant="secondary" size="sm" leftIcon={<PlusCircle size={15} />} onClick={add}>
          Add Another
        </Button>
      )}
    </form>
  )
}

export default ExperienceStep