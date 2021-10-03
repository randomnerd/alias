import React from 'react';
import { Button, Container } from 'semantic-ui-react'
import { Link } from 'wouter'

const Start = () => (
    <Container className="Start">
        <Button.Group vertical fluid>
            <Button primary>New game</Button>
            <Link href="/teams"><Button>Manage teams</Button></Link>
            <Button>Manage words</Button>
        </Button.Group>
    </Container>
);

export default Start
