import React from "react";
import './App.css';
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import Dialogs from "./components/dialogs/Dialogs";
import {Route} from "react-router-dom";
import Music from "./components/music/Music";
import News from "./components/news/News";
import Settings from "./components/settings/Settings";
import {RootStateType} from "./Redux/State";

type AppPropsType = {
    state: RootStateType
    dispatch: (action: any) => void
}


const App = (props: AppPropsType) => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className={"app-wrapper-content"}>
                <Route path={'/dialogs'} render={() => <Dialogs dialogsPage={props.state.dialogsPage}
                                                                dispatch={props.dispatch}
                                                              />}/>
                <Route path={'/profile'}
                       render={() => <Profile posts={props.state.profilePage.posts}
                                              newPostText={props.state.profilePage.newPostText}
                                              dispatch={props.dispatch}
                       />}/>
                <Route path={'/news'} render={() => <News/>}/>
                <Route path={'/music'} render={() => <Music/>}/>
                <Route path={'/settings'} render={() => <Settings/>}/>
            </div>
        </div>
    );
}


export default App;
