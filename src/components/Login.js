import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../firebase'
import './Login.css'
import {useDispatch} from 'react-redux'
import {storeUser} from '../features/userSlice'

const Login = () => {
  const dispatch = useDispatch()

  const signIn = () => {
    auth.signInWithPopup(provider).then((result)=>{
      dispatch(storeUser({
        user: result.user
      }))
    }).catch((error)=> alert(error.message))
  }
  return (
    <div className="login">
      <div className="login__container">
        <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" alt="whatsapp logo" />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  )
}

export default Login
