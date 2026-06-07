import cn from '@/utils/cn'

const sizes = {
  xs: 'w-3 h-3 border-[1.5px]',
  sm: 'w-4 h-4 border-2',
  md: 'w-5 h-5 border-2',
  lg: 'w-7 h-7 border-[3px]',
  xl: 'w-9 h-9 border-[3px]',
}

const Spinner = ({ size = 'md', className = '' }) => (
  <span
    role="status"
    aria-label="Loading"
    className={cn(
      'inline-block rounded-full border-current border-t-transparent animate-spin',
      sizes[size],
      className
    )}
  />
)

export default Spinner