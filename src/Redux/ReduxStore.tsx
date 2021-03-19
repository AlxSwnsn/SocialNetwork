import {combineReducers, createStore} from "redux";
import {SidebarReducer} from "./SidebarReducer";
import {DialogsReducer} from "./DialogsReducer";
import {ProfileReducer} from "./ProfileReducer";

let reducers = combineReducers({
    ProfileReducer: ProfileReducer,
    DialogsReducer: DialogsReducer,
    SidebarReducer: SidebarReducer
})

export let store=createStore(reducers)