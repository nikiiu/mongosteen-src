import type { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/v1/me',
    method: 'get',
    response: (): Resource<User> => {
      return {
        resource: {
          id: 1,
          email: '111@qq.com',
          created_at: '2021-08-01T00:00:00.000Z',
          updated_at: '2021-08-01T00:00:00.000Z'
        }
      }
    },
  },
  {
    url: '/api/v1/items',
    method: 'get',
    response: (): Resources<Item> => {
      return {
        resources: [],
        pager: {
          page: 1,
          per_page: 25,
          count: 0
        }
      }
      // return {
      //   resources: [
      //     {
      //       id: 523,
      //       user_id: 275,
      //       amount: 1916,
      //       tag_ids: [
      //         720
      //       ],
      //       happened_at: '2023-09-08T16:50:04.278+08:00',
      //       created_at: '2023-09-13T16:50:04.280+08:00',
      //       updated_at: '2023-09-13T16:50:04.280+08:00',
      //       kind: 'expenses',
      //       deleted_at: 'note',
      //       happen_at: '2023-09-08T16:50:04.278+08:00',

      //     },
      //   ],
      //   pager: {
      //     page: 1,
      //     per_page: 25,
      //     count: 100
      //   }
      // }
    },
  },
] as MockMethod[]

