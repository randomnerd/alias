import { RefObject, useRef } from 'react';
import {
    Button,
    Icon,
    Label,
    Input,
    Card,
} from 'semantic-ui-react';

const WordView = ({ word }: any) => (
    <Label>
        {/* {word.value} */}
        <Icon name='close' link />
    </Label>
)


const WordListView = ({ category }: { category: any }) => (
    <div>
        {
            category.words.map((w: any) => (
                <WordView word={w} category={category} key={w.value} />
            ))
        }
    </div>
)

const CategoryView = ({ category }: { category: any }) => {
    console.dir(category)
    const addWord = () => {
        const input = inputRef.current?.inputRef.current
        const word = input?.value
        if (!word) return
        // runInAction(() => store.addWord(category.name, word))
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
                        // store.removeCategory(category.name)
                    }}>Delete</Button>
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
}

const CategoryListView = () => (
    <Card.Group>
        {
            // values(store.categories).map(c =>  (
            //     <CategoryView category={c} store={store} key={c.name} />
            // ))
        }
    </Card.Group>
)

const Categories = () => {
    const addCategory = () => {
        const input = inputRef.current?.inputRef.current
        const name = input?.value
        if (!name) return
        // store.addCategory(name)
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
            <Input
                ref={inputRef}
                type="text"
                size="large"
                placeholder='Name a new word category...'
                fluid
                icon={addCategoryIcon}
                onKeyUp={inputKeyUp}
            />
            <CategoryListView />
        </div>
    );
}

export default Categories;
