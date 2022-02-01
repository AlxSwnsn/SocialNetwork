import React from "react";
import './App.css';
import Navbar from "./components/navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import Music from "./components/music/Music";
import News from "./components/news/News";
import Settings from "./components/settings/Settings";
import HeaderContainer from "./components/header/HeaderContainer";
import UsersContainer from "./components/users/UsersContainer";
import Login from "./components/login/Login";
import {connect} from "react-redux";
import {initializeAppTC} from "./Redux/AppReducer";
import {AppStateType} from "./Redux/ReduxStore";
import Preloader from "./components/common/preloader/Preloader";
import {withSuspense} from "./HOC/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/profile/ProfileContainer"));


class App extends React.Component<any> {
    componentDidMount() {
        this.props.initializeAppTC()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Route path={'/dialogs'} render={withSuspense(DialogsContainer)}/>
                    <Route path={'/profile/:userId?'} render={withSuspense(ProfileContainer)}/>
                    <Route path={'/users'}
                           render={() =>
                               <UsersContainer/>}/>
                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.App.initialized
})
export default withRouter(connect(mapStateToProps, {initializeAppTC})(App));
