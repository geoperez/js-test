const uno = require('uno');
const sdk = require('../lib').default;

function greet() {
    return 'Hello ' + this.name;
}

function log() {
    return 'Info: ' + this.logMessage;
}

var logger = sdk.createLogger(log, 'Main');
var anotherlogger = sdk.createLogger(log, 'Secondary');

uno(sdk.version, [], 1);
uno(sdk.formatText, [ greet, { name: 'Juan' } ], 'Hello Juan');

uno('First log call', logger, [ { logMessage: 'Init system' } ], '1 - Main - Info: Init system');
uno('Secoond log call', logger, [ { logMessage: 'Init userspace' } ], '2 - Main - Info: Init userspace');

uno('First log call of seconday logger', anotherlogger, [ { logMessage: 'Init system' } ], '1 - Secondary - Info: Init system');
