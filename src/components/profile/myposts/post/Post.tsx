import React from "react";
import classes from './Post.module.css'
import {PostType} from "../../../../Redux/State";


export const Post = (props:PostType ) => {
    return (

        <div>
            <div className={classes.item}>
                <img src={"https://vokrug-tv.ru/pic/news/5/f/c/2/rsz300x300_5fc2879465129c11d65749ab9e3db7cc.jpg"}/>
                <div>{props.message}</div>
                <span>Like </span>
                <span>{props.like}</span>
            </div>

        </div>
    )


}


