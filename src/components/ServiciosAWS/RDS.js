import React, { Component } from 'react';
import axios from 'axios';

const baseUrl = "https://dv1ji20wpb.execute-api.us-east-1.amazonaws.com/DESA/pocinstana/operacionrds";

class RDS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentario : "",
            idcomentario : "",
            resultado : "",
            resultadobusq : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeID = this.handleChangeID.bind(this);
    }

    registroRDS=()=> {
        this.setState({ resultado: "Enviando..." })
        axios.post(baseUrl, {
            comentario: this.state.comentario
        }).then(response => {
            console.log(response.data)
            this.setState({ resultado: "ID del mensaje: " + response.data.comentario.id })
            this.setState({ comentario: "" })
        }).catch(error => {
            this.setState({ resultado: "ERROR\n" + error})
            console.log(error);
        });
    }

    busquedaRDS=()=> {
        this.setState({ resultadobusq: "Consultando..." })
        axios.get(baseUrl + '?id=' + this.state.idcomentario)
        .then(response => {
            this.setState({ resultadobusq: "Comentario: " + response.data.comentario.detalle })
        }).catch(error => {
            this.setState({ resultadobusq: "ERROR\n" + error})
            console.log(error);
        });
    }

    handleChange(event) {
        this.setState({comentario: event.target.value});
    }

    handleChangeID(event) {
        this.setState({idcomentario: event.target.value});
    }

    render() {
        return(
            <div className="container">
                <div className="form-cabecera">
                    Prueba de escritura RDS
                </div>
                <div className="form-detalle">
                    <div className="form-group">
                        <input type="text" className="form-control" id="txtcomentario" placeholder="Deje su comentario" value={this.state.comentario} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success" onClick={()=>this.registroRDS()}>Enviar comentario</button>
                    </div>
                    <div className="form-group">
                        <label>{this.state.resultado}</label>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div className="form-cabecera">
                    Prueba de lectura RDS
                </div>
                <div className="form-detalle">
                    <div className="form-group">
                        <input type="text" className="form-control" id="txtidcomentario" placeholder="ID comentario" value={this.state.idcomentario} onChange={this.handleChangeID}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success" onClick={()=>this.busquedaRDS()}>Buscar comentario</button>
                    </div>
                    <div className="form-group">
                        <label>{this.state.resultadobusq}</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default RDS