import { useState } from 'react'
import { usePopup } from '../hooks/usePopup'
import { type Time, time } from '../lib/time'
import { Input } from './Input'
import { Tabs } from './Tabs'

export type TimeRange = {
  start: Time
  end: Time
  name: | 'thisMonth' | 'lastMonth' | 'thisYear'
  | 'custom' | 'twoMonthsAgo' | 'threeMonthsAgo'
}

const defaultTimeRanges: { key: TimeRange; text: string }[] = [
  {
    text: '本月',
    key: { name: 'thisMonth', start: time().firstDayOfMonth, end: time().lastDayOfMonth.add(1, 'day') },
  },
  {
    text: '上个月',
    key: { name: 'lastMonth', start: time().add(-1, 'month').firstDayOfMonth, end: time().add(-1, 'month').lastDayOfMonth.add(1, 'day') },
  },
  {
    text: '今年',
    key: { name: 'thisYear', start: time().set({ month: 1 }).firstDayOfMonth, end: time().set({ month: 12 }).lastDayOfMonth.add(1, 'day') },
  },
  {
    text: '自定义时间',
    key: { name: 'custom', start: time(), end: time(), },
  },
]

type Props = {
  timeRanges?: { key: TimeRange; text: string }[]
  selected: TimeRange
  onSelect: (selected: TimeRange) => void
}

export const TimeRangePicker: React.FC<Props> = (props) => {
  const { selected, onSelect: _onSelect, timeRanges = defaultTimeRanges } = props
  const [start, setStart] = useState<string>('')
  const [end, setEnd] = useState<string>('')

  const onConfirm = () => {
    _onSelect({
      name: 'custom',
      start: time(start),
      end: time(end).add(1, 'day')
    })
    hide()
  }

  const { popup, show, hide } = usePopup({
    children: <div>
      <header text-18px bg="[var(--color-purple)]" text-white py-13px p-l-16px>请选择时间</header>
      <main p-16px>
        <Input type="myDate" label="开始时间" value={start} onChange={d => setStart(d)} disableError />
        <Input type="myDate" className="mt-8px" label="结束时间" value={end} onChange={d => setEnd(d)} disableError />
      </main>
      <footer text-right>
        <button border-none bg-transparent px-16px py-8px onClick={() => hide()}>取消</button>
        <button border-none bg-transparent px-16px py-8px onClick={onConfirm}>确认</button>
      </footer>
    </div>,
    position: 'center',
    zIndex: 'var(--z-dialog)',
  })

  const onSelect = (timeRange: TimeRange) => {
    if (timeRange.name === 'custom') {
      show()
    } else {
      _onSelect(timeRange)
    }
  }

  return (
    <>
      {popup}
      <Tabs tabItems={timeRanges} value={selected} onChange={onSelect} />
    </>
  )
}
