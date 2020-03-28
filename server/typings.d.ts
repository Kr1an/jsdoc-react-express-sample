import mongodb from 'mongodb'
import express from 'express'


declare namespace Core {
    type Bin = {
        content: string
    }
}

declare namespace Mongo {
    type WithMongoId = {
        _id: mongodb.ObjectID
    }
    type ReplaceObjectIdWithStr<T> = {
        [key in keyof T]: T[key] extends mongodb.ObjectID ? string : T[key]
    }
    
    type Bin = Core.Bin & WithMongoId
}

declare namespace Data {
    namespace Output {
        type Bin = Mongo.ReplaceObjectIdWithStr<Mongo.Bin>
    }
    type Error = 'bad_value' | 'not_found'
}

declare namespace API {
    type Request<T> = Omit<express.Request, 'body'> & {
        body?: T
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGODB_CONN_STR: string
            API_PORT: string
        }
    }
}
