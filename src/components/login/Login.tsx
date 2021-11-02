import React from "react";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {createField, Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginTC} from "../../Redux/AuthReducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../Redux/ReduxStore";
import s from "./../common/FormControls/FormControls.module.css"

type FormDataTypes = {
    email: string
    password: string
    rememberMe: boolean
    //isAuth: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataTypes>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        {createField("email","Email", [required], Input, "email")}
        {createField("password","Password", [required], Input, "password")}
        {createField("checkbox",null, [], Input, "checkbox")}
        {props.error && <div className={s.formEntireError}>
            {props.error}
        </div>}
        <div>
            <button>Log In</button>
        </div>
    </form>
}
const LoginReduxForm = reduxForm<FormDataTypes>({
    form: "Login"
})(LoginForm)

type LoginPropsType = {
    loginTC: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}

const Login: React.FC<LoginPropsType> = ({loginTC, isAuth}) => {
    const login = (formData: FormDataTypes) => {
        debugger
        loginTC(formData.email, formData.password, formData.rememberMe)
    }
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={login}/>
    </div>
}


const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.Auth.isAuth
})
export default connect(mapStateToProps, {loginTC})(Login)