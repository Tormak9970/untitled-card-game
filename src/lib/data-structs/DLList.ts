export class DLNode<T> {
  data:T;
  prev:DLNode<T>;
  next:DLNode<T>;

  constructor(data:T, prev?:DLNode<T>, next?:DLNode<T>) {
    this.data = data;
    this.prev = prev ? prev : null;
    this.next = next ? next : null;
  }
}

export class DLList<T> {
  size:number;
  first:DLNode<T>;
  last:DLNode<T>;

  constructor() {
    this.size = 0;
    this.first = new DLNode(null);
    this.last = new DLNode(null);
    this.first.next = this.last;
    this.last.prev = this.first;
  }

  get(idx:number): DLNode<T> {
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

  add(data:T, idx?:number) {
    if (!idx) {
      const newNode = new DLNode(data, this.last.prev, this.last);
      this.last.prev.next = newNode;
      this.last.prev = newNode;
    } else {
      const target = this.get(idx);
      const newNode = new DLNode(data, target.prev, target);
      target.prev.next = newNode;
      target.prev = newNode;
    }
    this.size++;
  }

  remove(idx:number): DLNode<T> {
    const target = this.get(idx);

    target.prev.next = target.next;
    target.next.prev = target.prev;
    this.size--;

    return target;
  }
}