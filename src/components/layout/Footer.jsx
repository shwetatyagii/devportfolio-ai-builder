import { Link } from 'react-router-dom'
import { Sparkles, Heart } from 'lucide-react'

const PRODUCT_LINKS = ['Features', 'Templates', 'How it works', 'Showcase']
const LEGAL_LINKS   = ['Privacy Policy', 'Terms of Service']

const SOCIALS = [
  { text: 'GH', href: '#', label: 'GitHub'  },
  { text: 'X',  href: '#', label: 'Twitter' },
  { text: 'in', href: '#', label: 'LinkedIn'},
]

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                <Sparkles size={13} className="text-white" />
              </div>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">DevPortfolio AI</span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              Build a stunning developer portfolio in minutes using the power of AI.
            </p>
            <div className="flex gap-2 mt-5">
              {SOCIALS.map(renderSocial)}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="dp-section-label mb-4">Product</h4>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map(renderFooterLink)}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="dp-section-label mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map(renderFooterLink)}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} DevPortfolio AI. All rights reserved.
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
            Built with <Heart size={11} className="text-red-400 fill-red-400" /> using React + Gemini AI
          </p>
        </div>
      </div>
    </footer>
  )
}

function renderSocial(social) {
  return (
    <a
      key={social.label}
      href={social.href}
      aria-label={social.label}
      className="w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150"
    >
      {social.text}
    </a>
  )
}

function renderFooterLink(item) {
  return (
    <li key={item}>
      <a
        href="#"
        className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150"
      >
        {item}
      </a>
    </li>
  )
}

export default Footer