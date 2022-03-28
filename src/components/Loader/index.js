import Loader from 'react-loader-spinner'
import {LoadingContainer} from './style'

const LoaderComponent = () => (
  <LoadingContainer>
    <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
  </LoadingContainer>
)

export default LoaderComponent
