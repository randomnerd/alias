import React from 'react'
import {
    Button,
    Icon,
    Input,
    Card,
} from 'semantic-ui-react'
import { persist } from 'effector-storage/local'
import { createStore, createApi } from 'effector'
import { useList, useStore, useStoreMap } from 'effector-react'
import 'semantic-ui-css/components/input.css'
import 'semantic-ui-css/components/card.css'
import 'semantic-ui-css/components/button.css'
import 'semantic-ui-css/components/icon.css'
import '../css/teams.css'

interface Team {
    name: string
    wins: number
}

interface TeamList { [name: string]: Team }

const newTeam = (name: string): Team => ({ name, wins: 0 })
const $teamInput = createStore('')
const teamInputApi = createApi($teamInput, {
    setValue: (_, value: string) => value
})
const $teams = createStore<TeamList>({})
const $teamNames = $teams.map(teams => Object.keys(teams))
const teamApi = createApi($teams, {
    create(state, name: string): TeamList | undefined {
        if (!name || name in state) return
        return { ...state, [name]: newTeam(name) }
    },
    addTeam(state: TeamList, team: Team) {
        if (team.name in state) return
        return { ...state, [team.name]: team }
    },
    removeTeam(state: TeamList, name: string) {
        if (!name || !(name in state)) return
        state = { ...state }
        delete state[name]
        return state
    },
    teamWon(state: TeamList, name: string) {
        const teamCopy = { ...state[name] }
        teamCopy.wins++
        return { ...state, [name]: teamCopy }
    }
})
const changeTeamInput = teamInputApi.setValue.prepend(
    (e: any) => e.currentTarget.value
)

const useTeam = (name: string) => useStoreMap({
    store: $teams,
    keys: [name],
    fn(state: TeamList, [_name]: string[]): Team | null {
        if (_name in state) return state[_name]
        return null
    },
})

persist({ store: $teams, key: 'teams' })
persist({ store: $teamInput, key: 'teamInput' })


const TeamView = ({ teamName }: { teamName: string }) => {
    const team = useTeam(teamName)
    if (!team) return (<div></div>)
    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    {team.name}
                    <Button
                        circular
                        inverted
                        size="mini"
                        color="red"
                        icon="close"
                        floated="right"
                        onClick={() => teamApi.removeTeam(team.name)}
                    />
                </Card.Header>
                <Card.Description>
                    Wins: {team.wins}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

const TeamListView = () => {
    const teams = useList($teamNames, name => <TeamView teamName={name} />)
    return (
        <Card.Group itemsPerRow={2}>
            {teams}
        </Card.Group>
    )
}

const NewTeamInput = () => {
    const teamInputValue = useStore($teamInput)
    const addTeam = () => {
        teamApi.create(teamInputValue)
        teamInputApi.setValue('')
    }
    const addTeamIcon = <Icon name='add' link onClick={addTeam}/>
    const inputKeyUp = (e: any) => {
        if (e.code !== "Enter") return
        addTeam()
    }
    return (
        <Input fluid
            size="large"
            id='teamName'
            type="text"
            placeholder='Name a new team...'
            icon={addTeamIcon}
            onKeyUp={inputKeyUp}
            onChange={changeTeamInput}
            value={teamInputValue}
        />
    )
}

const Teams = () => (
    <div className="Teams">
        <NewTeamInput />
        <TeamListView />
    </div>
)

export default Teams;
