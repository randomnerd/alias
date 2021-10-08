import { persist } from 'effector-storage/local'
import { createStore, createApi } from 'effector'
import { useStoreMap } from 'effector-react'

export interface Team {
    name: string
    wins: number
}

export interface TeamList { [name: string]: Team }

export const newTeam = (name: string): Team => ({ name, wins: 0 })
export const $teamInput = createStore('')
export const teamInputApi = createApi($teamInput, {
    setValue: (_, value: string) => value
})
export const $teams = createStore<TeamList>({})
export const $teamNames = $teams.map(teams => Object.keys(teams))
export const teamApi = createApi($teams, {
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
export const changeTeamInput = teamInputApi.setValue.prepend(
    (e: any) => e.currentTarget.value
)

export const useTeam = (name: string) => useStoreMap({
    store: $teams,
    keys: [name],
    fn(state: TeamList, [_name]: string[]): Team | null {
        if (_name in state) return state[_name]
        return null
    },
})

persist({ store: $teams, key: 'teams' })
persist({ store: $teamInput, key: 'teamInput' })
