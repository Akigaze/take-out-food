function bestCharge(selectedItems) {
  const allItems=loadAllItems();
  const promotions=loadPromotions();

  let items=countItems(selectedItems);




}
//统计菜品的数量
function countItems(selectedItems){
  let items=[];
  for (let itemId of selectedItems) {
    let tempArray=itemId.split('x');
    let item={
      id: tempArray[0].trim(),
      count: parseInt(tempArray[1].trim())
    }
    items.push(item);
  }
  console.info(items);
  return items;
}
//添加菜品详情
function addItemDetial(items,allItems) {

}
//计算商品小计
function calSubtotal(items) {

}
//计算优惠金额
function getPromotionMsg(items,promotions) {

  return promotionMsg;
}
//计算每种优惠方式的优惠金额
function getPromotionMsgList(items,promotions) {

  return promotionMsgList;
}
//计算满减的优惠金额
function getSavedMsgByManjian(items,promotion) {

  return savedMsg;
}
//计算半价商品的优惠金额
function getSavedMsgByBanjia(items,promotion) {

  return savedMsg;
}
//判断是否是半价商品
function isBanjiaItem(item,promotionItems) {

  return banjia;
}
//选出最优的优惠
function selectTheBestPromotion(promotionMsgList) {

  return promotionMsg;
}
//计算订单总价
function calTotal(items,promotionMsg) {

  return total;
}
//封装订单对象
function generateOrder(items,promotionMsg,total) {

  return order;
}
//输出订单
function outputOrder(order) {

  console.log(orderString);
}
