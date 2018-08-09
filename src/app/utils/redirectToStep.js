function redirectToStep(history,step, baseUrl){
  history.push(`/${baseUrl}/step/${step}`)
}

export default redirectToStep