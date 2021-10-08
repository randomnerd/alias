import { useList, useStore } from 'effector-react'
import {
    Button,
    Icon,
    Label,
    Input,
    Card,
} from 'semantic-ui-react'
import 'semantic-ui-css/components/label.css'
import 'semantic-ui-css/components/card.css'
import 'semantic-ui-css/components/input.css'
import 'semantic-ui-css/components/icon.css'
import 'semantic-ui-css/components/button.css'
import '../css/categories.css'
import {
    $categoryInput,
    categoryApi,
    categoryInputApi,
    changeCategoryInput,
    useCategory,
    $categoryNames
} from '../stores/categories'
import {
    useWord,
    wordApi,
    $wordValues,
    $wordInput,
    wordInputApi,
    changeWordInput
} from '../stores/words'

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

const CategoryListView = () => (
    <Card.Group itemsPerRow={2}>
        { useList($categoryNames, name => <CategoryView categoryName={name} />) }
    </Card.Group>
)

const Categories = () => (
    <div className="Categories">
        <NewCategoryInput />
        <CategoryListView />
    </div>
)

export default Categories
