import { EmojiInput } from './Input/EmojiInput'

type Props = {
  label: string | React.ReactNode
  placeholder?: string
  type?: 'text' | 'emoji' | 'sms_code'
  value?: string
  onChange?: (value: string) => void
  error?: string
}
export const Input: React.FC<Props> = (props) => {
  const { label, error, placeholder, type = 'text', value, onChange } = props
  const renderInput = () => {
    switch (type) {
      case 'text':
        return <input z-input-text type={type} placeholder={placeholder}
          value={value} onChange={e => onChange?.(e.target.value)} />
      case 'emoji':
        return <EmojiInput value={value} onChange={value => onChange?.(value)} />
      case 'sms_code':
        return (
          <div flex gap-x-16px>
            <input shrink-1 z-input-text type="text" placeholder={placeholder} max-w="[calc(45%-8px)]"
              value={value} onChange={e => onChange?.(e.target.value)} />
            <button max-w="[calc(55%-8px)]" shrink-0 z-btn>发送验证码</button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
       <div flex flex-col gap-y-8px>
          <span text-18px>{label}</span>
          {renderInput()}
          <span text-red text-14px>{error || '　'}</span>
      </div>
    </>
  )
}
