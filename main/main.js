const datbase = require('./datbase');
const Item = require('./item');
const Cart = require('./cart');
const Pos = require('./pos')

module.exports = function printInventory(inputs) {
    let itemsInfo = Item.initAllData(datbase.loadAllItems());
    Item.loadAllDiscountItems(itemsInfo, datbase.loadPromotions());
    let cartInfo = Cart.initCartItems(inputs, itemsInfo);
    let shopping = Pos.calEveryItemmoney(cartInfo);
    Pos.printList(shopping);
};