# Calculation of sun
Sun calculation fully based on formula from http://aa.quae.nl/en/reken/zonpositie.html

## Warning
This program is not really accurate about the calculation. For the sunrise and sunset, the error value is about 2 minutes miss from the actual time. For the Altitude the error value is near 0.6 degrees and the azimuth as well.

## Install with npm
    npm install calculation-ofsun

## How to Use It
```javascript
    const cls = require('calculation-ofsun')
    console.log(cls.getSunInformation(new Date(), 33, 3))
    /* Get Sun Information expected 3 parameters */
    /* Date, lat, long */
```

## How to use another functions that require juliandate as the parameter
```javascript
    const cls = require('calculation-ofsun');
    const myJD = cls.dateToJD(new Date());
    console.log(cls.solarTransit(myJD));
```
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

## Example of return object from getSunInformation functions
Nethereland GMT +1
It'll return time denpend on your local time

    {   sun_position: { azimuth: -77.80678591967518, altitude: 4.0819291879429525 },
        date: 'Sat Mar 10 2018 13:39:40 GMT+0700 (WIB)', 
        sunrise: 'Sat Mar 10 2018 13:07:56 GMT+0700 (WIB)',
        sunset: 'Sun Mar 11 2018 00:36:33 GMT+0700 (WIB)',
        mean_anomaly: { degrees: 64.65251729583633, rad: 1.1283992965149248 },
        solar_transit: 2458187.994618933,
        equation_of_center: { degrees: 1.7458618484586093, rad: 0.03047103754055702 },
        h: 282.14627224302416,
        RA: { degrees: -9.80213468943287, rad: -0.17107952405455543 },
        clientJD: 2458187.777554097,
        true_anomaly: { degrees: 66.39837914429494, rad: 1.1588703340554818 },
        sideraltime: 272.3441375535913 }



