/**
 * Untitled Card Game is a solitaire game made with TypeScript and Svelte.
 * Copyright (C) 2023 Travis Lane (Tormak)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>
 */

/**
 * A generic stack data structure.
 * @param T The type of the stack.
 */
export class Stack<T> {
  private stack:T[] = [];

  constructor(values?:T[]) {
    if (values) this.stack = values;
  }

  /**
   * Gets the value at the provided index.
   * @param idx The target index.
   * @returns The entry at the index.
   */
  get(idx:number): T { return this.stack[idx]; }

  /**
   * Gets the size of the stack.
   * @returns The size of the stack.
   */
  size(): number { return this.stack.length; }

  /**
   * Adds an object to the top of the stack.
   * @param obj The object to add.
   */
  push(obj:T): void { this.stack.push(obj); }

  /**
   * Gets the top value in the stack.
   * @returns The top value in the stack.
   */
  peek(): T { return this.stack[this.stack.length-1]; }

  /**
   * Checks if the stack is empty.
   * @returns True if the stack is empty.
   */
  isEmpty(): boolean { return this.stack.length == 0; }

  /**
   * Removeds and returns the top element in the stack.
   * @returns The removed element.
   */
  pop(): T { return this.stack.pop(); }

  /**
   * Gets the array representation of this stack.
   * @returns The array representation of this stack.
   */
  toArray(): T[] {
    return JSON.parse(JSON.stringify(this.stack));
  }
}