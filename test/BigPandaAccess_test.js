const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const bigPandaAccess = require('../BigPandaAccess.js');

describe('bigPandaAccess', () => {
    it('Returns a 201 response', (done) => {
        chai.request('https://api.bigpanda.io:443')
            .post('/data/v2/alerts')
            .set('Authorization', 'Bearer 28745ebe3fe6feaae3815a68f37a88ba')
            .set('Content-Type', 'application/json')
            .send({'app_key':'bb0eb030296150f70753b85e331f9d83','status': 'critical', 'host': 'Chicago', 'check':'Weather Check', 'incident_identifier': '12005', 'temperature(F)': '66'})
            .end((error, response) => {
                if (error) done(error);
                // Now let's check our response
                expect(response).to.have.status(201);
                done();
            });
    });
});
