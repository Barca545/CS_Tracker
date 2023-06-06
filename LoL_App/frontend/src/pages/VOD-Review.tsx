import React, {useState,useRef, useEffect} from "react";
import {v4 as uuid} from 'uuid';
import { VODReviewComment, Video} from "../services/types/vod-reviews-types";
import { useAppDispatch,useAppSelector } from "../app/hooks";
import {addComment,deleteComment,editComment,getComments,getVideo,setVideoTitle,setVideoURL} from '../app/slices/vodreviewSlice'
import ReactPlayer from "react-player";

///USING REACT-PLAYER NOT react-youtube OR video-react

///installed uuid

///needs to play immediately after seeking


const VideoPlayer = () => {
  ///give users the option to set the title of the video
  const reactPlayerRef = useRef<ReactPlayer>(null);
  const time = reactPlayerRef.current?.getCurrentTime()
  const dispatch = useAppDispatch()
  const video = useAppSelector(getVideo)
  const [videoTitle,setTitle] = useState(video.title)
  const [videoURL,setURL] = useState(video.url)

  ///use map to rerender

  const handleSaveVideo = () => {
    dispatch(setVideoURL(videoURL))
    dispatch(setVideoURL(videoTitle))
  } 

  /*steal the set duration thing as well from the below
  https://codesandbox.io/s/useref-for-react-player-qss7k*/

  const handleSeek = (time:number) => {
    reactPlayerRef.current?.seekTo(time)
  }

  const getCurrentTime = () => {
    ///figure out how to make this not return undefined 
    return reactPlayerRef.current?.getCurrentTime()
  }

  const CommentSidebar = () => {
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
      </div>
    )
  } 
  
  const Comment = (comment:VODReviewComment) => {
    const [editstate,setEditState] = useState(false)
    
    const EditComment = (props:any) =>{
      const id = props.id
      const [inputText,setinputText] = useState(props.text)
      const [inputTimestamp,setinputTimestamp] = useState<number>(props.timestamp); 
      
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
          <input type="text" className="create-timestamp"
          value={inputTimestamp}
          placeholder="Set timestamp"
          onChange={(e) => {setinputTimestamp(parseInt(e.target.value))}}
          />
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
        <div className="comment">
          <div className="time-stamp" onClick={()=>handleSeek(comment.timestamp)}> {comment.timestamp} </div>
          <div className="comment-body" key={comment.id} id={comment.id}>
            {comment.text}
          </div>
          <div className="comment-footer">
            <button onClick={()=>dispatch(deleteComment(comment.id))}>Delete</button>
            <button onClick={()=>{setEditState(true)}}>Edit</button>
          </div>
        </div>
      )
    }
    else{
      return(
      <EditComment id={comment.id} text={comment.text} timestamp={comment.timestamp}/>
      )}
  }
  
  ///could possible make savehandler an if statement and then reuse create comment for edit comment
  const CreateComment = () =>{
    const [inputText,setinputText] = useState ('')
    const [inputTimestamp,setinputTimestamp] = useState(0); 
    
    /*add feature that lets user set timestamp or set it to the current time*/

    const saveHandler = () => {
      ///add a seperate action here that sends it to the the backend onsave
      const comment:VODReviewComment = 
      { id: uuid(),
        timestamp:inputTimestamp,
        text:inputText,
      }

      dispatch(addComment(comment))
      setinputText('')
    }

    const handleTimestampInput = () => {
      ///needs to convert a timestamp i.e. 3:12 into seconds  
    }
    
    return(
      <>
        <input type="text" className="create-timestamp"
        value={inputTimestamp}
        placeholder="Set timestamp"
        onChange={(e) => {setinputTimestamp(parseInt(e.target.value))}}
        />
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
    <form>
      <h4>Enter Youtube URL</h4>
      <input type={"text"} value={videoURL} onChange={(e)=>setURL(e.target.value)}/>
      <h4>Enter Video Title</h4>
      <input type={"text"} value={videoTitle} onChange={(e)=>setTitle(e.target.value)}/>
      <button onClick={()=>handleSaveVideo()}>Save Video</button>
    </form>
    <ReactPlayer
        ///url="https://www.youtube.com/watch?v=ddcTY2tn26w"
        url={video.url}
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