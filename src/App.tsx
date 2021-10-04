import { SWRConfig } from 'swr'
import React, { lazy, Suspense } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Route, Switch, useLocation } from 'wouter'
import { useTransition, animated } from 'react-spring'
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

const Start = lazy(() => import("./components/start"));
const Teams = lazy(() => import("./components/teams"));
const NewGame = lazy(() => import("./components/newgame"));
const Categories = lazy(() => import("./components/categories"));

const GoBack = () => {
    const [location] = useLocation()
    return location === '/'
        ? null
        : (
            <Button
                floated='left'
                className="back"
                icon
                onClick={() => window.history.back()}
            >
                <Icon name="arrow left" />
            </Button>
        )
}

const Content = () => {
    const [location] = useLocation()
    const transitions = useTransition(location, {
        from:  { opacity: 0, transform: 'translate3d(200%,0,0)'},
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)'},
        leave: { opacity: 0, transform: 'translate3d(-200%,0,0)'} as any,
    })
    return transitions((props, item) => (
        <animated.div
            className="ContentWrapper ui container"
            style={{
                ...props,
                position: 'absolute',
                width: '100%'
            }}
        >
            <Segment basic>
                <Switch location={item}>
                    <Route path="/" component={Start} />
                    <Route path="/teams" component={Teams} />
                    <Route path="/newgame" component={NewGame} />
                    <Route path="/words" component={Categories} />
                </Switch>
            </Segment>
        </animated.div>
    ))
}

const Heading = () => (
    <Container className="Heading">
        <Segment basic>
            <GoBack/>
            <Header textAlign='center' size="huge">
                ALIAS
            </Header>
        </Segment>
    </Container>
)

const App = () => (
    <div className="App">
        <Heading />
        <Content />
    </div>
)

const Loader = () => (
    <div className="LoaderWrapper">
        <div className="Loader" />
    </div>
)

const Layout = ({ cache }: any) => {
    return (
        <SWRConfig value={{ provider: () => new Map(cache) }}>
            <HelmetProvider>
                <Helmet>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta charSet="UTF-8" />
                    <link rel="stylesheet" href="//cdn.esm.sh/v53/semantic-ui-css/semantic.min.css" />
                    <title>ALIAS</title>
                </Helmet>
                <Suspense fallback={<Loader />}>
                    <App />
                </Suspense>
            </HelmetProvider>
        </SWRConfig>
    );
}


export default Layout
