import { useState } from 'react'
import { usePopup } from '../../hooks/usePopup'
import { time } from '../../lib/time'
import { DatePicker } from '../DatePicker'
import { Icon } from '../Icon'

export const ItemDate: React.FC = () => {
  const [date, setDate] = useState(new Date())

  const { toggle, popup, hide } = usePopup({
    children: <DatePicker
      onConfirm={d => { setDate(d); hide() }}
      onCancel={() => hide()} />
  })
  return (
    <>
      {popup}
      <span flex items-center gap-x-8px onClick={toggle}>
        <Icon name="calendar" className="w-24px h-24px grow-0 shrink-0" />
        <span grow-0 shrink-0 color="#999">{time(date).format()}</span>
      </span>
    </>

  )
}
