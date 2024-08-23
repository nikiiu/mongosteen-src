import { useState } from 'react'
import useSWR from 'swr'
import { Gradient } from '../components/Gradient'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import { Input } from '../components/Input'
import { BackIcon } from '../components/BackIcon'
import { useAjax } from '../lib/ajax'
import { type Time, time } from '../lib/time'

type Groups = { happen_at: string; amount: number }[]
type Groups2 = { tag_id: number; tag: Tag; amount: number }[]
type GetKeyParams = {
  start: Time
  end: Time
  kind: Item['kind']
  group_by: 'happen_at' | 'tag_id'
}
const getKey = ({ start, end, kind, group_by }: GetKeyParams) => {
  return `/api/v1/items/summary?happened_after=${start.format('yyyy-MM-dd')}&happened_before=${end.format('yyyy-MM-dd')}&kind=${kind}&group_by=${group_by}`
}

export const StaticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    name: 'thisMonth',
    start: time().firstDayOfMonth,
    end: time().lastDayOfMonth.add(1, 'day')
  })
  const { get } = useAjax({ showLoading: false, handleError: true })
  const [kind, setKind] = useState<Item['kind']>('expenses')

  const generateDefaultItems = (start: Time) =>
    Array.from({ length: start.dayCountOfMonth }).map((_, index) => {
      return { x: start.clone.add(index, 'day').format(), y: 0 }
    })

  const { start, end } = timeRange
  const defaultItems = generateDefaultItems(start)

  const { data: items } = useSWR(getKey({ start, end, kind, group_by: 'happen_at' }), async (path) =>
    (await (get<{ groups: Groups; total: number }>(path))).data.groups.map(({ happen_at, amount }) => ({ x: happen_at, y: (amount / 100).toFixed(2) }))
  )

  const normalizedItems = defaultItems?.map((defaultItem, index) =>
     items?.find((item) => item.x === defaultItem.x) || defaultItem
  )

  const { data: items2 } = useSWR(getKey({ start, end, kind, group_by: 'tag_id' }), async (path) =>
    (await (get<{ groups: Groups2; total: number }>(path))).data.groups
        .map(({ tag, amount }) =>
          ({ name: tag.name, value: (amount / 100).toFixed(2), sign: tag.sign }))
  )

  return (
    <div>
      <Gradient>
        <TopNav title='统计图表'
          icon={<BackIcon />} />
      </Gradient>

      <TimeRangePicker
        timeRanges={[
          {
            text: '本月',
            key: { name: 'thisMonth', start: time().firstDayOfMonth, end: time().lastDayOfMonth.add(1, 'day') },
          },
          {
            text: '上月',
            key: { name: 'lastMonth', start: time().add(-1, 'month').firstDayOfMonth, end: time().add(-1, 'month').lastDayOfMonth.add(1, 'day') },
          },
          {
            text: '两个月前',
            key: { name: 'twoMonthsAgo', start: time().add(-2, 'month').firstDayOfMonth, end: time().add(-2, 'month').lastDayOfMonth.add(1, 'day') },
          },
          {
            text: '三个月前',
            key: { name: 'threeMonthsAgo', start: time().add(-3, 'month').firstDayOfMonth, end: time().add(-3, 'month').lastDayOfMonth.add(1, 'day') },
          },
        ]}
        selected={timeRange} onSelect={setTimeRange} />
      <div flex p-16px items-center gap-x-16px>
        <span grow-0 shrink-0>类型</span>
        <div grow-1 shrink-1>
          <Input type="select" options={[
            { text: '支出', value: 'expenses' },
            { text: '收入', value: 'income' },
          ]} value={kind} onChange={value => setKind(value)} disableError/>
        </div>
      </div>
      <LineChart items={normalizedItems} className='h-120px' />
      <PieChart items={items2} className='h-260px m-t-16px' />
      <RankChart items={items2} className='m-t-8px' />
    </div>
  )
}

export default StaticsPage
