import React from 'react';
import './mainScreen.css';
import {FaUserAlt,FaRegEnvelope,FaPhoneAlt,FaMapMarkerAlt,FaMapMarkedAlt}  from 'react-icons/fa';
import { useState, useEffect } from "react";
import Modal from 'react-modal';


function MainScreen() {
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [town, setTown] = useState('');
    const [colonia, setColonia] = useState([]);
    const [coloniaValue, setColoniaValue] = useState([]);
    const [name, setName] = useState('');
    const [lastename, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [postal, setPostal] = useState('');
    const [street, setStreet] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalText, setModalText] = useState('');
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState([]);

    useEffect(() => {
        fetch("https://blackisp.herokuapp.com/products")
          .then(res => res.json())
          .then(
            (result) => {
                let total = 0
              console.log(result)
              setProducts(result)
              for (let index = 0; index < result.length; index++) {
                total+= Number(result[index].price)
              }
              setTotal(total)
            }
            
          )
    }, [])

    // Formateador de número
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });
    
    const saveData=()=>{
        let validate = '';

        if (!name){
            validate+='Nombre, '   
        }
        if (!lastename){
            validate+='Apellido, '   
        }
        if (!email){
            validate+='Correo electrónico, '   
        }
        if (!phone){
            validate+='Teléfono, '   
        }
        if (!postal){
            validate+='Codigo Postal, '
        }
        if (!town){
            validate+='Delegación, '   
        }
        if (!street){
            validate+='Calle, '   
        }
        if (!city){
            validate+='Ciudad, '   
        }
        if (!coloniaValue){
            validate+='Colonia, '   
        }
        if (!state){
            validate+='Estado, '   
        }
        if (!validate && isValid(email))
        {
            // Enviar la data
            const postBody = {
                name: name,
                lastename,
                email,
                phone,
                postal,
                coloniaValue,
                city,
                state,
                town,
                street
            };
            const requestMetadata = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postBody)
            };
        
            fetch("https://blackisp.herokuapp.com/contact", requestMetadata)
                .then(res => {
                    console.log(res)
                    if (res.status > 199 && res.status < 300)
                    {
                        setModalIsOpen(true)
                        setModalText('Datos almacenados con éxito')
                    }
                    else{
                        setModalIsOpen(true)
                        setModalText('Error al guardar la información')
                    }
                })
                
        }
        else if(validate)
        {
            setModalIsOpen(true)
            setModalText('Todos los campos son obligatorios, porfavor llenar los siguiente: '+validate)
        }
        else
        {
            setModalIsOpen(true)
            setModalText('El campo email no es válido. Por favor ingreselo nuevamente')
        }
    }

    const reviewPostalCode = (code)=>{
        fetch("https://blackisp.herokuapp.com/postalCodes/"+code)
        .then(res => res.json())
        .then(
            (result) => {
                
                if (result.code)
                {
                    console.log(result)
                    setState(result.state)
                    setCity(result.city)
                    setTown(result.town)
                    setColonia(result.colonies)
                    
                }
            }
        )
    }

    const validateEmail = (email)=>{

        //Se muestra un texto a modo de ejemplo, luego va a ser un icono
        if (!isValid(email)) {
            setModalIsOpen(true)
            setModalText('El campo email no es válido. Por favor ingreselo nuevamente')
        }

    }

    const isValid = (email) => {
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (emailRegex.test(email)) {
            return true
        }
        else {
            return false
        }
    }

    return (
        <div id="bodyPage">
            <div id="formInfo">
                <div id="header">
                    <p id="direccion"> Direccion  de Envio</p>
                </div>
                <div id="blockCenter">
                    <div id="blockForm">
                        <div id="line">
                            <div id="block">
                                <i className="user">
                                    <FaUserAlt />
                                </i>
                                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Nombre"></input>
                            </div>
                            <div id="block">
                                <i className="user">
                                    <FaUserAlt />
                                </i>
                                <input type="text" value={lastename} onChange={(e)=>setLastname(e.target.value)} className="form-control" placeholder="Apellido"></input>
                            </div>
                            
                        </div>
                        <div id="line">
                            <div id="block">
                            <i className="user">
                                    <FaRegEnvelope />
                                </i>
                            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} onBlur={(e)=>validateEmail(e.target.value)} className="form-control" placeholder="Correo Electronico"></input>

                            </div>
                            <div id="block">
                            <i className="user">
                                    <FaPhoneAlt />
                                </i>
                            <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control" placeholder="Número de Telefono"></input>
                                
                            </div>
                        </div>
                        <div id="line">
                            <div id="block">
                            <i className="user">
                                    <FaMapMarkerAlt />
                                </i>
                            <input type="number" value={postal} onChange={(e)=>setPostal(e.target.value)} className="form-control" placeholder="Código Postal" onBlur={(e)=>reviewPostalCode(e.target.value)}></input>

                            </div>
                            <div id="block">
                            <i className="user">
                                    <FaMapMarkerAlt />
                                </i>
                            {
                                colonia.length < 2 &&
                                <input type="text" className="form-control" onChange={(e)=>setColoniaValue(e.target.value)} value={coloniaValue} placeholder="Colonia"></input>
                            }
                            {
                                colonia.length > 1 &&
                                <select id="list" className="form-control" onChange={(e)=>setColoniaValue(e.target.value)} value={coloniaValue} placeholder="Colonia">
                                    <option value="" selected disabled hidden>Colonia</option>
                                    {colonia.map((element) =>
                                        <option value={element}>{element}</option>
                                    )};
                                </select>
                            }   
                            </div>
                        </div>
                        <div id="line">
                            <div id="block">
                            <i className="user">
                                    <FaMapMarkerAlt />
                                </i>
                            <input type="text" className="form-control" onChange={(e)=>setState(e.target.value)} value={state} placeholder="Estado/Región"></input>

                            </div>
                            <div id="block">
                            <i className="user">
                                    <FaMapMarkerAlt />
                                </i>
                            <input type="text" className="form-control" onChange={(e)=>setCity(e.target.value)} value={city} placeholder="Ciudad"></input>

                                
                            </div>
                        </div>
                        <div id="line">
                            <div id="block">
                            <i className="user">
                                    <FaMapMarkerAlt />
                                </i>
                            <input type="text" className="form-control" onChange={(e)=>setTown(e.target.value)} value={town} placeholder="Delegación o municipio"></input>

                            </div>
                            <div id="block">
                            <i className="user">
                                    <FaMapMarkedAlt />
                                </i>
                            <input type="text" value={street} onChange={(e)=>setStreet(e.target.value)} className="form-control" placeholder="Calle"></input>

                            </div>
                        </div>
                        <div id="lineButton">
                            <button className="libreta">Libreta de Direcciones</button>    
                            <button className="guardar" onClick={()=> saveData()}>Guardar</button>  
                        </div>
                        <div id="line">
                            <div id="block">
                                <label>
                                    <input type="checkbox"/>
                                    Utilizar como dirección de facturación
                                </label>                        
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div id="products">
                <div id="boxProducts">
                    <div id="headerResume">
                        <p id="pResumeHeader">RESUMEN DE LA ORDEN</p>
                    </div>
                    <div id="bodyResume">
                        {products.map((element) => 
                            <div id="lineResume">
                                <div id="img">
                                    <img id="imgProduct" src={element.image} />
                                </div>
                                <div id="descrip">
                                    <p id="pDescrip">{element.name}</p>
                                </div>
                                <div id="precio">
                                    <div id="priceContainer">
                                        <p id="pPrice">{formatter.format(element.price)}</p>
                                        <p id="smallPrice">,00</p>
                                    </div>
                                </div>

                            </div>
                        )}
                        <div id="lineResume2">
                            <button id="botonEnviar"> enviar</button>
                        </div>
                    </div>
                    <div id="subResume" >
                            <div id="subResume1"> 
                                <p className="totalP">SUBTOTAL</p>
                                <p className="totalP">Envío</p>
                            </div>
                            <div id="subResume2">
                                <p className="totalP">{formatter.format(total)}</p>
                                <p className="totalP">A calcular</p>
                            </div>
                        
                    </div>
                    <div id="totalResume">
                        <div id="subResume1"> 
                            <p className="totalPFinal">TOTAL</p>
                        </div>
                        <div id="subResume2">
                            <p className="totalPFinal">{formatter.format(total)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Example Modal"
                onRequestClose={()=>setModalIsOpen(false)}
                id="modal"
                overlayClassName="ReactModal__Overlay"
            >
                <div id="modalDiv">
                    <p id="modalText">{modalText}</p>
                    <button id="modalButton" onClick={()=>setModalIsOpen(false)}>close</button>
                </div>
            </Modal>
        </div> 
        
    )
}

export default MainScreen