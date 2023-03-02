import { combineReducers } from 'redux'
import a from './module/a'
import b from './module/b'
import locale from './module/locale'
export default combineReducers({
    a,
    b,
    locale
})
