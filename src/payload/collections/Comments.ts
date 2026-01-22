import { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: any }) => Boolean(req?.user)

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'post', 'approved', 'createdAt'],
  },
  access: {
    read: ({ req }) =>
      req?.user
        ? true
        : {
            approved: {
              equals: true,
            },
          },
    create: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'blog-posts',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      admin: { rows: 4 },
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
      label: 'Approved',
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (!req?.user) {
          return {
            ...data,
            approved: false,
          }
        }
        return data
      },
    ],
  },
  timestamps: true,
}

export default Comments
