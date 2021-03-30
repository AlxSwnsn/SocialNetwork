import React from "react";
import './App.css';
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import {Route} from "react-router-dom";
import Music from "./components/music/Music";
import News from "./components/news/News";
import Settings from "./components/settings/Settings";
import {AppStateType, AppStoreType} from "./Redux/ReduxStore";
import DialogsContainer from "./components/dialogs/DialogsContainer";

type AppPropsType = {
    state: AppStateType
    dispatch: (action: any) => void
    store: AppStoreType
}


const App = () => {

    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className={"app-wrapper-content"}>
                <Route path={'/dialogs'} render={() => <DialogsContainer/>
                }/>
                <Route path={'/profile'}
                       render={() =>
                           <Profile/>
                       }/>
                <Route path={'/news'} render={() => <News/>}/>
                <Route path={'/music'} render={() => <Music/>}/>
                <Route path={'/settings'} render={() => <Settings/>}/>
            </div>
        </div>
    );
}


export default App;
