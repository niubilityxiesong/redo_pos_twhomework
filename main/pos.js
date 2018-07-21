const Cart = require("./cart");

module.exports = class Pos{
    constructor(cartInfo){
        this.name = cartInfo.name;
        this.unit = cartInfo.unit;
        this.price = cartInfo.price;
        this.count = cartInfo.count;
        this.sumMoney = 0;
        this.discountNum = 0;
        this.economy = 0;
    }

    static calEveryItemmoney(cartInfo){
        let EveryItemmoney = [];
        for(let i = 0; i < cartInfo.length; i++){
            EveryItemmoney.push(new Pos(cartInfo[i]));
            if(cartInfo[i].discount === -1){
                EveryItemmoney[EveryItemmoney.length - 1].sumMoney
                = cartInfo[i].price * cartInfo[i].count; 
            }
            else{
                let judgeDiscount = Math.floor(cartInfo[i].count / 3);
                EveryItemmoney[EveryItemmoney.length - 1].sumMoney
                = cartInfo[i].price * (cartInfo[i].count - judgeDiscount); 
                EveryItemmoney[EveryItemmoney.length - 1].discountNum += judgeDiscount;
                EveryItemmoney[EveryItemmoney.length - 1].economy 
                = cartInfo[i].price * judgeDiscount;
            }
        }

        return EveryItemmoney;
    }
    
    static printList(shopping){
        let resultList = "";
        let gift = "";
        let sumMoney = 0;
        let sumEcnomy = 0;
        resultList += '***<没钱赚商店>购物清单***\n';
        for(let i = 0; i < shopping.length; i++){
            resultList += '名称：'+ shopping[i].name + '，数量：'+ shopping[i].count;
            resultList += shopping[i].unit + '，单价：' + shopping[i].price.toFixed(2) + '(元)，小计：' + shopping[i].sumMoney.toFixed(2) + '(元)\n';
            if(shopping[i].discountNum != 0){
                gift += '名称：' + shopping[i].name + '，数量：' + shopping[i].discountNum + shopping[i].unit + '\n';
                sumEcnomy += shopping[i].economy;
            }
            sumMoney += shopping[i].sumMoney;
        }
        resultList += '----------------------\n';
        resultList += '挥泪赠送商品：\n';
        resultList += gift;
        resultList += '----------------------\n'
        resultList += '总计：' + sumMoney.toFixed(2) + '(元)\n';
        resultList += '节省：' + sumEcnomy.toFixed(2) + '(元)\n';
        resultList += '**********************';
        

        console.log(resultList);
    }
    
}