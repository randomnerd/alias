import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import {
    Button,
    Icon,
    Input,
    Card,
} from 'semantic-ui-react';
import { Team, TeamStore } from '../stores/teams.store'

const TeamView = observer(({ team, store }: { team: Team, store: TeamStore }) => {
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

const TeamListView = observer(({ store }: { store: TeamStore }) => {
    return (
        <Card.Group>
            {store.teams.map(team => (<TeamView team={team} store={store} key={team.name} />))}
        </Card.Group>
    )
})

function Teams() {
    const [teams] = useState(() => new TeamStore())
    useEffect(() => {
        // Called when the component is unmounted
        return () => teams.stopStore();
    });

    const addTeam = () => {
        const input: any = document.querySelector("#teamName")!
        const name = input.value
        teams.addTeam(name)
        input.value = ''
        console.log(`Team ${name} added`, teams)
    }
    const addTeamIcon = <Icon name='add' link onClick={addTeam} />
    const inputKeyUp = (e: any) => {
        if (e.code !== "Enter") return
        addTeam()
    }

    return (
        <div className="Teams">
            <TeamListView store={teams} />
            <Input id='teamName' type="text" placeholder='Team name' fluid icon={addTeamIcon} onKeyUp={inputKeyUp} />
        </div>
    );
}

export default Teams;
