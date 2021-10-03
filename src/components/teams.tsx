import { values } from 'mobx';
import { observer } from 'mobx-react-lite';
import {
    Button,
    Icon,
    Input,
    Card,
} from 'semantic-ui-react';
import { CommonStore } from '../stores/common.store';
import { Team } from '../stores/teams.store'

const TeamView = observer(({ team, store }: { team: Team, store: CommonStore }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{team.name}</Card.Header>
                <Card.Description>
                    Wins: {team.wins}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button basic color='red' onClick={() => {
                    store.removeTeam(team.name)
                }}>Delete</Button>
            </Card.Content>
        </Card>
    )
})

const TeamListView = observer(({ store }: { store: CommonStore }) => {
    return (
        <Card.Group>
            {values(store.teams).map(team => (<TeamView team={team} store={store} key={team.name} />))}
        </Card.Group>
    )
})

function Teams({ store }: { store: CommonStore }) {
    const addTeam = () => {
        const input: any = document.querySelector("#teamName")!
        const name = input.value
        console.log(store)
        store.addTeam(name)
        input.value = ''
        console.log(`Team ${name} added`, store)
    }
    const addTeamIcon = <Icon name='add' link onClick={addTeam} />
    const inputKeyUp = (e: any) => {
        if (e.code !== "Enter") return
        addTeam()
    }

    return (
        <div className="Teams">
            <TeamListView store={store} />
            <Input id='teamName' type="text" placeholder='Team name' fluid icon={addTeamIcon} onKeyUp={inputKeyUp} />
        </div>
    );
}

export default Teams;
