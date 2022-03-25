import styled from 'styled-components'

export const Image = styled.img`
  border-radius: 40px;
  width: ${props => (props.sort ? '15px' : '40px')};
  height: ${props => (props.sort ? '15px' : '40px')};
  margin-top: ${props => (props.sort ? '7px' : '')};
  margin-left: ${props => (props.sort ? '5px' : '')};
`

export const TableHeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`
export const Table = styled.table`
  border: solid 2px #d7dfe9;
  width: 90%;
  background-color: white;
  border-spacing: 0px;
  margin: 40px;
  border-radius: 5px;
  color: #d7dfe9;
`

export const Th = styled.th`
  border-bottom: solid 2px #d7dfe9;
  background-color: 'white';
  color: #171f46;
  font-weight: bold;
  height: 70px;
  font-size: 15px;
  width: 10px;
`

export const Td = styled.td`
  border-bottom: solid 2px #d7dfe9;
  background-color: white;
  color: #7e858e;
  font-size: 13px;

  padding: 20px;
  text-align: center;
`
