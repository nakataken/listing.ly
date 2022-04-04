const {Item, List, defaultItems} = require('../models/model')
const _ = require('lodash');

const index_get = (req, res) => {
    Item.find({}, (err, foundItems) => {
        if(err) {
            console.log(err);
        } else {
            if(foundItems.length === 0) {
                Item.insertMany(defaultItems, (err) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Successfully inserted default items.");
                    }
                    res.redirect('/')
                });
            } else {
                res.render('list', {listTitle: "listing.ly", newListItems: foundItems});
            }
        }
    })
}

const index_post = (req, res) => {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({name:itemName});

    if(listName === "listing.ly") {
        item.save();
        res.redirect('/');
    } else {
        List.findOne({name:listName}, (err, foundList) => {
            if(err) {
                console.log(err);
            } else {
                if(foundList) {
                    foundList.items.push(item);
                    foundList.save();
                    res.redirect('/' + listName);
                } 
            }
        });
    }
}

const about_get = (req, res) => {
    res.render('about');
}

const customListName_get = (req, res) => {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name:customListName}, (err, foundList) => {
        if(err) {
            console.log(err);
        } else {
            if(foundList) {
                res.render('list', {listTitle:customListName, newListItems:foundList.items});
            } else {
                const list = new List({
                    name: customListName,
                    items: defaultItems
                })
                list.save();
                res.redirect('/' + customListName);
            }
        }
    })
}

const delete_post = (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = listName;

    if(listName === "listing.ly") {
        Item.findByIdAndRemove({_id:checkedItemId}, (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log("Successfully deleted the item.");
            }
            res.redirect('/')
        })
    } else {
        List.findOneAndUpdate({_id:checkedItemId}, 
        ({$pull: {item: {_id:checkedItemId}}}),
        (err, foundList) => {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/' + listName)
            }
        })
    }
}

module.exports = {
    index_get, index_post, about_get, customListName_get, delete_post
}
