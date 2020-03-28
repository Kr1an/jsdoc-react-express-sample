import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import WebFontLoader from 'webfontloader'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'


import './index.css'
import App from './App'
import createRootReducer from './reducer'
import rootSaga from './sagas'
import { routerMiddleware } from 'connected-react-router'

WebFontLoader.load({
    google: {
        families: ['Rubik', 'Roboto', 'Lato', 'M PLUS Rounded 1c']
    }
})

const history = createBrowserHistory()

const initStore = () => {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        createRootReducer(history),
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware,
        )
    )
    sagaMiddleware.run(rootSaga)
    return store
}

ReactDOM.render(
    <Provider store={initStore()}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)