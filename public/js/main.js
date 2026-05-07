// Convert announcement dates to the visitor's local timezone
document.querySelectorAll('.announcement-date').forEach(function(el) {
  const date = new Date(el.dataset.date);
  el.textContent = date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
});