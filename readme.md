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
import { StackedPromise } from "./index"; 

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

| Property/Method | Description                               |
|-----------------|-------------------------------------------|
 | `stack`         | The array holding the stack of promises   |
 | `push()`        | Push a function that returns a promise    |
 | `unstack()`     | Unstack promises by running each function |
| `run()`         | Run the tasks                             |
| `concat()`      | Concatenate two stacks                    |



