import React from "react";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginTC} from "../../Redux/AuthReducer";
import {Redirect} from "react-router-dom";

type FormDataTypes = {
    login: string
    password: string
    rememberMe: boolean
}

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

const LoginForm: React.FC<InjectedFormProps<FormDataTypes>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name={"login"}
                   placeholder={"Login"}
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
        <div>
            <button>Log In</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<FormDataTypes>({
    form: "Login"
})(LoginForm)

export default connect(null, {loginTC})(Login)