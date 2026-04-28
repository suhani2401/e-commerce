
import { Provider } from 'react-redux'
import './App.css'
import Router from "./Router";
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate >
      </Provider>
    </>
  )
}

export default App
