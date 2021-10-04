import React from 'react'
import { Link } from 'wouter'
import { Button } from 'semantic-ui-react'

const Start = () => (
    <div className="Start">
        <Button.Group vertical fluid>
            <Button primary>New game</Button>
            <Link href="/teams"><Button>Manage teams</Button></Link>
            <Link href="/words"><Button>Manage words</Button></Link>
        </Button.Group>
    </div>
);

export default Start
