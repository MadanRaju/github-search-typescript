import { connect } from 'react-redux'
import { Home } from './Home'
import { getRepositories } from './HomeAction'
import { reducerStateTypes } from '../../utils/dataTypes'

const mapStateToProps: any = (state: reducerStateTypes) => ({
  reposData: state.getReposReducer.repositories
})

const mapDispatchToProps: Function = (dispatch: any) => ({
  getRepositories: (
    username: string,
    query: string,
    successCallback: Function,
    errorCallback: Function
  ) =>
    dispatch(getRepositories(username, query, successCallback, errorCallback))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
