import {combineReducers, createStore} from "redux";
import {SidebarReducer} from "./SidebarReducer";
import {DialogsReducer} from "./DialogsReducer";
import {ProfileReducer} from "./ProfileReducer";
import {UsersReducer} from "./UsersReducer";

let reducers = combineReducers({
    Profile: ProfileReducer,
    Dialogs: DialogsReducer,
    Sidebar: SidebarReducer,
    Users: UsersReducer
})


export let store = createStore(reducers)


export type AppStateType = ReturnType<typeof reducers>
export type AppStoreType = typeof store

export default store