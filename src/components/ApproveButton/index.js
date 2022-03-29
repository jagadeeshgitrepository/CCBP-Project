import {Button} from './style'

const ApproveButton = props => {
  const {username, id, approve, requestStatus} = props

  const approveRequest = () => approve(username, id)

  return (
    <Button
      type="button"
      onClick={approveRequest}
      id={id}
      requestStatus={requestStatus}
    >
      {requestStatus}
    </Button>
  )
}
export default ApproveButton
