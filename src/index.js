import { createRoot } from 'react-dom/client'

import App from './components/app'

const section = document.querySelector('#root')
const root = createRoot(section)
root.render(<App />)
