import { useState } from 'react'
import SkillPicker from '../SkillPicker'

const SkillsStep = ({ defaultValues, onNext }) => {
  const [selected, setSelected] = useState(
    Array.isArray(defaultValues) ? defaultValues : []
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext(selected)
  }

  return (
    <form id="step-form" onSubmit={handleSubmit}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Your Skills</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          Select all technologies you're comfortable with.
        </p>
      </div>
      <SkillPicker selected={selected} onChange={setSelected} />
      {selected.length === 0 && (
        <p className="text-xs text-amber-500 mt-3">Tip: Select at least 5 skills for better AI output.</p>
      )}
    </form>
  )
}

export default SkillsStep