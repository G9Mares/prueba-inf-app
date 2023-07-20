import React from 'react'
import styles from "./LoginForm.module.css"

function InfoUser({user , setUser}) {
  return (
    <div>
        <h2 className={'mt-2 '+styles.datos}>Informacion de usuario</h2>
        <div className="container w-75  text-start mb-1">
            <span className={'d-block mb-2 text-secondary'}><strong>ID: </strong>{user.session.id}</span>
            <span className={'d-block mb-2 text-secondary'}><strong>Nombre: </strong>{user.session.username}</span>
            <span className={'d-block mb-2 text-secondary'}><strong>Correo: </strong>{user.session.email}</span>
            <span className={'d-block mb-2 text-secondary'}><strong>Telefono: </strong>{user.session.tel}</span>
            <span className={'d-block mb-2 text-secondary overflow-hidden '}><strong>Acces Token: </strong>{user.access_token}</span>

        </div>
        <button onClick={()=>{setUser(false)}} className={styles.btn+" mb-2"}>Cerrar sesion</button>
    </div>
  )
}

export default InfoUser