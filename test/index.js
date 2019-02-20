const uno = require('uno');
const sdk = require('../lib').default;

function greet() {
    return 'Hello ' + this.name;
}

uno(sdk.version, [], 1);
uno(sdk.formatText, [ greet, { name: 'Juan' } ], 'Hello Juan');