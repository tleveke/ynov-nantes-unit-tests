const { it } = require('@jest/globals');
const Item = require('./Item.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/docker-node-mongo-test', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


it('should create an item', () => {
    const item = new Item({
        name: 'My Item'
    });
    expect(item.name).toBe('My Item');
});

it('should save an item', async () => {
    const item = new Item({
        name: 'My Item'
    });
    await item.save();

    const NewItem = await Item.findOne({ name: 'My Item' });
    expect(item.name).toBe(NewItem.name);
});
