let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

//Assertion

chai.should();

chai.use(chaiHttp);

describe('Task API', () => {

    /**
     * Test the GET route
     */

    describe("GET /api/archivos", () => {
        it('should verify that we have 0 files in the DB', (done) => {
            chai.request(server)
            .get('/api/archivos')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });

        it('should verify that we have 1 file in the DB', (done) => {
            chai.request(server)
            .get('/api/archivos')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
        });
    })
})