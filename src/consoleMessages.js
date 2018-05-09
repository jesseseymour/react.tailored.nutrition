const consoleMessages = store => next => action => {
  
  let result

  console.group(`dispatching action => ${action.type}`)
  result = next(action)

  let { home } = store.getState()

  console.log(`
    home: ${home}
  `)

  console.groupEnd()

  return result

}

export default consoleMessages