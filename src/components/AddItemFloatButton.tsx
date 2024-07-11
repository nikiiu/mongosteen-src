import add from '../assets/icons/add.svg'

export const AddItemFloatButton: React.FC = () => {
  return (
      <button fixed bottom-16px right-16px p-4px w-56px h-56px bg='#5c33be' rounded='50%' b-none text-white text-6xl >
        <img src={add} alt='add' max-w="100%" max-h="100%"/>
      </button>
  )
}
