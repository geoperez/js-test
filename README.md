# js-test

JS Test

## Syllabus

* Basics: Scopes, closures, `this`, `bind`, `apply` and types.
* Intermediate: promises, iterators, generators, async/await and template literals.
* Bonus: Proper use of objects and arrays and control flow.

## Instructions

Create a SDK object with the following methods:

*NOTE* - You need to save all the logs in an internal data structure. You will need to provide previous logs with some methods.

* `version()` - Parameterless function returns 1.
* `formatText(templateFn, data)` - Function receiving a function and an data object:

```javascript
function greet() {
    return `Hello ${this.name}`;
}

sdk.formatText(greet, { name: 'Juan' }); // 'Hello Juan'
```

* `createLogger(templateFn, loggerName)` - Function receiving a function and returning a new one with a line tracker:

```javascript
function log() {
    return `Info: ${this.logMessage}`;
}

const logger = sdk.createLogger(log, 'Main');
logger( { logMessage: 'Init system' }); // '1 - Main - Info: Init system'
logger( { logMessage: 'Init userspace' }); // '2 - Main - Info: Init userspace'
```

* `createLevelLogger(level)` - Function returning a tagged template with a line tracker and expecting a loggerName variable:

```javascript
const info = sdk.createLevelLogger('Info');
const loggerName = 'Main';
info`${loggerName} Init system`; // '1 - Info - Main: Init system'
info`${loggerName} Init userspace`; // '2 - Info - Main: Init userspace'
```

* `createLoggerAsync(loggerName)` - Function returning a promise of an object with a setter method `setLoggerFn`.
If the loggerName is empty, reject the promise:

```javascript
// Valid promise
function log() {
    return `Info: ${this.logMessage}`;
}

const logger = await sdk.createLoggerAsync('Main');
logger.setLoggerFn(log);
logger.log( { logMessage: 'Init system' }); // '1 - Main - Info: Init system'
logger.log( { logMessage: 'Init userspace' }); // '2 - Main - Info: Init userspace'

// Invalid promise
try {
    const invalidLogger = await sdk.createLoggerAsync();
} catch {
    // Throw
}
```

* `getLogEntries(level)` - Function returning an iterable object by level with all the logs in the SDK, also a generator should be available:

```javascript
for(var logEntry of sdk.getLogEntries('Info')) {
    console.log(logEntry); // Outputs all the log entries
}

const sequence = sdk.getLogEntries('Info').generator();
console.log(sequence.next().value); // Outputs first entry
```

The SDK should be exported as the default value in the index file of the src folder.

The SDK will be validated using `npm test`. Don't change anything outside the src folder.
