module.exports = class Item{
    constructor(allItems){
        this.barcode = allItems["barcode"];
        this.name = allItems["name"];
        this.unit = allItems["unit"];
        this.price = allItems["price"];
        this.discount = -1;
    }

    addDiscountItems(discount){
        let discountItem = discount[0]["barcodes"];
        if(discountItem.indexOf(this.barcode) != -1){
            this.discount = 1;
        }
    }
}