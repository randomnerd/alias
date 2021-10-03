import { makeAutoObservable, observable } from 'mobx';

export class Word {
    public guesses = 0
    public declines = 0

    constructor(public readonly value: string) {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    public guessed() {
        this.guesses += 1
    }

    public declined() {
        this.declines += 1
    }

    public stats() {
        const { guesses, declines } = this
        return { guesses, declines }
    }
}

export interface Category {
    name: string
    games: number
    guesses: number
    declines: number
    words: Word[]
}

export class WordCategory {
    public games = 0
    public guesses = 0
    public declines = 0
    public words: Word[] = observable.array([])

    constructor(public readonly name: string) {
        makeAutoObservable(this)
    }

    addWord(value: string) {
        if (this.getWord(value)) return
        this.words.push(new Word(value))
    }

    removeWord(value: string) {
        const idx = this.words.findIndex(w => w.value === value)
        const word = this.words.splice(idx, 1)
        console.log(`Deleted word`, word)
    }

    getWords() {
        return this.words
    }

    getWord(value: string) {
        return this.words.find(w => w.value === value)
    }

    public guessed() {
        this.guesses += 1
    }

    public declined() {
        this.declines += 1
    }

    public stats() {
        const { guesses, declines } = this
        return { guesses, declines }
    }
}
