const algorithm = require('./dist/solar-calculation');

const myJD = algorithm.dateToJD(new Date())
console.log(new Date().toString());
console.log(algorithm.getSunInformation(new Date('Sat Apr 14 2018 12:02:33 GMT+0700 (WIB)'), 3.597031, 98.678513));
console.log(algorithm.dateToJD(new Date('Sat Apr 14 2018 12:02:33 GMT+0700 (WIB)')))
console.log(algorithm.getHourAngle(
    algorithm.dateToJD(new Date('Sat Apr 14 2018 12:02:33 GMT+0700 (WIB)')),
    algorithm.CLIENT_lw
));