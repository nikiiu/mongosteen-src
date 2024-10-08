import { useEffect, useRef, useState } from 'react'

type Props = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  request?: () => Promise<unknown>
  className?: string
}

const maxCount = 60
export const SmsCodeInput: React.FC<Props> = (props) => {
  const { value, placeholder, onChange, request, className } = props
  const [started, setStarted] = useState<Date>()
  const [count, setCount] = useState(maxCount)
  const timer = useRef<number>()
  const clearTimer = () => {
    if (timer.current) {
      window.clearInterval(timer.current)
      timer.current = undefined
    }
  }
  useEffect(() => {
    if (!started) {
      clearTimer()
      return
     }
      timer.current = window.setInterval(() => {
        const seconds = Math.round((new Date().getTime() - started.getTime()) / 1000)
         const count = maxCount - seconds
        if (count < 0) {
          setStarted(undefined)
        }
        setCount(count)
      }, 1000)

    return clearTimer
  }, [started]
  )

  const onClick = async () => {
    if (!request) { return }
    await request?.()
    setStarted(new Date())
  }
  return (
    <div className={className} flex gap-x-16px>
      <input shrink-1 z-input-text type="text" placeholder={placeholder} w="[calc(45%-8px)]"
        value={value} onChange={e => onChange?.(e.target.value)} />
      {started
        ? <button type="button" w="[calc(55%-8px)]" shrink-0 z-btn disabled text-gray>{count}秒后可重发</button>
        : <button type="button" w="[calc(55%-8px)]" shrink-0 z-btn onClick={onClick}>发送验证码</button>}

    </div>
  )
}
