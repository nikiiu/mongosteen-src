import c from 'classnames'

interface Props {
  name: string
  className?: string
}

export const Icon: React.FC<Props> = (props) => {
  return (
      <svg className={c(props.className, 'z-icon')} >
        <use xlinkHref={`#${props.name}`}></use>
      </svg>
  )
}
