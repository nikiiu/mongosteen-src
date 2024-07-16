import type { MockMethod } from 'vite-plugin-mock'

export const sessionMock: MockMethod = {
  url: '/api/v1/session',
  method: 'post',
  statusCode: 200,
  response: (): { jwt: string } => {
    return {
      jwt: 'xxxxx'
    }
  },
}
