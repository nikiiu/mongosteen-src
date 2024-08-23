import type { ChangeEvent } from 'react'
import { EmojiInput } from './Input/EmojiInput'
import { SmsCodeInput } from './Input/SmsCodeInput'
import { DateInput } from './Input/DateInput'

type Props<T> = {
  label?: string | React.ReactNode
  placeholder?: string
  value?: T
  onChange?: (value: T) => void
  error?: string
  disableError?: boolean
  className?: string
}& (
  | { type?: 'text' }
  | { type: 'emoji' }
  | { type: 'myDate' }
  | { type: 'sms_code'; request: () => Promise<unknown> }
  | { type: 'select'; options: { value: string; text: string }[] }
)
export const Input = <T extends string>(props: Props<T>) => {
  const { label, error, placeholder, value, onChange: _onChange, disableError, className } = props

  const onChange = (e: string | ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = typeof e === 'string' ? e : e.target.value
    _onChange?.(value as T)
  }
  const common = { value, onChange, placeholder }
  const renderInput = () => {
    switch (props.type) {
      case undefined:
      case 'text':
        return <input z-input-text type='text' {...common} />
      case 'emoji':
        return <EmojiInput {...common} />
      case 'select':
        return <select className="h-36px" {...common}>
          {props.options.map(option =>
            <option key={option.value} value={option.value}>{option.text}</option>
            )}
        </select>
      case 'sms_code':
        return <SmsCodeInput {...common} request={props.request} />
      case 'myDate':
        return <DateInput {...common} />
      default:
        return null
    }
  }

  return (
    <>
       <div flex flex-col gap-y-8px className={className}>
        {label ? <span text-18px>{label}</span> : null}
          {renderInput()}
           {disableError ? null : <span text-red text-12px>{error || '　'}</span>}
      </div>
    </>
  )
}
