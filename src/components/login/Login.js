import React, { Component } from 'react';
import styles from './Login.module.scss';
import ShoppingHeader from './../shopping-header/ShoppingHeader';

export default class Login extends Component {
    render() {
        return(
            <div className = {styles.login}>
               <ShoppingHeader></ShoppingHeader>
            </div>
        )
    }
}