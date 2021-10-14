import React from "react";
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";


const Header = (props: any) => {
    return <header className={classes.header}>
        <img id="logo" alt="" src="https://cdn.logo.com/hotlink-ok/logo-social.png"/>
        <div className={classes.loginBlock}>
            {props.isAuth ?
                <div> {props.login} <button onClick={props.logoutTC}>Logout</button></div>
                : <NavLink to={'/login'}>Login</NavLink>
            }
        </div>
    </header>
}


export default Header;
