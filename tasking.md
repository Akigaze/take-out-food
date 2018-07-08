#1 统计菜品的数量 countItems
input:
    selectedItems: [String]
output:
    items: [{
      id: String,
      count: Number
    }]
#2 添加菜品详情 addItemDetial
input:
    items
    allItems: ... : loadAllItems()
output:
    items: [{
      id: String,
      count: Number,
      name: String,
      price:Number
    }]
#3 计算商品小计 calSubtotal
input:
    items
output:
    items: [{
      id: String,
      count: Number,
      name: String,
      price:Number，
      subtotal: Number
    }]
#4 计算优惠金额 getPromotionDetial
input:
    items
    promotions: ... : loadPromotions()
output:
    promotionDetail: {
      type: String
      saved: Number
    }
>
#4.1 计算每种优惠方式的优惠金额 getPromotionDetailList
input:
    items
    promotions
output:
    promotionDetailList: [{
      type: String
      saved: Number
    }]
> >
#4.1.1 计算满减的优惠金额 calSavedByManjian
input:
    items
    promotion of promotions: {
      type: String
    }
output:
    savedDetail: {
      type: String
      saved: Number
    }
#4.1.2 计算半价商品的优惠金额 calSavedByBanjia
input:
    items
    promotion of promotions: {
      type: String,
      items: [String]
    }
output:
    savedDetail: {
      type: String
      saved: Number
    }
>>>
#4.1.2.1 判断是否是半价商品 isBanjiaItem
input:
    item of items:
    items of promotion: [String]
output:
    banjia: Boolean
>
#4.2 选出最优的优惠 getTheBestPromotion
input:
    promotionDetailList
output:
    promotionDetail

#5 计算订单总价 calTotal
input:
    items
    promotionDetail
output:
    total: Number
#5.5 封装订单对象 generateOrder
input:
    items
    promotionDetail
    total
output:
    order: {
      items,
      promotionDetail,
      total
    }
#6 输出订单 outputOrder
input:
    order
output:
    console.log(orderString: String)
