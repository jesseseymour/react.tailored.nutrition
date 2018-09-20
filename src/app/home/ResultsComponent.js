import React from 'react'

const Results = ({styles, results, petType = "dog", petName, resetApp}) => {
  const {product, ymal} = results ? results : {}

  const getProduct = (product) => {
    return(
      <div key={Math.floor(Math.random() * 1000)} className="tntool__product">
        <a href={product.link}>
          <img className="tntool__product--img" src={product.image} alt={product.alt} />
          <div className="tntool__product--line"></div>
          <div className="tntool__product--formula">{product.formula}</div>
          <div className="tntool__product--name">{product.name}</div>
        </a>
        <div className="tntool__product--bv bv-container" id={`BVRRInlineRating-${product.bvID}`} data-iams-bvid={product.bvID}></div>
        <div className="tntool__product--ps ps-widget" data-ps-sku={product.psID.split(',')[0]}></div>
      </div>
    )
  }

  return (
    <div style={styles}>
      <div className="tntool__banner tntool__banner--results">{petName} is one special {petType}!<span>See {petName}'s tailored recipe below.</span></div>
      {
        results ? 
        <div className="tntool__results">
          {getProduct( product )}
          <div className="tntool__resultscopy" dangerouslySetInnerHTML={{__html:product.copy}} ></div>
          <div className={`tntool__bowl tntool__bowl--product tntool__bowl--${petType === 'dog' ? 'green' : 'orange'}`}>
            <svg width="50" height="30" preserveAspectRatio="xMidYMax meet"><use xlinkHref={`#${petType}-food-bowl`}></use></svg>
          </div>
          <div className="tntool__reset" onClick={resetApp}>START OVER</div>
          <hr />
          {
            results.ymal ? 
            <div className="tntool__ymal">
              <div className="tntool__ymal--notice">
                Not what you expected?<br/><span>Check out these other recipes based on your answers.</span>
              </div>
              {
                ymal.map( (product, index) => index < 2 ? getProduct(product) : null )
              }
              <a className="tntool__viewall" href={`/${petType}-food`}>view all {petType} products</a>
            </div> :
            null
          }
        </div> : 
        `Loading ${petName}'s tailored recipe`
      }
    </div>
  )
}

export default Results