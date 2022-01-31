export type StackedPromise<T = any> = () => Promise<T>;

class StackPromise<T = any> {
    /**
     * Stack Array
     */
    stack: Array<StackedPromise<T>> = [];

    /**
     * Push a new promise to the stack
     * @param fn
     */
    push(fn: StackedPromise<T>) {
        this.stack.push(fn);
    }

    /**
     * Run the stack
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
}

export function StackedPromise<T = any>() {
    return new StackPromise<T>();
}

export default StackPromise;
