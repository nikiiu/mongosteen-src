import useSWR from 'swr'
import { Link, Navigate } from 'react-router-dom'
import { useAjax } from '../lib/ajax'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { Icon } from '../components/Icon'

export const Home: React.FC = () => {
  const { get } = useAjax({ showLoading: true, handleError: false })

  const { data: meData, error: meError } = useSWR('/api/v1/me', async path => {
    const response = await get<Resource<User>>(path)
    return response.data.resource
  }
  )

  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await get<Resources<Item>>(path)).data
  )

  const isLoadingMe = !meData && !meError
  const isLoadingItems = meData && !itemsData && !itemsError

  if (isLoadingMe || isLoadingItems) {
    return <div text-center p-16px>加载中...</div>
  }

  if (itemsData?.resources[0]) {
    return <Navigate to="/items" />
  }

  return (
    <div>
      <div flex justify-center items-center>
        <Icon className="mt-20vh mb-20vh w-128px h-128px" name="pig" />
      </div>
      <div px-16px>
        <Link to="/items">
          <button z-btn>开始记账</button>
        </Link>
      </div>
    <AddItemFloatButton />
    </div>
  )
}

export default Home
