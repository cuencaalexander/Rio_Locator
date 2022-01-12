export const currentDay = new Date().toUTCString().split(", ")[0];

export const apiKey = process.env.Google_Map_API_KEY;

export const dayOptions = {
  Sun: "sunday_close",
  Mon: "monday_close",
  Tue: "tuesday_close",
  Wed: "wednesday_close",
  Thu: "thursday_close",
  Fri: "friday_close",
  Sat: "saturday_close",
};

export const daysArr = [
  "sunday_close",
  "monday_close",
  "tuesday_close",
  "wednesday_close",
  "thursday_close",
  "friday_close",
  "saturday_close",
];

export const dayOptionsReversed = {
  sunday_close: "Sunday",
  monday_close: "Monday",
  tuesday_close: "Tuesday",
  wednesday_close: "Wednesday",
  thursday_close: "Thursday",
  friday_close: "Friday",
  saturday_close: "Saturday",
};

export const dayOptionsFull = {
  Sun: "Sunday",
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
};

export const genNumber = (len) => {
  var text = "";
  var possible = "0123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

const rad = (x) => {
  return (x * Math.PI) / 180;
};

export const getDistance = (p1, p2) => {
  let R = 6378137; // Earth’s mean radius in meter
  let dLat = rad(p2.lat - p1.lat);
  let dLong = rad(p2.lng - p1.lng);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
      Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return (d * 0.000621371).toFixed(2); // returns the distance converted from meters to miles
};
