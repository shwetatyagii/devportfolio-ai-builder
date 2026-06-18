import { Component } from 'react'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error.message, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    if (this.props.onReset) this.props.onReset()
  }

  render() {
    if (!this.state.hasError) return this.props.children

    if (this.props.fallback) return this.props.fallback

    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-5">
          <AlertTriangle size={28} className="text-red-500" />
        </div>

        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          Something went wrong
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 max-w-sm leading-relaxed">
          An unexpected error occurred in this part of the app.
          Your saved drafts and data are safe in localStorage.
        </p>

        {/* Show error details only in dev */}
        {import.meta.env.DEV && this.state.error && (
          <pre className="text-xs text-left text-red-400 bg-red-500/8 border border-red-500/20 rounded-xl p-4 mb-6 max-w-lg w-full overflow-auto">
            {this.state.error.message}
          </pre>
        )}

        <div className="flex gap-3">
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors"
          >
            <RefreshCcw size={15} />
            Try again
          </button>
          <button
            onClick={() => { window.location.href = '/' }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-medium transition-colors"
          >
            <Home size={15} />
            Go home
          </button>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary