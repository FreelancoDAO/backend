const scheduleJob = (date, callback) => {
  const now = new Date();
  const targetDate = new Date(date);

  const timeUntilTarget = targetDate.getTime() - now.getTime();
  if (timeUntilTarget > 0) {
    setTimeout(callback, timeUntilTarget);
  } else {
    console.log('Invalid date. The specified date is in the past.');
  }
}

module.exports = { scheduleJob };