import React from 'react';
import InputCadastros from "../../componentes/inputCadastros/inputCadastro";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { faArrowLeft, faPlane, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import SelectCertificacao1 from '../../componentes/select/selectCertificacao1';
import Logout from '../../componentes/logout/logout';
import { useEffect } from "react";
   

const Swal = require('sweetalert2')


const AtualizarAeronave = () => {

    function validarPeso(pesoMax, pesoMin) {
        if (pesoMax <= pesoMin) {
            return true
        }
    }

    function validarCampos(motor, reversor, pesoAeronave, pesoRef, altitude, temperatura, vento, pesoMax, pesoMin, owerweight, overspeed,slope,tempRef) {
        const campos = [motor, reversor, pesoAeronave, pesoRef, altitude, temperatura, vento, pesoMax, pesoMin, owerweight, overspeed,slope,tempRef]
        let evalido5 = true
        for (var campo of campos) {
            if (campo === null) {
                evalido5 = false
            }
            if (campo === "") {
                evalido5 = false
            }
        } return evalido5

    }
    function validarReversor(reversor) {
        if (reversor > 10) {
            return false
        } return true
    }

    function validarCampoNegativo(event) {
        if (event.target.value < 0) {
            event.target.value = 0
        }
    }
    let location = useNavigate()
    function voltar() {
        location(-1)
    }
    var handleAtualizarAeronave = function (e) {
        e.preventDefault();
        var dados = {}


        dados.modelo_de_aeronave = document.getElementById('Modelo-de-aeronave1').value
        dados.unidade_de_medida = document.getElementById('Medida1').value
        dados.certificacao = document.getElementById('Certificacao1').value
        dados.motor = document.getElementById('Motor1').value
        dados.peso = document.getElementById('Peso1').value
        dados.reversor = document.getElementById('Reversor1').value
        // dados.landing_flap = document.getElementById('LF').value
        dados.peso_referencia = document.getElementById('Peso_ref').value
        dados.altitude = document.getElementById('Alt').value
        dados.isa = document.getElementById('Temp1').value
        dados.vento = document.getElementById('Vento1').value
        dados.peso_max = document.getElementById('Pmax').value
        dados.peso_min = document.getElementById('Pmin').value
        dados.owerweight = document.getElementById('Owerweicght').value
        dados.overspeed = document.getElementById('Overspeed1').value
        dados.slope = document.getElementById('Slope1').value
        dados.temp_ref = document.getElementById('TempRef1').value

        if (!validarReversor(dados.reversor)) {
            Swal.fire({
                icon: 'error',
                title: 'Reversor cannot be more than ten',
                text: '',
            })
            return true
        }

        if (!validarCampos(dados.motor, dados.reversor, dados.peso, dados.peso_referencia, dados.altitude, dados.isa, dados.vento, dados.peso_max, dados.peso_min, dados.owerweight, dados.overspeed,dados.slope,dados.tempRef)) {
            Swal.fire({
                icon: 'error',
                title: 'Fields cannot be empty',
                text: 'Please revise the informations',
            })
            return true
        }

        if (validarPeso(dados.peso_max, dados.peso_min)) {
            Swal.fire({
                icon: 'error',
                title: 'Weight max cannot be less or iqual than Weight min',
                text: '',
            })
            return true
        }
        console.log(dados)
        fetch("/AtualizarAeronave", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dados)
        }).then((resposta) => resposta.json()).then((data) => {
            console.log(data)
            Swal.fire({
                icon: data.ok ? 'success' : 'error',
                title: data.ok ? 'SUCCESS' : 'ERROR',
                text: data.ok ? 'Aircraft updated successfuly' : 'Error updating the user',
            }).then(() => {
                if (data.ok) {
                    window.location.href = '/Consulta-aeronave';
                }

            })
        })
    }
      useEffect(() => {
        
        var string = window.location.href;
        string = string.substring(window.location.href.indexOf("Modelo_de_aeronave=") + 19, string.length);
        fetch("/BuscarAeronave" + "?modelo_de_aeronave=" + string, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
    
        }).then((resposta) => resposta.json()).then((data) => {
    
    
            document.getElementById('Modelo-de-aeronave1').value = data.modelo_de_aeronave
            document.getElementById('Medida1').value = data.unidade_de_medida
            document.getElementById('Certificacao1').value = data.certificacao
            document.getElementById('Motor1').value = data.motor
            document.getElementById('Peso1').value = data.peso
            document.getElementById('Reversor1').value = data.reversor
            // document.getElementById('LF').value = data.landing_flap
            document.getElementById('Peso_ref').value = data.peso_referencia
            document.getElementById('Alt').value = data.altitude
            document.getElementById('Temp1').value = data.isa
            document.getElementById('Vento1').value = data.vento
            document.getElementById('Pmax').value = data.peso_max
            document.getElementById('Pmin').value = data.peso_min
            document.getElementById('Owerweicght').value = data.owerweight
            document.getElementById('Overspeed1').value = data.overspeed
            document.getElementById('Slope1').value = data.slope
            document.getElementById('TempRef1').value = data.temp_ref     
        })
      },[]);
      
    const [tituloPeso, setTituloPeso] = useState('Weight Airplane')
    const [tituloMaxWeight, setTituloMaxWeight] = useState('Max Weight')
    const [tituloMinWeight, setTituloMinWeight] = useState('Min Weight')
    const [tituloOwerWeight, setOwerWeight] = useState('OwerWeight')
    const [tituloAltitude, setAltitude] = useState('Altitude')
    const [tituloWeightRef, setTituloWeightRef] = useState('Reference weight')
    const [tituloTemperatureIsa, setTituloTemperatureIsa] = useState('Temperature (ISA)')
    const [tituloWind, setTituloWind] = useState('Wind')
    const [tituloReferenceTemperature, setTituloReferenceTemperature] = useState('Reference temperature')

    const handClick = (e) => {
        console.log(e.target.value);
        if (e.target.value === '1') {
            setTituloPeso('Weight Airplane (Kg)')
            setTituloMaxWeight('Max Weight (Kg)')
            setTituloMinWeight('Min Weight (Kg)')
            setOwerWeight('OwerWeight (Kg)')
            setAltitude('Altitude (Ft)')
            setTituloWeightRef ('Reference weight (Kg)')
            setTituloTemperatureIsa('Temperature (ISA) (ºC)')
            setTituloWind('Wind (Kt)')
            setTituloReferenceTemperature('Reference temperature (ºC)')


        }
        if (e.target.value === '2') {
            setTituloPeso('Weight Airplane (Lb)')
            setTituloMaxWeight('Max Weight (Lb)')
            setTituloMinWeight('Min Weight (Lb)')
            setOwerWeight('OwerWeight (Lb)')
            setAltitude('Altitude (Ft)')
            setTituloWeightRef ('Reference weight (Lb)')
            setTituloTemperatureIsa('Temperature (ISA) (ºC)')
            setTituloWind('Wind (Kt)')
            setTituloReferenceTemperature('Reference temperature (ºC)')
        }
    }
    const handleLogOut = function () {
        fetch("/LogOut", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },

        }).then((resposta) => resposta.json()).then((data) => {
            if (data) {
                window.location = '/'
            }

        })
    }
    return (

        <div className="container">
            <Logout></Logout>
            <FontAwesomeIcon icon={faArrowLeft} onClick={voltar} />
            <div className="titulo">Update Aircraft</div>
            <FontAwesomeIcon icon={faPlane} />
            <form action="#">
                <div className="detalhes">
                    <><div className="medidas">
                        <label htmlFor="" className="tituloS">Unit of Measurement</label>
                        <select onChange={handClick} className="medida" name="medidas" id="Medida1" defaultValue={'default'}>
                            <option value="default" disabled>Select measure:</option>
                            <option value="1">International</option>
                            <option value="2">Imperial</option>
                        </select></div>
                    </>
                    <InputCadastros desabilitado id="Modelo-de-aeronave1" type="text" placeholder="Enter Model">Aircraft Model</InputCadastros>
                    <InputCadastros onInput={validarCampoNegativo} id="Motor1" type="text" placeholder="Enter engine">Motor</InputCadastros>
                    <SelectCertificacao1></SelectCertificacao1>
                    <InputCadastros onInput={validarCampoNegativo} min="0" id="Reversor1" type="number" placeholder="Enter reverser" >Reverser</InputCadastros>
                    <InputCadastros onInput={validarCampoNegativo} min="0" id="Peso1" type="number" placeholder="Enter weight">{tituloPeso}</InputCadastros>

                </div>
                <div className='informacoes'>Reference values ​​for the calculation</div>
                <div className='detalhes'>
                    <InputCadastros onInput={validarCampoNegativo} min="0" id="Peso_ref" type="number" placeholder="Enter peso ref" >{tituloWeightRef}</InputCadastros>
                    <InputCadastros onInput={validarCampoNegativo} min="0" id="Alt" type="number" placeholder="Enter altitude" >{tituloAltitude}</InputCadastros>
                    <InputCadastros  min="0" id="Temp1" type="number" placeholder="Enter temperature">{tituloTemperatureIsa}</InputCadastros>
                    <InputCadastros  min="0" id="TempRef1" type="number" placeholder="Enter temperature">{tituloReferenceTemperature}</InputCadastros>
                    <InputCadastros onInput={validarCampoNegativo} min="0" id="Vento1" type="number" placeholder="Enter wind">{tituloWind}</InputCadastros>
                    <InputCadastros onInput={validarCampoNegativo} min="0" id="Slope1" type="number" placeholder="Enter Slope">Slope (%)</InputCadastros>

                </div>
                <div className="informacoes">Aircraft Parameter (Max - Min)</div>
                <div className="detalhes">
                    <InputCadastros onInput={validarCampoNegativo} min="0" id="Pmax" type="number" placeholder="Enter Max weight">{tituloMaxWeight}</InputCadastros>
                    <InputCadastros onInput={validarCampoNegativo} min="0" id="Owerweicght" type="number" placeholder="Enter owerweight">{tituloOwerWeight}</InputCadastros>
                    <InputCadastros onInput={validarCampoNegativo} min="0" id="Pmin" type="number" placeholder="Enter Min weight">{tituloMinWeight}</InputCadastros>
                    {/* <InputCadastros onInput={validarCampoNegativo} min="0" id="AltMax" type="number" placeholder="Altura Max">Altura Max</InputCadastros>
                    <InputCadastros onInput={validarCampoNegativo} min="0" id="AltMin" type="number" placeholder="Altura Min">Altura Min</InputCadastros> */}
                    <InputCadastros onInput={validarCampoNegativo} min="0" id="Overspeed1" type="number" placeholder="Overspeed">Overspeed </InputCadastros>
                    

                </div>
                <div className='button'>
                    <button type="submit" onClick={handleAtualizarAeronave}>Update</button>
                </div>
            </form>

        </div>

    );
}

export default AtualizarAeronave;