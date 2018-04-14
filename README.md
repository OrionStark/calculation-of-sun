# Calculation of sun
[![Inline docs](http://inch-ci.org/github/OrionStark/calculation-of-sun.svg?branch=master)](http://inch-ci.org/github/OrionStark/calculation-of-sun)
[![npm version](https://badge.fury.io/js/calculation-ofsun.svg)](https://badge.fury.io/js/calculation-ofsun)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/OrionStark/calculation-of-sun/issues)
[![HitCount](http://hits.dwyl.com/OrionStark/calculation-of-sun.svg)](http://hits.dwyl.com/OrionStark/calculation-of-sun)  
Sun calculation fully based on formula from http://aa.quae.nl/en/reken/zonpositie.html

## Warning
This program is not really accurate about the calculation. For the sunrise and sunset, the error value is about 2 minutes miss from the actual time. For the Altitude the error value is near 0.6 degrees and the azimuth as well.

## Install with npm
    npm install calculation-ofsun

## Without npm
1. Clone this project
2. Create your new js file
3. Import the solar-calculation.js to your code. You could find the script in dist directory
4. Then, have fun

## Attention
If you didn't understand what I'm saying about how to use it without npm. You could check the main.js.
That's it.

## How to Use It
```javascript
    const cls = require('calculation-ofsun')
    console.log(cls.getSunInformation(new Date(), 33, 3))
    /* Get Sun Information expected 3 parameters */
    /* Date, lat, long */
    /* For the other function and it's parameter. You could check on the table below */
```

## How to use another functions that require juliandate as the parameter
```javascript
    const cls = require('calculation-ofsun');
    const myJD = cls.dateToJD(new Date());
    const lw = -96.555324
    console.log(cls.solarTransit(myJD, lw));
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
sideraltime | JulianDate, West Longitude
getHourAngle | JulianDate, West Longitude
getSunPosition | None, Dont use it
solarTransit | JulianDate. West Longitude
sunriseandsunset | JulianDate, Latitude, Longitude

## Example of return object from getSunInformation functions
Nethereland GMT +1
It'll return time denpend on your local time

    {   sun_position: { 
            azimuth: -101.53872252647008, 
            altitude: 57.268164438252526 
        },
        date: 'Sat Apr 14 2018 10:16:32 GMT+0700 (WIB)',
        observe_location: { 
            latitude: 3.597031, 
            longitude: 98.678513
        },
        sunrise: 'Sat Apr 14 2018 06:21:42 GMT+0700 (WIB)',
        sunset: 'Sat Apr 14 2018 18:32:54 GMT+0700 (WIB)',
        solar_transit: 2458222.7272965494,
        hour_angle: 327.53679257420777,
        right_ascension: 
            {   degrees: 22.060782554336377, 
                rad: 0.38503329113969464 
            },
        clientJD: 2458222.6364905904 
    }



