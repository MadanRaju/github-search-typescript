import axios from 'axios'
import { reduxActionTypes } from '../utils/dataTypes'

export const asyncActionTypeCreator = (actionName: string) => ({
  pending: `${actionName}_PENDING`,
  fulfilled: `${actionName}_FULFILLED`,
  rejected: `${actionName}_REJECTED`
})

export const normalActionCreator = (type: string) => ({
  type
})

export const payloadActionCreator = (type: string, payload: Object) => ({
  type,
  payload
})

export const asyncActionCreator = (actionType: reduxActionTypes) => {
  const pending = () => normalActionCreator(actionType.pending)
  const fulfilled = (payload: Object) =>
    payloadActionCreator(actionType.fulfilled, payload)
  const rejected = () => normalActionCreator(actionType.rejected)
  const action =
    (axiosConfig: Object, sucessCallBack: Function, errorCallBack: Function) =>
    (dispatch: any) => {
      dispatch(pending())
      return axios(axiosConfig)
        .then(response => {
          dispatch(fulfilled(response.data))
          if (sucessCallBack) {
            sucessCallBack(response)
          }
        })
        .catch(response => {
          dispatch(rejected())
          if (errorCallBack) {
            errorCallBack(response)
          }
        })
    }
  return {
    pending,
    fulfilled,
    rejected,
    action
  }
}
