const datbase = require('./datbase');
const Item = require('./item');

module.exports = function printInventory(inputs) {
    let ItemInfo = [];
    
    datbase.loadAllItems().forEach(elm => {
        ItemInfo.push(new Item(elm));
    });
    ItemInfo.forEach(elm => {
        elm.addDiscountItems(datbase.loadPromotions());
    });

    
};