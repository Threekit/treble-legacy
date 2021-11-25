import styled from 'styled-components'

interface ITwinButtonWrapper {
  orientation?: string
}

export const FormComponentWrapper = styled.div`
  margin-bottom: 20px;
`

export const TwinButtonWrapper = styled.div<ITwinButtonWrapper>`
  display: grid;
  ${(props) =>
    props.orientation === 'vertical'
      ? 'grid-template-rows: repeat(2, max-content);'
      : 'grid-template-columns: repeat(2, max-content);'}
  grid-gap: 6px;
`
