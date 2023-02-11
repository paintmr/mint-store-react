import { combineReducers } from "redux"
import { entityKeywords } from "./entities/keywords"
import url from "../../utils/url"
import { getKeywordById } from "./entities/keywords"

const initialstate = {
  inputText: '',
  popularKeywords: {
    isFetching: true,
    ids: []
  },
  relatedKeywords: {
    // hotpot: {
    //   isFetching: true,
    //   ids:[]
    // }
  },
  historyKeywords: ['tea', 'nuts']
}

// action types
const types = {
  FETCH_POPULARKEYWORDS_REQUEST: "FETCH_POPULARKEYWORDS_REQUEST",
  FETCH_POPULARKEYWORDS_SUCCESS: "FETCH_POPULARKEYWORDS_SUCCESS",
  FETCH_POPULARKEYWORDS_FAILURE: "FETCH_POPULARKEYWORDS_FAILURE",

  FETCH_RELATEDKEYWORDS_REQUEST: "FETCH_RELATEDKEYWORDS_REQUEST",
  FETCH_RELATEDKEYWORDS_SUCCESS: "FETCH_RELATEDKEYWORDS_SUCCESS",
  FETCH_RELATEDKEYWORDS_FAILURE: "FETCH_RELATEDKEYWORDS_FAILURE",

  SET_INPUT_TEXT: "SET_INPUT_TEXT",
  CLEAR_INPUT_TEXT: "CLEAR_INPUT_TEXT",

  ADD_HISTORY_KEYWORD: "ADD_HISTORY_KEYWORD",
  CLEAR_HISTORY_KEYWORD: "CLEAR_HISTORY_KEYWORD"
}

// action group creators (acctions processed by redux/middleware/dataFetching.js）
const fetchPopularKeywords = (url) => {
  return {
    FETCH_DATA: {
      types: [
        types.FETCH_POPULARKEYWORDS_REQUEST,
        types.FETCH_POPULARKEYWORDS_SUCCESS,
        types.FETCH_POPULARKEYWORDS_FAILURE
      ],
      url,
      entityInfo: entityKeywords
    }
  }
}

const fetchRelatedKeywords = (url, keyword) => {
  return {
    FETCH_DATA: {
      types: [
        types.FETCH_RELATEDKEYWORDS_REQUEST,
        types.FETCH_RELATEDKEYWORDS_SUCCESS,
        types.FETCH_RELATEDKEYWORDS_FAILURE
      ],
      url,
      entityInfo: entityKeywords
    },
    keyword
  }
}

// action creators
export const setInputText = (inputText) => {
  return (dispatch, getState) => {
    dispatch({ type: types.SET_INPUT_TEXT, inputText })
  }
}

export const clearInputText = (inputText) => {
  return (dispatch, getState) => {
    dispatch({ type: types.CLEAR_INPUT_TEXT })
  }
}

export const popularKeywordsRequest = () => {
  return (dispatch, getState) => {
    dispatch(fetchPopularKeywords(url.getPopularKeywords()))
  }
}

export const relatedKeywordsRequest = (keyword) => {
  return (dispatch, getState) => {
    dispatch(fetchRelatedKeywords(url.getRelatedKeywords(keyword), keyword))
  }
}

export const clearSearchHistory = () => {
  return (dispatch, getState) => {
    dispatch({ type: types.CLEAR_HISTORY_KEYWORD })
  }
}

export const addKeywordToHistory = (keyword) => {
  return (dispatch, getState) => {
    dispatch({ type: types.ADD_HISTORY_KEYWORD, keyword })
  }
}

// reducers

const inputTextReducer = (state = initialstate.inputText, action) => {
  switch (action.type) {
    case types.SET_INPUT_TEXT:
      return action.inputText
    case types.CLEAR_INPUT_TEXT:
      return ''
    default:
      return state
  }
}

const popularKeywordsReducer = (state = initialstate.popularKeywords, action) => {
  switch (action.type) {
    case types.FETCH_POPULARKEYWORDS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_POPULARKEYWORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: action.fetchedData.ids
      }
    case types.FETCH_POPULARKEYWORDS_FAILURE:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}

const relatedKeywordReducer = (state = initialstate.relatedKeywords, action) => {
  const { keyword } = action
  switch (action.type) {
    case types.FETCH_RELATEDKEYWORDS_REQUEST:
    case types.FETCH_RELATEDKEYWORDS_SUCCESS:
    case types.FETCH_RELATEDKEYWORDS_FAILURE:
      return {
        ...state,
        [keyword]: keywordAndState(state[keyword], action)
      }
    default:
      return state
  }
}

const keywordAndState = (state, action) => {
  switch (action.type) {
    case types.FETCH_RELATEDKEYWORDS_REQUEST:
      return {
        ...state,
        isFetchin: true
      }
    case types.FETCH_RELATEDKEYWORDS_SUCCESS:
      return {
        ...state,
        isFetchin: false,
        ids: [...action.fetchedData.ids]
      }
    case types.FETCH_RELATEDKEYWORDS_FAILURE:
      return {
        ...state,
        isFetchin: false
      }
    default:
      return state
  }
}

const historyKeywordReducer = (state = initialstate.historyKeywords, action) => {
  switch (action.type) {
    case types.ADD_HISTORY_KEYWORD:
      const keywords = state.filter(keyword => {
        if (keyword !== action.keyword) {
          return true
        } else {
          return false
        }
      })
      return [action.keyword, ...keywords]
    case types.CLEAR_HISTORY_KEYWORD:
      return []
    default:
      return state
  }
}

const searchReducer = combineReducers({
  inputText: inputTextReducer,
  popularKeywords: popularKeywordsReducer,
  historyKeywords: historyKeywordReducer,
  relatedKeywords: relatedKeywordReducer
})

export default searchReducer

// selectors
export const inputTextSelector = (state) => {
  return state.search.inputText
}

export const popularKeywordsSelector = (state) => {
  return state.search.popularKeywords.ids.map(id => {
    return getKeywordById(state, id)
  })
}

export const historyKeywordsSelector = (state) => {
  return state.search.historyKeywords
}

export const relatedKeywordsSelector = (state) => {
  const keyword = state.search.inputText
  const keywordrelatedInfo = state.search.relatedKeywords[keyword]
  if (keywordrelatedInfo) {
    if (keywordrelatedInfo.ids) {
      return keywordrelatedInfo.ids.map(id => {
        return getKeywordById(state, id)
      })
    }
  }
  return null
}