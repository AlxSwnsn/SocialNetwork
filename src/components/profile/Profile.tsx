import React from "react";
import MyPosts from "./myposts/MyPosts";
import ProfileInfo from "./profileInfo/ProfileInfo";
import {PostType} from "../../Redux/State";


type PropsType = {
    posts: Array<PostType>
    newPostText: string
    dispatch: (action: any) => void
}


const Profile = (props:PropsType) => {

    return <div>
        <ProfileInfo/>
        <MyPosts posts={props.posts}
                 newPostText={props.newPostText}
                 dispatch={props.dispatch}
        />
    </div>


}


export default Profile;
