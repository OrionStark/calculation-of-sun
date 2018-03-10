const a = require('./dist/solar-calculation');
let b = new a();
let lat = 3.597031;
let long = 98.678513;
function JDtoDate(jd) {
    let d = new Date((jd + 0.5 - 2440588) * (1000 * 60 * 60 * 24))
    console.log(d);
    return d.toString();
  }
let sff = b.getSunInformation(new Date(), 3.597031, 98.678513)
console.log(sff.clientJD)
console.log(JDtoDate(sff.sunset));
console.log(sff)
