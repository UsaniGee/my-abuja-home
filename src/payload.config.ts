import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { cloudinaryStorage } from 'payload-cloudinary'

import { Users } from './payload/collections/Users' 
import { Media } from './payload/collections/Media'
import { Properties } from './payload/collections/Properties'
import InstagramSettings from './payload/collections/InstagramSettings'
import { BlogPosts } from './payload/collections/BlogPosts'
import { NewsPosts } from './payload/collections/NewsPosts'
import { Comments } from './payload/collections/Comments'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.DATABASE_URI) {
  console.warn('Warning: DATABASE_URI environment variable is not set. Build may succeed but runtime will require a database connection.');
}

if (!process.env.PAYLOAD_SECRET) {
  console.warn('Warning: PAYLOAD_SECRET environment variable is not set. Using a temporary secret for build.');
}

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.warn('Warning: Cloudinary environment variables are not fully set. Image uploads may fail at runtime.');
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media, 
    Properties,
    BlogPosts,
    NewsPosts,
    Comments
    ],
  globals: [
    InstagramSettings
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/my-abuja-home',
  }),
  sharp,
  plugins: [
    ...(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET
      ? [
          cloudinaryStorage({
            config: {
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET,
            },
            collections: {
              media: true,
            },
            folder: '',
            disableLocalStorage: false, // This ensures both local and cloud storage
          }),
        ]
      : []),
  ],

  endpoints: [
    {
      path: '/instagram-feed',
      method: 'get',
      handler: async (req) => {
        try {
              const settings = await (req.payload).findGlobal({
                slug: 'instagram-settings',
                overrideAccess: true,
              });
              const { instagramId, accessToken } = settings;

              if (!instagramId || !accessToken) {
                return Response.json(
                  { error: 'Instagram settings are missing instagramId or accessToken' },
                  { status: 500 }
                );
              }

              const igRes = await fetch(
                `https://graph.instagram.com/${instagramId}/media?fields=id,caption,media_url,permalink&limit=5&access_token=${accessToken}`
              );

              if (!igRes.ok) {
                return Response.json(
                  { error: `Instagram API error: ${igRes.status}` },
                  { status: igRes.status }
                );
              }

              const data = await igRes.json();

              return Response.json(data?.data ?? []);
            } catch (error) {
              console.error('instagram-feed error', error);
              return Response.json({ error: 'Internal Server Error' }, { status: 500 });
            }
          },
        },
        {
          path: '/instagram-refresh',
          method: 'post',
          handler: async (req) => {
            try {
              if (!req.user) {
                return Response.json({ error: 'Unauthorized' }, { status: 401 });
              }

              const settings = await (req.payload).findGlobal({
                slug: 'instagram-settings',
                overrideAccess: true,
              });

              const { accessToken } = settings;

              if (!accessToken) {
                return Response.json({ error: 'Missing access token' }, { status: 500 });
              }

              const refreshRes = await fetch(
                `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`
              );

              const refreshData = await refreshRes.json();

              if (!refreshRes.ok || !refreshData?.access_token) {
                return Response.json(
                  { error: refreshData?.error?.message || 'Failed to refresh token' },
                  { status: refreshRes.status || 500 }
                );
              }

              const newToken = refreshData.access_token;
              const expiresIn = refreshData.expires_in ;
              const now = new Date().toISOString();

              await (req.payload).updateGlobal({
                slug: 'instagram-settings',
                data: {
                  accessToken: newToken,
                  lastRefreshedAt: now,
                },
                overrideAccess: true,
              });

              return Response.json({
                accessToken: newToken,
                expiresIn,
                lastRefreshedAt: now,
              });
            } catch (error) {
              console.error('instagram-refresh error', error);
              return Response.json({ error: 'Internal Server Error' }, { status: 500 });
            }
          },
        },
      ],
    })
