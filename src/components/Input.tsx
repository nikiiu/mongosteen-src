import { EmojiInput } from './Input/EmojiInput'

type Props = {
  label?: string | React.ReactNode
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  disableError?: boolean
}& (
  | { type: 'text' }
  | { type: 'emoji' }
  | { type: 'sms_code'; onClick: () => void }
  | { type: 'select'; options: { value: string; text: string }[] }
)
export const Input: React.FC<Props> = (props) => {
  const { label, error, placeholder, type, value, onChange, disableError } = props
  const renderInput = () => {
    switch (props.type) {
      case undefined:
      case 'text':
        return <input z-input-text type={type} placeholder={placeholder}
          value={value} onChange={e => onChange?.(e.target.value)} />
      case 'emoji':
        return <EmojiInput value={value} onChange={value => onChange?.(value)} />
      case 'select':
        return <select className="h-36px" value={value} onChange={(e) => onChange?.(e.target.value)}>
          {props.options.map(option =>
            <option key={option.value} value={option.value}>{option.text}</option>
            )}
        </select>
      case 'sms_code':
        return (
          <div flex gap-x-16px>
            <input shrink-1 z-input-text type="text" placeholder={placeholder} max-w="[calc(45%-8px)]"
              value={value} onChange={e => onChange?.(e.target.value)} />
             <button type="button" max-w="[calc(55%-8px)]" shrink-0 z-btn onClick={props.onClick}>发送验证码</button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
       <div flex flex-col gap-y-8px>
        {label ? <span text-18px>{label}</span> : null}
          {renderInput()}
           {disableError ? null : <span text-red text-12px>{error || '　'}</span>}
      </div>
    </>
  )
}
