import C from '../constants'

export const switchBool = bool => {
  return {
    type: C.SWITCH_BOOL,
    payload: bool
  }
}