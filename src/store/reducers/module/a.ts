import * as types from '../../actionTypes'
import { actionType } from '@/store/type'

const initState = {
    name: 'xiaoming'
}

export default function a(state = initState, action: actionType) {
    switch (action.type) {
        case types.CHANGE_NAME:
            return {
                ...state,
                name: action.params
            }

        default:
            return state
    }
}
