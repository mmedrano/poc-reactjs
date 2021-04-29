import React, { Component } from 'react';
import axios from 'axios';

const baseUrl = "https://dv1ji20wpb.execute-api.us-east-1.amazonaws.com/DESA/pocinstana/operaciondynamo";

class Busqueda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idcomentario : "",
            resultadobusq : ""
        };
        this.handleChangeID = this.handleChangeID.bind(this);
    }

    busquedaDynamo=()=> {
        this.setState({ resultadobusq: "Consultando..." })
        axios.get(baseUrl + '?id=' + this.state.idcomentario)
        .then(response => {
            this.setState({ resultadobusq: "Comentario: " + response.data.comentario.comentario.S })
        }).catch(error => {
            this.setState({ resultadobusq: "ERROR\n" + error})
            console.log(error);
        });
    }

    handleChangeID(event) {
        this.setState({idcomentario: event.target.value});
    }

    render() {
        return(
            <div className="form-detalle">
                <div className="form-group">
                    <input type="text" className="form-control" id="txtidcomentario" placeholder="ID comentario" value={this.state.idcomentario} onChange={this.handleChangeID}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-success" onClick={()=>this.busquedaDynamo()}>Buscar comentario</button>
                </div>
                <div className="form-group">
                    <label>{this.state.resultadobusq}</label>
                </div>
            </div>
        )
    }
}

export default Busqueda