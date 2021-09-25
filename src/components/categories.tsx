import { observer } from 'mobx-react-lite';
import { RefObject, useEffect, useRef, useState } from 'react';
import {
    Button,
    Icon,
    Label,
    Input,
    Card,
} from 'semantic-ui-react';
import { Word, WordCategory, WordStore } from '../stores/words.store'

const WordView = observer(({ word, category, store }: { word: Word, category: WordCategory, store: WordStore }) => {
    return (
        <Label>
            {word.value}
            <Icon name='close' link onClick={() => store.removeWord(category.name, word.value)} />
        </Label>
    )
})

const WordListView = observer(({ category, store }: { category: WordCategory, store: WordStore }) => {
    return (
        <div>
            {category.words.map(w => (<WordView word={w} store={store} category={category} key={w.value} />))}
        </div>
    )
})

const CategoryView = observer(({ category, store }: { category: WordCategory, store: WordStore }) => {
    const addWord = () => {
        const input = inputRef.current?.inputRef.current
        const word = input?.value
        if (!word) return
        console.dir(store)
        store.addWord(category.name, word)
        input.value = ''
        console.log(`Word ${word} added to category ${category.name}`)
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

const CategoryListView = observer(({ store }: { store: WordStore }) => {
    return (
        <Card.Group>
            {store.categories.map(c => (<CategoryView category={c} store={store} key={c.name} />))}
        </Card.Group>
    )
})

function Categories() {
    const [wordStore] = useState(() => new WordStore())
    useEffect(() => {
        // Called when the component is unmounted
        return () => wordStore.stopStore();
    });
    const addCategory = () => {
        const input = inputRef.current?.inputRef.current
        const name = input?.value
        if (!name) return
        wordStore.addCategory(name)
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
            <CategoryListView store={wordStore} />
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
