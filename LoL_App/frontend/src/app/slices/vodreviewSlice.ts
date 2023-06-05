import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { VODReviewComment,VODReviewCommentsState} from "../../services/types/vod-reviews-types";
import { RootState } from '../store'

const initialState:VODReviewCommentsState = {
    comments: [],
    currentTimestamp:0,
    responseStatus: null
}

const vodreviewSlice = createSlice({
    name: 'vodreview',
    initialState: initialState,
    reducers:{
      addComment: (state,action:PayloadAction<VODReviewComment>)=>{
        state.comments?.push(action.payload)
        ///debugging 
        console.log('comment saved')
      },
      deleteComment: (state,action:PayloadAction<string>) => {
        /*might be a more performant way to do this but whatever */  
        const filteredcomments = state.comments?.filter((comment) => comment.id !== action.payload)
        state.comments = filteredcomments
      },
      editComment: (state,action:PayloadAction<VODReviewComment>) => {
        const commentedit = action.payload
        const editIndex = state.comments?.findIndex((comment)=>comment.id)
       state.comments[editIndex] = {
        id: commentedit.id,
        timestamp: commentedit.timestamp,
        text: commentedit.text,
       }
      },
    }})
      
export const {addComment,deleteComment,editComment} = vodreviewSlice.actions
export default vodreviewSlice.reducer;

///Selectors
export const getComments = (state:RootState) => {
  return state.vodreview.comments
}

