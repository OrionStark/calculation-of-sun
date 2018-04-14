const algorithm = require('./dist/solar-calculation');

const myJD = algorithm.dateToJD(new Date())
console.log(algorithm.getSunInformation(new Date(), 3.597031, 98.678513));