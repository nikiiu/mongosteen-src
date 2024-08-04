type Props = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  onClick?: () => void
}

export const SmsCodeInput: React.FC<Props> = (props) => {
  const { value, placeholder, onChange, onClick } = props
  return (
    <div flex gap-x-16px>
      <input shrink-1 z-input-text type="text" placeholder={placeholder} max-w="[calc(45%-8px)]"
        value={value} onChange={e => onChange?.(e.target.value)} />
      <button type="button" max-w="[calc(55%-8px)]" shrink-0 z-btn onClick={onClick}>发送验证码</button>
    </div>
  )
}
