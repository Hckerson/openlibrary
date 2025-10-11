export function timeAgo(date: Date | string): string {
  const now = new Date();
  const target = typeof date === "string" ? new Date(date) : date;
  const diffMs = now.getTime() - target.getTime();

  if (diffMs < 0) return "in the future"; // safety guard

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (minutes < 1) {
    return "just now";
  } else if (minutes < 60) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else if (hours < 24) {
    return hours === 1 ? "1h ago" : `${hours}h ago`;
  } else if (days < 7) {
    return days === 1 ? "1d ago" : `${days}d ago`;
  } else if (weeks < 4) {
    return weeks === 1 ? "1w ago" : `${weeks}w ago`;
  } else if (months < 12) {
    return months === 1 ? "1m ago" : `${months}m ago`;
  } else {
    return years === 1 ? "1y ago" : `${years}y ago`;
  }
}
