import { addDecorator } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'
import { ThemeProvider } from 'styled-components'
import theme from '../src/theme'
import GlobalStyle from '../src/components/ThreekitProvider/GlobalStyles.styles'
import styled from 'styled-components'

const Wrapper = styled.div`
  * {
    box-sizing: border-box;
  }
`

addDecorator(withThemesProvider([theme]), ThemeProvider)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <Wrapper>
      <GlobalStyle />
      <Story />
    </Wrapper>
  ),
]
