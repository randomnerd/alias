import { createStore, createApi } from 'effector';
import { useList, useStore, useStoreMap } from 'effector-react';
import { persist } from 'effector-storage/local'
import {
    Button,
    Icon,
    Label,
    Input,
    Card,
} from 'semantic-ui-react'
import '../css/categories.css'

interface Word {
    value: string
    guesses: number
    declines: number
}

interface Category {
    name: string
    games: number
    guesses: number
    declines: number
    words: Word[]
}

interface CategoryList { [name: string]: Category }
interface WordList { [name: string]: Word }

const newCategory = (name: string): Category => ({ name, guesses: 0, declines: 0, words: [], games: 0 })
const newWord = (value: string): Word => ({ value, guesses: 0, declines: 0 })
const $categoryInput = createStore('')
const categoryInputApi = createApi($categoryInput, {
    setValue: (_, value: string) => value
})
const $wordInput = createStore('')
const wordInputApi = createApi($wordInput, {
    setValue: (_, value: string) => value
})
const $words = createStore<WordList>({})
const $wordValues = $words.map(words => Object.keys(words))
const wordApi = createApi($words, {
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

const $categories = createStore<CategoryList>({})
const $categoryNames = $categories.map(categories => Object.keys(categories))
const categoryApi = createApi($categories, {
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
const changeCategoryInput = categoryInputApi.setValue.prepend(
    (e: any) => e.currentTarget.value
)

const changeWordInput = wordInputApi.setValue.prepend(
    (e: any) => e.currentTarget.value
)

const useCategory = (name: string) => useStoreMap({
    store: $categories,
    keys: [name],
    fn(state: CategoryList, [_name]: string[]): Category | null {
        if (_name in state) return state[_name]
        return null
    },
})

const useWord = (value: string) => useStoreMap({
    store: $words,
    keys: [value],
    fn(state: WordList, [_value]: string[]): Word | null {
        if (_value in state) return state[_value]
        return null
    },
})

persist({ store: $categories, key: 'categories' })
persist({ store: $categoryInput, key: 'categoryInput' })
persist({ store: $words, key: 'words' })
persist({ store: $wordInput, key: 'wordInput' })

const WordView = ({ wordValue }: any) => {
    const word = useWord(wordValue)
    if (!word) return (<div></div>)
    return (
        <Label>
            {word.value}
            <Icon name='close' link onClick={() => wordApi.removeWord(word.value)} />
        </Label>
    )
}

const WordListView = ({ categoryName }: any) => {
    const words = useList($wordValues, value => <WordView wordValue={value} />)
    return (
        <div>{words}</div>
    )
}

const NewCategoryInput = () => {
    const categoryInputValue = useStore($categoryInput)
    const addCategory = () => {
        categoryApi.create(categoryInputValue)
        categoryInputApi.setValue('')
    }
    const addCategoryIcon = <Icon name='add' link onClick={addCategory}/>
    const inputKeyUp = (e: any) => {
        if (e.code !== "Enter") return
        addCategory()
    }
    return (
        <Input fluid
            size="large"
            className="CategoryInput"
            type="text"
            placeholder='Name a new category...'
            icon={addCategoryIcon}
            onKeyUp={inputKeyUp}
            onChange={changeCategoryInput}
            value={categoryInputValue}
        />
    )
}

const NewWordInput = () => {
    const wordInputValue = useStore($wordInput)
    const addWord = () => {
        wordApi.create(wordInputValue)
        wordInputApi.setValue('')
    }
    const addWordIcon = <Icon name='add' link onClick={addWord}/>
    const inputKeyUp = (e: any) => {
        if (e.code !== "Enter") return
        addWord()
    }
    return (
        <Input fluid
            size="small"
            id='categoryName'
            type="text"
            placeholder='Name a new word...'
            icon={addWordIcon}
            onKeyUp={inputKeyUp}
            onChange={changeWordInput}
            value={wordInputValue}
        />
    )
}

const CategoryView = ({ categoryName }: any) => {
    const category = useCategory(categoryName)
    if (!category) return (<div></div>)
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {category.name}
                    <Button
                        circular
                        inverted
                        size="mini"
                        color="red"
                        icon="close"
                        floated="right"
                        onClick={() => categoryApi.removeCategory(category.name)}
                    />
                </Card.Header>
                <Card.Description>
                    Games: {category.games}<br/>
                    Guesses: {category.guesses}<br/>
                    Declines: {category.declines}<br/>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <WordListView category={category} />
            </Card.Content>
            <Card.Content extra>
                <NewWordInput />
            </Card.Content>
        </Card>
    )
}

const CategoryListView = () => {
    const categories = useList($categoryNames, name => <CategoryView categoryName={name} />)
    return (
        <Card.Group itemsPerRow={2}>
            {categories}
        </Card.Group>
    )
}

const Categories = () => (
    <div className="Categories">
        <NewCategoryInput />
        <CategoryListView />
    </div>
)

export default Categories;
