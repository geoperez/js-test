# js-test

JS Test

## Syllabus

* Basics: Scopes, closures, `this`, `bind`, `apply` and types.
* Intermediate: promises, iterators, generatos, async/await and template literals.
* Bonus: Proper use of objects and arrays and control flow.

## Instructions

Create a SDK object with the following methods:

* `version()` - Parameterless function returns 1.
* `formatText(templateFn, data)` - Function receiving a function and an data object:

    ```
    function greet() {
        return 'Hello ' + this.name;
    }

    sdk.formatText(greet, { name: 'Juan' }); // 'Hello Juan'
    ```

The SDK should be exported as the default value in the index file of the src folder.

The SDK will be validated using `npm test`. Don't change anything outside the src folder.