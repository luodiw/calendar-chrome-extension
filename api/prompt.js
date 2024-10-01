import moment from 'moment-timezone';

export const dates = {
  nextSunday10am: (now) => {
    const nextSun = moment(now)
      .clone()
      .add(1, 'weeks')
      .startOf('isoWeek')
      .add(6, 'days');
    return nextSun.hour(10).minute(0).second(0).millisecond(0);
  },
  tomorrowNoon: (now) => {
    const tomorrow = moment(now).clone().add(1, 'days');
    console.log(tomorrow);
    return tomorrow.hour(12).minute(0).second(0).millisecond(0);
  },
  tomorrow8pm: (now) => {
    const tomorrow = moment(now).clone().add(1, 'days');
    return tomorrow.hour(20).minute(0).second(0).millisecond(0);
  },
};

export const promptFewShot = (prompt, timezone) => {
  const now = moment(new Date()).tz(timezone); 
  return `You are a world-class Calendar assistant.

It's currently ${now.format('D MMM YYYY, h:mmA')} in ${timezone}.

## Task

Translate your boss's natural language descriptions of calendar events into a JSON schema similar to the iCal spec.

## JSON Output Example
{
  title: "Running with David",
  startTime: ${now.clone().add(1, 'days').hour(17).minute(0).format()},
  endTime: ${now.clone().add(1, 'days').hour(18).minute(0).format()},
  location: "Central Park",
  description: "A refreshing run with David! 🏃‍♂️",
  guests: [],
  recurrence: ""
}

## Rules
- Guess the most appropriate \`startTime\` and \`endTime\` for the kind of event after now.
- Leave \`location\`, \`guests\`, and \`recurrence\` empty unless specified.
- Never invite \`guests\` unless full email given.
- \`recurrence\` strictly conforms to the full \`RRULE\` iCal spc.
- Give a short quirky \`description\`.

USER
Team outing this Friday at 6 PM
ASSISTANT
{
  title: "Team Outing",
  startTime: ${dates.nextFriday(now).hour(18).minute(0).format()},
  endTime: ${dates.nextFriday(now).hour(20).minute(0).format()},
  location: "Local Park",
  description: "Time to unwind and have some fun! 🎉"
}
USER
Weekly sync with project team on Mondays at 3 PM
ASSISTANT
{
  title: "Weekly Project Sync",
  startTime: ${dates.nextMonday(now).hour(15).minute(0).format()},
  endTime: ${dates.nextMonday(now).hour(16).minute(0).format()},
  location: "Office Meeting Room",
  description: "Let's align on our project goals! 📅",
  recurrence: "RRULE:FREQ=WEEKLY;BYDAY=MO"
}
USER
Grocery shopping this Saturday at 10 AM
ASSISTANT
{
  title: "Grocery Shopping",
  startTime: ${dates.nextSaturday(now).hour(10).minute(0).format()},
  endTime: ${dates.nextSaturday(now).hour(11).minute(0).format()},
  location: "Supermarket",
  description: "Time to stock up on goodies! 🛒",
}
USER
${prompt}
ASSISTANT`;
};