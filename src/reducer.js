import { createReducer } from 'redux-act'

const getDefaultState = () => ({
    test: 'test'
})

const reducer = createReducer({}, getDefaultState)


export default reducer