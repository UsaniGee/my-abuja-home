import { GlobalConfig } from "payload";

const InstagramSettings: GlobalConfig = {
  slug: 'instagram-settings',
  access: {
    // Allow authenticated users (including admin) to read via Payload, keep public blocked.
    read: ({ req }) => Boolean(req?.user),
  },
  fields: [
    { 
      name: 'accessToken', 
      type: 'text', 
      required: true,
      admin: { 
        description: 'Long-lived Instagram Basic Display access token.' 
      },
    },
    { 
      name: 'instagramId', 
      type: 'text', 
      required: true,
      admin: { 
        description: 'Numeric Instagram user ID associated with the access token.' 
      },
    },
    {
      name: 'lastRefreshedAt',
      label: 'Last refreshed at',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Set automatically when you use the refresh button.',
      },
    },
    {
      name: 'refreshTokenAction',
      type: 'ui',
      admin: {
        components: {
          Field: {
            // Payload will import this client component into admin
            path: './payload/components/InstagramRefreshButton',
          } as any,
        },
      },
    },
  ],
};

export default InstagramSettings;