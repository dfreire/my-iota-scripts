var exec = require('child_process').exec;
var IOTA = require('iota.lib.js');

var iota = new IOTA({
    host: 'http://localhost',
    port: 14265,
    // sandbox: true,
});

var seedGenerator = "cat /dev/urandom |LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1";

exec(seedGenerator, function (error, stdout, stderr) {
    if (error) {
        console.log(error.code);
        console.log(stderr);
        process.exit(1);
    }

    var seed = stdout.substr(0, 81);
    console.log('PRIVATE SEED:');
    console.log(seed);

    if (!iota.valid.isTrytes(seed, 81)) {
        console.log('Error: Invalid seed!');
        process.exit(1);
    }

    var options = {
        // index: 0,
        total: 1,
        security: 3,
        checksum: true,
        returnAll: true,
    }

    iota.api.getNewAddress(seed, options, function (e, addresses) {
        var address = addresses[0];
        console.log('PUBLIC ADDRESS:');
        console.log(address);
    });
});