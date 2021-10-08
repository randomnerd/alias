import { persist } from 'effector-storage/local'
import { createStore, createApi } from 'effector'

export interface Team {
    name: string
    wins: number
}

export interface TeamList { [name: string]: Team }

export const newTeam = (name: string): Team => ({ name, wins: 0 })
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
export const $teamInput = createStore('')
export const teamInputApi = createApi($teamInput, {
    setValue: (_, value: string) => value
})
export const changeTeamInput = teamInputApi.setValue.prepend(
    (e: any) => e.currentTarget.value
)
persist({ store: $teamInput, key: 'teamInput' })

persist({ store: $teams, key: 'teams' })
