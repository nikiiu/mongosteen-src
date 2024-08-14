import { useNavigate, useParams } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { TagForm } from '../components/TagForm'
import { TopNav } from '../components/TopNav'
import { useAjax } from '../lib/ajax'
import { BackIcon } from '../components/BackIcon'

export const TagsEditPage: React.FC = () => {
  const confirmable = (fn: () => void) => () => {
    const result = window.confirm('确定要删除吗')
    if (result) {
      fn()
    }
  }
  const { id } = useParams()
  const { destroy } = useAjax({ showLoading: true, handleError: true })
  const nav = useNavigate()
  const onDelete = confirmable(async () => {
    if (!id) { throw new Error('id 不能为空') }
    await destroy(`/api/v1/tags/${id}`).catch((error) => { window.alert('删除失败'); throw error })
    window.alert('删除成功')
    nav('/items/new')
  })
  return (
    <div>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="查看标签" icon={<BackIcon />} />
      </Gradient>
      <TagForm type='edit' />
      <div px-16px p-b-32px>
        <button z-btn bg="#e10505" onClick={onDelete}>删除</button>
      </div>
    </div>
  )
}
