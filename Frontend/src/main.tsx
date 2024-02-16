import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './store/store';
import { Provider } from 'react-redux'
import Table from './Table'
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <Table/>
    </Provider>
)
