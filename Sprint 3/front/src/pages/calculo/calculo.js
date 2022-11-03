import React from 'react';
import { useState } from 'react'
import "./calculo.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneArrival } from '@fortawesome/free-solid-svg-icons'
import InputCadastros from "../../componentes/inputCadastros/inputCadastro";
// import NativeSelectDemo from "../../componentes/select/select";
import SelectSlope from "../../componentes/select/selectSlope";
import SelectFlap from "../../componentes/select/selectFlap";
import SelectCondicao from "../../componentes/select/selectCondicao"
import SelectIce from "../../componentes/select/selectIce";
import SelectBk from "../../componentes/select/selectBk";
import SelectWind from "../../componentes/select/selectWind";
const Swal = require('sweetalert2')


function validacao(e) {
    var numAlt = document.getElementById("Alt");
    var numPeso = document.getElementById("Peso");
    var numWind = document.getElementById("Wind");
    var numReversor = document.getElementById("Reversor");
    var numSlope = document.getElementById("InputSlope");
    const campos = [numAlt, numPeso, numReversor, numSlope, numWind]
    console.log("campos" + campos);
    let Evalido = true
    for (var campo of campos) {
        console.log(campo);
        if (campo.value < 0) {
            campo.value = 0
            Evalido = false
        }
        if (campo.value === "") {
            Evalido = false
        }
    } return Evalido

}
function validacao2(e) {
    var valFlap = document.getElementById("slcFlap").value;
    var valRC = document.getElementById("runway_condition").value;
    var valIce = document.getElementById("slcIce").value;
    var valSlope = document.getElementById("slcSlope").value;
    var valWind = document.getElementById("slcWind").value;
    const selects = [valFlap, valRC, valIce, valSlope, valWind]
    let Evalido2 = true
    for (var sel of selects) {
        if (sel === "default") {
            Evalido2 = false
        }
    } return Evalido2
}
function validacao3(e) {
    const numAlt = document.getElementById("Alt");
    const numPeso = document.getElementById("Peso");
    const numWind = document.getElementById("Wind");
    const numReversor = document.getElementById("Reversor");
    const numSlope = document.getElementById("InputSlope");
    const campos = [numAlt, numPeso, numReversor, numSlope, numWind]
    console.log("campos" + campos);
    let Evalido3 = true
    for (const campo of campos) {
        if (campo.value === "") {
            Evalido3 = false
        }
    } return Evalido3
}


const func = (tipo) => {

    if (tipo === 'flap') {
        return <SelectFlap></SelectFlap>
    }
    if (tipo === 'bk') {
        return <SelectBk></SelectBk>
    }
}


var handleCalcular = function (e) {
    e.preventDefault();
    if (!validacao2()) {
        Swal.fire({
            icon: 'error',
            title: 'Select an option',

        })
        return true
    }
    if (!validacao3()) {
        Swal.fire({
            icon: 'error',
            title: 'Field cannot be empty',
        })
        return true
    }
    if (!validacao()) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid type',
            text: 'Cannot enter negative numbers',
        })
        return true
    }
    if (!validacao2()) {
        Swal.fire({
            icon: 'error',
            title: 'Select an option',

        })
        return true
    }

    var dados = {
        UnitOfMeasurement: parseInt(document.getElementById('medida').value),
        Flap: parseInt(document.getElementById('slcFlap').value),
        Ice: document.getElementById('slcIce').value === 1 ? false : true,
        RunwayCondicion: parseInt(document.getElementById('runway_condition').value),
        Peso: parseInt(document.getElementById('Peso').value),
        Alt: parseInt(document.getElementById('Alt').value),
        LikeWind: parseInt(document.getElementById('slcWind').value),
        Wind: parseInt(document.getElementById('Wind').value),
        Temp: parseInt(document.getElementById('Temp').value),
        LikeSlope: Number(document.getElementById('slcSlope').value),
        Slope: parseInt(document.getElementById('InputSlope').value),
        Rev: parseInt(document.getElementById('Reversor').value)

    };

    fetch("/calcular", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(dados)
    }).then((resposta) => resposta.json()).then((data) => {
        document.getElementById('result').value = data.toFixed(2) + "m";
        Swal.fire({
            title: 'Calculation performed successfully',
            text: "You need " + data.toFixed(2) + "m",
            icon: 'success',
        })
    })

}

