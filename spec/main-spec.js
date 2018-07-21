const printInventory = require('../main/main');
const datbase = require('../main/datbase');
const Item = require('../main/item');
const Cart = require('../main/cart');
const Pos = require('../main/pos');

describe('pos', function () {
    var inputs;

    beforeEach(function () {
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];

        itemInfo = Item.initAllData(datbase.loadAllItems());

    });

    it('should get items information', function () {
        let expected = "雪碧";
        expect(itemInfo[1].name).toBe(expected);
    });

    it('should get items discount information', function () {
        let expected = 1;
        Item.loadAllDiscountItems(itemInfo, datbase.loadPromotions());

        expect(itemInfo[0].discount).toBe(expected);
    });

    it('should get cart items', function () {
        Item.loadAllDiscountItems(itemInfo, datbase.loadPromotions());
        let result = Cart.initCartItems(inputs, itemInfo);

        expect(result[0].count).toBe(5);
        expect(result[0].name).toBe("雪碧");
        expect(result[0].price).toBe(3);
        expect(result[0].discount).toBe(1);
        expect(result[1].count).toBe(2);
        expect(result[1].discount).toBe(-1);
        expect(result[2].count).toBe(3);
    });

    it('should get every items price', function () {
        Item.loadAllDiscountItems(itemInfo, datbase.loadPromotions());
        let cartInfo = Cart.initCartItems(inputs, itemInfo);
        let result = Pos.calEveryItemmoney(cartInfo);
        
        expect(result[0].sumMoney).toBe(12);
    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});
