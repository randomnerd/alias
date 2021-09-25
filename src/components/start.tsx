import { Button, Container } from 'semantic-ui-react';
import { commonStore } from '../stores/common.store';

function Start() {
    return (
        <Container className="Start">
            <Button.Group vertical fluid>
                <Button primary onClick={() => commonStore.setPage('newgame')}>New game</Button>
                <Button onClick={() => commonStore.setPage('teams')}>Manage teams</Button>
                <Button onClick={() => commonStore.setPage('categories')}>Manage words</Button>
            </Button.Group>
        </Container>
    );
}

export default Start;
