# js-test

JS Test

## Syllabus

* Basics: Scopes, closures, `this`, `bind`, `apply` and types.
* Intermediate: promises, iterators, generators, async/await and template literals.
* Bonus: Proper use of objects and arrays and control flow.

## Instructions

Create a SDK object with the following methods:

* `version()` - Parameterless function returns 1.
* `formatText(templateFn, data)` - Function receiving a function and an data object:

```
function greet() {
    return `Hello ${this.name}`;
}

sdk.formatText(greet, { name: 'Juan' }); // 'Hello Juan'
```

* `createLogger(templateFn, loggerName)` - Function receiving a function and returning a new one with a line tracker:

```
function log() {
    return `Info: ${this.logMessage}`;
}

const logger = sdk.createLogger(log, 'Main');
logger( { logMessage: 'Init system' }); // '1 - Main - Info: Init system'
logger( { logMessage: 'Init userspace' }); // '2 - Main - Info: Init userspace'
```

* `createLevelLogger` - :

```
const info = sdk.createLevelLogger('Info');
info`Init system`; // '1 - Info: Init system'
```

The SDK should be exported as the default value in the index file of the src folder.

The SDK will be validated using `npm test`. Don't change anything outside the src folder.