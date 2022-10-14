// function secondsToString(seconds) {
//   var hour = Math.floor(seconds / 3600);
//   hour = hour < 10 ? "0" + hour : hour;
//   var minute = Math.floor((seconds / 60) % 60);
//   minute = minute < 10 ? "0" + minute : minute;
//   var second = seconds % 60;
//   second = second < 10 ? "0" + second : second;
//   return hour + ":" + minute + ":" + second;
// }
// let mes;
// // minutos en enteros: minutos/60
// function financial(x) {
//   return Number.parseFloat(x).toFixed(2);
// }
// const mivar = financial(50.50878412);
// console.log(mivar)

const num = 40;
let color = "default";
if(num <= 3){
  console.log('menos de 3 reservas')
  color="green"
}
if(num > 3 && num < 7){
  console.log('mas de 3 reservas menos de 7')
  color="orange"

}
if(num > 7 && num < 11){
  console.log('mayor q 7 menor q 11')
  color="red"
}
console.log( color )