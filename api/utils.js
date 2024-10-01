export function createGoogleCalendarUrl(options) {
  const {
    title: eventTitle,
    startTime,
    endTime,
    description = '',
    location = '',
    timezone,
    recurrence: recurrenceRule,
    guests = [],
  } = options;

  const baseUrl = 'http://www.google.com/calendar/render';

  const formatDateTime = (date) => {
    return new Date(date).toISOString().replace(/-|:|\.\d{3}/g, '');
  };

  const queryParams = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventTitle,
    dates: `${formatDateTime(startTime)}/${formatDateTime(endTime)}`,
    details: description,
    location: location,
    trp: 'false',
    sprop: '',
    sprop: 'name:',
  });

  const formattedGuests = guests.map(encodeURIComponent).join(',');

  if (guests.length > 0) {
    queryParams.append('add', formattedGuests);
  }

  if (timezone) {
    queryParams.append('ctz', timezone);
  }

  if (recurrenceRule) {
    const formattedRecurrenceRule = `RRULE:${recurrenceRule}`;
    queryParams.append('recur', formattedRecurrenceRule);
  }

  return `${baseUrl}?${queryParams.toString()}`;
}