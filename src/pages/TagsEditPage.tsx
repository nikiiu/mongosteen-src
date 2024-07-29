import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TagForm } from '../components/TagForm'
import { TopNav } from '../components/TopNav'

export const TagsEditPage: React.FC = () => {
  return (
    <div>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="查看标签" icon={<Icon name="back" className='w-24px h-24px' />} />
      </Gradient>
      <TagForm type='edit' />
      <div px-16px p-b-32px>
        <button z-btn bg="#e10505">删除</button>
      </div>
    </div>
  )
}
