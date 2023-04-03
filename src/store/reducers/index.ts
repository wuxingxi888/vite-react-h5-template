import { combineReducers } from 'redux'
import app from './module/app'
import locale from './module/locale'
export default combineReducers({
    app,
    locale
})
