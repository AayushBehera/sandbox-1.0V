/**
 * Utility helper functions
 */

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getConfidenceColor(confidence: 'low' | 'medium' | 'high'): string {
  switch (confidence) {
    case 'high':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function getGrowthColor(growth: 'low' | 'medium' | 'high'): string {
  switch (growth) {
    case 'high':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function getEducationIntensityColor(intensity: 'low' | 'medium' | 'high'): string {
  switch (intensity) {
    case 'high':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'medium':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function getStepTypeIcon(type: string): string {
  switch (type) {
    case 'course':
      return '📚';
    case 'project':
      return '💼';
    case 'internship':
      return '🏢';
    case 'certification':
      return '🎓';
    case 'networking':
      return '🤝';
    case 'exam_prep':
      return '📝';
    default:
      return '✓';
  }
}

export function getStepTypeColor(type: string): string {
  switch (type) {
    case 'course':
      return 'bg-blue-100 text-blue-800';
    case 'project':
      return 'bg-purple-100 text-purple-800';
    case 'internship':
      return 'bg-green-100 text-green-800';
    case 'certification':
      return 'bg-yellow-100 text-yellow-800';
    case 'networking':
      return 'bg-pink-100 text-pink-800';
    case 'exam_prep':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getEffortColor(effort: 'low' | 'medium' | 'high'): string {
  switch (effort) {
    case 'high':
      return 'text-red-600';
    case 'medium':
      return 'text-yellow-600';
    case 'low':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
