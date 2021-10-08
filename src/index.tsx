import 'raf/polyfill'
import ReactDOM from 'react-dom'
import React, { Suspense } from 'react'
// import reportWebVitals from './reportWebVitals'
import App from './App'

const Loader = () => (
    <div className="LoaderWrapper">
        <div className="Loader" />
    </div>
)

ReactDOM.hydrate(
    <Suspense fallback={<Loader />}>
        <App />
    </Suspense>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
