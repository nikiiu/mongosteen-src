import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'

let id = 0

const createId = () => {
  id += 1
  return id
}

const create = (attrs?: Partial<Item>): Item =>
  ({
    id: createId(),
    user_id: 275,
    amount: faker.datatype.number({ min: 99, max: 1000_00 }),
    tag_ids: [
      720
    ],
    happened_at: faker.date.past().toISOString(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    kind: 'expenses',
    happen_at: '2023-09-08T16:50:04.278+08:00',
    ...attrs
  })

const createList = (n: number, attrs?: Partial<Item>): Item[] =>
  Array.from({ length: n }).map(() => create(attrs))

const createResponse = ({ count = 10, perPage = 10, page = 1 }, attrs?: Partial<Item>): Resources<Item> => {
  const sendCount = (page - 1) * perPage
  const left = count - sendCount

  return ({
    resources: left > 0 ? createList(Math.min(perPage, left), attrs) : [],
    pager: {
      page,
      per_page: perPage,
      count
    }
  })
}

export const itemsMock: MockMethod[] = [{
  url: '/api/v1/items',
  method: 'get',
  statusCode: 200,
  response: ({ query }: ResponseParams): Resources<Item> =>
    createResponse({ count: 0, perPage: 10, page: parseInt(query.page) || 1 },)
}]

