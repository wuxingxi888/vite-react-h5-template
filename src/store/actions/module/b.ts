import * as types from '../../actionTypes'

export const changeAge = (params: number) => {
    return {
        type: types.CHANGE_AGE,
        params
    }
}
