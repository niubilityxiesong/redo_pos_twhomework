const datbase = require('./datbase');
const Item = require('./item');

module.exports = function printInventory(inputs) {
    let itemInfo = Item.initAllData(datbase.loadAllItems());
    Item.loadAllDiscountItems(itemInfo, datbase.loadPromotions());



};