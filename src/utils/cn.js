/**
 * Lightweight className combiner — merges strings, ignores falsy values.
 * Use: cn('base-class', isActive && 'active-class', className)
 */
const cn = (...classes) => classes.filter(Boolean).join(" ");

export default cn;
