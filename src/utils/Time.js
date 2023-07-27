export const TimeFromNow = (time, agoLabel = false) => {
  const now = new Date().getTime();
  const currentTime = new Date(time).getTime();
  const distanceInMinutes = Math.floor((now - currentTime) / 60000);
  if (distanceInMinutes <= 1440) {
    //1day
    // const hour = Math.floor(distanceInMinutes / 60);
    // return `${hour}h${agoLabel ? ' ago' : ''}`;
    return 'D';
  } else if (distanceInMinutes > 1440 && distanceInMinutes <= 1440 * 7) {
    //bteween 1 day and 1 week
    // const day = Math.floor(distanceInMinutes / (60 * 24));
    // return `${day}d${agoLabel ? ' ago' : ''}`;
    return 'W';
  } else if (distanceInMinutes > 1440 * 7 && distanceInMinutes < 1440 * 30) {
    //lat month
    // const week = Math.floor(distanceInMinutes / (60 * 24 * 7));
    // return `${week}w${agoLabel ? ' ago' : ''}`;
    return 'M';
  } else {
    return 'Y';
  }
};
