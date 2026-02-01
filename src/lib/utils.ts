import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function anonymizeAuthor(author: string) {
  if (author.length <= 4) {
    return author;
  }
  const start = author.substring(0, 2);
  const end = author.substring(author.length - 2);
  const middle = '*'.repeat(author.length - 4);
  return `${start}${middle}${end}`;
}
