import { Icon } from './Icon'

export const AddItemFloatButton: React.FC = () => {
  return (
    <button fixed bottom-16px right-16px flex justify-center items-center
       w-56px h-56px bg='#5c33be' rounded='50%' b-none text-white >
      <Icon name="add" className="w-38px h-38px fill-white" />
    </button>
  )
}
