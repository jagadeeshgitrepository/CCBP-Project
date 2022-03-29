import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import GridView from '../GridView/index'
import LoaderComponent from '../Loader/index'
import Failure from '../Failure/index'
import TableView from '../TableView/index'
import {gridViewStatus, userView} from '../data'
import {ViewRequestsContainer, ApplicationMainContainer} from './style'

class DataViews extends Component {
  state = {
    acceptRequestList: [],
    pageStatus: gridViewStatus.loading,
    view: userView.grid,
    approveLoader: false,
    approveId: '',
  }

  componentDidMount() {
    this.getAcceptRequestDetails()
  }

  getAcceptRequestDetails = async () => {
    const {match} = this.props

    this.setState({
      pageStatus: gridViewStatus.loading,
      view: match.path.slice(1, 6).toUpperCase(),
    })
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

    const changeDataTypoList = data.map(item => {
      const {tags} = item
      let tagsData
      if (tags[0] !== undefined)
        tagsData = tags.map(eachTag => ({
          tagId: eachTag.tag_id,
          tagName: eachTag.tag_name,
        }))
      else
        tagsData = [
          {tagId: uuidv4(), tagName: 'Empty'},
          {tagId: uuidv4(), tagName: 'Empty'},
        ]

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
        return <LoaderComponent />
      case gridViewStatus.success:
        return this.success()
      case gridViewStatus.failure:
        return <Failure retryApi={this.retryApi} status="failure view" />

      default:
        return null
    }
  }

  retryApi = () => this.getAcceptRequestDetails()

  success = () => {
    const {acceptRequestList, view, approveLoader, approveId} = this.state

    return view === userView.table ? (
      <TableView
        acceptRequestList={acceptRequestList}
        approveFunction={this.approveFunction}
        approveLoader={approveLoader}
        approveId={approveId}
      />
    ) : (
      acceptRequestList.map(eachItem => (
        <GridView
          eachItem={eachItem}
          approveLoader={approveLoader}
          approveId={approveId}
          approveFunction={this.approveFunction}
        />
      ))
    )
  }

  approveFunction = async (username, id) => {
    this.setState({approveLoader: true, approveId: id})
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
      this.setState({
        acceptRequestList: updateApproveList,
        approveLoader: false,
        approveId: '',
        shouldUpdateTableData: true,
      })
    } else alert('response failed please click again')
  }

  render() {
    const {shouldUpdateTableData} = this.state

    return (
      <ApplicationMainContainer>
        <ViewRequestsContainer>
          {this.switchPageContent()}
        </ViewRequestsContainer>
      </ApplicationMainContainer>
    )
  }
}
export default DataViews
