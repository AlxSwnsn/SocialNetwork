import React from "react";
import ProfileInfo from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./myposts/MyPostsContainer";
import { AppStoreType } from "../../Redux/ReduxStore";


type PropsType = {
    store:AppStoreType
}


const Profile = () => {

    return <div>
        <ProfileInfo/>
        <MyPostsContainer  />
    </div>


}


export default Profile;
