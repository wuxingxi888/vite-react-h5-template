import ReactDOM from 'react-dom/client'
import App from './App'
// 引入全局样式
import '@/styles/index.scss'
import { Provider } from 'react-redux'
import store from '@/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // 严格模式
    // <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
    // </React.StrictMode>
)
