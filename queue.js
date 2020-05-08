class Queue {
    constructor() {
        this.queue = [];
    }

    addToEnd(user) {
        this.queue.push(user);
    }

    removeFromFront() {
        return this.queue.shift();
    }

    position(user) {
        return this.queue.indexOf(user);
    }
}

module.exports = Queue;
