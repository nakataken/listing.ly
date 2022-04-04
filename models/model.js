const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String
})
const Item = mongoose.model('Item', itemSchema);

const listSchema = {
    name: String,
    items: [itemSchema]
}
const List = mongoose.model('List', listSchema);

const item1 = new Item({name: "Welcome to your todolist!"})
const item2 = new Item({name: "Hit the + button to add a new item."})
const item3 = new Item({name: "<-- Hit this to delete an item."})
const defaultItems = [item1, item2, item3];

module.exports = {
    Item, List, defaultItems
}
