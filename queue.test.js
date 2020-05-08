const Queue = require('./queue');

test('it should be a FIFO queue', () => {
    const queue = new Queue();
    const users = [
        'Alice',
        'Bob',
        'Carol'
    ];

    users.forEach(user => queue.addToEnd(user));

    expect(queue.position('Alice')).toBe(0);
    expect(queue.position('Bob')).toBe(1);
    expect(queue.position('Carol')).toBe(2);

    expect(queue.removeFromFront()).toBe('Alice');
    expect(queue.removeFromFront()).toBe('Bob');
    expect(queue.removeFromFront()).toBe('Carol');
});
