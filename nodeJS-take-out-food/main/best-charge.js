const loadAllItems=require("./items");
const loadPromotions=require("./promotions");

function bestCharge(selectedItems) {
  const allItems=loadAllItems();
  const promotions=loadPromotions();

  let idCountList=countItems(selectedItems);
  let detialItems=addItemDetial(idCountList,allItems);
  let items = calSubtotal(detialItems);
  let promotionMsg=getPromotionMsg(items,promotions);
  let total=calTotal(items,promotionMsg);
  let order=generateOrder(items,promotionMsg,total);
  return outputOrder(order);
}
//统计菜品的数量
function countItems(selectedItems){
  let items=selectedItems.map((itemId)=>{
    let [id,count]=itemId.split('x');
    return {
      id: id.trim(),
      count: parseInt(count.trim())
    };
  });

  // for (let itemId of selectedItems) {
  //   let tempArray=itemId.split('x');
  //   let item={
  //     id: tempArray[0].trim(),
  //     count: parseInt(tempArray[1].trim())
  //   }
  //   items.push(item);
  // }

  return items;
}
//添加菜品详情
function addItemDetial(items,allItems) {
  return items.map((selectItem)=>{
    const {id,count}=selectItem;
    let {name,price}=allItems.find( item => id===item.id );
    return {id,name,price,count};
  });

  // for (let selectItem of items) {
  //   selectItem.name=name;
  //   selectItem.price=price;
  // }

  //   for (let item of allItems) {
  //     if (selectItem.id===item.id) {
  //       selectItem.name=item.name;
  //       selectItem.price=item.price;
  //       break;
  //     }
  //   }
  // }
}
//计算商品小计
function calSubtotal(items) {
  return items.map((item)=>{
    const {id,name,price,count}=item;
    const subtotal=count*price;
    return {id,name,price,count,subtotal};
  });
  // items.forEach((item)=>{
  //   item.subtotal=item.count*item.price;
  // });
}
//计算优惠金额
function getPromotionMsg(items,promotions) {
  let SavedMsgList=getSavedMsgList(items,promotions);
  let promotionMsg=selectTheBestPromotion(SavedMsgList);
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
  let savedMsgList=promotions.map( promotion => getSavedMsg(items,promotion) );
  // for (let promotion of promotions) {
  //   let savedMsg=getSavedMsg(items,promotion)
  //   savedMsgList.push(savedMsg);
  // }

  return savedMsgList;
}
//计算满减的优惠金额
function getSavedMsgByManjian(items,promotion) {
  let promotionType=promotion.type;
  let total=items.reduce((total,cur)=> total+cur.subtotal ,0);
  let saved=(total>=30?6:0);
  // for (let item of items) {
  //   total+=item.subtotal;
  // }

  let savedMsg={
    promotionType,
    saved
  };

  return savedMsg;
}
//计算半价商品的优惠金额
function getSavedMsgByBanjia(items,promotion) {
  let promotionType=promotion.type;
  //let banjiaItems=[];
  let temp="(";
  let saved=0;
  for (let item of items) {
    if (isBanjiaItem(item,promotion.items)) {
      //banjiaItems.push(item.name);
      temp+=(item.name+"，");
      saved+=item.subtotal/2;
    }
  }
  //promotionType+=temp.substring(0,temp.length-1)+")";
  //promotionType+="("+banjiaItems.join("，")+")";
  promotionType+=temp.replace(/，$/g,")");
  let savedMsg={
    promotionType,
    saved
  };

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
//  Math.max()
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

  return total;
}
//封装订单对象
function generateOrder(items,promotionMsg,total) {
  let order={
    items,
    promotionMsg,
    total
  };

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

  return orderString;
}
module.exports={bestCharge,countItems,addItemDetial,calSubtotal,isBanjiaItem,
  calTotal,getSavedMsgByBanjia,getSavedMsgByManjian,getPromotionMsg};
