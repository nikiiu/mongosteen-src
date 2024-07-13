export const ItemsSummary: React.FC = () => {
  return (
    <ol bg='#252A43' flex justify-between px-16px py-12px children-px-24px text-center items-center m-16px rounded-8px>
      <li text="#e95b5e">
        <div>收入</div>
        <div>1000</div>
      </li>
      <li text="#53A867">
        <div>支出</div>
        <div>1000</div>
      </li>
      <li text="#FFFFFF">
        <div>净收入</div>
        <div>1000</div>
      </li>
    </ol>
  )
}
