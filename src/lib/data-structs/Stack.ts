/**
 * A generic stack data structure
 * @param T The type of the stack
 */
export class Stack<T> {
  private stack:T[] = [];

  constructor(values?:T[]) {
    if (values) this.stack = values;
  }

  get(idx:number) { return this.stack[idx]; }

  size() { return this.stack.length; }

  push(obj:T) { this.stack.push(obj); }

  peek() { return this.stack[this.stack.length-1]; }

  isEmpty() { return this.stack.length == 0; }

  pop() { return this.stack.pop(); }

  toArray(): T[] {
    return JSON.parse(JSON.stringify(this.stack));
  }
}