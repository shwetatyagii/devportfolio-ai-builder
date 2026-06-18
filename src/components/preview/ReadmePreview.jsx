import { useMemo }    from 'react'
import { marked }     from 'marked'
import DOMPurify      from 'dompurify'
import { Code2 }      from 'lucide-react'
import CopyButton     from './CopyButton'

// Configure marked once — GFM + line breaks
marked.use({ gfm: true, breaks: true })

// Allowed HTML for the README preview — blocks any script injection
const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'h1','h2','h3','h4','h5','h6',
    'p','strong','em','a','br','hr',
    'ul','ol','li','blockquote',
    'code','pre',
    'table','thead','tbody','tr','th','td',
    'img','div','span',
  ],
  ALLOWED_ATTR: ['href','src','alt','class','target','rel','title'],
  ALLOW_DATA_ATTR: false,
}

// ── Fix bare URLs that AI sometimes generates without https:// ────────────────
const fixReadmeUrls = (md = '') => {
  if (!md) return md
  return md
    // Fix markdown link destinations: [text](github.com/...) → [text](https://github.com/...)
    .replace(/\]\(github\.com\//g, '](https://github.com/')
    .replace(/\]\(linkedin\.com\//g, '](https://linkedin.com/')
    .replace(/\]\(www\.linkedin\.com\//g, '](https://www.linkedin.com/')
    // Auto-link bare github.com/username that are plain text (not already in a link)
    .replace(/(?<!\]\()github\.com\/([\w\-\.]+)/g,
      '[github.com/$1](https://github.com/$1)')
}

const ReadmePreview = ({ content }) => {
  const html = useMemo(() => {
    const processed = fixReadmeUrls(content)   // ← add this line
    const raw = processed
      ? marked.parse(processed)                // ← change content to processed
      : '<p>No README generated yet — complete the builder first.</p>'
    return DOMPurify.sanitize(raw, PURIFY_CONFIG)
  }, [content])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Code2 size={16} className="text-zinc-500" />
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            GitHub README.md
          </h2>
        </div>
        <CopyButton text={content ?? ''} label="Copy Markdown" />
      </div>

      {/* Rendered markdown */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
        <div
          className="md-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export default ReadmePreview