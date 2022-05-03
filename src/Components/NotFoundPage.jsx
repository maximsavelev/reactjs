import React, { Component } from 'react';
import logo from "../resources/img/404.jpg";
import "../resources/styles/NotFound.css";

class NotFoundPage extends Component {
    render() {
        return (
            <div className='imageError'>
                <h1 className='textError'>Страница не найдена</h1>
                <img src="https://a.d-cd.net/588af19s-960.jpg" />
            </div>
        );
    }
}

export default NotFoundPage;