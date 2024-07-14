import styled from 'styled-components'
import React, { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { TopMenu } from '../components/TopMenu'
import { useMenuStore } from '../stores/useMenuStore'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'

const Div = styled.div`
  background: linear-gradient(0deg, rgba(143,76,215,1) 0%, rgba(92,51,190,1) 100%);
`

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const [items] = useState<Item[]>([
    {
      id: 1,
      user_id: 275,
      amount: 1916,
      tag_ids: [
        720
      ],
      happened_at: '2023-09-08T16:50:04.278+08:00',
      created_at: '2023-09-13T16:50:04.280+08:00',
      updated_at: '2023-09-13T16:50:04.280+08:00',
      kind: 'expenses',
      deleted_at: 'note',
      happen_at: '2023-09-08T16:50:04.278+08:00',
    },
    {
      id: 2,
      user_id: 275,
      amount: 1916,
      tag_ids: [
        720
      ],
      happened_at: '2023-09-08T16:50:04.278+08:00',
      created_at: '2023-09-13T16:50:04.280+08:00',
      updated_at: '2023-09-13T16:50:04.280+08:00',
      kind: 'expenses',
      deleted_at: 'note',
      happen_at: '2023-09-08T16:50:04.278+08:00',
    }
  ])

  const { visible, setVisible } = useMenuStore()

  return (
    <div>
      <Div>
      <TopNav />
      <TimeRangePicker selected={timeRange} onSelected={setTimeRange} />

      </Div>

      <ItemsSummary />
      <ItemsList items={items} />
      <AddItemFloatButton />
      {
        visible ? <TopMenu onClickMask={() => setVisible(false)} /> : null
      }

    </div>
  )
}
