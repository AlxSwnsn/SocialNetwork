import React from "react";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {createField, Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginTC} from "../../Redux/AuthReducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../Redux/ReduxStore";
import s from "./../common/FormControls/FormControls.module.css"

export type FormDataTypes = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
    photos: {
        large: string
        small: string
    }
}

type CaptchaUrlPropsType = {
    captchaUrl: string | null
}
type LoginFormPropsType =  InjectedFormProps<FormDataTypes, CaptchaUrlPropsType> & CaptchaUrlPropsType

const LoginForm = (props: LoginFormPropsType) => {
    return <form onSubmit={props.handleSubmit}>
        {createField("email", "Email", [required], Input, "email")}
        {createField("password", "Password", [required], Input, "password")}
        {createField("checkbox", null, [], Input, "checkbox")}
        {props.captchaUrl && <img src={props.captchaUrl}/>}
        {props.captchaUrl &&
        createField("captcha", null,[required], Input,"captcha")}
        {props.error && <div className={s.formEntireError}>
            {props.error}
        </div>}
        <div>
            <button>Log In</button>
        </div>
    </form>
}
const LoginReduxForm = reduxForm<FormDataTypes, CaptchaUrlPropsType>({
    form: "Login"
})(LoginForm)

type LoginPropsType = {
    loginTC: (email: string, password: string, rememberMe: boolean, captcha: string|null) => void
    isAuth: boolean
    captchaUrl: string | null
}

const Login: React.FC<LoginPropsType> = (props) => {
    const onSubmit = (formData: FormDataTypes) => {
        props.loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm
            onSubmit={onSubmit}
            captchaUrl={props.captchaUrl}
        />
    </div>
}


const mapStateToProps = (state: AppStateType) => ({
    captchaUrl: state.Auth.captchaUrl,
    isAuth: state.Auth.isAuth
})
export default connect(mapStateToProps, {loginTC})(Login)