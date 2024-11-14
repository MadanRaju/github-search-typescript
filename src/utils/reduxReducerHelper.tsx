const promiseState = (isPending: boolean, isFulfilled: boolean, isRejected: boolean, data: Object[]) => ({
  isPending,
  isFulfilled,
  isRejected,
  data
})
export default promiseState
