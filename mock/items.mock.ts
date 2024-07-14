import type { MockMethod } from 'vite-plugin-mock'

let id = 0

const createId = () => {
  id += 1
  return id
}

const create = (attrs?: Partial<Item>): Item =>
  ({
    id: createId(),
    user_id: 275,
    amount: 1916,
    tag_ids: [
      720
    ],
    happened_at: '2023-09-08T16:50:04.278+08:00',
    created_at: '2023-09-13T16:50:04.280+08:00',
    updated_at: '2023-09-13T16:50:04.280+08:00',
    kind: 'expenses',
    deleted_at: 'note',
    happen_at: '2023-09-08T16:50:04.278+08:00',
    ...attrs
  })

const createList = (n: number, attrs?: Partial<Item>): Item[] =>
  Array.from({ length: n }).map(() => create(attrs))

const createResponse = ({ count = 10, perPage = 10, page = 1 }, attrs?: Partial<Item>): Resources<Item> =>
  ({
    resources: createList(perPage, attrs),
    pager: {
      page,
      per_page: perPage,
      count
    }
  })

export const itemsMock: MockMethod = {
  url: '/api/v1/items',
  method: 'get',
  response: ({ query }: ResponseParams): Resources<Item> => createResponse({ count: 100, perPage: 10, page: parseInt(query.page) },)

}

