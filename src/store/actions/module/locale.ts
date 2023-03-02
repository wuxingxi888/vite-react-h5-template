import * as types from '../../actionTypes'

export const changeLocale = (params: string) => {
    return {
        type: types.CHANGE_LOCALE,
        params
    }
}
