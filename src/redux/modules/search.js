import { combineReducers } from "redux"
import { entityKeywords, getKeywordById } from "./entities/keywords"
import url from "../../utils/url"
import { entityShops, getShopByIdSelector } from "./entities/shops"

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
  historyKeywords: ['tea', 'coffee'],
  shopsByKeyword: {
    // hotpot: {
    //   isFetching: true,
    //   ids:[]
    // }
  }
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
  CLEAR_HISTORY_KEYWORD: "CLEAR_HISTORY_KEYWORD",

  FETCH_SHOPSBYKEYWORD_REQUEST: "FETCH_SHOPSBYKEYWORD_REQUEST",
  FETCH_SHOPSBYKEYWORD_SUCCESS: "FETCH_SHOPSBYKEYWORD_SUCCESS",
  FETCH_SHOPSBYKEYWORD_FAILURE: "FETCH_SHOPSBYKEYWORD_FAILURE",
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

const fetchShopsByKeyword = (url, keyword) => {
  return {
    FETCH_DATA: {
      types: [
        types.FETCH_SHOPSBYKEYWORD_REQUEST,
        types.FETCH_SHOPSBYKEYWORD_SUCCESS,
        types.FETCH_SHOPSBYKEYWORD_FAILURE
      ],
      url,
      entityInfo: entityShops
    },
    keyword
  }
}

// action creators
export const setInputText = (inputText) => {
  return { type: types.SET_INPUT_TEXT, inputText }
}

export const clearInputText = (inputText) => {
  return { type: types.CLEAR_INPUT_TEXT }
}

export const popularKeywordsRequest = () => {
  return (dispatch, getState) => {
    const { ids } = getState().search.popularKeywords
    if (ids.length > 0) {
      return null
    } else {
      dispatch(fetchPopularKeywords(url.getPopularKeywords()))
    }
  }
}

export const relatedKeywordsRequest = (keyword) => {
  return (dispatch, getState) => {
    const { relatedKeywords } = getState().search
    if (relatedKeywords[keyword]) {
      return null
    }
    dispatch(fetchRelatedKeywords(url.getRelatedKeywords(keyword), keyword))
  }
}

export const clearSearchHistory = () => {
  return { type: types.CLEAR_HISTORY_KEYWORD }
}

export const addKeywordToHistory = (keyword) => {
  return { type: types.ADD_HISTORY_KEYWORD, keyword }
}

export const shopsByKeywordRequest = (keyword) => {
  return (dispatch, getState) => {
    dispatch(fetchShopsByKeyword(url.getShopsByKeyword(keyword), keyword))
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

const keywordAndState = (state = { isFetching: false, ids: [] }, action) => {
  switch (action.type) {
    case types.FETCH_RELATEDKEYWORDS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_RELATEDKEYWORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: [...action.fetchedData.ids]
      }
    case types.FETCH_RELATEDKEYWORDS_FAILURE:
      return {
        ...state,
        isFetching: false
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

const shopsByKeywordReducer = (state = initialstate.shopsByKeyword, action) => {
  const { keyword } = action
  switch (action.type) {
    case types.FETCH_SHOPSBYKEYWORD_REQUEST:
    case types.FETCH_SHOPSBYKEYWORD_SUCCESS:
    case types.FETCH_SHOPSBYKEYWORD_FAILURE:
      return {
        ...state,
        [keyword]: keywordShopsSubReducer(state[keyword], action)
      }
    default:
      return state;
  }
}

const keywordShopsSubReducer = (state = { isFetching: false, ids: [] }, action) => {
  switch (action.type) {
    case types.FETCH_SHOPSBYKEYWORD_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_SHOPSBYKEYWORD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: [...action.fetchedData.ids]
      }
    case types.FETCH_SHOPSBYKEYWORD_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

const searchReducer = combineReducers({
  inputText: inputTextReducer,
  popularKeywords: popularKeywordsReducer,
  historyKeywords: historyKeywordReducer,
  relatedKeywords: relatedKeywordReducer,
  shopsByKeyword: shopsByKeywordReducer
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
  const text = inputTextSelector(state)
  const keywordrelatedInfo = state.search.relatedKeywords[text]
  if (keywordrelatedInfo && keywordrelatedInfo.ids) {
    return keywordrelatedInfo.ids.map(id => {
      return getKeywordById(state, id)
    })
  }
  return null
}

export const keywordSelector = (state) => {
  return state.search.historyKeywords[0]
}

export const shopsByKeywordSelector = (state) => {
  const keyword = keywordSelector(state)
  const shopsByKeyword = state.search.shopsByKeyword[keyword]
  if (shopsByKeyword && shopsByKeyword.ids) {
    const shops = shopsByKeyword.ids.map(id => {
      return getShopByIdSelector(state, id)
    })
    return shops
  } else {
    return null
  }
}