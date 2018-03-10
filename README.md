# calculation-of-sun
Sun calculation fully based on formula from http://aa.quae.nl/en/reken/zonpositie.html

## Warning
This program is not really accurate about the calculation. For the sunrise and sunset, the error value is about 2 minutes miss from the actual time. For the Altitude the error value is near 0.6 degrees and the azimuth as well.

# Install with npm
'npm install calculation-ofsun'

# Use
'''jvascript
    // getSunInformation parameter: Date, Latitude, Longtitude

    const cls = require('calculation-ofsun')
    console.log(cls.getSunInformation(new Date(), 33, 3))
    
'''
