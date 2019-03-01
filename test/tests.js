const uno = require('uno');
const sdk = require('../src').default;

function greet() {
    return `Hello ${this.name}`;
}

function log() {
    return `Info: ${this.logMessage}`;
}

uno(sdk.version, [], 1);
uno(sdk.formatText, [greet, {
    name: 'Juan'
}], 'Hello Juan');

const logger = sdk.createLogger(log, 'Main');

uno('`createLogger` - First log call', logger, [{
    logMessage: 'Init system'
}], '1 - Main - Info: Init system');
uno('`createLogger` - Second log call', logger, [{
    logMessage: 'Init userspace'
}], '2 - Main - Info: Init userspace');

const anotherlogger = sdk.createLogger(log, 'Secondary');

uno('`createLogger` - First log call of seconday logger', anotherlogger, [{
    logMessage: 'Init system'
}], '1 - Secondary - Info: Init system');

const info = sdk.createLevelLogger('Info');
const loggerName = 'Main';

uno('`createLevelLogger` - First log call', () => info `${loggerName} Init system`, [], '1 - Info - Main: Init system');
uno('`createLevelLogger` - Second log call', () => info `${loggerName} Init userspace`, [], '2 - Info - Main: Init userspace');

async function testCreateLoggerAsync() {
    const asyncLogger = await sdk.createLoggerAsync('Main');
    asyncLogger.setLoggerFn(log);
    uno('`createLoggerAsync` - First log call', asyncLogger.log, [{
        logMessage: 'Init system'
    }], '1 - Main - Info: Init system');
    uno('`createLoggerAsync` - Second log call', asyncLogger.log, [{
        logMessage: 'Init userspace'
    }], '2 - Main - Info: Init userspace');

    return true;
}

testCreateLoggerAsync().then(x => uno(() => x, [], true));

async function testCreateInvalidLoggerAsync() {
    try {
        await sdk.createLoggerAsync();
        return true;
    } catch {
        return false;
    }
}

testCreateInvalidLoggerAsync().then(x => uno(() => x, [], false));

uno(() => [...sdk.getLogEntries('Info')].length, [], 2);

const sequence = sdk.getLogEntries('Info').generator();

uno(() => sequence.next().value === sequence.next(true).value, [], true);