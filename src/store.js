const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

export const changeLanguage = (language) => {
  return {
    type: CHANGE_LANGUAGE,
    payload: language
  }
}

const initialState = 'en'

export function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return action.payload
    default:
      return state
  }
}
