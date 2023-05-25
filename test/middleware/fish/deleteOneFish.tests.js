const expect = require('chai').expect;
const middleware = require('../../../middleware/fish/deleteOneFish.mw');

/**
 * Mock generator that contains the static parts of the required mock objects.
 * Call with arguments to generate the expected behaviour.
 * 
 * If a parameter is not provided, the default function implementation will
 * throw an assertation error when the function is called.
 */
const mock = ({ deleteOne, reqId, next }) => ({
    repo: {
        Fish: {
            deleteOne: deleteOne || (() => { expect(false).to.be.true; })
        }
    },
    req: {
        params: {
            id: reqId || null
        }
    },
    next: next || (() => { expect(false).to.be.true; })
});

describe('deleteOneFish', () => {

    it('should pass errors to the default handler', (done) => {
        const mocks = mock({
            reqId: 'id',
            deleteOne: (filter, callback) => {
                expect(filter._id).to.be.eql('id');

                setTimeout(() => callback('error'), 0);
            },
            next: (err) => {
                expect(err).to.be.eql('error');
                done();
            }
        });

        middleware(mocks.repo)(mocks.req, mocks.res, mocks.next);
    });

    it('should call next() if no error occurred', (done) => {
        const mocks = mock({
            reqId: 'id',
            deleteOne: (filter, callback) => {
                expect(filter._id).to.be.eql('id');

                setTimeout(() => callback(), 0);
            },
            next: (err) => {
                expect(err).to.be.undefined;
                done();
            }
        });

        middleware(mocks.repo)(mocks.req, mocks.res, mocks.next);
    });
});
