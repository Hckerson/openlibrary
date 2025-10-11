import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), 'MMMM d, yyyy');
  } catch (error) {
    console.log(error)
    return dateString; // Return the original string if parsing fails
  }
}


// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}