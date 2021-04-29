import React, { Component } from 'react';
import Busqueda from './Busqueda';
import axios from 'axios';

const baseUrl = "https://dv1ji20wpb.execute-api.us-east-1.amazonaws.com/DESA/pocinstana/operacionsqs";

class SQS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentario : "",
            resultado : "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    registroSQS=()=> {
        this.setState({ resultado: "Enviando..." })
        axios.post(baseUrl, {
            comentario: this.state.comentario
        }).then(response => {
            console.log(response.data)
            this.setState({ resultado: "ID del mensaje: " + response.data.idmessagesqs })
            this.setState({ comentario: "" })
        }).catch(error => {
            this.setState({ resultado: "ERROR\n" + error})
            console.log(error);
        });
    }

    handleChange(event) {
        this.setState({comentario: event.target.value});
    }

    render() {
        return(
            <div className="container">
                <div className="form-cabecera">
                    Prueba registro SQS
                </div>
                <div className="form-detalle">
                    <div className="form-group">
                        <input type="text" className="form-control" id="txtcomentario" placeholder="Deje su comentario" value={this.state.comentario} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success" onClick={()=>this.registroSQS()}>Enviar comentario</button>
                    </div>
                    <div className="form-group">
                        <label>{this.state.resultado}</label>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div className="form-cabecera">
                    Prueba de lectura SQS - Dynamo
                </div>
                <Busqueda/>
            </div>
        )
    }
}

export default SQS