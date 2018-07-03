function resetApp(history, resetFn, location){
  Promise.resolve(history.push(location)).then(resetFn)
}

export default resetApp