import { useState } from 'react'
import { emojis } from '../lib/emojis'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'

export const TagsNewPage: React.FC = () => {
  const onSubmit = () => {
  }
  const [emojiKind, setEmojiKind] = useState('表情')

  return (
    <div>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="新建标签" icon={<Icon name="back" className='w-24px h-24px' />} />
      </Gradient>
      <form flex flex-col gap-y-8px px-16px py-32px onSubmit={onSubmit}>
        <div flex flex-col gap-y-8px>
          <span text-18px>标签名</span>
          <input z-input-text />
          <span text-red text-12px>标签名太长</span>
        </div>
        <div flex flex-col gap-y-8px>
          <span text-18px>符号 <span text-24px>😀</span></span>
          <div b-1 b="#5c33be" rounded-8px>
            <div p-8px flex overflow-scroll gap-x-16px>
              {emojis.map(emoji =>
                <span style={{ color: emoji.name === emojiKind ? '#5c33be' : '#999' }} whitespace-nowrap key={emoji.name}
                  onClick={() => setEmojiKind(emoji.name)}>
                  {emoji.name}</span>
              )}
            </div>
            <div text-24px px-1px p-t-8px p-b-16px h-400px overflow-auto text-center >
              {emojis.map(emoji =>
                <div grid grid-cols="[repeat(auto-fit,34px)]" grid-rows="[repeat(auto-fit,34px)]"
                  justify-center key={emoji.name} style={{ display: emoji.name === emojiKind ? '' : 'none' }}>
                  {emoji.chars.map(char => <span>{char}</span>)}
                </div>
              )}
            </div>
          </div>

        </div>
        <p text-center py-24px>记账时长按标签即可进行编辑</p>
        <div>
          <button z-btn>确定</button>
        </div>
      </form>
    </div>
  )
}
