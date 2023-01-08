export class LinkedNode<T> {
  data:T;
  next:LinkedNode<T>;

  constructor(data:T, next?:LinkedNode<T>) {
    this.data = data;
    this.next = next ? next : null;
  }

  static fromJSON<T>(json:any): LinkedNode<T> {
    return new LinkedNode<T>(json.data, json.next ? LinkedNode.fromJSON<T>(json.next) : null);
  }
}

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