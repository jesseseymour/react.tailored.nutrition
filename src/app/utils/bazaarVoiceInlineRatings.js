function bazaarVoiceInlineRatings(arr){
  if (arr.length && typeof $BV !== 'undefined') {
    $BV.ui('rr', 'inline_ratings', {
      productIds: arr,
      containerPrefix: 'BVRRInlineRating'
    });
  }
}

export default bazaarVoiceInlineRatings