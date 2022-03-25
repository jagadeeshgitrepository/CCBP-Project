import {Button} from './style'

const ApproveButton = props => {
  const {username, id, approveFunction, requestStatus} = props

  const approveRequest = () => approveFunction(username, id)

  return (
    <Button
      type="button"
      onClick={approveRequest}
      requestStatus={requestStatus}
    >
      {requestStatus}
    </Button>
  )
}
export default ApproveButton
