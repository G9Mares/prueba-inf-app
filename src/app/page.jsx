'use client'
import  { useState } from 'react'
import styles from './page.module.css' 
import LoginForm from './components/LoginForm'
import InfoUser from './components/InfoUser'

function Page() {
  const [user,setUser]= useState(false)
  return (
    <div className='vh-100 d-flex align-items-center'>
      <div className={styles.formContainer+" mx-auto"}>
        {
          user ?
          <InfoUser user={user} setUser={setUser}/>
          :
          <LoginForm setUser={setUser} />
        }
      </div>
    </div>
  )
}

export default Page
