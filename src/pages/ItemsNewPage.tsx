import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { Tags } from '../components/ItemsNewPage/Tags'
import { ItemAmount } from '../components/ItemsNewPage/ItemAmount'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import { ItemDate } from '../components/ItemsNewPage/ItemDate'
import { hasError, validate } from '../lib/validate'
import { useAjax } from '../lib/ajax'
import s from './ItemsNewPage.module.scss'

export const ItemsNewPage: React.FC = () => {
  const { data, setData, setError } = useCreateItemStore()

  const tabItems: { key: Item['kind']; text: string; element: React.ReactNode }[]
    = [{
        key: 'expenses', text: '支出', element:
          <Tags kind="expenses" value={data.tag_ids} onChange={(ids) => setData({ tag_ids: ids })} />
      },
      {
        key: 'income', text: '收入', element:
          <Tags kind="income" value={data.tag_ids} onChange={(ids) => setData({ tag_ids: ids })} />
      }]

  const { post } = useAjax({ showLoading: true, handleError: true })

  const onSubmit = async () => {
    const error = validate(data, [
      { key: 'kind', type: 'required', message: '请选择类型：收入或支出' },
      { key: 'tag_ids', type: 'required', message: '请选择一个标签' },
      { key: 'happen_at', type: 'required', message: '请选择一个时间' },
      { key: 'amount', type: 'required', message: '请输入金额' },
      { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为0' },
    ])

    setError(error)
    if (hasError(error)) {
      window.alert(Object.values(error).join('\n'))
    } else {
      const response = await post<Resource<Item>>('/api/v1/items', data)
      console.log(response.data.resource)
    }
  }
  return (
    <div className={s.wrapper} h-screen flex flex-col>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="记一笔" icon={<Icon name="back" className='w-24px h-24px' />} />
      </Gradient>

      <Tabs tabItems={tabItems} className="brow-1 shrink-1 overflow-hidden text-center"
        value={data.kind!} classPrefix='itemsNewPage'
        onChange={(kind) => { setData({ kind }) }} />
      <ItemAmount onSubmit={onSubmit} itemDate={<ItemDate value={data.happen_at} onChange={(happen_at) => setData({ happen_at })} />}
        className="grow-0 shrink-0" value={data.amount} onChange={amount => setData({ amount })} />
    </div>
  )
}
