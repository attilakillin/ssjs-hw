const expect = require('chai').expect;
const middleware = require('../../../middleware/fish/loadOneFish.mw');

/**
 * Mock generator that contains the static parts of the required mock objects.
 * Call with arguments to generate the expected behaviour.
 * 
 * If a parameter is not provided, the default function implementation will
 * throw an assertation error when the function is called.
 */
const mock = ({ findOne, reqId, redirect, next }) => ({
    repo: {
        Fish: {
            findOne: findOne || (() => { expect(false).to.be.true; })
        }
    },
    req: {
        params: {
            id: reqId || null
        }
    },
    res: {
        redirect: redirect || (() => { expect(false).to.be.true; }),
        locals: {}
    },
    next: next || (() => { expect(false).to.be.true; })
});

describe('loadOneFish', () => {

    it('should pass errors to the default handler', (done) => {
        const mocks = mock({
            reqId: 'id',
            findOne: (filter, callback) => {
                expect(filter._id).to.be.eql('id');

                setTimeout(() => callback('error', null), 0);
            },
            next: (err) => {
                expect(err).to.be.eql('error');
                done();
            }
        });

        middleware(mocks.repo)(mocks.req, mocks.res, mocks.next);
    });

    it('should redirect to /fish if no fish found', (done) => {
        const mocks = mock({
            reqId: 'id',
            findOne: (filter, callback) => {
                expect(filter._id).to.be.eql('id');

                setTimeout(() => callback(null, null), 0);
            },
            redirect: (target) => {
                expect(target).to.be.eql('/fish');
                done();
            }
        });
        
        middleware(mocks.repo)(mocks.req, mocks.res, mocks.next);
    });

    it('should set res.locals.fish and call next() if fish found', (done) => {
        const mocks = mock({
            reqId: 'id',
            findOne: (filter, callback) => {
                expect(filter._id).to.be.eql('id');

                setTimeout(() => callback(null, 'fish'), 0);
            },
            next: (err) => {
                expect(err).to.be.undefined;
                expectLocals();
                done();
            }
        });

        const expectLocals = () => {
            expect(mocks.res.locals.fish).to.be.eql('fish');
        };

        middleware(mocks.repo)(mocks.req, mocks.res, mocks.next);
    });
});
