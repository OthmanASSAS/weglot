const express = require('express');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const server = express();

const PORT = 3000;
const result = fs
  .readFileSync(path.resolve(__dirname, '../data/input5.txt'), 'utf8')
  .split(/\r?\n/);
let daysWeekBusyHours = [[], [], [], [], []];
result.forEach((el) => {
  const resultSpliced = el.split(' ');
  const resultOne = {
    day: resultSpliced[0],
    startHour: moment(resultSpliced[1].split('-')[0], 'HH:mm').utcOffset(1),
    endHour: moment(resultSpliced[1].split('-')[1], 'HH:mm').utcOffset(1),
  };
  daysWeekBusyHours[resultOne.day - 1].push(resultOne);
});
daysWeekBusyHours.forEach((el) =>
  el
    .sort((a, b) => {
      if (a.startHour < b.startHour) return -1;
      if (a.startHour > b.startHour) return 1;
      return 0;
    })
    .sort((a, b) => {
      if (a.day < b.day) return -1;
      if (a.day > b.day) return 1;
      return 0;
    })
);

fs.writeFile(
  'response5.txt',
  JSON.stringify(daysWeekBusyHours),
  'utf8',
  (err) => {
    if (err) throw err;
    console.log('file saved');
  }
);

const searchGoodTime = (
  arrTimes,
  firstTimeDay,
  lastTimeDay,
  durationMeeting
) => {
  const firstTimeDayMoment = moment(firstTimeDay, 'HH:mm').utcOffset(1);
  const lastTimeDayMoment = moment(lastTimeDay, 'HH:mm').utcOffset(1);
  const result = arrTimes.forEach((hoursByDay) => {
    const goodHourFound = hoursByDay.find((currentHour, idx) => {
      if (
        idx === 0 &&
        currentHour.startHour.diff(firstTimeDayMoment, 'minutes') >=
          durationMeeting
      ) {
        return {
          day: currentHour.day,
          startHour: firstTimeDayMoment,
          endHour: firstTimeDayMoment.add(60, 'm'),
        };
      }

      const isOkHour = hoursByDay.every((elEvery) => {
        !currentHour.endHour
          .add(1, 'm')
          .isBetween(elEvery.startHour, elEvery.endHour, undefined, []) &&
          !currentHour.endHour
            .add(59, 'm')
            .isBetween(elEvery.startHour, elEvery.endHour, undefined, []) &&
          !currentHour.endHour.diff(lastTimeDayMoment, 'minutes') >=
            durationMeeting;
      });
      if (isOkHour) {
        console.log('isOkHour', currentHour);
        return {
          day: currentHour.day,
          startHour: currentHour.startHour.add(1, 'm'),
          endHour: currentHour.endHour.add(60, 'm'),
        };
      }
    });
    return goodHourFound;
  });
};

searchGoodTime(daysWeekBusyHours, '8:00', '19:00', 60);

server.listen(PORT, () => console.log(`listen on port ${PORT} !!`));
