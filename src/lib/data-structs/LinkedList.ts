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
 * Represents a node in a LinkedList.
 * @param T The type of this node.
 */
export class LinkedNode<T> {
  data:T;
  next:LinkedNode<T>;

  constructor(data:T, next?:LinkedNode<T>) {
    this.data = data;
    this.next = next ? next : null;
  }

  /**
   * Creates a LinkedNode instance from the provided json data.
   * @param json The json object.
   * @returns A new LinkedNode of type T.
   */
  static fromJSON<T>(json:any): LinkedNode<T> {
    return new LinkedNode<T>(json.data, json.next ? LinkedNode.fromJSON<T>(json.next) : null);
  }
}

/**
 * A generic linked list data structure.
 * @param T the type of the list.
 */
export class LinkedList<T> {
  size:number;
  first:LinkedNode<T>;

  constructor(first:LinkedNode<T> = null) {
    this.size = 0;
    this.first = first;
    this.calcSize();
  }

  private isLinkedNode(data: T | LinkedNode<T>): data is LinkedNode<T> {
    const test = (data as LinkedNode<T>);
    return test.next !== undefined && test.data !== undefined;
  }

  private calcSize() {
    this.size = 0;
    let cNode = this.first;
    while(cNode != null) {
      this.size++;
      cNode = cNode.next;
    }
  }

  /**
   * Gets the node at the provided index.
   * @param idx The target index.
   * @returns The node at the desired index.
   */
  get(idx:number): LinkedNode<T> {
    if (idx < this.size) {
      let cNode = this.first;
      let i = 0;

      while (cNode.next != null && i < idx) {
        cNode = cNode.next;
        i++;
      }

      return cNode;
    } else {
      throw new Error("Index out of bounds of DLList!");
    }
  }

  /**
   * Adds a node to the chain at the provided index, or to the end if none is specified.
   * @param data The data to add.
   * @param idx The target index.
   */
  add(data:T|LinkedNode<T>, idx?:number) {
    const newNode = this.isLinkedNode(data) ? data : new LinkedNode(data, null);
    if (this.size > 0) {
      const target = this.get(idx ? idx : this.size-1);

      target.next = newNode;
    } else if (!idx || idx < this.size) {
      this.first = newNode;
    }

    this.calcSize();
  }

  /**
   * Removed the node at the provided index.
   * @param idx The target index.
   * @returns The removed node
   */
  remove(idx:number): T {
    let ret:T;

    if (idx == 0) {
      ret = this.first.data;
      this.first = this.first.next;
    } else {
      const target = this.get(idx-1);
      ret = target.next.data;

      target.next = target.next.next;
    }
    this.size--;

    return ret;
  }

  /**
   * Removed the node at the provided index, and all after it.
   * @param idx The target index.
   * @returns The removed nodes.
   */
  removeAllAfter(idx:number): LinkedNode<T> {
    let ret:LinkedNode<T>;

    if (idx == 0) {
      ret = this.first;
      this.first = null;
    } else {
      const target = this.get(idx-1);
      ret = target.next;

      target.next = null;
    }
    this.size = idx;

    return ret;
  }
}