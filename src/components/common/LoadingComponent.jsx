import ErrorComponent from './ErrorComponent'

function LoadingComponent({ children, isLoading, error = null }) {
  if (isLoading) {
    return <>...loading</>
  }

  if (error) {
    return <ErrorComponent message={error.message} />
  }

  return children
}
export default LoadingComponent
