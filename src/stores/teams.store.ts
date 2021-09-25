import { makeAutoObservable, observable, get } from 'mobx';
import { makePersistable, stopPersisting } from 'mobx-persist-store'

export class Team {
    public wins = 0
    constructor(public readonly name: string) {
        makeAutoObservable(this)
    }
}

export class TeamStore {
    teams: Team[] = observable.array([])

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'TeamStore',
            properties: ['teams'],
        })
    }

    addTeam(name: string) {
        if (!name) return
        if (this.teams.find(team => team.name === name)) return
        this.teams.push(new Team(name))
    }

    removeTeam(name: string) {
        const idx = this.teams.findIndex(team => team.name === name)
        const team = this.teams.splice(idx, 1)
        console.log(`Deleted team`, team)
    }

    getTeams() {
        return this.teams
    }

    getTeam(name: string) {
        return get(this.teams, name)
    }

    stopStore() {
        stopPersisting(this)
    }
}
