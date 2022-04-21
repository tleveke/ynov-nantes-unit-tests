const { expect } = require('@jest/globals');
const {octogone} = require('./tools');

test('octogone', () => {
    expect(octogone('abc', 'def')).toBe('abc');
});
