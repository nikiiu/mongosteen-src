import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import { Input } from '../components/Input'
import { BackIcon } from '../components/BackIcon'

export const StaticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const items = [
    { date: '2000-01-01', value: 15000 },
    { date: '2000-01-02', value: 25000 },
    { date: '2000-01-31', value: 10000 },
  ].map(item => ({ x: item.date, y: item.value / 100 }))

  const items2 = [
    { tag: { name: '吃饭', sign: '😨' }, amount: 10000 },
    { tag: { name: '打车', sign: '🥱' }, amount: 20000 },
    { tag: { name: '买皮肤', sign: '💖' }, amount: 68800 },
  ].map(item => ({ x: item.tag.name, y: item.amount / 100 }))

  const items3 = [
    { tag: { name: '吃饭', sign: '😨' }, amount: 10000 },
    { tag: { name: '打车', sign: '🥱' }, amount: 20000 },
    { tag: { name: '买皮肤', sign: '💖' }, amount: 68800 },
  ].map(item => ({ name: item.tag.name, value: item.amount, sign: item.tag.sign }))
  const [x, setX] = useState('expenses')
  return (
    <div>
      <Gradient>
        <TopNav title='统计图表'
          icon={<BackIcon />} />
      </Gradient>

      <TimeRangePicker
        timeRanges={[
          { key: 'thisMonth', text: '本月' },
          { key: 'lastMonth', text: '上月' },
          { key: 'twoMonthsAgo', text: '两个月前' },
          { key: 'threeMonthsAgo', text: '三个月前' },
        ]}
        selected={timeRange} onSelect={setTimeRange} />
      <div flex p-16px items-center gap-x-16px>
        <span grow-0 shrink-0>类型</span>
        <div grow-1 shrink-1>
          <Input type="select" options={[
            { text: '支出', value: 'expenses' },
            { text: '收入', value: 'income' },
          ]} value={x} onChange={value => setX(value)} disableError/>
        </div>
      </div>
      <LineChart items={items} className='h-120px' />
      <PieChart items={items2} className='h-260px m-t-16px' />
      <RankChart items={items3} className='m-t-8px' />
    </div>
  )
}

