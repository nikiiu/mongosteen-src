import { useState } from 'react'
import { emojis } from '../../lib/emojis'

type Props = {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export const EmojiInput: React.FC<Props> = (props) => {
  const { value, onChange, className } = props
  const [emojiKind, setEmojiKind] = useState('表情')
  return (
    <div className={className} b-1 b-solid b="#5C33BE" rounded-8px>
      <div flex p-8px gap-x-16px overflow-auto text="#999">
        {emojis.map(emoji =>
          <span whitespace-nowrap key={emoji.name}
            style={{ color: emoji.name === emojiKind ? '#5c33be' : '#999' }}
            onClick={() => setEmojiKind(emoji.name)}>{emoji.name}</span>
        )}
      </div>
      <div text-24px p-t-8px p-b-16px h-300px overflow-auto text-center>
        {emojis.map(emoji =>
          <div key={emoji.name} style={{ display: emoji.name === emojiKind ? '' : 'none' }}
            grid grid-cols="[repeat(auto-fit,34px)]" grid-rows="[repeat(auto-fit,34px)]"
            justify-center>
            {emoji.chars.map(char =>
              <span key={char} b-1 b-solid b-transparent style={{ borderColor: char === value ? '#5C33BE' : '' }}
                rounded-4px
                onClick={() => value !== char && onChange?.(char)}>{char}</span>
            )}
          </div>)}
      </div>
    </div>
  )
}
