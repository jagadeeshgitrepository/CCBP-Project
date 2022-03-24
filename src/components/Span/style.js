import styled from 'styled-components'

export const CardSpan = styled.span`
  border-radius: 2px;
  background-color: ${props => (props.content === 0 ? '#dce2f0' : '#bce3cd')};
  padding: 6px;
  color: ${props => (props.content === 0 ? '#1670ff' : '#51b98d')};
  border: 5px;
  font-size: 13px;
  font-weight: 500;
`

export const j = ``
