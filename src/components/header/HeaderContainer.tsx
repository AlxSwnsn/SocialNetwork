import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserDataTC, logoutTC} from "../../Redux/AuthReducer";
import {AppStateType} from "../../Redux/ReduxStore";

class HeaderContainer extends React.Component<any, any> {

    componentDidMount() {
      this.props.getAuthUserDataTC()
    }

    render() {

        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.Auth.isAuth,
    login: state.Auth.login
})
export default connect(mapStateToProps, {getAuthUserDataTC, logoutTC})(HeaderContainer);
