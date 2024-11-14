import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import HomeContainer from './pages/Home/HomeContainer'
import './App.css'

function App () {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HomeContainer reposData={{
          isPending: false,
          isFulfilled: false,
          isRejected: false,
          data: []
        }} getRepositories={undefined} />
      </PersistGate>
    </Provider>
  )
}

export default App
