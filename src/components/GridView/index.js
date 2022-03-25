import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BiMessageAltDetail} from 'react-icons/bi'
import Failure from '../Failure/index'
import TableView from '../TableView/index'
import {
  LoadingContainer,
  CardContainer,
  SpanContainer,
  ImageIcon,
  ProfileImage,
  ProfileNameParagraph,
  ProfileImageContainer,
  ProfileContainer,
  GridViewRequestsContainer,
  ApplicationMainContainer,
  ProfileCommentsContainer,
  CommentImage,
  Button,
} from './style'

import ApproveButton from '../ApproveButton/index'
import Heading from '../Heading/index'
import Paragraph from '../Paragraph/index'
import Span from '../Span/index'

const gridViewStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const userView = {
  grid: 'GRID',
  table: 'TABLE',
}

class GridView extends Component {
  state = {
    acceptRequestList: [],
    pageStatus: gridViewStatus.loading,
    view: userView.grid,
  }

  componentDidMount() {
    this.getAcceptRequestDetails()
  }

  getAcceptRequestDetails = async () => {
    this.setState({pageStatus: gridViewStatus.loading})
    const apiUrl =
      'https://y5764x56r9.execute-api.ap-south-1.amazonaws.com/mockAPI/posts'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const changeDataTypoList = data.map(item => {
      const tagsData = item.tags.map(eachTag => ({
        tagId: eachTag.tag_id,
        tagName: eachTag.tag_name,
      }))

      const postedByData = {
        userId: item.posted_by.user_id,
        userName: item.posted_by.username,
        profilePic: item.posted_by.profile_pic,
      }

      return {
        commentsCount: item.comments_count,
        isReacted: `${
          item.is_reacted === undefined ? 'false' : item.is_reacted
        }`,
        postContent: item.post_content,
        postId: item.post_id,
        postedAt: item.posted_at,

        reactions: item.reactions,
        tags: tagsData,
        title: item.title,
        requestStatus: 'Approve',
        ...postedByData,
      }
    })
    if (response.ok === true)
      this.getAcceptRequestDetailsSuccess(changeDataTypoList)
    else this.getAcceptRequestDetailsFailure()
  }

  getAcceptRequestDetailsSuccess = data =>
    this.setState({
      acceptRequestList: data,
      pageStatus: gridViewStatus.success,
    })

  getAcceptRequestDetailsFailure = () =>
    this.setState({pageStatus: gridViewStatus.failure})

  switchPageContent = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case gridViewStatus.loading:
        return this.loading()
      case gridViewStatus.success:
        return this.success()
      case gridViewStatus.failure:
        return <Failure retryApi={this.retryApi} status="failure view" />

      default:
        return null
    }
  }

  loading = () => (
    <LoadingContainer>
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </LoadingContainer>
  )

  success = () => {
    const {acceptRequestList, view} = this.state
    console.log(acceptRequestList)
    return view === userView.grid ? (
      acceptRequestList.map(eachItem =>
        this.renderAcceptRequestListInGrid(eachItem),
      )
    ) : (
      <TableView acceptRequestList={acceptRequestList} />
    )
  }

  approveFunction = async (username, id) => {
    const userCardData = {
      username,
      postId: id,
    }
    const url =
      'https://y5764x56r9.execute-api.ap-south-1.amazonaws.com/mockAPI/posts'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer',
      },
      body: JSON.stringify(userCardData),
    }
    const response = await fetch(url, options)
    const body = await response.json()
    if (response.ok === true) {
      const {acceptRequestList} = this.state
      const updateApproveList = acceptRequestList.map(eachItem => {
        if (eachItem.postId === id)
          return {...eachItem, requestStatus: body.response}
        return {...eachItem}
      })
      this.setState({acceptRequestList: updateApproveList})
    } else alert('response failed please click again')
  }

  renderAcceptRequestListInGrid = eachItem => {
    const {
      commentsCount,
      isReacted,
      postContent,
      postId,
      postedAt,
      userName,
      profilePic,
      reactions,
      tags,
      title,
      requestStatus,
    } = eachItem
    console.log('hello')
    console.log(tags.length)
    return (
      <CardContainer key={eachItem.postId}>
        <Heading headingContent={title} />
        <ImageIcon
          src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1648089999/svgfile/Ellipsis_horizontal_1_-_16px_3x_n8mshg.png"
          alt="svg-im"
          align
        />
        <Paragraph paragraphContent={postContent} />

        <SpanContainer>
          <Span
            spanContent={tags.length === 0 ? 'Empty' : tags[0].tagName}
            content={0}
          />
          <Span
            spanContent={tags.length === 0 ? 'Empty' : tags[1].tagName}
            content={1}
          />
          <ProfileCommentsContainer>
            <CommentImage
              src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1648089070/svgfile/Icon_3x_n5po8t.png"
              alt="svg-img"
            />
            {commentsCount}
          </ProfileCommentsContainer>
        </SpanContainer>
        <ProfileContainer>
          <ProfileImageContainer>
            <ProfileImage src={profilePic} alt="profile-image" />
          </ProfileImageContainer>
          <ProfileNameParagraph>{userName}</ProfileNameParagraph>
          <ApproveButton
            username={userName}
            id={postId}
            requestStatus={requestStatus}
            approveFunction={this.approveFunction}
          />
        </ProfileContainer>
      </CardContainer>
    )
  }

  changeView = () => {
    console.log('change view')
    this.setState(prevState => ({
      view: prevState.view === 'GRID' ? userView.table : userView.grid,
    }))
  }

  render() {
    return (
      <ApplicationMainContainer>
        <h1>Accept Requests</h1>
        <Button type="button" onClick={this.changeView}>
          Change
        </Button>

        <GridViewRequestsContainer>
          {this.switchPageContent()}
        </GridViewRequestsContainer>
      </ApplicationMainContainer>
    )
  }
}
export default GridView
