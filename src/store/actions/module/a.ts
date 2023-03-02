import * as types from '../../actionTypes'

export const changeName = (params: string) => {
    return {
        type: types.CHANGE_NAME,
        params
    }
}
