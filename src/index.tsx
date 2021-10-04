import 'raf/polyfill'
import { SWRConfig } from 'swr'
import ReactDOM from 'react-dom'
import React, { Suspense, lazy } from 'react'
import reportWebVitals from './reportWebVitals'

const App = lazy(() => import("./App"))

const Loader = () => (
    <div className="LoaderWrapper">
        <div className="Loader" />
    </div>
)

ReactDOM.hydrate(
    <SWRConfig value={{ provider: () => new Map() }}>
        <Suspense fallback={<Loader />}>
            <App />
        </Suspense>
    </SWRConfig>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
