import { useSearchParams } from 'react-router-dom'
import type { FormEventHandler } from 'react'
import { useEffect } from 'react'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'
import { useCreateTagStore } from '../stores/useCreateTagStore'
import { hasError, validate } from '../lib/validate'

export const TagsNewPage: React.FC = () => {
  const { data, error, setData, setError } = useCreateTagStore()
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const kind = searchParams.get('kind')
    if (!kind) { throw new Error('kind 必填') }
    if (kind !== 'expenses' && kind !== 'income') {
      throw new Error('kind 必须是 expenses 或 income')
    }
    setData({ kind })
  }, [searchParams])
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    const newError = validate(data, [
      { key: 'kind', type: 'required', message: '标签类型必填' },
      { key: 'name', type: 'required', message: '标签名必填' },
      { key: 'name', type: 'length', max: 4, message: '标签名最多四个字符' },
      { key: 'sign', type: 'required', message: '符号必填' },
    ])
    setError(newError)
    if (!hasError(newError)) {
      // 发起 AJAX 请求
      console.log('没有表单错误')
    }
  }

  return (
    <div>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="新建标签" icon={<Icon name="back" className='w-24px h-24px' />} />
      </Gradient>
      <form flex flex-col gap-y-8px px-16px py-32px onSubmit={onSubmit}>
        <Input value={data.name} onChange={name => setData({ name })} label='标签名' error={error.name?.[0]} />
        <Input type='emoji' label={<span>图标 <span text-24px>{data.sign}</span></span>} error={ error.sign?.[0]}
          value={data.sign} onChange={sign => setData({ sign })} />
        <p text-center py-24px>记账时长按标签即可进行编辑</p>
        <div>
          <button z-btn>确定</button>
        </div>
      </form>
    </div>
  )
}
