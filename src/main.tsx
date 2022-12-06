import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LRU from 'lru-cache'
import {configure} from 'axios-hooks'
import './index.css'
import instance from "./api/instance";
import {RecoilRoot} from "recoil";

configure({
  axios: instance,
  cache: new LRU({max: 10})
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <App/>
    </RecoilRoot>
  </React.StrictMode>
)
