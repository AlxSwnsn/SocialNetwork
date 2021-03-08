import React from "react";
import classes from './MyPosts.module.css'
import {Post} from "./post/Post";
import {PostType} from "../../../Redux/State";

type PropsType = {
    posts: Array<PostType>
    addPost: (message: string) => void
}

const MyPosts = (props: PropsType) => {

    let postsElements= props.posts.map((post)=> <Post message={post.message} id={post.id} like={post.like}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPost =()=>{
            props.addPost(newPostElement.current? newPostElement.current.value:"---")
        if (newPostElement.current){
            newPostElement.current.value=" "

        }

    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>

        </div>
    )

}


export default MyPosts;


    

