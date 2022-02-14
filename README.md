# Simple Db

## Demo

Use the [copy file/dir demo](https://github.com/martypdx/copy-demo) to guide you in how to construct async workflows

## Getting Started

Use [this template](https://github.com/alchemycodelab/simple-db) to get started. 

**Don't forget to `npm i`!**

Here is a link to the [node fs docs](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html)

## Learning Objectives

- Sequential and parallel asynchronous workflows
- Promise chaining
- `async`/`await` syntax
- Handling specific errors in async actions
- Using a `class` to hold onto shared state and expose methods

## Description

Write a JavaScript class that manages saving objects as json. A really simple, 
single-table database! It will used an id generation library from `npm` like `shortid` and store files in the format `[id].json`, like `er3i5c.json`. The contents of the file should be a JSON representation of the object using `JSON.stringify`.

**Use can use async/await in your tests, but use promise chaining in your `SimpleDb` implementation.**

**Create a branch that you can submit as a PR!**

It features the following methods:

### `constructor(directoryPath)`

The class constructor should take the directory to use as a string and store it on the object instance. You do not need to explicitly test the constructor as it will be used in each test.

```js
class SimpleDb {
    constructor(dirPath) {
        this.dirPath = dirPath;
    }
}
```

### `get(id)`

Returns an object deserialized (`JSON.parse`) from the contents of the file with that id in the directory (don't forget to add `.json`!).

It will be helpful to write a test that constructs an artificial file in your directory (see the `copyFile` demo example), with an id and contents you control. 
- You can make up any id, and just make sure your contents string is valid JSON.
- Your test should use `.toEqual` with an example JS object equivalent to the string you saved

### `get(id)` not found

Write a test of `get` that checks for `ENOENT` in the implementation, bit converts it to a `Not found` error (see the copy file demo).

### `save(obj)`

Takes an object, assigns a random `id` (sets an `id` property) and the serializes (`JSON.stringify`) the object into a file of name `[id].json`. 

The object will be mutated after the method completes, so you can check the object after you call save in your test for the new `id`. Use the `get(id)` method as your test to see that the object was correctly saved. You can compare the object that you passed to `save` to the one returned from `get(id)` via `.toEqual` assertion.

### `getAll()`

Get all the objects in the directory. This will require `Promise.all` and should use your existing `get(id)` method to get the object(s) (see copy dir demo). 

Your test should start by saving a few objects to the store, then calling `getAll` and verify via `.toEqual` assertion.

## Refactor to `async/await`

Open a PR from your initial dev branch to main

## Stretch Goals

You can do the stretch goals directly using `async`/`await` (unless you really want to practice more promise chaining syntax, in which case make sure to covert once you have tests working!)

### Refactor file path method

Your `SimpleDb` class likely has repeated code for create the file path from the `id`. Create a __private__ method `#getFilePath` that the other methods use to do this work.

### `delete(id)`

Remove a stored object by id. Add a second test that if given a id that doesn't exists, it does **not** throw an error (because it already is "deleted")


### Acceptance Criteria

You should have 2 branches with 2 PRs:
- `dev` to `main` with Promise chaining implementation
- `async-await` to `dev` with refactor to `async`/`await`

Both PRs should have passing CI

### Rubric

Each method needs to be fully tested

| Task | Points |
| --   | --     |
| `save(obj)`   |    5   |
| `get(id)`     |    5   |
| `getAll()`    |    5   |
| refactor to `async/await` | 5 | 