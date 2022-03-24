import {CardSpan} from './style'

const Span = props => {
  const {spanContent, content} = props
  return <CardSpan content={content}>{spanContent}</CardSpan>
}
export default Span
