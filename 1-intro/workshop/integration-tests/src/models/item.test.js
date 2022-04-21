const { it } = require('@jest/globals');
const Item = require('./Item.js');
const mongoose = require('mongoose');

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

test('should create an item', () => {
    const item = new Item({
        name: 'My Item'
    });
    expect(item.name).toBe('My Item');
});

test('should save an item', async () => {
    const item = new Item({
        name: 'My Item'
    });
    await item.save();

    const NewItem = await Item.findOne({ name: 'My Item' });
    expect(item.name).toBe(NewItem.name);
});

test('should find all items', async () => {
    const item = new Item({
        name: 'My Item'
    });
    await item.save();

    const items = await Item.find({});
    expect(items.length).toBe(1);
});

test('should delete an item', async () => {

    const item = new Item({
        name: 'My Item'
    });
    await item.save();

    await Item.deleteOne({ name: 'My Item' });
    const items = await Item.find({});
    expect(items.length).toBe(0);
});

test('should update an item', async () => {
    const item = new Item({
        name: 'My Item'
    });
    await item.save();

    await Item.updateOne({ name: 'My Item' }, { name: 'My Item Updated' });
    const items = await Item.find({});
    expect(items[0].name).toBe('My Item Updated');
});

test('should find an item', async () => {
    const item = new Item({
        name: 'My Item'
    });
    await item.save();

    const items = await Item.find({ name: 'My Item' });
    expect(items[0].name).toBe('My Item');
});

