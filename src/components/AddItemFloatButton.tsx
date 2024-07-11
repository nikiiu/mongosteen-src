export const AddItemFloatButton: React.FC = () => {
  return (
    <button fixed bottom-16px right-16px
      p-4px w-56px h-56px bg='#5c33be' rounded='50%' b-none text-white >
      <svg style={{ fill: 'white', width: '1.2em', height: '1.2em' }}>
        <use xlinkHref='#add'></use>
      </svg>
    </button>
  )
}
