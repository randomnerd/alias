import { persist } from 'effector-storage/local'
import { createStore, createApi } from 'effector'
import { useStoreMap } from 'effector-react'

export interface Word {
    value: string
    guesses: number
    declines: number
}

export interface WordList { [name: string]: Word }

export const newWord = (value: string): Word => ({ value, guesses: 0, declines: 0 })
export const $wordInput = createStore('')
export const wordInputApi = createApi($wordInput, {
    setValue: (_, value: string) => value
})
export const $words = createStore<WordList>({})
export const $wordValues = $words.map(words => Object.keys(words))
export const wordApi = createApi($words, {
    create(state, value: string): WordList | undefined {
        if (!value || value in state) return
        return { ...state, [value]: newWord(value) }
    },
    addWord(state: WordList, word: Word) {
        if (word.value in state) return
        return { ...state, [word.value]: word }
    },
    removeWord(state: WordList, value: string) {
        if (!value || !(value in state)) return
        state = { ...state }
        delete state[value]
        return state
    },
    wordGuessed(state: WordList, value: string) {
        const wordCopy = { ...state[value] }
        wordCopy.guesses++
        return { ...state, [value]: wordCopy }
    },
    wordDeclined(state: WordList, value: string) {
        const wordCopy = { ...state[value] }
        wordCopy.declines++
        return { ...state, [value]: wordCopy }
    }
})

export const useWord = (value: string) => useStoreMap({
    store: $words,
    keys: [value],
    fn(state: WordList, [_value]: string[]): Word | null {
        if (_value in state) return state[_value]
        return null
    },
})

export const changeWordInput = wordInputApi.setValue.prepend(
    (e: any) => e.currentTarget.value
)

persist({ store: $words, key: 'words' })
persist({ store: $wordInput, key: 'wordInput' })