import useSWR from 'swr'
import { Navigate } from 'react-router-dom'
import pig from '../assets/images/pig.svg'
import { ajax } from '../lib/ajax'
import { useTitle } from '../hooks/useTitle'
import { Loading } from '../components/Loading'
import { AddItemFloatButton } from '../components/AddItemFloatButton'

interface Props {
  title?: string
}

export const Home: React.FC<Props> = (props) => {
  useTitle(props.title)
  const { data: meData, error: meError } = useSWR('/api/v1/me', async path =>
    (await ajax.get<Resource<User>>(path)).data.resource
  )

  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await ajax.get<Resources<Item>>(path)).data
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
      <div flex justify-center item-center>
        <img mt-20vh mb-20vh w='128px' h='130px' src={pig} alt="pig" />
      </div>
      <div px-16px>
        <button text-white rounded-8px
          h-48px w='100%' bg='#5c33be' b-none>开始记账</button>
      </div>
    <AddItemFloatButton />
    </div>
  )
}
