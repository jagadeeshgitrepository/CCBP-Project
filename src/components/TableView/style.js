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
  top: 20%;
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
export const DropDownContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-left: 20%;
`

export const RoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 85px;

  margin-top: 20px;
  margin-bottom: 20px;
`
export const SearchButton = styled.button`
  background-color: #0b69ff;
  width: 80px;
  height: 35px;
  border: 0px;
  color: white;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  border-radius: 5px;
`
