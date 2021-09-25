import { Button } from 'semantic-ui-react';
import { commonStore } from '../stores/common.store'

function NewGame() {
    return (
        <div className="newGame">
            <Button.Group vertical fluid>
                <Button onClick={() => commonStore.goBack()}>Go back</Button>
            </Button.Group>
        </div>
    )
}

export default NewGame
