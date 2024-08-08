import { Navigate, useRouteError } from 'react-router-dom'
import { ErrorEmptyData, ErrorUnauthorized } from '../../error'

export const ItemsPageError: React.FC = () => {
  const error = useRouteError()
  const e = error as Error
  if (e instanceof ErrorUnauthorized) {
    return <Navigate to="/sign_in" />
  } else if (e instanceof ErrorEmptyData) {
    return <Navigate to="/home" />
  } else {
    return <div>出错了</div>
  }
}
