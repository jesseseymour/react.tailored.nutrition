function getStepFromPathname(pathname) {
  const pathnameArr = pathname.split('/')
  return parseInt(pathnameArr[pathnameArr.indexOf('step') + 1])
}

export default getStepFromPathname