function secondsToString(seconds) {
  var hour = Math.floor(seconds / 3600);
  hour = hour < 10 ? "0" + hour : hour;
  var minute = Math.floor((seconds / 60) % 60);
  minute = minute < 10 ? "0" + minute : minute;
  var second = seconds % 60;
  second = second < 10 ? "0" + second : second;
  return hour + ":" + minute + ":" + second;
}
let mes;
// minutos en enteros: minutos/60
function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}
const mivar = financial(50.50878412);
console.log(mivar)