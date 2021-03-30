import {combineReducers, createStore} from "redux";
import {SidebarReducer} from "./SidebarReducer";
import {DialogsReducer} from "./DialogsReducer";
import {ProfileReducer} from "./ProfileReducer";

let reducers = combineReducers({
    Profile: ProfileReducer,
    Dialogs: DialogsReducer,
    Sidebar: SidebarReducer
})


export let store = createStore(reducers)


export type AppStateType = ReturnType<typeof reducers>
export type AppStoreType = typeof store

