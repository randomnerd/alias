import React from 'react'
import { Route, Switch, useLocation } from 'wouter'
import { useTransition, animated } from 'react-spring'
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import Start from './components/start'
import Teams from './components/teams'
import Categories from './components/categories'
// import NewGame from './components/newgame'

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
        from:  { opacity: 0, transform: 'translate3d(100%,0,0)'},
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)'},
        leave: { opacity: 1, transform: 'translate3d(-100%,0,0)'} as any,
    })
    return transitions((props, item) => (
        <animated.div
            className="ContentWrapper"
            style={{
                ...props,
                position: 'absolute',
                width: '100%'
            }}
        >
            <Container className="Content">
                <Segment basic>
                <Switch>
                    <Route path="/" component={Start} />
                    <Route path="/teams" component={Teams} />
                    <Route path="/words" component={Categories} />
                </Switch>
                </Segment>
            </Container>
        </animated.div>
    ))
}

const Heading = () => (
    <Container className="Heading">
        <Segment basic>
            <GoBack/>
            <Header size="large" textAlign='center'>
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

export default App
