import React, { Component } from 'react';
import axios from 'axios';

const baseUrl = "https://dv1ji20wpb.execute-api.us-east-1.amazonaws.com/DESA/pocinstana/lecturabucket";

class S3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : ""
        };
    }
    
    lecturabucket=()=> {
        this.setState({ data: "Consultando..." })
        axios.get(baseUrl)
        .then(response => {
            this.setState({ data: JSON.stringify(response.data.data) })
        }).catch(error => {
            this.setState({ data: "ERROR\n" + error})
            console.log(error);
        });
    }

    render() {
        return(
            <div className="container">
                <div className="form-cabecera">
                    Prueba de lectura de bucket S3
                </div>
                <div className="form-detalle">
                    <button className="btn btn-success" onClick={()=>this.lecturabucket()}>Leer archivo bucket</button>
                    <br></br>
                    <br></br>
                    <div className="input-group">
                        <textarea className="form-control" style={{height: 150}} readOnly value={this.state.data}>
                        </textarea>
                    </div>
                </div>
            </div>
        )
    }
}

export default S3