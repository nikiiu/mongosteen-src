import c from 'classnames'

interface Props {
  name: string
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

export const Icon: React.FC<Props> = ({ name, className, onClick }) => {
  return (
      <svg className={c(className, 'z-icon')} onClick={onClick}>
        <use xlinkHref={`#${name}`}></use>
      </svg>
  )
}
