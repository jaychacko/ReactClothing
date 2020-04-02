const INITIAL_STATE={
    curentUser:null
}
const userReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type){
        case 'SET_CURRENT_USER':
            return {
                ...state,
                curentUser:action.payload
            }

            default:
                return state;
    }
}

export default userReducer;