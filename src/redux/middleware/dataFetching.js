
import { get } from "../../utils/request"

export default store => next => action => {

  const fetchDataInfo = action['FETCH_DATA']

  // If fetchDataInfo is undefined, it means this action is not about data-fetching. Then pass it to reducer to tackle it directly.
  if (typeof fetchDataInfo === 'undefined') {
    return next(action)
  }

  // If the action contains fetchDataInfo, get the contents and varify them.
  const { types, url, entityInfo } = fetchDataInfo

  if (!Array.isArray(types) && types.length !== 3) {
    throw new Error('types should be an array containing three elements.')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Each element of types should be of string type.')
  }

  if (typeof url !== 'string') {
    throw new Error('url should be of string type.')
  }

  if (!entityInfo) {
    throw new Error('entityInfo should not be empty.')
  }

  // The data-fetching process begins.
  // Get the three action types from the array types and name them
  const [requestType, successType, failureType] = types

  // change action: delete action['FETCH_DATA'], while keep the rest data of action
  const newAction = (typeAndData) => {
    delete action['FETCH_DATA']
    return {
      ...typeAndData,
      ...action
    }
  }

  // Using next() to dispatch requestType
  next(newAction({ type: requestType }))

  // Fetch data
  return fetchData(url, entityInfo).then(
    (data) => {
      next(newAction({ type: successType, fetchedData: data }))
    },
    (error) => {
      next(newAction({
        type: failureType,
        error: error.message || '获取数据失败'
      }))
    }
  )
}

// Function for fetching data
const fetchData = (url, entityInfo) => {
  return get(url).then(data => {
    return changeDataStructure(data, entityInfo)
  }
  )
}

// The following function is changing the data to an object type and store it in the right entity file
const changeDataStructure = (data, entityInfo) => {
  const { entityName, id } = entityInfo
  let obj = {}
  let ids = []
  if (Array.isArray(data)) {
    data.forEach(item => {
      obj[item[id]] = item
      ids.push(item[id])
    })
  } else {
    obj[data[id]] = data
    ids.push(data[id])
  }
  return {
    [entityName]: obj,
    ids
  }
}