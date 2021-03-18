import React from "react";
import classes from './MyPosts.module.css'
import {Post} from "./post/Post";
import {PostType} from "../../../Redux/State";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../Redux/ProfileReducer";



type PropsType = {
    posts: Array<PostType>
    dispatch: (action: any) => void
    newPostText: string
}

const MyPosts = (props: PropsType) => {

    let postsElements = props.posts.map((post) => <Post message={post.message} id={post.id} like={post.like}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        props.dispatch(addPostActionCreator())
        if (newPostElement.current) {
            newPostElement.current.value = " "
        }
    }

    let onPostChange = () => {
        let text = (newPostElement.current ? newPostElement.current.value : "---")
        props.dispatch(updateNewPostTextActionCreator(text))

    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement} onChange={onPostChange}/>
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


    
