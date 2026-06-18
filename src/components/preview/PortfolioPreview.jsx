import MinimalTemplate       from '@/components/templates/MinimalTemplate'
import ModernTemplate        from '@/components/templates/ModernTemplate'
import GlassmorphismTemplate from '@/components/templates/GlassmorphismTemplate'
import CorporateTemplate     from '@/components/templates/CorporateTemplate'
import TerminalTemplate      from '@/components/templates/TerminalTemplate'

const TEMPLATES = {
  minimal:       MinimalTemplate,
  modern:        ModernTemplate,
  glassmorphism: GlassmorphismTemplate,
  corporate:     CorporateTemplate,
  terminal:      TerminalTemplate,
}

const PortfolioPreview = ({ profile, generated, selectedTemplate }) => {
  const Template = TEMPLATES[selectedTemplate] ?? MinimalTemplate
  return <Template profile={profile} generated={generated} />
}

export default PortfolioPreview