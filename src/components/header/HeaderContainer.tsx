import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/ReduxStore";
import {logoutTC} from "../../Redux/AuthReducer";
class HeaderContainer extends React.Component<any, any> {

    render() {

        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.Auth.isAuth,
    login: state.Auth.login
})
export default connect(mapStateToProps, {logoutTC})(HeaderContainer);
