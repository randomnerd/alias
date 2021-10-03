import React from 'react'
import { Route, Switch, useLocation } from 'wouter'
// import { useTransition, animated } from 'react-spring'
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import Start from './components/start'
import Teams from './components/teams'
// import Categories from './components/categories'
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

const App = () => {
    // const [location] = useLocation()
    // const transitions = useTransition(location, (location => location), {
    //     enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    //     from:  { opacity: 0, transform: 'translate3d(100%,0,0)' },
    //     leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    // })
    // return transitions.map(({ item, props, key }) => (
    //     <animated.div key={key} style={props}>
    return (
            <Container className="App">
                <Segment basic>
                    <GoBack/>
                    <Header size="large" textAlign='center'>
                        ALIAS
                    </Header>
                    <Switch>
                        <Route path="/" component={Start} />
                        <Route path="/teams" component={Teams} />
                    </Switch>
                </Segment>
            </Container>
    )
    //     </animated.div>
    // ))
}

export default App
