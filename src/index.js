import { createRoot } from 'react-dom/client'

import { NoConnection } from './components/notifications'
import App from './components/app'

const section = document.querySelector('#root')
const root = createRoot(section)

root.render(window.navigator.onLine ? <App /> : <NoConnection />)
