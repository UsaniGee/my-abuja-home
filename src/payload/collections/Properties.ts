import { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'For Sale', value: 'for-sale' },
        { label: 'For Rent', value: 'for-rent' },
      ],
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'House', value: 'house' },
        { label: 'Apartment', value: 'apartment' },
        { label: 'Condo', value: 'condo' },
        { label: 'Land', value: 'land' },
      ],
      required: true,
    },
    {
      name: 'bedrooms',
      type: 'number',
    },
    {
      name: 'bathrooms',
      type: 'number',
    },
    {
      name: 'area',
      type: 'number',
      label: 'Area (sqft)',
    },
    {
      name: 'yearBuilt',
      type: 'number',
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      required: false,
    },
    {
      name: 'description',
      type: 'richText',
    },
  ],
}
