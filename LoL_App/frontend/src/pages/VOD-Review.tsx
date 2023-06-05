import React, {useState,useEffect} from "react";
import  YouTubePlayer  from "react-youtube";
import {v4 as uuid} from 'uuid';
import { VODReviewComment } from "../services/types/vod-reviews-types";
import { useAppDispatch,useAppSelector } from "../app/hooks";
import {addComment,deleteComment,editComment,getComments} from '../app/slices/vodreviewSlice'

///installed uuid

/*once I get this hooked up to the YT thing I need to figure out the timestamping
might need to grab the timestamp in a slice whenever the comment thing is opened
*/

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
  ///issue with making 
  const [editstate,setEditState] = useState(false)
  
  const EditComment = (props:any) =>{
    /*seems to be working:
    Next step is to add code that confirms it is updating in the store
    finally, add code to make it turn back into a normal comment by toggling edit
    */
    const dispatch = useAppDispatch()
    const id = props.id
    const [inputText,setinputText] = useState(props.text)
    const [inputTimestamp,setinputTimestamp] = useState(props.timestamp); 
    
  
    const handleEdit = () => {
      const comment:VODReviewComment = {
        id: id,
        timestamp:inputTimestamp,
        text:inputText,
      }
      dispatch(editComment(comment))
      console.log('comment edited')
      setEditState(false)
  
    }
    const handleCancel = () => {
      const comment:VODReviewComment = {
        id: id,
        timestamp:props.timestamp,
        text:props.text,
      }
      dispatch(editComment(comment))
      console.log('comment canceled')
      setEditState(false)
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
          <button className="comment-save" onClick={()=>handleEdit()}> Save Edits </button>
          <button className="comment-save" onClick={()=>handleCancel()}> Cancel Edits </button>
        </div>
      </>
    )
  }

  if (editstate==false) {
    return(
      <>
        <div className="comment" key={comment.id} id={comment.id}>
          {comment.text}
        </div>
        <div className="comment-footer">
          <button onClick={()=>dispatch(deleteComment(comment.id))}>Delete</button>
          <button onClick={()=>{setEditState(true)}}>Edit</button>
        </div>
      </>
    )
  }
  else{
    return(
    <EditComment id={comment.id} text={comment.text} timestamp={comment.timestamp}/>
    )}
}

const CreateComment = () =>{
  const dispatch = useAppDispatch()
  const [inputText,setinputText] = useState(String)
  const [inputTimestamp,setinputTimestamp] = useState(Number); 
  
  const saveHandler = () => {
    ///add a seperate action here that sends it to the the backend onsave
    const comment:VODReviewComment = 
    { id: uuid(),
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