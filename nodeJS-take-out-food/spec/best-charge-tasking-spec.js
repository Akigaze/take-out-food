const loadAllItems=require("../main/items");
const loadPromotions=require("../main/promotions");
const {countItems,addItemDetial,calSubtotal,isBanjiaItem,
  calTotal,getSavedMsgByBanjia,getSavedMsgByManjian,getPromotionMsg}=require("../main/best-charge");

describe('Tasking #1', function () {
  it('transform String Array into Object Array by function countItems', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

    let result = countItems(inputs);

    let expected = [
      {id:'ITEM0001',count:1},
      {id:'ITEM0013',count:2},
      {id:'ITEM0022',count:1}
    ];

    expect(result).toEqual(expected);
  });
});

describe('Tasking #2', function () {
  it('Object Array should add attribute name and price by function addItemDetial', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];

    let items = countItems(inputs);
    addItemDetial(items,loadAllItems());

    let expected = [
      {id:'ITEM0013',count:4,name:'肉夹馍',price:6.00},
      {id:'ITEM0022',count:1,name:'凉皮',price:8.00}
    ];

    expect(items).toEqual(expected);
  });
});

describe('Tasking #3', function () {
  it('get attribute subtotal of each kind of items by function calSubtotal', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

    let items = countItems(inputs);
    addItemDetial(items,loadAllItems());
    calSubtotal(items);

    let expected = [18,12,8];

    for (let i = 0; i < items.length; i++) {
      expect(items[i].subtotal).toEqual(expected[i]);
    }
  });
});

describe('Tasking #4', function () {
  it('#4.1.2.1# is a item in promotion 指定菜品半价 by function isBanjiaItem', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

    let items = countItems(inputs);
    addItemDetial(items,loadAllItems());
    calSubtotal(items);
    const promotionItems=loadPromotions()[1].items;

    let expected = [true,false,true];

    for (let i = 0; i < items.length; i++) {
      let result=isBanjiaItem(items[i],promotionItems);
      expect(result).toEqual(expected[i]);
    }
  });

  it('#4.1.2# saved message in promotion 指定菜品半价 by function getSavedMsgByBanjia', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

    let items = countItems(inputs);
    addItemDetial(items,loadAllItems());
    calSubtotal(items);
    const promotion=loadPromotions()[1];
    let result=getSavedMsgByBanjia(items,promotion);

    let expected = {promotionType:'指定菜品半价(黄焖鸡，凉皮)',saved:13};

    expect(result).toEqual(expected);
  });

  it('#4.1.1# saved message in promotion 满30减6元 by function getSavedMsgByManjian', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];

    let items = countItems(inputs);
    addItemDetial(items,loadAllItems());
    calSubtotal(items);
    const promotion=loadPromotions()[0];
    let result=getSavedMsgByManjian(items,promotion);

    let expected = {promotionType:'满30减6元',saved:6};

    expect(result).toEqual(expected);
  });

  it('#4# promotion message of order should be gotten by function getPromotionMsg', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

    let items = countItems(inputs);
    addItemDetial(items,loadAllItems());
    calSubtotal(items);
    let result=getPromotionMsg(items,loadPromotions());

    let expected = {promotionType:'指定菜品半价(黄焖鸡，凉皮)',saved:13};

    expect(result).toEqual(expected);
  });
});

describe('Tasking #5', function () {
  // it('the total of order get by function calTotal', function() {
  //   let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
  //
  //   let items = countItems(inputs);
  //   addItemDetial(items,loadAllItems());
  //   calSubtotal(items);
  //   let promotionMsg=getPromotionMsg(items,loadPromotions());
  //   let result=calTotal(items,promotionMsg);
  //
  //   let expected = 26;
  //
  //   expect(result).toEqual(expected);
  // });

  it('the total of order must be 24 by function calTotal', function() {
    let inputs = ["ITEM0013 x 4"];

    let items = countItems(inputs);
    addItemDetial(items,loadAllItems());
    calSubtotal(items);
    let promotionMsg=getPromotionMsg(items,loadPromotions());
    let result=calTotal(items,promotionMsg);

    let expected = 24;

    expect(result).toEqual(expected);
  });
});
