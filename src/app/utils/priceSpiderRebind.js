function priceSpiderRebind(){
  if (typeof PriceSpider !== 'undefined' && typeof PriceSpider.rebind === 'function' && $('.ps-widget').length > 0) {
    PriceSpider.widgets = []
    PriceSpider.rebind()
  }
}

export default priceSpiderRebind