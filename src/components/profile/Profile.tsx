import React from "react";
import MyPostsContainer from "./myposts/MyPostsContainer";
import ProfileInfo, {ProfileInfoProps} from "./profileInfo/ProfileInfo";

const Profile = (props: ProfileInfoProps) => {
    return <div>
        <h2>Profile</h2>
        <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus} savePhoto={props.savePhoto} saveProfile={props.saveProfile} />
        <MyPostsContainer  />
    </div>


}


export default Profile;
