import clsx from 'classnames'
import s from './Tabs.module.scss'

type Props<T> = {
  tabItems: {
    key: T
    text: string
    element?: React.ReactNode
  }[]
  value: T
  onChange: (key: T) => void
  className?: string
  classPrefix?: string
}

export const Tabs = <T extends string>(props: Props<T>) => {
  const { tabItems, value, onChange, className, classPrefix } = props

  return (
    <div className={clsx(className, classPrefix)}>
      <ol flex text-white children-px-20px children-py-12px bg="[rgba(143,76,215,1)]" className={classPrefix ? `${classPrefix}-menu` : ''}>
        {tabItems.map(item =>
          <li key={item.key} onClick={() => onChange(item.key)}
            className={clsx(item.key === value ? s.selected : '', classPrefix ? `${classPrefix}-menu-item` : '')}>{item.text}</li>)}
      </ol>
      <div className={classPrefix ? `${classPrefix}-pane` : ''}>
        {tabItems.filter(item => item.key === value)[0].element}
      </div>
    </div>

  )
}
