import { useState } from 'react'
import { PlusCircle, Trash2, FolderOpen } from 'lucide-react'
import { Input, Textarea, Button, Card } from '@/components/ui'

const EMPTY_PROJECT = { name: '', description: '', techStack: '', github: '', achievement: '' }

const ProjectsStep = ({ defaultValues, onNext }) => {
  // Convert stored array (techStack as array) back to strings for editing
  const toEditable = (p) => ({
    ...p, techStack: Array.isArray(p.techStack) ? p.techStack.join(', ') : (p.techStack ?? ''),
  })

  const [projects, setProjects] = useState(
    Array.isArray(defaultValues) && defaultValues.length > 0
      ? defaultValues.map(toEditable)
      : [{ ...EMPTY_PROJECT }]
  )

  const update = (i, field, value) =>
    setProjects(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p))

  const add    = () => { if (projects.length < 4) setProjects(p => [...p, { ...EMPTY_PROJECT }]) }
  const remove = (i) => setProjects(p => p.filter((_, idx) => idx !== i))

  const handleSubmit = (e) => {
    e.preventDefault()
    const parsed = projects
      .filter(p => p.name.trim())
      .map(p => ({
        ...p,
        techStack: p.techStack ? p.techStack.split(',').map(s => s.trim()).filter(Boolean) : [],
      }))
    onNext(parsed)
  }

  return (
    <form id="step-form" onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Your Projects</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          Add up to 4 projects. Name is the only required field.
        </p>
      </div>

      {projects.map((p, i) => (
        <Card key={i} variant="elevated" padding="md" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen size={16} className="text-brand-500" />
              <span className="font-medium text-sm text-zinc-900 dark:text-zinc-50">Project {i + 1}</span>
            </div>
            {projects.length > 1 && (
              <Button variant="danger" size="xs" leftIcon={<Trash2 size={13} />} type="button" onClick={() => remove(i)}>
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Project Name" placeholder="DevPortfolio AI Builder" required
              value={p.name} onChange={e => update(i, 'name', e.target.value)}
            />
            <Input
              label="Tech Stack" placeholder="React, Spring Boot, MySQL"
              helperText="Comma-separated"
              value={p.techStack} onChange={e => update(i, 'techStack', e.target.value)}
            />
          </div>

          <Textarea
            label="Description" rows={2} maxLength={300}
            placeholder="A brief, impactful description of what you built…"
            value={p.description} onChange={e => update(i, 'description', e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="GitHub URL" placeholder="github.com/username/repo"
              value={p.github} onChange={e => update(i, 'github', e.target.value)}
            />
            <Input
              label="Key Achievement" placeholder="Reduced load time by 40%"
              value={p.achievement} onChange={e => update(i, 'achievement', e.target.value)}
            />
          </div>
        </Card>
      ))}

      {projects.length < 4 && (
        <Button
          variant="secondary" type="button" size="sm"
          leftIcon={<PlusCircle size={15} />}
          onClick={add}
        >
          Add Project
        </Button>
      )}
    </form>
  )
}

export default ProjectsStep