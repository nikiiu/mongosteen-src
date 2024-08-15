import type { MockMethod } from 'vite-plugin-mock'

export const summaryMock: MockMethod[] = [{
  url: '/api/v1/items/summary',
  method: 'get',
  statusCode: 200,
  response: () => {
    return {
    groups: [
      {
        happen_at: '2024-08-15',
        tag: null,
        amount: 600
      },
      {
        happen_at: '2024-08-16',
        tag: null,
        amount: 300
      },
      {
        happen_at: '2024-08-17',
        tag: null,
        amount: 200
      }
    ],
    total: 900
  }
  }
}
]
