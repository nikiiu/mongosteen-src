import c from 'classnames'
import s from './Icon.module.scss'

interface Props {
  name: string
  className?: string
}

export const Icon: React.FC<Props> = (props) => {
  return (
      <svg className={c(props.className, s.icon)} >
        <use xlinkHref={`#${props.name}`}></use>
      </svg>
  )
}
