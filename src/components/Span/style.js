import styled from 'styled-components'

export const CardSpan = styled.span`
  border-radius: 2px;
  background-color: ${props => (props.content === 0 ? '#dce2f0' : '#bce3cd')};
  padding: 6px;
  color: ${props => (props.content === 0 ? '#1670ff' : '#51b98d')};
  border: 5px;
  font-size: 13px;
  font-weight: 500;
  font-family: 'Rubik';
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
`

export const j = ``
