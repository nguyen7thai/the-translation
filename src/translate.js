import { connect } from 'react-redux'

let registeredPrefix = []

let translations = {}

export const registerTranslations = (newTranslations, prefix) => {
  if (registeredPrefix.includes(prefix)) {
    throw new Error('Prefix already registered')
  }
  Object.keys(newTranslations).forEach((language) => {
    Object.keys(newTranslations[language]).forEach((key) => {
      if (translations[language] == null) {
        translations[language] = {}
      }
      translations[language][`${prefix}.${key}`] = newTranslations[language][key]
    })
  })
  registeredPrefix.push(prefix)
}

export const translate = (
  language,
  key,
  textKeyParams,
  dictionary = translations) => {
  if (dictionary[language] == null) {
    dictionary[language] = {}
  }
  if (dictionary[language][key] == null) {
    console.warn(`You did not define translation for this language/key: ${language}/${key} yet!!!`)
    return key
  }
  if (textKeyParams == null) {
    return dictionary[language][key]
  } else {
    return translateFormat(dictionary[language][key], textKeyParams)
  }
}

export const translateFormat = (format, params) => {
  return params.reduce((result, paramValue) => {
    return result.replace('%s', paramValue.toString())
  }, format)
}

export const withLanguage = connect((state) => ({
  language: state.currentLanguage
}))
