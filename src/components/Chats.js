import React, { useEffect, useState } from 'react'
import './Chats.css'
import { Avatar, IconButton } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import { getUser } from '../features/userSlice'
import { useSelector } from 'react-redux'
import firebase from 'firebase'
// All the Icons
import SearchIcon from '@material-ui/icons/Search'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import MicIcon from '@material-ui/icons/Mic'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'

const Chats = () => {
  const [input, setInput] = useState('')
  const [seed, setSeed] = useState('')
  const {roomId} = useParams()
  const [roomName, setRoomName] = useState('')
  const [messages, setMessages] = useState([])
  const user = useSelector(getUser)

  useEffect(()=>{
    if(roomId){
      db.collection("rooms").doc(roomId).onSnapshot(snapshot => (
        setRoomName(snapshot.data().name)
      ))
      setSeed(Math.floor(Math.random() * 5000))
      db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => (
        setMessages(snapshot.docs.map(doc => doc.data()))
      ))
    }
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault()
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="chats__headerInfo">
          <h3>{roomName}</h3>
          <p>Last Seen {" "}{
            new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
          }</p>
        </div>
        <div className="chats__headerRight">
          <IconButton><SearchIcon /></IconButton>
          <IconButton><AttachFileIcon /></IconButton>
          <IconButton><MoreVertIcon /></IconButton>
        </div>
      </div>
      <div className="chats__body">
        {messages.map(({message, name, timestamp}) => (
          <p className={`chats__message ${name === user.displayName && "chats__reciever"}`}>
            <span className="chats__name">{name}</span> 
            {message} 
            <span className="chats__timestamp">{new Date(timestamp?.toDate()).toUTCString()}</span>
          </p>
        ))}
      </div>
      <div className="chats__footer">
        <InsertEmoticonIcon />
        <form>
          <input value={input} onChange={e=>setInput(e.target.value)} type="text" placeholder="Type a message" />
          <button onClick={sendMessage} type="submit">Send a Message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chats
