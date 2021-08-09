import React from "react";
import classes from './ProfileInfo.module.css'
import Preloader from "../../common/preloader/Preloader";
import {ProfileInfoType} from "../../../Redux/ProfileReducer";
import ProfileStatus from "./ProfileStatus";

export type ProfileInfoProps = {
    profile: ProfileInfoType | null
    status: string
    updateStatus: (status: string)=> void

}

const ProfileInfo = (props: ProfileInfoProps) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            {/*<div>*/}
            {/*    <img src={props.profile.photos.large}/>*/}
            {/*</div>*/}
            <div className={classes.descriptionBlock}>
                Avatar + description
                <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    )
}


export default ProfileInfo;
