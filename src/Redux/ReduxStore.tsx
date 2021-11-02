import {applyMiddleware, combineReducers, createStore} from "redux";
import {SidebarReducer} from "./SidebarReducer";
import {DialogsReducer} from "./DialogsReducer";
import {ProfileReducer} from "./ProfileReducer";
import {UsersReducer} from "./UsersReducer";
import {AuthReducer} from "./AuthReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form"
import {AppReducer} from "./AppReducer";

let reducers = combineReducers({
    Profile: ProfileReducer,
    Dialogs: DialogsReducer,
    Sidebar: SidebarReducer,
    Users: UsersReducer,
    Auth: AuthReducer,
    form: formReducer,
    App: AppReducer
})


export let store = createStore(reducers, applyMiddleware(thunkMiddleware))


export type AppStateType = ReturnType<typeof reducers>
export type AppStoreType = typeof store

export default store

//@ts-ignore
window.store = store