import { SWRConfig } from 'swr'
import { Route, Switch, Router } from 'wouter'
import { useTransition, animated } from 'react-spring'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react'
import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import './App.css'

const currentLoc = () => window.location.hash.replace("#", "") || "/";

const useHashLocation = () => {
  const [loc, setLoc] = useState(currentLoc());

  useEffect(() => {
    const handler = () => setLoc(currentLoc());

    // subscribe on hash changes
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = useCallback(to => (window.location.hash = to), []);
  return [loc, navigate];
};


const Start = lazy(() => import("./components/start"));
const Teams = lazy(() => import("./components/teams"));
const NewGame = lazy(() => import("./components/newgame"));
const Categories = lazy(() => import("./components/categories"));

const GoBack = () => {
    const [location] = useHashLocation()
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
    const [location] = useHashLocation()
    const transitions = useTransition(location, {
        initial: { opacity: 0, transform: 'translate3d(0%,0,0)' },
        from:    location === '/'
            ? { opacity: 0, transform: 'translate3d(-200%,0,0)' }
            : { opacity: 0, transform: 'translate3d(200%,0,0)' },
        enter:   { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave:   location === '/'
            ? { opacity: 0, transform: 'translate3d(200%,0,0)' }
            : { opacity: 0, transform: 'translate3d(-200%,0,0)' },
        config:  {
            duration: 300,
        },
    })
    return transitions((props, item) => (
        <animated.div
            className="ContentWrapper"
            style={{
                ...props,
                width:    '100%',
                position: 'absolute'
            }}
        >
            <Container>
                <Segment basic>
                    <Router hook={useHashLocation as any}>
                        <Switch location={item as string}>
                            <Route path="/"        component={Start} />
                            <Route path="/teams"   component={Teams} />
                            <Route path="/newgame" component={NewGame} />
                            <Route path="/words"   component={Categories} />
                            <Route                 component={Start} />
                        </Switch>
                    </Router>
                </Segment>
            </Container>
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
