import React from 'react'
import { Link } from 'wouter'
import { Button } from 'semantic-ui-react'
import '../css/start.css'

const Start = () => (
    <div className="Start">
        <Button.Group vertical fluid>
            <Link href="/newgame">
                <Button primary>New game</Button>
            </Link>
            <Link href="/teams">
                <Button>Teams</Button>
            </Link>
            <Link href="/words">
                <Button>Words &amp; categories</Button>
            </Link>
        </Button.Group>
    </div>
);

export default Start
