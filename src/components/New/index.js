import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import "./new.css";

class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            imagem: '',
            descricao: ''
        };

        this.cadastrar = this.cadastrar.bind(this);
    }

    cadastrar(e){

    }

    render() {
        return (
            <div id="new">
                <header>
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.cadastrar} id="new-post">
                    <label>Titulo:</label><br/>
                    <input type="text" placeholder="Nome do Post" value={this.state.titulo} autoFocus
                        onChange={(e) => this.state({titulo: e.target.value})}/><br/>

                    <label>Url da imagem:</label><br/>
                    <input type="text" placeholder="Url da capa" value={this.state.imagem}
                           onChange={(e) => this.state({imagem: e.target.value})}/><br/>

                    <label>Descrição:</label><br/>
                    <textarea placeholder="Alguma descrição..." value={this.state.descricao}
                           onChange={(e) => this.state({descricao: e.target.value})}/><br/>

                           <button type="submit">Cadastrar</button>
                </form>
            </div>
        )
    }
}

export default withRouter(New)
