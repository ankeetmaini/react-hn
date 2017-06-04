export function getTimeAgo (miliseconds) {
  const now = new Date();
  const then = new Date(miliseconds * 1000);

  if (then.getHours() !== now.getHours()) {
    const diffHours = Math.abs(now.getHours() - then.getHours());
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  }

  const diffMinutes = Math.abs(now.getMinutes() - then.getMinutes());
  return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
}
