const { expect } = require('@jest/globals');
const {operation, multiplication} = require('./simple');

test('rly difficult test', () => {
    expect(true).toBe(true);
});

test('INSANE TEST', () => {
    expect(true).toBe(true);
});

test('adds 1 + 2 to equal 3', () => {
  expect(operation(1, 2)).toBe(3);
});

test('multiplication', () => {
    expect(multiplication(2, 2)).toBe(4);
});
