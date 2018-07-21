module.exports = class Cart{
    constructor(input){
        this.count = 1;
        this.barcode = input;
    }

    static initCartItems(inputs){
        let cartIntems = [];

        for(let i = 0; i < inputs.length; i++){
            let markAddItems = 0;
            for(let j = 0; j < cartIntems.length; j++){
                if(inputs[i] === cartIntems[j].barcode){
                    cartIntems[j].count++;
                    markAddItems++;
                }
            }
            if(markAddItems === 0){
                cartIntems.push(new Cart(inputs[i]));
                if(inputs[i].length > 10){
                    let addCount = inputs[i].split('-');
                    cartIntems[cartIntems.length - 1].count 
                    += parseInt(addCount[1]) - 1;
                }
            }
        }

        return cartIntems;
    }
}