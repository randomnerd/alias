import { makeAutoObservable, observable, runInAction } from 'mobx';
import { makePersistable, stopPersisting } from 'mobx-persist-store';
import { Game } from './games.store';
import { Team } from './teams.store';
import { Category, Word, WordCategory } from './words.store';

export class CommonStore {
    page = 'start'
    history: string[] = ['start']
    teams = observable.map<string, Team>()
    games = observable.map<string, Game>()
    categories: Record<string, Category> = observable.object({})

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true, deep: true })
        makePersistable(this, {
            name: 'CommonStore',
            properties: [
                'history',
                'page',
                'categories',
                'teams',
                'games',
            ],
            debugMode: true,
        }, { fireImmediately: true })
    }

    public setPage(page: string) {
        runInAction(() => {
            this.history.push(page)
            this.page = page
        })
    }

    public getPage() {
        return this.page
    }

    public goBack() {
        runInAction(() => {
            this.history.splice(-1)
            this.page = this.history[this.history.length - 1]
        })
    }

    addCategory(name: string) {
        if (this.categories[name]) return
        const category: Category = {
            name,
            games: 0,
            declines: 0,
            guesses: 0,
            words: observable.array([])
        }
        runInAction(() => this.categories[name] = category)
        return category
    }

    removeCategory(name: string) {
        if (!this.categories[name]) return
        const category = this.categories[name]
        runInAction(() => delete this.categories[name])
        return category
    }

    stopStore() {
        stopPersisting(this)
    }

    getCategory(name: string) {
        if (this.categories[name]) return this.categories[name]
        const category = new WordCategory(name)
        runInAction(() => this.categories[name] = category)
        return category
    }

    addWord(categoryName: string, wordValue: string) {
        const category = this.getCategory(categoryName)
        let word = category.words.find(w => w.value === wordValue)
        if (word) return word
        word = new Word(wordValue)
        runInAction(() => category.words.push(word!))
        return word
    }

    removeWord(categoryName: string, word: string) {
        const category = this.getCategory(categoryName)
        const idx = category.words.findIndex(w => w.value === word)
        if (idx === -1) return
        runInAction(() => category.words.splice(idx, 1))
    }

    addTeam(name: string) {
        if (this.teams.has(name)) return this.teams.get(name)!
        const team = new Team(name)
        runInAction(() => this.teams.set(name, team))
    }

    removeTeam(name: string) {
        if (!this.teams.has(name)) return
        const team = this.teams.get(name)
        runInAction(() => this.teams.delete(name))
        return team
    }
}
