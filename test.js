const assert = require('assert');
const calculationofsun = require('./dist/solar-calculation');

describe('Get the sun declination', function() {
    describe('Get declination on Sat Apr 14 2018 12:02:33 GMT+0700 (WIB)', function() {
        it('Should return 9.275350145303175 in degrees and 0.16188539931087487 in radiant', function() {
            var results = calculationofsun.declination(
                calculationofsun.dateToJD(new Date('Sat Apr 14 2018 12:02:33 GMT+0700 (WIB)'))
            );
            assert.equal(results.degrees, 9.275350145303175);
            assert.equal(results.rad, 0.16188539931087487);
        })
    })
});

describe('Test get sun position from getsuninformation', function() {
    it('Should not return NaN value in sun position', function() {
        var results = calculationofsun.getSunInformation(new Date(), 35, 43.5553);
        assert.notEqual(results.sun_position.azimuth, NaN);
        assert.notEqual(results.sun_position.altitude, NaN);
    });
    describe('Test get sun position through itself and not through the getsuninformation', function() {
        describe('On this case, we never create sun calculation instance before,\n so we dont have any value from the user itself', 
        function() {
            var newCalc = require('./dist/solar-calculation');
            var results = newCalc.getSunPosition();
            it('Should return NaN as the value', function() {   
                assert.notEqual(typeof results.azimuth.degrees, Number);
                assert.notEqual(typeof results.altitude.degrees, Number);
            })
        });
    });
});

describe('Test getHourAngle by given Julian date and west longitude', function() {
    describe('On JD = 2458222.7101041665, and lw = -98.678513', function() {
        var results = calculationofsun.getHourAngle(2458222.7101041665, -98.678513);
        it('Should return -5.957697679431796', function() {
            assert.equal(results, -5.957697679431796);
        });
    });
});

describe('Test major feature', function() {
    assert.ok(calculationofsun.getSunInformation(new Date(), 35, 43.55535), 'Ok');
})
