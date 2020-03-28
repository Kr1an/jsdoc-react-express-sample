import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import WebFontLoader from 'webfontloader'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import './index.css'
import App from './App'
import rootReducer from './reducer'
import rootSaga from './sagas'

WebFontLoader.load({
    google: {
        families: ['Rubik', 'Roboto', 'Lato', 'M PLUS Rounded 1c']
    }
})

const initStore = () => {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(rootSaga)
    return store
}
  

ReactDOM.render(
    <Provider store={initStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
)