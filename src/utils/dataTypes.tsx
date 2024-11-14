export type reduxActionTypes = {
    pending: string,
    fulfilled: string,
    rejected: string
}

export type reducerObject = {
    isPending: boolean,
    isFulfilled: boolean,
    isRejected: boolean,
    data: Object[]
}

export type payloadActionTypes = {
    type: string,
    payload: Object[]
}

export type reducerStateTypes = {
    getReposReducer: {
        repositories: reducerObject
    }
}

export type componentReduxTypes = {
    reposData: reducerObject,
    getRepositories: Function | undefined
}