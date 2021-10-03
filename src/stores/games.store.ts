import { makeAutoObservable, observable, set, remove } from 'mobx';
import { Team } from './teams.store';

export class Game {
    public readonly teams: Team[] = observable.array([])
    public skipWordPenalty = true
    public wordsToWin = 30
    public roundTime = 60

    constructor() {
        makeAutoObservable(this)
    }

    addTeam(team: Team) {
        set(this.teams, team.name, team)
    }

    removeTeam(name: string) {
        remove(this.teams, name)
    }

    getTeams() {
        return this.teams
    }
}

export class GameStore {
    public readonly games: Game[] = observable.array([])
    constructor() {
        makeAutoObservable(this)
    }
}