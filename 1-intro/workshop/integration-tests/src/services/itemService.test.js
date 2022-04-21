const { it } = require('@jest/globals');
const mongoose = require('mongoose');
const Item = require('../models/Item.js')
const { createItem, listItems } = require('./itemService.js');

mongoose.connect('mongodb://mongo:27017/docker-node-mongo-test', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

beforeAll(async () => {
    await Item.deleteMany();
});
afterEach(async () => {
    await Item.deleteMany();
});
beforeEach(async () => {
    await Item.deleteMany();
});

test('should create an item', async () => {
    const item = new Item({
        name: 'My Item'
    });
    let newItem = await createItem(item);
    const itemFind = await Item.findOne({ name: 'My Item' });

    expect(newItem.name).toBe(itemFind.name);
});

test('list all items', async () => { 
    const item = new Item({
        name: 'My Item'
    });
    const item2 = new Item({
        name: 'My Item2'
    });
    const item3 = new Item({
        name: 'My Item3'
    });
    await createItem(item);
    await createItem(item2);
    await createItem(item3);

    const items = await listItems();

    expect(items.length).toBe(3);
});

test('should error if no name provided', async () => {
    const item = new Item({
        
    });
    try {
        await createItem(item);
    } catch (err) {
        expect(err.message).toBe('No name provided in the body');
    }
});