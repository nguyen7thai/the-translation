### Idea
I have something that other library in the Internet does not support:
* `Component based translation`: you can put your translation in component folder and use `registerTranslations` function to register with prefix (to make it unique). It's easier to organize and prevent conflict in the GIANT translation file when working with multiple people
* Make use of React 16 Fragment component. We only want to translate the Text, not the whole component. Other library were made with old React versions, the component needs to be bound with html element like `div`, `span`. With React fragment, we only return the Text while having all Component's lifecyle (to work with Redux)
* Full Redux support
* Simple Api

## Installation
```
npm install the-translation
```

## Getting Started
```
import { createStore, combineReducers } from 'redux'
import { reducer as translationReducer } from 'the-translation'

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass translationReducer under 'currentLanguage' key,
  currentLanguage: translationReducer
})

const store = createStore(rootReducer)
```

### Register translations
```
// translations.js
export default {
  en: {
    codelink: 'CodeLink',
    price: '%s/h'
  },
  vn: {
    codelink: 'Cot Linh'
    price: ''
  }
}
```

```
// Component file
import { registerTranslations, Text } from 'the-translation'
import translations from './translations'

registerTranslations(translations, 'Home')
// Prefix must be unique or the library will raise the exception for you

<Text>Home.codelink</Text>
```

### Simple usecase
```
<Text>Home.codelink</Text>
// EN Result: CodeLink
// VN Result: Cotlinh
```

### Format usecase
```
const translations = {
  en: {
    price: '%s/h'
  },
  vn: {
    price: '1h: %s'
  }
}
<Text params={['100$']}>Home.price</Text>
// EN result: 100$/h
// VN result: 1h: 100$
```

### Change language action
```
import { changeLanguage } from 'the-translation'

store.dispatch(changeLanguage('en'))
```

### Change language component example
```
import React from 'react'
import { Text, changeLanguage, withLanguage, registerTranslations } from 'the-translation'
import translations from './translations'
import { connect } from 'react-redux'
registerTranslations(translations, 'Header')

class ChangeLanguage extends React.Component {
  render() {
    return <div>
      <span onClick={() => this.props.changeLanguage('en')}>
        <Text>Header.english</Text>
      </span>
      <span onClick={() => this.props.changeLanguage('vn')}>
        <Text>Header.vietnamese</Text>
      </span>
    </div>
  }
}

const mapDispatchToProps = {
  changeLanguage
}

export default withLanguage(connect(null, mapDispatchToProps)(ChangeLanguage))
```

### withLanguage
This function connect to store and add language property to your component
```
const Text = ({ language, params, children }) => {
  const text = translateText(language, children, params)
  return [text]
}

export default withLanguage(Text)
```
