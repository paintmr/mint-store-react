import { types } from "../usercentre"

// reducer
const commentReducer = (state = {}, action) => {
  if (action.type === types.COMMENT_ORDER_SUMBIT) {
    // If the user has added a comment, add the comment ID to its corresponding order 
    const { newCommentObj } = action
    return {
      ...state,
      [newCommentObj.commentId]: newCommentObj
    }
  }
  return state
}

export default commentReducer