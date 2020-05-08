const Queue = require('./queue');

test('it should be a FIFO queue', () => {
    const queue = new Queue();
    const users = ['Alice', 'Bob', 'Carol'];

    users.forEach(user => queue.push(user));
    expect(queue.pop()).toBe('Alice');
    expect(queue.pop()).toBe('Bob');
    expect(queue.pop()).toBe('Carol');
});
