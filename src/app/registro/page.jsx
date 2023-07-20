'use client'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import Router from 'next/router'
 


function Registro() {

    const [error,seterror]=useState(false)

    const nombre = useRef()
    const correo = useRef()
    const [telefono,setTelefono] = useState('')
    const password = useRef()
    const passwordconf = useRef()

    function validarContras() {
        if (password.current.value !== passwordconf.current.value) {
            return seterror('Las contraseñas no coinciden')
            
        }else{
            seterror(false)
        }
        
    }

    function handleRegistro(e) {
        e.preventDefault()
        console.log(telefono)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "nombre": nombre.current.value,
        "telefono": telefono,
        "correo": correo.current.value,
        "password": password.current.value
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://127.0.0.1:4000/registro", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.detail) {
                return seterror(result.detail)
            }
        })
        .catch(error => console.log('error', error));
        document.getElementById('home').click()
        
        
    }

  return (
    <div className='vh-100 d-flex align-items-center'>
      <div className={styles.formContainer+" mx-auto"}>
      <div>
        
        <Image src="/logo_inein.png" className="mt-3" alt="logo inien" width={60} height={60} />
        <h2 className="text-secondary">Registrate</h2>
        <form className="mt-3 w-50 mx-auto" onSubmit={(e)=>{handleRegistro(e)}} >
            <div className={"input-group input-group-sm mb-2 "+styles.inputInein}>
                <span className="input-group-text" id="inputGroup-sizing-sm"><i className="bi bi-person-fill"></i></span>
                <input ref={nombre} required type="text" className="form-control" aria-label="Sizing example input" placeholder="Usuario" aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className={"input-group input-group-sm mb-2 "+styles.inputInein}>
                <span className="input-group-text" id="inputGroup-sizing-sm"><i className="bi bi-envelope-fill"></i></span>
                <input required ref={correo} type="email" className="form-control" aria-label="Sizing example input" placeholder="Correo" aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className={"input-group input-group-sm mb-3 "+styles.inputInein}>
                <span className="input-group-text" id="inputGroup-sizing-sm"><i className="bi bi-telephone-fill"></i></span>
                <PhoneInput
                    onChange={setTelefono}
                    containerClass='d-inline input-group-sm'
                    disableDropdown
                    countryCodeEditable={false}
                    country={'mx'}
                    specialLabel=''
                    inputClass={styles.phone}
                    />
            </div>
            <div className={"input-group input-group-sm mb-2 "+styles.inputInein}>
                <span className="input-group-text" id="inputGroup-sizing-sm"><i className="bi bi-key-fill"></i></span>
                <input ref={password} required type='password' placeholder="Contraseña" className={"form-control "+ styles.inputpass} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
                
            </div>
            <div className={"input-group input-group-sm mb-4 "+styles.inputInein}>
                <span className="input-group-text" id="inputGroup-sizing-sm"><i className="bi bi-key-fill"></i></span>
                <input ref={passwordconf} onChange={()=>{validarContras()}} required type='password' placeholder="Confirma la contraseña" className={"form-control "+ styles.inputpass} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
                
            </div>
            
            <button className={styles.btn+' mb-1'} >REGISTRARSE</button>
            {error && 
            <span className='text-danger d-block mb-3'>{error}</span>
            }
                    
        </form>
        <span className="d-block text-secondary mb-2 ">Si ya tienes una cuenta inicia sesion <Link href='/' id='home'>aqui</Link> </span>
    
    </div>
        
      </div>
    </div>
  )
}

export default Registro