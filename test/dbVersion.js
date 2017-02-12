var assert = require('chai').assert;
var dbVersion = require('../lib/dbVersion');

describe('dbVersion', function() {
    it('constructs without build', function() {
        var v = new dbVersion('2.1.0');
        assert.equal( v.parsed.major, 2 );
        assert.equal( v.parsed.minor, 1 );
        assert.equal( v.parsed.revision, 0 );
        assert.equal( v.parsed.build, 0);
    });

    it('constructs with build', function() {
        var v = new dbVersion('3.2.1.0');
        assert.equal( v.parsed.major, 3 );
        assert.equal( v.parsed.minor, 2 );
        assert.equal( v.parsed.revision, 1 );
        assert.equal( v.parsed.build, 0);
    });

    it('compares equal correctly', function() {
        var v1 = new dbVersion('3.2.1.0');
        var v2 = new dbVersion('3.2.1.0');
        assert.equal( v1.compare(v2), 0 );
    });
    it('compares newer correctly', function() {
        //major
        var v1 = new dbVersion('4.2.1.0');
        var v2 = new dbVersion('3.2.1.0');
        assert.equal( v1.compare(v2), 1 );
        assert.equal( v2.compare(v1), -1 );

        //minor
        v1 = new dbVersion('3.3.1.0');
        v2 = new dbVersion('3.2.1.0');
        assert.equal( v1.compare(v2), 1 );
        assert.equal( v2.compare(v1), -1 );

        //revision
        v1 = new dbVersion('3.2.2.0');
        v2 = new dbVersion('3.2.1.0');
        assert.equal( v1.compare(v2), 1 );
        assert.equal( v2.compare(v1), -1 );

        //build
        v1 = new dbVersion('3.2.1.1');
        v2 = new dbVersion('3.2.1.0');
        assert.equal( v1.compare(v2), 1 );
        assert.equal( v2.compare(v1), -1 );
    });
    it('amNewer works', function() {
        var v1 = new dbVersion('3.2.1.0');
        var v2 = new dbVersion('3.2.1.0');
        assert.equal( v1.amNewer(v2), false );
        assert.equal( v2.amNewer(v1), false );

        v1 = new dbVersion('4.2.1.0');
        v2 = new dbVersion('3.2.1.0');
        assert.equal( v1.amNewer(v2), true );
        assert.equal( v2.amNewer(v1), false );

        //major
        v1 = new dbVersion('4.2.1.0');
        v2 = new dbVersion('3.2.1.0');
        assert.equal( v1.amNewer(v2), true );
        assert.equal( v2.amNewer(v1), false );

        //minor
        v1 = new dbVersion('3.3.1.0');
        v2 = new dbVersion('3.2.1.0');
        assert.equal( v1.amNewer(v2), true);
        assert.equal( v2.amNewer(v1), false );

        //revision
        v1 = new dbVersion('3.2.2.0');
        v2 = new dbVersion('3.2.1.0');
        assert.equal( v1.amNewer(v2), true );
        assert.equal( v2.amNewer(v1), false );

        //build
        v1 = new dbVersion('3.2.1.1');
        v2 = new dbVersion('3.2.1.0');
        assert.equal( v1.amNewer(v2), true );
        assert.equal( v2.amNewer(v1), false );
    });
});