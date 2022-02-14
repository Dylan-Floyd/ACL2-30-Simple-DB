# Asynchronous JavaScript

## CPU Access

- OS/Process paradigm
    - CPU
    - Memory
    - Networking
    - File System
    - ...
- "Thread of Execution"
- Quad Core    
- Threading models
    - Multiple threads
    - Single threaded
- JavaScript is single-threaded
    - Does one thing at a time
    - Simplifies access to memory
- History of NodeJS
    - V8 JS Engine from Chrome
    - Combine with OS level access
- Event Loop
    - Why functions as in memory objects so important
    - High-through put uses
    - API servers as IO traffic controllers
- Asynchronous
    - Means code will be run later on event loop
    - How do we manage this???

## Async code

Two primary async workflows:
1. Sequential
1. Parallel
1. + Error Propagation

### Callback

`function` is passed as a parameter. starts simple, then...

[callback hell](http://callbackhell.com/)

1. Sequential actions are nested
1. Parallel is DIY
1. Error Propagation happens at every async

### Promises

Introduces an "object" representing a future value (the result of the async call) that we pass a callback to a `.then` method

1. Sequential actions are chains of `then` calls
1. `Promise.all` is introduced to handle an array of promises (and return order is the same!)
1. Errors will work their way through `then` calls until a `.catch` is encountered in the chain

There is a serious gotcha do to scoping rules in JavaScript needed to retain a value from one step in a downstream sequential task! 

### `async`/`await`

The `async` keyword decorates a functions and says that:
1. `await` will be used
1. the function will return a `Promise` (always, if a value is returned it will be wrapped in a Promise)

The `await` keyword handles all the details of `.then`ing the promise and just returns the value, making it look like "normal" code. Gives the appearance of sequential actions.

Still need to use `Promise.all` for parallel (and you have to await that)

## Async functions and methods

Golden rule of writing async functions/methods:
1. If your function or method does async work, then your function or method is async (promise returning)

## `Promise.all`

Two primary uses:
1. Used with array.map to do one async action per item in the list
1. Used to run specific steps in a workflow that are non-dependent and can be run at the same time