import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'MMM d, yyyy');
  } catch (error) {
    return 'Invalid date';
  }
};

export const getRelativeDueStatus = (dueDate: string, status: string): 'overdue' | 'approaching' | 'safe' | 'completed' => {
  if (status === 'completed') return 'completed';
  
  const today = new Date();
  const due = parseISO(dueDate);
  
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'overdue';
  if (diffDays <= 7) return 'approaching';
  return 'safe';
};