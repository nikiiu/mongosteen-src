import type { MockMethod } from 'vite-plugin-mock'

export const meMock: MockMethod = {
  url: '/api/v1/me',
  method: 'get',
  statusCode: 403,
  response: () => {
    return ''
  }
}
