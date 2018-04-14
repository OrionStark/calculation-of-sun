/*
	MIT License

Copyright (c) 2018 Robby Muhammad Nst

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const JD1970 = 2440588;
const JD2000 = 2451545;
const earthC_coefficient_component = {
    C1: 1.9148,
    C2: 0.0200,
    C3: 0.0003,
    C4: 0,
    C5: 0,
    C6: 0,
    EC: 0.0000
}
const earth_perihelion = 102.9373;
const earth_obliquity = 23.4393 * (Math.PI / 180);
const earth_obliquity_degrees = 23.4393;
const earth_sideral_time = {
    at_zero_long: 280.1470,
    rate_of_change: 360.9856235
};




class Sunpositioning {
  /* Earth */
  /* J0: 0.0009
     J1: 0.0053
     J2: -0.0068
     J3: 1 */

     /*
   	             h0	    dSun	 sin(h0)
      Mercury 	−0.69 	1.38 	−0.0120
      Venus 	−0.37 	0.74 	−0.0064
      Earth 	−0.83 	0.53 	−0.0146
      Mars 	    −0.17 	0.35 	−0.0031
    */
    /*
         	           M0           M1
        Mercury 	174.7948 	4.09233445
        Venus 	    50.4161 	1.60213034
        Earth 	    357.5291 	0.98560028
        Mars 	    19.3730 	0.52402068
        Jupiter 	20.0202 	0.08308529
        Saturn 	    317.0207 	0.03344414
        Uranus 	    141.0498 	0.01172834
        Neptune 	256.2250 	0.00598103
        Pluto 	    14.882 	    0.00396
    */
    constructor(){}

    /**
        @param {Date} date user current date
        @param {number} lat user latitude
        @param {number} long user longitude
        @returns {Object} sun postiion, date, observe location, sunrise&sunset, solar transit, hour angle, RA and clientJD
    */
    getSunInformation(date, lat, long) {
        this.CLIENT_JD = this.dateToJD(date);
        this.CLIENT_LATITUDE = lat;
        this.CLIENT_LONGITUDE = long;
        this.CLIENT_lw = -long;
        let position = this.getSunPosition();
        return {
            sun_position: {
                azimuth: position.azimuth.degrees,
                altitude: position.altitude.degrees
            },
            date: this.jdToDate(this.CLIENT_JD).toString(),
            observe_location: {
                latitude: this.CLIENT_LATITUDE,
                longitude: this.CLIENT_LONGITUDE
            },
            sunrise: this.jdToDate(this.sunriseandsunset(this.CLIENT_JD, this.CLIENT_LATITUDE, this.CLIENT_LONGITUDE).sunrise).toString(),
            sunset: this.jdToDate(this.sunriseandsunset(this.CLIENT_JD, this.CLIENT_LATITUDE, this.CLIENT_LONGITUDE).sunset).toString(),
            solar_transit: this.solarTransit(this.CLIENT_JD, this.CLIENT_lw),
            hour_angle: this.getHourAngle(this.CLIENT_JD, this.CLIENT_lw),
            right_ascension: this.rightAscension(this.CLIENT_JD),
            clientJD: this.CLIENT_JD,
        };
    }


    /**
     * @param {Date} date date
     * @returns {number} JulianDate of the given date
     */
    dateToJD(date) {
        return date.valueOf() / ( 1000 * 60 * 60 * 24 ) - 0.5 + JD1970;
    }


    /**
     * 
     * @param {number} jd JulianDate
     * @returns {number} date from given JulianDate
     */
    jdToDate(jd) {
        return new Date((jd + 0.5 - JD1970) * ( 1000 * 60 * 60 * 24 ) )
    }


    /**
     * 
     * @param {number} jd Julian Date
     * @returns {Object} equation of center in degrees and radiant by the given JulianDate
     */
    equation_of_center(jd) {
        /*
            the C4 - C6 are 0, so I just calculate for Coefficient 1 - 3.
        */
        let results = earthC_coefficient_component.C1 * Math.sin(this.earthMeanAnomaly(jd).rad) + 
                        earthC_coefficient_component.C2 * Math.sin(2 * this.earthMeanAnomaly(jd).rad) + 
                        earthC_coefficient_component.C3 * Math.sin(3 * this.earthMeanAnomaly(jd).rad);
        return {
            degrees: results,
            rad: results * (Math.PI / 180)
        };
    }

    /**
     * 
     * @param {number} jd JulianDate
     * @returns {Object} earth mean anomaly in degrees and radiant 
     */
    earthMeanAnomaly(jd) {
        return {
            degrees: ( 357.5291 + 0.98560028 * ( jd - JD2000 ) ) % 360,
            rad: (( 357.5291 + 0.98560028 * ( jd - JD2000 ) ) % 360) * (Math.PI / 180)
        }
    }

    /**
     * 
     * @param {number} jd JulianDate
     * @returns {Object} earth true anomaly in degrees and radiant
     */
    earthTrueAnomaly(jd) {
        let results = this.equation_of_center(jd).degrees + this.earthMeanAnomaly(jd).degrees;
        return {
            degrees: results,
            rad: results * (Math.PI / 180)
        }
    }

    /**
     * 
     * @param {number} jd JulianDate
     * @returns {Object} ecliptic Longitude by given JulianDate in degrees and radiant
     */
    eclipticLongtitude(jd) {
        let true_anomaly = this.earthTrueAnomaly(jd);
        let results = (true_anomaly.degrees + earth_perihelion + 180) % 360;
        return {
            degrees: results,
            rad: results * (Math.PI / 180)
        };
    }

    /**
     * 
     * @param {number} jd JulianDate
     * @returns {Object} rightascension by the given JulianDate in degrees and radiant 
     */
    rightAscension(jd) {
        let ecliptic_longitude = this.eclipticLongtitude(jd);
        let results = Math.atan2(Math.sin(ecliptic_longitude.rad) * Math.cos(earth_obliquity), Math.cos(ecliptic_longitude.rad));
        return {
            degrees: results / (Math.PI / 180),
            rad: results
        };
    }

    /**
     * 
     * @param {number} jd JulianDate
     * @returns {Object} declination by the given JulianDate in degrees and radiant 
     */
    declination(jd) {
        let ecliptic_longitude = this.eclipticLongtitude(jd);
        let results = Math.asin(Math.sin(ecliptic_longitude.rad) * Math.sin(earth_obliquity));
        return {
            degrees: results / (Math.PI / 180),
            rad: results
        };
    }

    /**
     * 
     * @param {number} jd JulianDate
     * @param {number} lw Longitde west
     * @returns {number} Sideral time by the given JulianDate in degrees
     */
    sideraltime(jd, lw) {
        let results = (earth_sideral_time.at_zero_long + earth_sideral_time.rate_of_change * (jd - JD2000) - (lw)) % 360;
        return results;
    }

    /**
     * 
     * @param {number} jd JulianDate
     * @param {number} lw Longitude West
     * @return {number} HourAngle in degrees by the given Julian date
     */
    getHourAngle(jd, lw) {
        return this.sideraltime(jd, lw) - this.rightAscension(jd).degrees;
    }

    /**
     * Please don't call it by itself. You could get this value in other ways like
     * call the getSunInformation function.
     * @returns {Object} Return the azimuth and altitude of the sun
     */
    getSunPosition() {
        return {
            azimuth: {
                rad: Math.atan2(Math.sin(this.getHourAngle(this.CLIENT_JD, this.CLIENT_lw) * Math.PI / 180), 
                Math.cos(this.getHourAngle(this.CLIENT_JD, this.CLIENT_lw) * Math.PI / 180) * Math.sin(this.CLIENT_LATITUDE * Math.PI / 180) - Math.tan(this.declination(this.CLIENT_JD).rad) * Math.cos(this.CLIENT_LATITUDE * Math.PI / 180)),
                degrees: Math.atan2(Math.sin(this.getHourAngle(this.CLIENT_JD, this.CLIENT_lw) * Math.PI / 180), 
                Math.cos(this.getHourAngle(this.CLIENT_JD, this.CLIENT_lw) * Math.PI / 180) * Math.sin(this.CLIENT_LATITUDE * Math.PI / 180) - 
            Math.tan(this.declination(this.CLIENT_JD).rad) * Math.cos(this.CLIENT_LATITUDE * Math.PI / 180)) / (Math.PI / 180)
            },
            altitude: {
                rad: Math.asin(Math.sin(this.CLIENT_LATITUDE * (Math.PI / 180)) * Math.sin(this.declination(this.CLIENT_JD).rad) + 
                Math.cos(this.CLIENT_LATITUDE * Math.PI / 180) * Math.cos(this.declination(this.CLIENT_JD).rad) * Math.cos(this.getHourAngle(this.CLIENT_JD, this.CLIENT_lw) * Math.PI / 180)),
                degrees: Math.asin(Math.sin(this.CLIENT_LATITUDE * (Math.PI / 180)) * Math.sin(this.declination(this.CLIENT_JD).rad) + 
                Math.cos(this.CLIENT_LATITUDE * Math.PI / 180) * Math.cos(this.declination(this.CLIENT_JD).rad) * Math.cos(this.getHourAngle(this.CLIENT_JD, this.CLIENT_lw) * Math.PI / 180)) / (Math.PI / 180)
            }
        }
    }

    /**
     * 
     * @param {number} jd JulianDate
     * @param {number} lw West Longitude
     * @return {number} solarTransit in JulianDate 
     */
    solarTransit(jd, lw) {
        let _JD2000 = JD2000
        function nx() { return ((jd - _JD2000 - 0.0009) / 1 - (lw / 360)); }
        let n = Math.round(nx());
        function JDX() { return jd + 1 * ( n - nx() ); }
        let M = this.earthMeanAnomaly(JDX()).degrees;
        let L = (M + earth_perihelion + 180) % 360;
        let JDtmp = JDX() + 0.0053 * Math.sin(M * Math.PI / 180) - 0.0068 * Math.sin(2 * (L * (Math.PI / 180)));
        return JDtmp - (0 / 360 ) * 1;
    }

    /**
     * 
     * @param {number} jd JulianDate
     * @param {number} latitude Latitude
     * @param {number} longitude Longitude
     * @return {Object} sunrise and sunset in JulianDate 
     */
    sunriseandsunset(jd, latitude, longitude) {
        let jd_from_approx_transit = this.solarTransit(jd, -longitude);
        let sundeclination = this.declination(jd_from_approx_transit);
        let Ht = Math.acos((-0.0146 - Math.sin(latitude * Math.PI / 180) * Math.sin(sundeclination.rad)) / 
                    Math.cos(latitude * Math.PI / 180) * Math.cos(sundeclination.rad));
        return {
            sunrise: jd_from_approx_transit - ((Ht / (Math.PI / 180)) / 360) * 1,
            sunset: jd_from_approx_transit + ((Ht / (Math.PI / 180)) / 360) * 1
        }
    }
}
module.exports = new Sunpositioning();
