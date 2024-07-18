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
    <div className={clsx(className, classPrefix)} flex flex-col>
      <ol grow-0 shrink-0 flex text-white children-px-20px children-py-12px bg="[rgba(143,76,215,1)]" className={classPrefix ? `${classPrefix}-menu` : ''}>
        {tabItems.map(item =>
          <li key={item.key} onClick={() => onChange(item.key)}
            className={clsx(item.key === value ? s.selected : '', classPrefix ? `${classPrefix}-menu-item` : '')}>{item.text}</li>)}
      </ol>
      <div grow-1 shrink-1 overflow-auto className={classPrefix ? `${classPrefix}-pane` : ''}>
        {tabItems.filter(item => item.key === value)[0].element}
      </div>
    </div>

  )
}
