// @flow

import { withLanguage, translate as translateText } from '../translate'

const Text = ({ language, params, children }) => {
  const text = translateText(language, children, params)
  return [text]
}

export default withLanguage(Text)
