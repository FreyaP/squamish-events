export default function isWeekendFilter(event) {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const daysUntilNextSaturday = 6 - dayOfWeek + (dayOfWeek === 0 ? 7 : 0); // Days until next Saturday
  const nextSaturday = new Date(currentDate);
  nextSaturday.setDate(currentDate.getDate() + daysUntilNextSaturday);

  const nextSunday = new Date(nextSaturday);
  nextSunday.setDate(nextSunday.getDate() + 1);

  return (
    new Date(event.date).getDate() === nextSaturday.getDate() ||
    new Date(event.date).getDate() === nextSunday.getDate()
  );
}
