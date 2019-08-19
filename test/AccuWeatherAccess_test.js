const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const accuWeatherAccess = require('../AccuWeatherAccess.js');

describe('accuWeatherAccess', () => {
    it('Returns a 200 response', (done) => {
        chai.request('http://dataservice.accuweather.com:80')
            .get('/currentconditions/v1/349727?apikey=oAFYsWAhqPCXx7ao8OOz3ZKRtsG95HiO')
            .end((error, response) => {
                if (error) done(error);
                // Now let's check our response
                expect(response).to.have.status(200);
                done();
            });
    });
});
