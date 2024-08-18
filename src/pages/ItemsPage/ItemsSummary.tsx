import useSWR from 'swr'
import { useAjax } from '../../lib/ajax'
import { Money } from '../../components/Money'
import type { Time } from '../../lib/time'

type Props = {
  start: Time
  end: Time
}
export const ItemsSummary: React.FC<Props> = (props) => {
  const { start, end } = props
  const { get } = useAjax({ showLoading: false, handleError: false })
  const { data } = useSWR(start && end && `/api/v1/items/balance?happened_after=${start.isoString}&happened_before=${end.isoString}`, async (path) =>
    (await get<{ balance: number; expenses: number; income: number }>(path)).data)
  const { balance, expenses, income } = data ?? { balance: 0, expenses: 0, income: 0 }

  return (
    <ol bg='#252A43' flex justify-between px-16px py-12px children-px-24px text-center items-center m-16px rounded-8px>
      <li text="#e95b5e">
        <div>收入</div>
        <div><Money value={income} /></div>
      </li>
      <li text="#53A867">
        <div>支出</div>
        <div><Money value={expenses} /></div>
      </li>
      <li text="#FFFFFF">
        <div>净收入</div>
        <div><Money value={balance} /></div>
      </li>
    </ol>
  )
}
