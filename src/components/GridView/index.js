import CommentsImage from '../CommentsImage/index'

import ApproveButton from '../ApproveButton/index'
import Heading from '../Heading/index'
import Paragraph from '../Paragraph/index'
import Tags from '../Tags/index'
import LoadingComponent from '../Loader/index'
import {
  CardContainer,
  TagsContainer,
  ProfileImage,
  ProfileNameParagraph,
  ProfileImageContainer,
  ProfileContainer,
  ProfileCommentsContainer,
} from './style'

const GridView = props => {
  const {approveLoader, approveId, eachItem, approveFunction} = props
  const {
    commentsCount,

    postContent,
    postId,

    userName,
    profilePic,

    tags,
    title,
    requestStatus,
  } = eachItem

  return (
    <CardContainer key={eachItem.postId}>
      <Heading headingContent={title} />

      <Paragraph paragraphContent={postContent} />

      <TagsContainer>
        <Tags
          tagContent={tags.length === 0 ? 'Empty' : tags[0].tagName}
          content={0}
        />
        <Tags
          tagContent={tags.length === 0 ? 'Empty' : tags[1].tagName}
          content={1}
        />
        <ProfileCommentsContainer>
          <CommentsImage
            src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1648089070/svgfile/Icon_3x_n5po8t.png"
            alt="comments-img"
          />
          {commentsCount}
        </ProfileCommentsContainer>
      </TagsContainer>
      <ProfileContainer>
        <ProfileImageContainer>
          <ProfileImage src={profilePic} alt="profile-image" />
        </ProfileImageContainer>
        <ProfileNameParagraph>{userName}</ProfileNameParagraph>
        <ApproveButton
          username={userName}
          id={postId}
          requestStatus={requestStatus}
          approve={approveFunction}
        />

        {approveLoader === true && approveId === postId ? (
          <LoadingComponent />
        ) : null}
      </ProfileContainer>
    </CardContainer>
  )
}
export default GridView
