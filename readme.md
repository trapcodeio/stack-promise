# Stack JavaScript Promise

This simple library provides a more semantic version to the code below:

```typescript
const tasks = [];

// Stack promises
tasks.push(() => Promise.resolve("promise1"))
tasks.push(() => Promise.resolve("promise2"))

// Then run the tasks
await Promise.all(tasks.map(task => task()))
```


Using this library, the code above can be written as:
```typescript
import { StackedPromise } from "stack-promise";

const tasks = StackedPromise();

tasks.push(() => Promise.resolve("promise1"))
tasks.push(() => Promise.resolve("promise2"))

// Then run the tasks
await tasks.run()
```

## Installation
```shell
npm i stacked-promise
# or
yarn add stacked-promise
```


## StackPromise Class

| Property/Method | Description                                                             |
|-----------------|-------------------------------------------------------------------------|
 | `stack`         | The array holding the stack of promises                                 |
 | `push()`        | Push a function that returns a promise                                  |
 | `unstack()`     | Unstack promises by running each function                               |
| `run()`         | Run the tasks                                                           |
| `concat()`      | Concatenate two stacks                                                  |
| `some()`        | Run every task but stop when any passes the validation function passed. |
| `every()`       | Run every task but stop when any fails the validation function passed.  |


### push()
Push a function that returns a promise

```typescript
const tasks = StackedPromise();

tasks.push(() => Promise.resolve("promise1"))
tasks.push(() => Promise.resolve("promise2"))

console.log(tasks.stack.length) // 2
```

### unstack()
Unstack promises by running each function

```typescript
const tasks = StackedPromise();

tasks.push(() => Promise.resolve("promise1"))
tasks.push(() => Promise.resolve("promise2"))

tasks.unstack() // [Promise, Promise]
```


### run()
Run the tasks

```typescript
const tasks = StackedPromise();

tasks.push(() => Promise.resolve("promise1"))
tasks.push(() => Promise.resolve("promise2"))


await tasks.run() // ["promise1", "promise2"]
```

### concat()
Concatenate two stacks

```typescript
const tasks = StackedPromise();
tasks.push(() => Promise.resolve("promise1"))

const tasks2 = StackedPromise();
tasks2.push(() => Promise.resolve("promise2"))
tasks2.push(() => Promise.resolve("promise3"))


tasks.concat(tasks2)

console.log(tasks.stack.length) // 3
```

### some()
Run every task but stop when any passes the validation function passed.

```typescript
const tasks = StackedPromise();

tasks.push(() => Promise.resolve(true))
tasks.push(() => Promise.resolve(true))

await tasks.some((result) => result === true) // true
await tasks.some((result) => result === false) // false
```


### every()
Run every task but stop when any fails the validation function passed.

```typescript
const tasks = StackedPromise();

tasks.push(() => Promise.resolve(true))
tasks.push(() => Promise.resolve(true))

await tasks.every((result) => result === true) // true
await tasks.every((result) => result === false) // false
```


