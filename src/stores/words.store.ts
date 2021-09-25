import { action, makeAutoObservable, observable } from 'mobx';
import { makePersistable, stopPersisting } from 'mobx-persist-store';

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

export class WordCategory {
    public games = 0
    public guesses = 0
    public declines = 0
    public words: Word[] = observable.array([])

    constructor(public readonly name: string) {
        makeAutoObservable(this, { addWord: action }, { autoBind: true })
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

export class WordStore {
    public categories: WordCategory[] = observable.array([])

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'WordStore',
            properties: ['categories'],
        })
    }

    addCategory(name: string) {
        const category = new WordCategory(name)
        this.categories.push(category)
        return category
    }

    removeCategory(name: string) {
        const idx = this.categories.findIndex(c => c.name === name)
        const category = this.categories.splice(idx, 1)
        console.log(`Deleted category`, category)
    }

    getCategories() {
        return this.categories
    }

    getCategory(name: string) {
        return this.categories.find(c => c.name === name) || this.addCategory(name)
    }

    stopStore() {
        stopPersisting(this)
    }

    addWord(categoryName: string, word: string) {
        const category = this.getCategory(categoryName)
        category.words.push(new Word(word))
    }

    removeWord(categoryName: string, word: string) {
        const category = this.getCategory(categoryName)
        const idx = category.words.findIndex(w => w.value === word)
        const deletedWord = category.words.splice(idx, 1)
        console.log(`Deleted word`, deletedWord)
    }
}
