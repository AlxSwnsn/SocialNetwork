import React from "react";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginTC} from "../../Redux/AuthReducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../Redux/ReduxStore";
import s from "./../common/FormControls/FormControls.module.css"

type FormDataTypes = {
    login: string
    password: string
    rememberMe: boolean
    isAuth: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataTypes>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name={"login"}
                   placeholder={"Email"}
                   validate={[required]}
                   component={Input}/>

        </div>
        <div>
            <Field name={"password"}
                   placeholder={"Password"}
                   type={"password"}
                   validate={[required]}
                   component={Input}/>
        </div>
        <div>
            <Field type={"checkbox"} name={"rememberMe"} component={Input}/>Remember me
        </div>
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

const Login = (props: any) => {
    const login = (formData: FormDataTypes) => {
        props.loginTC(formData.login, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
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