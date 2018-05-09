import types from './types'

const toggleMyBool = (value) => ({
  type: types.TOGGLE_BOOL,
  value: value
})

export default { toggleMyBool }