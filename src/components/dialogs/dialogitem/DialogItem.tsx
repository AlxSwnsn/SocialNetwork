import React from "react";
import {NavLink} from "react-router-dom";
import classes from './../Dialogs.module.css'

type dialogItemProps = {
    name: string
    id: number
}

const DialogItem = (props: dialogItemProps) => {

    return <div className={classes.dialog + ' ' + classes.active}>
        <NavLink to={"/dialogs/" + props.id}> {props.name}</NavLink>
    </div>
}
 export default DialogItem