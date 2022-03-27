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
  border: solid 1px #d7dfe9;
  width: 60%;
  background-color: white;
  border-spacing: 0px;
  margin: 40px;
  border-radius: 5px;
  color: #d7dfe9;
`

export const Th = styled.th`
  border-bottom: solid 1px #d7dfe9;
  background-color: 'white';
  color: #171f46;
  font-weight: bold;
  font-family: 'Roboto';
  height: 70px;
  font-size: 15px;
  width: 10px;
`

export const Td = styled.td`
  border-bottom: solid 1px #d7dfe9;

  color: #7e858e;
  font-size: 13px;
  font-weight: 500;

  text-align: center;
`

export const Icon = styled.i`
  color: red;
  font-size: 15px;
`

export const CommentsContainer = styled.div`
  position: relative;

  padding-top: 10px;
  width: 70px;
  height: 50px;
`

export const CommentsParagraph = styled.p`
  width: 15px;
  height: 15px;
  border-radius: 40px;
  position: absolute;
  top: 0;

  left: 50%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: red;
  border: 0px;
  color: white;
`
export const DropDownContainer = styled.div`
  width: ${props => (props.drop ? '60%' : null)};

  width: ${props => (props.selectContainer ? '80%' : null)};

  width: ${props => (props.IconContainer ? '8%' : null)};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const RoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  height: 85px;
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

export const TableParagraph = styled.p`
  height: 100px;
  width: 100%;
  overflow-y: auto;

  padding: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-overflow: ellipsis;
`

export const TableRow = styled.tr``

export const FilterParagraph = styled.p`
  margin-top: 20px;
  margin-right: 15px;
  font-size: 70%;
  margin-right: 15px;
`

export const TableViewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
