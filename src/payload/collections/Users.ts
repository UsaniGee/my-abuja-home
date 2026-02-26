import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
  },
  auth: true,
  fields: [ {
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    required: true,
  }],
}
