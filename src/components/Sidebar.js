import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import {Avatar, IconButton} from '@material-ui/core'
import SidebarChat from './SidebarChat'
import db from '../firebase'
import { getUser } from '../features/userSlice'
import { useSelector } from 'react-redux'
// Import All The Icons
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import ChatIcon from '@material-ui/icons/Chat'

const Sidebar = () => {
  const [rooms, setRooms] = useState([])
  const user = useSelector(getUser)

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot)=>(
      setRooms(snapshot.docs.map((doc)=>({
        id: doc.id,
        data: doc.data()
      })))
    ))
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton><DonutLargeIcon /></IconButton>
          <IconButton><ChatIcon /></IconButton>
          <IconButton><MoreVertIcon /></IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input type="text" placeholder="Search or Start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {
          rooms.map(room => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar
