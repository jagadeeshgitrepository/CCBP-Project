import {CardSpan} from './style'

const Tags = props => {
  const {tagContent, content} = props
  return <CardSpan content={content}>{tagContent}</CardSpan>
}
export default Tags
