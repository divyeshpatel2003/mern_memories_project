import React from "react"
import './index.css'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux"
import { legacy_createStore as createStore, applyMiddleware, compose } from "redux"
import {thunk} from 'redux-thunk'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {reducers} from './reducers'
import App from './App'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById("root"));  

root.render(
    <GoogleOAuthProvider clientId="1033480579793-ffuq05s2mh8mdjage92dggtfoikv6n3m.apps.googleusercontent.com" >
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  );