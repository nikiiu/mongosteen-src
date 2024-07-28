import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'

export const TagsNewPage: React.FC = () => {
  const [emoji, setEmoji] = useState('😆')
  const onSubmit = () => {
  }

  return (
    <div>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="新建标签" icon={<Icon name="back" className='w-24px h-24px' />} />
      </Gradient>
      <form flex flex-col gap-y-8px px-16px py-32px onSubmit={onSubmit}>
        <Input label='标签名' error='标签名太长' />
        <Input type='emoji' label={<span>图标 <span text-24px>{emoji}</span></span>} value={emoji} onChange={(v => setEmoji(v))} />
        <p text-center py-24px>记账时长按标签即可进行编辑</p>
        <div>
          <button z-btn>确定</button>
        </div>
      </form>
    </div>
  )
}
