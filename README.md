# calculation-of-sun
Sun calculation fully based on formula from http://aa.quae.nl/en/reken/zonpositie.html

## Warning
:exclamination:
This program is not really accurate about the calculation. For the sunrise and sunset, the error value is about 2 minutes miss from the actual time. For the Altitude the error value is near 0.6 degrees and the azimuth as well.

## Install with npm
'npm install calculation-ofsun'

## How to Use It
'''javascript

    const cls = require('calculation-ofsun')
    console.log(cls.getSunInformation(new Date(), 33, 3))
    /* Get Sun Information expected 3 parameters */
    /* Date, lat, long */

'''
You can also call any function except getSunPosition, because it automatically calls by the
getSunInformation function to get sun position according to your input parameters for getSunInformation.

## Functions parameter
Function Name | Expected Parameter
------------- | ------------------
getSunInformation | Date, latitude, longtitude
dateToJD | Date
jdTODate | JulianDate
equation_of_center | JulianDate
earthMeanAnomaly | JulianDate
earthTrueAnomaly | JulianDate
eclipticLongtitude | JulianDate
rightAscension | JulianDate
declination | JulianDate
sideraltime | JulianDate
getHourAngle | JulianDate
getSunPosition | None, Dont use it
solarTransit | JulianDate
sunriseandsunset | JulianDate

