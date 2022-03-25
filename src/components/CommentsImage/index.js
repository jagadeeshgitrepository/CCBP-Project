import {CommentImage} from './style'

const CommentsImage = props => {
  const {src, alt, tableComment} = props
  return <CommentImage src={src} alt={alt} tableComment={tableComment} />
}

export default CommentsImage
