function scrollTo(element, duration = 1000) {
  if (window.jQuery) {
    if ($(element).length) {
      $([document.documentElement, document.body]).animate({
        scrollTop: $(element).offset().top - $('.new-nav').height()
      }, duration);
    }
  }
}

export default scrollTo