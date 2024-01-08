export default function sortEventsByDate(eventList) {
  if (eventList) {
    const sortedEvents = eventList.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
    return sortedEvents;
  } else {
    return null;
  }
}
