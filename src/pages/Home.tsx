import useSWR from 'swr'
import { Navigate } from 'react-router-dom'
import pig from '../assets/images/pig.svg'
import add from '../assets/icons/add.svg'
import { ajax } from '../lib/ajax'

export const Home: React.FC = () => {
  const { data: meData, error: meError } = useSWR('/api/v1/me', async path =>
    (await ajax.get<Resource<User>>(path)).data.resource
  )

  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await ajax.get<Resources<Item>>(path)).data
  )

  const isLoadingMe = !meData && !meError
  const isLoadingItems = !isLoadingMe && !itemsData && !itemsError

  if (isLoadingMe || isLoadingItems) {
    return <div>加载中......</div>
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
      <button fixed bottom-16px right-16px p-4px w-56px h-56px bg='#5c33be' rounded='50%' b-none text-white text-6xl >
        <img src={add} alt='add' max-w="100%" max-h="100%"/>
      </button>
    </div>
  )
}
