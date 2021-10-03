import { observer } from 'mobx-react-lite';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Start from './components/start';
import Teams from './components/teams';
import { CommonStore } from './stores/common.store';
import Categories from './components/categories';
import { configurePersistable } from 'mobx-persist-store';
import NewGame from './components/newgame';
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { configure } from "mobx"

configure({
    enforceActions: "always",
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: true
})


configurePersistable(
    { storage: window.localStorage },
    { fireImmediately: true }
);


const PageView = observer<{ store: CommonStore; }>(({ store }) => {
    switch (store.getPage()) {
        case 'teams': return <Teams store={store} />;
        case 'newgame': return <NewGame store={store} />;
        case 'categories': return <Categories store={store} />;
        default: return <Start store={store} />;
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
    const [commonStore] = useState(() => new CommonStore());
    useEffect(() => {
        return () => commonStore.stopStore()
    })
    return (
        <Container className="App">
            <Segment basic>
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
