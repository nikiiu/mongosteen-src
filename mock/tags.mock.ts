import { faker } from '@faker-js/faker'
import type { MockMethod } from 'vite-plugin-mock'

let id = 0

const createId = () => {
  id += 1
  return id
}

const create = (attrs?: Partial<Tag>): Tag =>
  ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    user_id: 275,
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    kind: 'expenses',
    deleted_at: null,
    ...attrs
  })

const createList = (n: number, attrs?: Partial<Tag>): Tag[] =>
  Array.from({ length: n }).map(() => create(attrs))

const createResponse = ({ count = 10, perPage = 10, page = 1 }, attrs?: Partial<Tag>): Resources<Tag> => {
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

export const tagsMock: MockMethod[] = [{
  url: '/api/v1/tags',
  method: 'get',
  statusCode: 200,
  response: ({ query }: ResponseParams): Resources<Tag> => {
    return createResponse({ count: 90, perPage: 50, page: parseInt(query.page) || 1 },)
  }
  ,
},
{
  url: '/api/v1/tags',
  method: 'post',
  statusCode: 200,
  response: ({ query }: ResponseParams): Resource<Tag> => {
    return {
      resource: create()
    }
  }
    ,
},
{
  url: '/api/v1/tags/:id',
  method: 'patch',
  statusCode: 200,
  response: ({ query }: ResponseParams): Resource<Tag> => {
    return {
      resource: create()
    }
  }
}, {
  url: '/api/v1/tags/:id',
  method: 'get',
  statusCode: 200,
  response: ({ query }: ResponseParams): Resource<Tag> => {
    return {
      resource: create()
    }
  }
}
]
