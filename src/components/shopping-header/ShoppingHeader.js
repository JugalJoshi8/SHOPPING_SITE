import React, { Component } from 'react';
import styles from './ShoppingHeader.module.scss';

export default class ShoppingHeader extends Component {
    render() {
        return (
            <header>
                <div className={styles.logo}></div>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>Products</li>
                    </ul>
                </nav>
                <div className = {styles.cartBtnCntnr}>
                    <div className={styles.btnCntnr}>
                        <button>Signin</button>
                        <button>Register</button>
                    </div>
                    <div className={styles.cart}>
                        <div className={styles.cartImage}></div>
                        <div>0 items</div>
                    </div>
                </div>
            </header>
        )
    }
}