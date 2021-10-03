import { Button, Container } from 'semantic-ui-react';
import { CommonStore } from '../stores/common.store';

function Start({ store }: { store: CommonStore }) {
    return (
        <Container className="Start">
            <Button.Group vertical fluid>
                <Button primary onClick={() => store.setPage('newgame')}>New game</Button>
                <Button onClick={() => store.setPage('teams')}>Manage teams</Button>
                <Button onClick={() => store.setPage('categories')}>Manage words</Button>
            </Button.Group>
        </Container>
    );
}

export default Start;
