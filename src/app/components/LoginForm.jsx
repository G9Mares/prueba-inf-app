'use client'

import Image from "next/image"
import { useRef, useState } from "react"
import styles from './LoginForm.module.css'
import Link from "next/link"

function LoginForm({setUser}) {
    const usuario = useRef()
    const password = useRef()
    const [viewPass,setviewPass] = useState(false)
    const [err,setErr] = useState(false)
   
    function handleLogin(e) {
        e.preventDefault()
        if (!usuario.current.value || !password.current.value) {
            return setErr("Es necesario ingresar usuario y contrasena")
        }
        var formdata = new FormData();
        formdata.append("username", usuario.current.value);
        formdata.append("password", password.current.value);

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        fetch("http://127.0.0.1:4000/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.detail) {
                return setErr(result.detail)               
            }
            console.log(result)
            return setUser(result)
            
        })
        .catch(error => console.log('error', error));
        
    }


  return (
    <div>
        
        <Image src="/logo_inein.png" className="mt-3" alt="logo inien" width={60} height={60} />
        <h2 className="text-secondary">Inicia sesion</h2>
        <form className="mt-3 w-50 mx-auto" onSubmit={(e)=>{handleLogin(e)}}>
            <div className={"input-group input-group-sm mb-4 "+styles.inputInein}>
                <span className="input-group-text" id="inputGroup-sizing-sm"><i className="bi bi-person-fill"></i></span>
                <input ref={usuario} type="text" className="form-control" aria-label="Sizing example input" placeholder="Usuario" aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className={"input-group input-group-sm mb-3 "+styles.inputInein}>
                <span className="input-group-text" id="inputGroup-sizing-sm"><i className="bi bi-key-fill"></i></span>
                <input ref={password} type={viewPass ? 'text' : 'password'} placeholder="Contraseña" className={"form-control "+ styles.inputpass} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
                <span onClick={()=>{setviewPass(!viewPass)}} className={"input-group-text "+styles.viewPass} id="inputGroup-sizing-sm">{viewPass ? <i className="bi bi-eye-slash-fill"></i>:<i className="bi bi-eye-fill"></i>}</span>
            </div>
            
            <button className={styles.btn+' mb-2'}>INGRESAR</button>
                    
        </form>
        <span className="d-block text-secondary mb-2 ">Si aun no tienes cuenta registrate <Link href='/registro'>aqui</Link> </span>
        {err && 
        <span className={'mt-1 mb-2 d-block '+styles.err}>{err}</span>}
    </div>
  )
}

export default LoginForm