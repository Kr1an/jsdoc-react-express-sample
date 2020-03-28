import api from 'api/typings'

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_SERVER_URL: string
            REACT_APP_CLIENT_URL: string
        }
    }
}



declare namespace Reducers {
    interface Root {
        bins: BinsStore
    }
    interface BinsStore {
        latest: Array<api.Data.Output.Bin>
        loading: boolean
        single: api.Data.Output.Bin
    }
}

declare namespace Latest {
    interface HandlersTypes {
        onRefreshBtnClick: Function
        onOpenBinHandler: (id: string) => void
    }
    interface ValuesTypes {
        items: Array<api.Data.Output.Bin>
    }
    interface PropTypes extends HandlersTypes, ValuesTypes {}
}

declare namespace Single {
    interface PropTypes {
        bin: api.Data.Output.Bin
    }
}

declare namespace Create {
    interface WithInputState {
        value: string
        onChange: (val: string) => void
    }
    interface HandlerTypes {
        handleSubmit: (value: string) => void
    }
    interface PropTypes extends WithInputState, HandlerTypes {}
}