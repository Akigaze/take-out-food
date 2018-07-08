function bestCharge(selectedItems) {
  const allItems=loadAllItems();
  const promotions=loadPromotions();

  let items=countItems(selectedItems);
  addItemDetial(items,allItems);
  calSubtotal(items);
  let promotionMsg=getPromotionMsg(items,promotions);
  let total=calTotal(items,promotionMsg);
  let order=generateOrder(items,promotionMsg,total);
  return outputOrder(order);
}
//统计菜品的数量
function countItems(selectedItems){
  let items=selectedItems.map((itemId)=>{
    let temp=itemId.split('x');
    return {
      id: temp[0].trim(),
      count: parseInt(temp[1].trim())
    }
  });

  // for (let itemId of selectedItems) {
  //   let tempArray=itemId.split('x');
  //   let item={
  //     id: tempArray[0].trim(),
  //     count: parseInt(tempArray[1].trim())
  //   }
  //   items.push(item);
  // }

  console.info(items);
  return items;
}
//添加菜品详情
function addItemDetial(items,allItems) {
  for (let selectItem of items) {
    let {name,price}=allItems.find((item)=>{
      return selectItem.id===item.id;
    });
    selectItem.name=name;
    selectItem.price=price;
  }

  //   for (let item of allItems) {
  //     if (selectItem.id===item.id) {
  //       selectItem.name=item.name;
  //       selectItem.price=item.price;
  //       break;
  //     }
  //   }
  // }

  console.info(items);
}
//计算商品小计
function calSubtotal(items) {
  items.forEach((item)=>{
    item.subtotal=item.count*item.price;
  });
  console.info(items);
}
//计算优惠金额
function getPromotionMsg(items,promotions) {
  let SavedMsgList=getSavedMsgList(items,promotions);
  let promotionMsg=selectTheBestPromotion(SavedMsgList);
  console.info(promotionMsg);
  return promotionMsg;
}
//计算一种优惠方式的优惠金额
function getSavedMsg(items,promotion) {
  let savedMsg=null;
  switch (promotion.type) {
    case "满30减6元":
      savedMsg=getSavedMsgByManjian(items,promotion);
      break;
    case "指定菜品半价":
      savedMsg=getSavedMsgByBanjia(items,promotion)
      break;
  }
  return savedMsg;
}
//计算每种优惠方式的优惠金额
function getSavedMsgList(items,promotions) {
  let savedMsgList=promotions.map((promotion)=>{
    return getSavedMsg(items,promotion);
  });

  // for (let promotion of promotions) {
  //   let savedMsg=getSavedMsg(items,promotion)
  //   savedMsgList.push(savedMsg);
  // }
  console.info(savedMsgList);
  return savedMsgList;
}
//计算满减的优惠金额
function getSavedMsgByManjian(items,promotion) {
  let promotionType=promotion.type;
  let total=items.reduce((prev,cur)=>{
    return prev.subtotal+cur.subtotal;
  });
  let saved=(total>=30?6:0);

  // for (let item of items) {
  //   total+=item.subtotal;
  // }

  let savedMsg={
    promotionType,
    saved
  };
  console.info(savedMsg);
  return savedMsg;
}
//计算半价商品的优惠金额
function getSavedMsgByBanjia(items,promotion) {
  let promotionType=promotion.type;
  let temp="("
  let saved=0;
  for (let item of items) {
    if (isBanjiaItem(item,promotion.items)) {
      temp+=(item.name+"，");
      saved+=item.subtotal/2;
    }
  }
  //promotionType+=temp.substring(0,temp.length-1)+")";

  promotionType+=temp.replace(/，$/g,")");
  let savedMsg={
    promotionType,
    saved
  };
  console.info(savedMsg);
  return savedMsg;
}
//判断是否是半价商品
function isBanjiaItem(item,promotionItems) {

  let banjia = promotionItems.some((id)=>{
    return item.id===id;
  });

  // for (let promotionItem of promotionItems) {
  //   if (item.id===promotionItem) {
  //     banjia=true;
  //     break;
  //   }
  // }

  console.info(banjia);
  return banjia;
}
//选出最优的优惠
function selectTheBestPromotion(savedMsgList) {
  let promotionMsg=null;
  let bestSaved=0;
  savedMsgList.forEach((savedMsg)=>{
    if(savedMsg.saved>bestSaved){
      bestSaved=savedMsg.saved;
      promotionMsg=savedMsg;
    }
  });

  // savedMsgList.sort((e1,e2)=>{
  //   return e2.saved-e1.saved;
  // });
  // let promotionMsg=savedMsgList[0].saved===0?null:savedMsgList[0];

  return promotionMsg;
}
//计算订单总价
function calTotal(items,promotionMsg) {
  let total=0;
  items.forEach((item)=>{
    total+=item.subtotal;
  });
  if (promotionMsg!==null) {
    total-=promotionMsg.saved;
  }
  console.info(total);
  return total;
}
//封装订单对象
function generateOrder(items,promotionMsg,total) {
  let order={
    items,
    promotionMsg,
    total
  };
  console.info(order);
  return order;
}
//输出订单
function outputOrder(order) {
  let orderString="============= 订餐明细 =============\n";
  order.items.forEach((item)=>{
    orderString+=item.name+" x "+item.count+" = "+item.subtotal+"元\n";
  });
  orderString+="-----------------------------------\n";
  if (order.promotionMsg!==null) {
    orderString+="使用优惠:\n";
    orderString+=order.promotionMsg.promotionType+"，省"+order.promotionMsg.saved+"元\n";
    orderString+="-----------------------------------\n";
  }
  orderString+="总计："+order.total+"元\n";
  orderString+="===================================";
  console.info(orderString)
  return orderString;
}
