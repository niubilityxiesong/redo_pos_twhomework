module.exports = class Item{
    constructor(allItems){
        this.barcode = allItems["barcode"];
        this.name = allItems["name"];
        this.unit = allItems["unit"];
        this.price = allItems["price"];
        this.discount = -1;
    }

    static initAllData(loadAllItems){
        let itemInfo = [];

        loadAllItems.forEach(elm => {
            itemInfo.push(new Item(elm));
        });
        return itemInfo;
    }

    static loadAllDiscountItems(itemInfo, discount){
        let discountItem = discount[0]["barcodes"];
        itemInfo.forEach(elm => {
            if(discountItem.indexOf(elm.barcode) != -1){
                elm.discount = 1;
            }
        });
    }
}