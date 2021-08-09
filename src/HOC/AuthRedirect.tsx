import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../Redux/ReduxStore";
import {connect} from "react-redux";
import  {MapStateToPropsRedirectType} from "../components/profile/ProfileContainer";


const mapStateToPropsRedirect = (state: AppStateType): MapStateToPropsRedirectType => {
    return {
        isAuth: state.Auth.isAuth
    }
}
export function withAuthRedirect <T>(Component: ComponentType<T>)  {
    const RedirectComponent = (props: MapStateToPropsRedirectType) => {
        let {isAuth, ...restProps}=props
        if (!isAuth) return <Redirect to='/login'/>
        return <Component {...restProps as T}/>
    }


    let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}