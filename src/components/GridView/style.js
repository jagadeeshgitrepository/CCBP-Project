import styled from 'styled-components'

export const ApplicationMainContainer = styled.div`
  background-color: #fbfbfb;
  width: 100%;
`
export const ViewRequestsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`
export const LoadingContainer = styled.div`
  border: 0px;
`
export const CardContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.align ? 'row' : 'column')};
  justify-content: center;
  align-items: flex-start;
  border-style: solid;
  width: 336px;
  height: 381px;
  margin: 16px 32px 32px 10px;
  padding: 16px 16px 24px;
  border-style: solid;
  border-color: #d9e0ea;
  border-width: 1px;
  border-radius: 5px;
  background-color: #ffffff;
`

export const SpanContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-top: 30px;
  margin-bottom: 20px;
`

export const ImageIcon = styled.img`
  width: 7%;
  align-self: ${props => (props.align ? 'flex-end' : null)};
  margin-right: 8px;
`

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 90%;
`
export const ProfileCommentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 17px;
`

export const ProfileImageContainer = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`
export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100px;
`
export const ProfileNameParagraph = styled.p`
  color: '#d7dfe9';
  font-weight: normal;
  font-family: 'HK Grotesk';
  font-size: 14px;

  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;

  margin-top: 20px;
`

export const ChangeViewButton = styled.button`
  background-color: #0b69ff;
  width: 80px;
  height: 35px;
  border: 0px;
  color: white;
  font-family: 'Roboto';
  font-size: 14px;
  align-self: flex-start;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  border-radius: 5px;
`
