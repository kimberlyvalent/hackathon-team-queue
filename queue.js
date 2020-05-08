// TODO: This should become a QueueClient
class Queue {
    constructor() {
        this.queue = [];
    }

    push(user) {
        this.queue.unshift(user);
    }

    pop() {
        return this.queue.pop();
    }
}

module.exports = Queue;
