export type FnReturnsPromise<T = any> = () => Promise<T>;

class StackPromise<T = any> {
    /**
     * Stack Array
     */
    stack: FnReturnsPromise<T>[] = [];
    
    constructor(stacks: FnReturnsPromise<T>[] = []) {
        if(stacks && stacks.length > 0) {
            this.stack = stacks;
        }
    }

    /**
     * Push a new promise to the stack
     * @param fn
     */
    push(fn: FnReturnsPromise<T>) {
        this.stack.push(fn);
        return this;
    }

    /**
     * Unstack the stack
     */
    unstack() {
        return this.stack.map((fn) => fn());
    }

    /**
     * Run the stack and return the result
     */
    async run() {
        return Promise.all(this.unstack());
    }

    /**
     * Concat the stack with another stack
     */
    concat(stack: StackPromise<T>) {
        this.stack = this.stack.concat(stack.stack);
        return this;
    }


    /**
     * Some - Run the stack and return true if one of the passes the validation
     * @param validate
     */
    some(validate: (value: T) => boolean) {
        return SomePromise<T>(this.stack, validate);
    }

    /**
     * Every - Run the stack and return true if all the passes the validation
     */
    every(validate: (value: T) => boolean) {
        return EveryPromise<T>(this.stack, validate);
    }
}

/**
 * Create a new stack
 * @constructor
 */
export function StackedPromise<T = any>(stacks: FnReturnsPromise<T>[] = []) {
    return new StackPromise<T>(stacks);
}


/**
 * SomePromise - Run the stack and return true if one of the passes the validation
 * @param promises
 * @param validate
 * @constructor
 */
function SomePromise<T>(
    promises: (() => Promise<T>)[],
    validate: (value: T) => boolean
): Promise<boolean> {
    return new Promise(async (resolve) => {
        // run each promise
        // Stop when validate returns true
        for (const promise of promises) {
            const result = await promise();

            if (validate(result)) {
                resolve(true);
                return;
            }
        }

        resolve(false);
    });
}

/**
 * EveryPromise - Run the stack and return true if all the passes the validation
 * @param promises
 * @param validate
 * @constructor
 */
function EveryPromise<T>(
    promises: (() => Promise<T>)[],
    validate: (value: T) => boolean
): Promise<boolean> {
    return new Promise(async (resolve) => {
        // run each promise
        // stop when validate returns false
        for (const promise of promises) {
            const result = await promise();

            if (!validate(result)) {
                resolve(false);
                return;
            }
        }

        resolve(true);
    });
}


export default StackPromise;
