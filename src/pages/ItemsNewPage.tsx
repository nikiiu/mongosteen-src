import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { Tags } from '../components/ItemsNewPage/Tags'
import { DateAndAmount } from '../components/ItemsNewPage/DateAndAmount'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import { ItemDate } from '../components/ItemsNewPage/ItemDate'
import s from './ItemsNewPage.module.scss'

export const ItemsNewPage: React.FC = () => {
  const { data, error, setData, setError } = useCreateItemStore()

  const tabItems: { key: Item['kind']; text: string; element: React.ReactNode }[]
    = [{
        key: 'expenses', text: '支出', element:
          <Tags kind="expenses" value={data.tag_ids} onChange={(ids) => setData({ tag_ids: ids })} />
      },
      {
        key: 'income', text: '收入', element:
          <Tags kind="income" value={data.tag_ids} onChange={(ids) => setData({ tag_ids: ids })} />
      }]
  return (
    <div className={s.wrapper} h-screen flex flex-col>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="记一笔" icon={<Icon name="back" className='w-24px h-24px' />} />
      </Gradient>

      <Tabs tabItems={tabItems} className="brow-1 shrink-1 overflow-hidden text-center"
        value={data.kind!} classPrefix='itemsNewPage'
        onChange={(kind) => { setData({ kind }) }} />
       <DateAndAmount itemDate={<ItemDate />} className="grow-0 shrink-0" />
    </div>
  )
}
