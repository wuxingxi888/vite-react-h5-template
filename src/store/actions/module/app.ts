import { storage } from '@/utils/storage'
import * as types from '../../actionTypes'

export const changeToken = (data: string) => {
    storage.set(types.CHANGE_TOKEN, data)
    return {
        type: types.CHANGE_TOKEN,
        data
    }
}

export const changeOpenInstall = (data: OpenInstall) => {
    return {
        type: types.CHANGE_OPEN_INSTALL,
        data
    }
}
