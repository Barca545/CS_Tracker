import React, {useState} from "react";
import  YouTubePlayer  from "react-youtube";
import {v4 as uuid} from 'uuid';
import { VODReviewComment } from "../services/types/vod-reviews-types";
import { useAppDispatch,useAppSelector } from "../app/hooks";
import {addComment,deleteComment,getComments,getEdit} from '../app/slices/vodreviewSlice'

///installed uuid


const VODReviews = () => {
  return(
    <>
      <h1>VOD Reviews</h1>
      <VideoPlayer/>
    </>
  )
}

const VideoPlayer = () => {
  const [youtubeID,setYoutubeID] = useState('');

  const ChooseVideo = () => {
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const url = e.target.value;
      const id:string = url.split('v=')[1]
      setYoutubeID(id)
      console.log(id)
      console.log(youtubeID)
      ///currently does not work on some URLs possibly 
    }
    return(
      <>
        <form>
          <span>
            Enter Youtube URL
            <input type={"text"} value={youtubeID} onChange={(e)=>{handleChange(e)}}/>
          </span>
        </form>
      </>
    )
  } 
  return (
  <>
    <ChooseVideo/>
    <YouTubePlayer videoId={youtubeID}/>
    <CommentSidebar/>
  </>
  )
}

const CommentSidebar = () => {
  ///possibly move this to the components folder

  /*need a utility to show and hide the comment bar */

  const comments = useAppSelector(getComments)
  return(
    <div className="comment-sidebar">
      {comments.map((comment) => (
        <Comment 
        key={comment.id}
        id={comment.id}
        timestamp={comment.timestamp}
        text={comment.text}/> 
      ))}
      <CreateComment />
    </div>
  )
} 

const Comment = (comment:VODReviewComment) => {
  const dispatch = useAppDispatch()

  return(
    <>
      <div className="comment" key={comment.id} id={comment.id}>
        {comment.text}
      </div>
      <div className="comment-footer">
      <button onClick={()=>dispatch(deleteComment(comment.id))}>Delete</button>
        <button> Edit</button>
      </div>
    </>
  )
}

const CreateComment = () =>{
  const dispatch = useAppDispatch()
  const [inputText,setinputText] = useState(String)
  const [inputTimestamp,setinputTimestamp] = useState(Number);  

  /*basically what this should do is if edit changes replace the current comment with the
  result of calling the getEdit selector 
  may need to move the logic for definging the state from the savehandler to a useState hook
  probably also need an update comment reducer that instead of just appending to the end 
  replaces the element with the id matching the edit id.
  */
  
  const saveHandler = () => {
    ///add a seperate action here that sends it to the the backend onsave
    const comment:VODReviewComment = 
    { id: uuid(),
      /*once I get this hooked up to the YT thing I need to figure out the timestamping
      might need to grab the timestamp in a slice whenever the comment thing is opened
      */
      timestamp:1,
      text:inputText,
    }
    ///debugging
    console.log(comment)
    dispatch(addComment(comment))
    setinputText('')
  }
  
  return(
    <>
      <div className="create-comment">
        <textarea
        value={inputText}
        placeholder="New Comment..."
        onChange={(e) => {setinputText(e.target.value)}}
        />
      </div>
      <div className="create-comment-footer">
        <button className="comment-save" onClick={saveHandler}> Save </button>
      </div>
    </>
  )
}

export default VODReviews