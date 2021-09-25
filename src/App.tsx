import { observer } from 'mobx-react-lite';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Start from './components/start';
import Teams from './components/teams';
import { CommonStore, commonStore } from './stores/common.store';
import Categories from './components/categories';
import { configurePersistable } from 'mobx-persist-store';
import NewGame from './components/newgame';
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react';

configurePersistable({ storage: window.localStorage }, { fireImmediately: true });


const PageView = observer<{ store: CommonStore; }>(({ store }) => {
    switch (store.getPage()) {
        case 'teams': return <Teams />;
        case 'newgame': return <NewGame />;
        case 'categories': return <Categories />;
        default: return <Start />;
    }
});

const BackButton = observer<{ store: CommonStore; }>(({ store }) => {
    if (store.getPage() === 'start') return null;
    return (

        <Button
            floated='left'
            className="back"
            icon
            onClick={() => store.goBack()}
        >
            <Icon name="arrow left" />
        </Button>
    );
});

function App() {
    return (
        <Container className="App">
            <Segment>
                <BackButton store={commonStore} />

                <Header size="large" textAlign='center'>
                    ALIAS
                </Header>
                <PageView store={commonStore} />

            </Segment>
        </Container>
    );
}

export default App;
