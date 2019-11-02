import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import firebase from "../../firebase";
import "./new.css";

class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            imagem: null,
            url: '',
            descricao: '',
            alert: '',
            progress: 0
        };

        this.cadastrar = this.cadastrar.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    componentDidMount() {
        if (!firebase.getCurrent()) {
            this.props.history.push('/');
            return null;
        }
    }

    cadastrar = async (e) => {
        e.preventDefault();

        if (this.state.titulo !== "" &&
            this.state.imagem !== "" &&
            this.state.descricao !== "" &&
            this.state.imagem !== null &&
            this.state.url !== "") {
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;
            await posts.child(chave).set({
                titulo: this.state.titulo,
                image: this.state.url,
                descricao: this.state.descricao,
                autor: localStorage.nome
            });

            this.props.history.push('/dashboard');
        } else {
            this.setState({
                alert: 'Preencha todos os campos!'
            })
        }
    };

    handleFile = async (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/png' || image.type === 'image/jpeg') {
                await this.setState({imagem: image});
                this.handleUpload();
            } else {
                alert('Envie uma imagem do tipo PNG ou JPG');
                this.setState({image: null});
                return null;
            }
        }
    };

    handleUpload = async () => {
        const {imagem} = this.state;
        const currentId = firebase.getCurrentId();

        const uploadTaks = firebase.storage
            .ref(`images/${currentId}/${imagem.name}`)
            .put(imagem);

        await uploadTaks.on('state_changed',
            (snapshot) => {
                //progress
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                this.setState({progress});
            },
            (error) => {
                //error
                console.log('Erro ao enviar imagem: ' + error);
            },
            () => {
                //sucesso
                firebase.storage.ref('images/' + currentId)
                    .child(imagem.name).getDownloadURL()
                    .then(url => {
                        this.setState({
                            url: url
                        });
                    })
            });
    };

    render() {
        return (
            <div id="new">
                <header>
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.cadastrar} id="new-post">
                    <span>{this.state.alert}</span>

                    <input type="file" onChange={this.handleFile}/><br/>
                    {this.state.url !== '' ?
                        <img src={this.state.url} width="250" height="150" alt="Capa do post"/>
                        :
                        <progress value={this.state.progress} max="100"/>
                    }

                    <label>Titulo:</label><br/>
                    <input type="text" placeholder="Nome do Post" value={this.state.titulo} autoFocus
                           onChange={(e) => this.setState({titulo: e.target.value})}/><br/>

                    <label>Descrição:</label><br/>
                    <textarea placeholder="Alguma descrição..." value={this.state.descricao}
                              onChange={(e) => this.setState({descricao: e.target.value})}/><br/>

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        )
    }
}

export default withRouter(New)
