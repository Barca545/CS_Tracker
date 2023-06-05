import React, {useState,useRef} from "react";
import {v4 as uuid} from 'uuid';
import { VODReviewComment} from "../services/types/vod-reviews-types";
import { useAppDispatch,useAppSelector } from "../app/hooks";
import {addComment,deleteComment,editComment,getComments,getTimestamp,setTimestamp} from '../app/slices/vodreviewSlice'
import ReactPlayer from "react-player";

///USING REACT-PLAYER NOT react-youtube OR video-react

///installed uuid

///needs to play immediately after seeking

const VideoPlayer = () => {
  ///give users the option to set the title of the video
  const [URL,setURL] = useState('');
  const reactPlayerRef = useRef<ReactPlayer>(null);
  const [timestamp,setTimestamp] = useState(0)
  const time = reactPlayerRef.current?.getCurrentTime()
  const dispatch = useAppDispatch()

  /*steal the set duration thing as well from the below
  
  https://codesandbox.io/s/useref-for-react-player-qss7k*/

  const handleSeek = () => {
    reactPlayerRef.current?.seekTo(timestamp)
  }

  const setCurrentTime = () => {
    return reactPlayerRef.current?.getCurrentTime
  }

  const ChooseVideo = () => {
    return(
      <form>
          <h4>Enter Youtube URL</h4>
          <input type={"text"} value={URL} onChange={(e)=>setURL(e.target.value)}/>
      </form>
    )
  } 
  
  const CommentSidebar = () => {
    ///possibly move this to the components folder
    /*need a utility to show and hide the comment bar 
    possibly make it display the full text of whatever comment is focused*/
  
    const comments = useAppSelector(getComments)
    return(
      <div className="comment-sidebar">
        <CreateComment />
        {comments.map((comment) => (
          <Comment 
          key={comment.id}
          id={comment.id}
          timestamp={comment.timestamp}
          text={comment.text}/> 
        ))}
        <button onClick={()=>reactPlayerRef.current?.seekTo(120)}> Test 2</button>
      </div>
      
    )
  } 
  
  const Comment = (comment:VODReviewComment) => {
    const dispatch = useAppDispatch()
    const [editstate,setEditState] = useState(false)
    
    const EditComment = (props:any) =>{
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
          <div className="comment-header">
            {/*
            this is where the timestamp will eventually go
            style it to make it look like a link
            */}
          </div>
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

  return (
  <>
    <ChooseVideo/>
    <ReactPlayer
        url="https://www.youtube.com/watch?v=ddcTY2tn26w"
        ///url={URL}
        ref={reactPlayerRef}
        config={{
          youtube: {
            playerVars: { controls: 1 }
          }
        }}
      />
    <CommentSidebar/>  
  </>
  )
}

export default VideoPlayer