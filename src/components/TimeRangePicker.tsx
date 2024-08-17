import { usePopup } from '../hooks/usePopup'
import { Tabs } from './Tabs'

export type TimeRange = | 'thisMonth'
  | 'lastMonth'
  | 'thisYear'
  | 'custom'
  | 'twoMonthsAgo'
  | 'threeMonthsAgo'

const defaultTimeRanges: { key: TimeRange; text: string }[] = [
  { key: 'thisMonth', text: '本月' },
  { key: 'lastMonth', text: '上个月' },
  { key: 'thisYear', text: '今年' },
  { key: 'custom', text: '自定义时间' },
]

type Props = {
  timeRanges?: { key: TimeRange; text: string }[]
  selected: TimeRange
  onSelect: (selected: TimeRange) => void
}

export const TimeRangePicker: React.FC<Props> = (props) => {
  const { selected, onSelect: _onSelect, timeRanges = defaultTimeRanges } = props

  const onConfirm = () => {
    _onSelect('custom')
  }

  const { popup, hide, show } = usePopup({
    children: <div onClick={onConfirm}>弹框</div>,
    position: 'center'
  })

  const onSelect = (key: TimeRange) => {
    if (key === 'custom') {
      show()
    } else {
      _onSelect(key)
    }
  }

  return (
    <>
      {popup}
      <Tabs tabItems={timeRanges} value={selected} onChange={onSelect} />
    </>
  )
}
