import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${props =>
    props.requestStatus === 'Approve' ? '#0b69ff' : 'green'};
  width: 90px;
  height: 35px;
  border: 0px;
  color: white;
  font-family: 'Hk Grotesk';
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  color: white;
  border-radius: 5px;
`

export const Con = styled.div``
