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
  suggestedKeywords: {
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

  FETCH_SUGGESTEDKEYWORDS_REQUEST: "FETCH_SUGGESTEDKEYWORDS_REQUEST",
  FETCH_SUGGESTEDKEYWORDS_SUCCESS: "FETCH_SUGGESTEDKEYWORDS_SUCCESS",
  FETCH_SUGGESTEDKEYWORDS_FAILURE: "FETCH_SUGGESTEDKEYWORDS_FAILURE",

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
  historyKeywords: historyKeywordReducer
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