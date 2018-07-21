module.exports = class Cart {
    constructor(input) {
        this.count = 1;
        this.barcode = input;
        this.name = "";
        this.unit = "";
        this.price = 0;
        this.discount = -1;
    }

    static initCartItems(inputs, itemsInfo) {
        let cartIntems = [];

        for (let i = 0; i < inputs.length; i++) {
            let markAddItems = 0;
            for (let j = 0; j < cartIntems.length; j++) {
                if (inputs[i] === cartIntems[j].barcode) {
                    cartIntems[j].count++;
                    markAddItems++;
                }
            }
            if (markAddItems === 0) {
                Cart.addNewItem(cartIntems, inputs[i], itemsInfo);
            }
        }
        return cartIntems;
    }

    static addNewItem(cartIntems, input, itemsInfo) {
        cartIntems.push(new Cart(input));
        if (input.length > 10) {
            let nameAndCount = input.split('-');
            cartIntems[cartIntems.length - 1].count
                += parseInt(nameAndCount[1]) - 1;
            input = nameAndCount[0];
        }
        itemsInfo.forEach(element => {
            if (element.barcode === input) {
                cartIntems[cartIntems.length - 1].name = element.name;
                cartIntems[cartIntems.length - 1].price = element.price;
                cartIntems[cartIntems.length - 1].discount = element.discount;
                cartIntems[cartIntems.length - 1].unit = element.unit;
            }
        });
    }
}