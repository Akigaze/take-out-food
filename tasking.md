#1 统计菜品的数量 countItems  
input:  
    selectedItems: [String]  
output:  
    items: [{  
      id: String
      count: Number  
    }]  
#2 添加菜品详情 addItemDetial  
input:  
    items  
    allItems: ... : loadAllItems()  
output:  
    items: [{  
      id: String,  
      count: Number
      name: String
      price:Number  
    }]  
#3 计算商品小计 calSubtotal  
input:
    items
output:
    items: [{
      id: String
      count: Number
      name: String
      price:Number
      subtotal: Number
    }]
#4 生成订单的优惠信息 getPromotionMsg
input:
    items
    promotions: ... : loadPromotions()
output:
    promotionMsg: {
      promotionType: String
      saved: Number
    }
>
#4.1 计算每种优惠方式的优惠金额 getSaveDMsgList
input:
    items
    promotions
output:
    savedMsgList: [{
      promotionType: String
      saved: Number
    }]
> >
#4.1.1 计算满减的优惠金额 getSavedMsgByManjian
input:
    items
    promotion of promotions: {
      promotionType: String
    }
output:
    savedMsg: {
      promotionType: String
      saved: Number
    }
#4.1.2 计算半价商品的优惠金额 getSavedMsgByBanjia
input:
    items
    promotion of promotions: {
      type: String
      items: [String]
    }
output:
    savedMsg: {
      promotionType: String
      saved: Number
    }
>>>
#4.1.2.1 判断是否是半价商品 isBanjiaItem
input:
    item of items:
    promotionItems: ... : items of promotion: [String]
output:
    banjia: Boolean
>
#4.2 选出最优的优惠 selectTheBestPromotion
input:
    savedMsgList
output:
    promotionMsg

#5 计算订单总价 calTotal
input:
    items
    promotionMsg
output:
    total: Number
#5.5 封装订单对象 generateOrder
input:
    items
    promotionMsg
    total
output:
    order: {
      items
      promotionMsg
      total
    }
#6 输出订单内容 outputOrder
input:
    order
output:
    orderString: String
