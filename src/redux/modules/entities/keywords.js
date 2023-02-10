export const entityKeywords = {
  entityName: 'keywords',
  id: 'id'
}

const keywordReducer = (state = {}, action) => {
  if (action.fetchedData && action.fetchedData.keywords) {
    return {
      ...state,
      ...action.fetchedData.keywords
    }
  }
  return state
}

export default keywordReducer

// selectors
export const getKeywordById = (state, id) => {
  return state.entities.keywords[id]
}