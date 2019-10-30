import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './header.css'

class Header extends Component {
    render() {
        return (
            <header id="main-header">
                <div className="header-content">
                    <Link to="/">
                        Blog Programador
                    </Link>
                    <Link to="/login">
                        Entrar
                    </Link>
                </div>
            </header>
        );
    }
}

export default Header;