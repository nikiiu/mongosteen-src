import type { FormEventHandler } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { useSignInStore } from '../stores/useSignInStore'
import { validate } from '../lib/validate'

export const SignInPage: React.FC = () => {
  const { data, setData, error, setError } = useSignInStore()

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const error = validate(data, [
      { key: 'email', type: 'required', message: '请输入邮箱地址' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱地址格式不正确' },
      { key: 'code', type: 'required', message: '请输入验证码' },
      { key: 'code', type: 'length', min: 6, max: 6, message: '验证码必须是6个字符' },
    ])
    setError(error)
  }

  return (
    <div>
      <Gradient>
        <TopNav title='登录' icon={<Icon name="back" className='w-24px h-24px' />} />
      </Gradient>
       <div text-center pt-40px pb-16px>
        <Icon name="logo" className='w-64px h-68px' />
        <h1 text-32px text="#7878FF" font-bold>山竹记账</h1>
      </div>
      <form z-form onSubmit={onSubmit}>
        <div>
          <span z-form-label>邮箱地址 {error.email?.[0] && <span text-red>{error.email[0]}</span>}</span>
          <input z-input-text value={data.email} onChange={e => setData({ email: e.target.value })} type="text" placeholder='请输入邮箱，然后点击发送验证码' />
        </div>
        <div>
          <span z-form-label>验证码 {error.code?.[0] && <span text-red>{error.code[0]}</span>}</span>
          <div flex gap-x-16px>
            <input z-input-text value={data.code} onChange={e => setData({ code: e.target.value })} type="text" placeholder='六位数字'/>
            <button z-btn>发送验证码</button>
          </div>
        </div>
        <div mt-100px>
          <button z-btn type="submit">登录</button>
        </div>
      </form>
    </div>
  )
}
