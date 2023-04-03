import * as types from '../../actionTypes'
import { actionType } from '@/store/type'
import { storage } from '@/utils/storage'

const initState = {
    token: '' || storage.get(types.CHANGE_TOKEN),
    openInstall: null
}

export default function app(state = initState, action: actionType) {
    switch (action.type) {
        case types.CHANGE_TOKEN:
            return {
                ...state,
                token: action.data
            }
        case types.CHANGE_OPEN_INSTALL:
            return {
                ...state,
                openInstall: action.data
            }

        default:
            return state
    }
}