const Calculo = () => {
    const [tituloPeso, setTituloPeso] = useState('Weight')
    const [tituloAltitude, setTituloAltitude] = useState('Altitude')
    const [tituloTemperature, setTituloTemperature] = useState('Temperature')
    const [tituloWind, setWind] = useState('Wind')
    const [placeholderWeight, setPlaceholderWeight] = useState('18')
    const [placeholderAltitude, setPlaceholderAltitude] = useState('1800')
    const [placeholderTemperature, setPlaceholderTemperature] = useState('20')
    const [placeholderWind, setPlaceholderWind] = useState('2')



    const handClick = (e) => {
        console.log(e.target.value);
        if (e.target.value === '1') {
            setTituloPeso('Weight (T)')
            setTituloAltitude('Altitude (M)')
            setTituloTemperature('Temperature (ºC)')
            setWind('wind (Km/h)')
            setPlaceholderAltitude('1800')
            setPlaceholderTemperature('20')
            setPlaceholderWeight('18')
            setPlaceholderWind('2')
            
        }
        if (e.target.value ==='2'){
            setTituloPeso('Weight (Lb)')
            setTituloAltitude('Altitude (Ft)')
            setTituloTemperature('Temperature (ºF)')
            setWind('wind (Kt)')
            setPlaceholderAltitude('5905')
            setPlaceholderTemperature('68')
            setPlaceholderWeight('39683')
            setPlaceholderWind('1,07991')
        }
    }
    return (
        <div className="cont">
            {/* <a href="./home"><FontAwesomeIcon icon={faArrowLeft} /></a> */}
            <div className="tituloCal">Landing calculation</div>
            <FontAwesomeIcon icon={faPlaneArrival} />
            <form action="#">
                <div className="detalhes-aeronave">
                    <><div className="medidas">
                        <label htmlFor="" className="tituloS">Unit of Measurement</label>
                        <select onChange={handClick} className="medida" name="medidas" id="medida" defaultValue={'default'}>
                            <option value="default" disabled>Select measure:</option>
                            <option value="1">Internacional</option>
                            <option value="2">Imperial</option>
                        </select></div>
                    </>
                    {func('flap')}
                    <SelectIce></SelectIce>
                    <SelectCondicao></SelectCondicao>
                    <InputCadastros min="0" id="Peso" type="number" placeholder={placeholderWeight} >{tituloPeso}</InputCadastros>
                    <SelectSlope></SelectSlope>
                    <InputCadastros min="0" id="InputSlope" type="number" placeholder="Ex.: 0.2">Slope (%)</InputCadastros>
                    <InputCadastros min="0" id="Alt" type="number" placeholder={placeholderAltitude} >{tituloAltitude}</InputCadastros>
                    <InputCadastros id="Temp" type="number" placeholder={placeholderTemperature}>{tituloTemperature}</InputCadastros>
                    <SelectWind></SelectWind>
                    <InputCadastros min="0" id="Wind" type="number" placeholder={placeholderWind}>{tituloWind}</InputCadastros>
                    {/* <InputCadastros min="0" id="Overspeed" type="number" placeholder="Enter the overspeed">Overspeed</InputCadastros> */}
                    <InputCadastros qtd="10" min="0" id="Reversor" type="number" placeholder="Ex.: 1">Reverser (Un) </InputCadastros>

                </div>

               
                <div className="button">
                    <input type="submit" onClick={handleCalcular} value="Calculate" id="calcular" />
                </div>
                <div className="input_box">
                    <span className="details">Necessary clue</span>
                    <input type="text" placeholder="Result" disabled="disabled" id="result" />
                </div>
            </form>
        </div>


    );
}

export default Calculo;