import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.jsx'

createRoot(document.getElementById('root')).render(
  //wrapping the app so that the components can use Redux
  <Provider store={store}> 
    <App />
  </Provider>,
)
