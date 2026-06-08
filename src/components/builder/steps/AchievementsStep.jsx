import { useState } from 'react'
import { PlusCircle, Trash2, Trophy } from 'lucide-react'
import { Input, Button, Badge } from '@/components/ui'

const PLACEHOLDERS = [
  'Qualified Smart India Hackathon 2024 — Internal Round',
  'Completed Java Full Stack certification from NIIT',
  'Top 10% on LeetCode — 250+ problems solved',
  'Published open-source project with 50+ GitHub stars',
]

const AchievementsStep = ({ defaultValues, onNext }) => {
  const [items, setItems] = useState(
    Array.isArray(defaultValues) && defaultValues.length > 0 ? defaultValues : ['']
  )

  const update = (i, v) => setItems(p => p.map((x, idx) => idx === i ? v : x))
  const add    = () => setItems(p => [...p, ''])
  const remove = (i) => setItems(p => p.filter((_, idx) => idx !== i))

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext(items.filter(item => item.trim()))
  }

  return (
    <form id="step-form" onSubmit={handleSubmit} className="space-y-3">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Achievements &amp; Certifications
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              Hackathons, certifications, awards, open-source. Optional but impactful.
            </p>
          </div>
          <Badge variant="gray">Optional</Badge>
        </div>
      </div>

      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-start">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-1">
            <Trophy size={13} className="text-amber-500" />
          </div>
          <div className="flex-1">
            <Input
              placeholder={PLACEHOLDERS[i % PLACEHOLDERS.length]}
              value={item}
              onChange={e => update(i, e.target.value)}
            />
          </div>
          {items.length > 1 && (
            <button
              type="button" onClick={() => remove(i)}
              className="mt-2.5 p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      ))}

      {items.length < 6 && (
        <Button type="button" variant="secondary" size="sm" leftIcon={<PlusCircle size={15} />} onClick={add}>
          Add Achievement
        </Button>
      )}
    </form>
  )
}

export default AchievementsStep 