import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../common/preloader/Preloader";
import {ProfileInfoType, saveProfileTC} from "../../../Redux/ProfileReducer";
import ProfileStatusHooks from "./ProfileStatusHooks";
import userPhoto from "../../../assets/Images/user.jpg";
import ProfileDataFormReduxForm from "./ProfileDataForm";
import {useDispatch} from "react-redux";

export type ProfileInfoProps = {
    profile: ProfileInfoType | null
    saveProfile: (profile: ProfileInfoType) => void
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    goToEditMode?: () => void

}

type ContactsType = {
    contactTitle: string
    contactValue: string
}

const ProfileInfo = (props: ProfileInfoProps) => {
    const dispatch = useDispatch()
    let [editMode, setEditMode] = useState(false)
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: (ChangeEvent<HTMLInputElement>) | any) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileInfoType) => {
        dispatch(saveProfileTC(formData).then(
            ()=>{
            setEditMode(false)
        }))}

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto
                } className={s.mainPhoto}/>
                {props.isOwner &&
                <input type={"file"} onChange={onMainPhotoSelected}/>}
                {editMode ? <ProfileDataFormReduxForm initialValues={props.profile} profile={props.profile}
                                                      onSubmit={onSubmit}/> :
                    <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => {
                        setEditMode(true)
                    }}/>}
                <ProfileStatusHooks status={props.status} updateStatus={props.updateStatus}/>

            </div>


        </div>
    )
}
const ProfileData = (props: { isOwner: boolean, profile: ProfileInfoType, goToEditMode: () => void }) => {
    return <div>
        {props.isOwner && <div>
            <button onClick={props.goToEditMode}>Edit</button>
        </div>}
        <div><b>Full name</b>: {props.profile.fullName}  </div>

        <div><b>Looking for a job</b>: {props.profile.lookingForAJob ? "yes" : "no"}  </div>
        {props.profile.lookingForAJob &&
        <div><b>My skills</b>: {props.profile.lookingForAJobDescription}  </div>}
        <div><b>About me</b>:</div>
        <div><b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
            return <Contacts key={key} contactTitle={key} contactValue={props.profile?.contacts[key]}/>
        })}  </div>
    </div>

}

const Contacts = ({contactTitle, contactValue}: ContactsType) => {
    return <div className={s.contacts}><b>{contactTitle}</b>: {contactValue} </div>
}


export default ProfileInfo;
