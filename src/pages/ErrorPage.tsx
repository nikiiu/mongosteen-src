import { Navigate, useLocation, useRouteError } from 'react-router-dom'
import { ErrorUnauthorized } from '../error'

export const ErrorPage: React.FC = () => {
  const error = useRouteError() as Error
  const loc = useLocation()
  const from = encodeURIComponent(`${loc.pathname}${loc.search}`)
  if (error instanceof ErrorUnauthorized) {
    return <Navigate to={`/sign_in?from=${from}`} replace />
  } else {
    return <div>未知错误</div>
  }
}
