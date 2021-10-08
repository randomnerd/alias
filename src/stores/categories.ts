import { persist } from 'effector-storage/local'
import { createStore, createApi } from 'effector'
import { useStoreMap } from 'effector-react'
import { Word } from './words'

export interface Category {
    name: string
    games: number
    guesses: number
    declines: number
    words: Word[]
}

export interface CategoryList { [name: string]: Category }
export const newCategory = (name: string): Category => ({ name, guesses: 0, declines: 0, words: [], games: 0 })
export const $categoryInput = createStore('')
export const categoryInputApi = createApi($categoryInput, {
    setValue: (_, value: string) => value
})

export const $categories = createStore<CategoryList>({})
export const $categoryNames = $categories.map(categories => Object.keys(categories))
export const categoryApi = createApi($categories, {
    create(state, name: string): CategoryList | undefined {
        if (!name || name in state) return
        return { ...state, [name]: newCategory(name) }
    },
    addCategory(state: CategoryList, category: Category) {
        if (category.name in state) return
        return { ...state, [category.name]: category }
    },
    removeCategory(state: CategoryList, name: string) {
        if (!name || !(name in state)) return
        state = { ...state }
        delete state[name]
        return state
    },
    categoryPlayed(state: CategoryList, name: string) {
        const categoryCopy = { ...state[name] }
        categoryCopy.games++
        return { ...state, [name]: categoryCopy }
    }
})
export const changeCategoryInput = categoryInputApi.setValue.prepend(
    (e: any) => e.currentTarget.value
)

export const useCategory = (name: string) => useStoreMap({
    store: $categories,
    keys: [name],
    fn(state: CategoryList, [_name]: string[]): Category | null {
        if (_name in state) return state[_name]
        return null
    },
})

persist({ store: $categories, key: 'categories' })
persist({ store: $categoryInput, key: 'categoryInput' })
