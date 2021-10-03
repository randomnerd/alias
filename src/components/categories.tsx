import { runInAction, values } from 'mobx'
import { observer } from 'mobx-react-lite';
import { RefObject, useRef } from 'react';
import {
    Button,
    Icon,
    Label,
    Input,
    Card,
} from 'semantic-ui-react';
import { CommonStore } from '../stores/common.store';
import { Category, Word } from '../stores/words.store'

const WordView = observer(({ word, category, store }: { word: Word, category: Category, store: CommonStore }) => {
    return (
        <Label>
            {word.value}
            <Icon name='close' link onClick={() => store.removeWord(category.name, word.value)} />
        </Label>
    )
})

const WordListView = observer(({ category, store }: { category: Category, store: CommonStore }) => {
    return (
        <div>
            {category.words.map(w => (<WordView word={w} store={store} category={category} key={w.value} />))}
        </div>
    )
})

const CategoryView = observer(({ category, store }: { category: Category, store: CommonStore }) => {
    console.dir(category)
    const addWord = () => {
        const input = inputRef.current?.inputRef.current
        const word = input?.value
        if (!word) return
        runInAction(() => store.addWord(category.name, word))
        input.value = ''
    }
    const inputKeyUp = (e: any) => {
        if (e.code !== "Enter") return
        addWord()
    }
    const inputRef = useRef<Input & { inputRef: RefObject<HTMLInputElement> }>(null)
    const addWordIcon = <Icon name='add' link onClick={addWord} />
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {category.name}
                    <Button basic floated="right" color='red' onClick={() => {
                        store.removeCategory(category.name)
                    }}>Delete</Button>
                </Card.Header>
                <Card.Description>
                    Games: {category.games}<br/>
                    Guesses: {category.guesses}<br/>
                    Declines: {category.declines}<br/>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <WordListView category={category} store={store} />
            </Card.Content>
            <Card.Content extra>
                <Input
                    ref={inputRef}
                    type="text"
                    fluid
                    placeholder='Add word'
                    icon={addWordIcon}
                    onKeyUp={inputKeyUp}
                />
            </Card.Content>
        </Card>
    )
})

const CategoryListView = observer(({ store }: { store: CommonStore }) => {
    return (
        <Card.Group>
            {
                values(store.categories).map(c =>  (
                    <CategoryView category={c} store={store} key={c.name} />
                ))
            }
        </Card.Group>
    )
})

function Categories({ store }: { store: CommonStore }) {
    const addCategory = () => {
        const input = inputRef.current?.inputRef.current
        const name = input?.value
        if (!name) return
        store.addCategory(name)
        input.value = ''
        console.log(`Category ${name} added`)
    }
    const inputKeyUp = (e: any) => {
        if (e.code !== "Enter") return
        addCategory()
    }
    const inputRef = useRef<Input & { inputRef: RefObject<HTMLInputElement> }>(null)
    const addCategoryIcon = <Icon name='add' link onClick={addCategory} />

    return (
        <div className="Categories">
            <CategoryListView store={store} />
            <Input
                ref={inputRef}
                type="text"
                placeholder='Category name'
                fluid
                icon={addCategoryIcon}
                onKeyUp={inputKeyUp}
            />
        </div>
    );
}

export default Categories;
