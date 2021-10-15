import {getAuthUserDataTC} from "./AuthReducer";

export const INITIALIZE_SUCCESS = "INITIALIZE_SUCCESS"

export type DataType = {
    initialized: boolean
}


let initialState: DataType = {
    initialized: false

}

export const AppReducer = (state = initialState, action: ActionTypes): DataType => {

    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initialized: true
            }


        default:
            return state
    }
}

export const initializeSuccessAC = () => ({
    type: INITIALIZE_SUCCESS
} as const)

export const initializeAppTC = () => (dispatch: any) => {
let promise = dispatch(getAuthUserDataTC())
Promise.all([promise])
    .then( ()=>{
    dispatch(initializeSuccessAC())
})
}




type  initializeSuccessActionType = ReturnType<typeof initializeSuccessAC>


type ActionTypes =
    initializeSuccessActionType