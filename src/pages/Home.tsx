import useSWR from 'swr'
import { Navigate, useNavigate } from 'react-router-dom'
import type { AxiosError } from 'axios'
import pig from '../assets/images/pig.svg'
import { useAjax } from '../lib/ajax'
import { useTitle } from '../hooks/useTitle'
import { Loading } from '../components/Loading'
import { AddItemFloatButton } from '../components/AddItemFloatButton'

interface Props {
  title?: string
}

export const Home: React.FC<Props> = (props) => {
  useTitle(props.title)
  const nav = useNavigate()
  const onHttpError = (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        nav('/sign_in')
      }
      }
    throw error
  }

  const { get } = useAjax()

  const { data: meData, error: meError } = useSWR('/api/v1/me', async path => {
    const response = await get<Resource<User>>(path).catch(onHttpError)
    return response.data.resource
  }
  )

  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await get<Resources<Item>>(path)).data
  )

  const isLoadingMe = !meData && !meError
  const isLoadingItems = !isLoadingMe && !itemsData && !itemsError

  if (isLoadingMe || isLoadingItems) {
    return <Loading className="h-screen" message='正在加载页面，请稍等' />
  }

  if (itemsData?.resources[0]) {
    return <Navigate to="/items" />
  }

  return (
    <div>
      <div flex justify-center items-center>
        <img mt-20vh mb-20vh w='128px' h='130px' src={pig} alt="pig" />
      </div>
      <div px-16px>
        <button z-btn>开始记账</button>
      </div>
    <AddItemFloatButton />
    </div>
  )
}
