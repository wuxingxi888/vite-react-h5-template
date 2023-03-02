import * as types from '../../actionTypes'
import { actionType } from '@/store/type'
const initState = {
    age: 22
}

export default function b(state = initState, action: actionType) {
    switch (action.type) {
        case types.CHANGE_AGE:
            return {
                ...state,
                age: action.params
            }

        default:
            return state
    }
}
