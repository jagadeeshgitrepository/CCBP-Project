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
  font-weight: 500;

  padding: 20px;
  text-align: center;
`

export const Icon = styled.i`
  color: red;
  font-size: 15px;
`

export const CommentsContainer = styled.div`
  position: relative;

  padding-top: 25px;
  width: 50px;
`

export const CommentsParagraph = styled.p`
  width: 18px;
  height: 18px;
  border-radius: 40px;
  position: absolute;
  top: 0px;
  left: 50%;
  border-style: solid;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: red;
  border: 0px;
  color: white;
`
