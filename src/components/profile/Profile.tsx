import React from "react";
import MyPosts from "./myposts/MyPosts";
import ProfileInfo from "./profileInfo/ProfileInfo";
import {PostType} from "../../Redux/State";


type PropsType = {
    posts: Array<PostType>
    addPost: (message: string) => void
}


const Profile = (props:PropsType) => {

    return <div>
        <ProfileInfo/>
        <MyPosts posts={props.posts} addPost={props.addPost}/>
    </div>


}


export default Profile;
