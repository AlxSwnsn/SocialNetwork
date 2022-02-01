import {ProfileInfoType} from "../../../Redux/ProfileReducer";
import React from "react";
import {createField, Input, Textarea} from "../../common/FormControls/FormControls";
import {InjectedFormProps, reduxForm} from "redux-form";
 import {FormDataTypes} from "../../login/Login";
import s from './ProfileInfo.module.css'
import style from "./../../common/FormControls/FormControls.module.css"



type PropsType = {
    profile: ProfileInfoType
    onSubmit: (formData: FormDataTypes) => void
}
const ProfileDataForm: React.FC<InjectedFormProps<ProfileInfoType, PropsType> & PropsType>
    = (props) => {

    return <form onSubmit={props.handleSubmit}>
        <div>
            <button>Save</button>
            {props.error && <div className={style.formEntireError}>
                {props.error}
            </div>
            }
        </div>
        <div><b>Full name</b>: {createField("fullName", "Full name", [], Input, "")}  </div>

        <div><b>Looking for a job</b>: {props.profile.lookingForAJob ? "yes" : "no"}
            {createField("lookingForAJob", "", [], Input, "checkbox")}
        </div>
        <div><b>My skills</b>:
            {createField("lookingForAJobDescription", "My professional skills", [], Textarea, "")}

        </div>
        <div><b>About me</b>: {props.profile.aboutMe}
            {createField("aboutMe", "About me", [], Textarea, "")}
        </div>
        <div><b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
            return <div className={s.contacts}>
                <b>{key}:{createField("contacts."+ key, key, [], Input, "")}</b>
            </div>
        })}  </div>
    </form>


}
const ProfileDataFormReduxForm = reduxForm<ProfileInfoType, PropsType>
({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm