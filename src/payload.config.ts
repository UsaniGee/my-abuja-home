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
  throw new Error('DATABASE_URI environment variable is required')
}

if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET environment variable is required')
}

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Cloudinary environment variables are required')
}

export default buildConfig({
  serverURL: process.env.NODE_ENV === 'production' 
    ? (process.env.NEXT_PUBLIC_SERVER_URL || 'https://my-abuja-home.vercel.app') 
    : 'http://localhost:3000',
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
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),
  sharp,
  plugins: [
    cloudinaryStorage({
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
      },
      collections: {
        media: true,
      },
      folder: '', // Set to empty to use the root folder or match your existing Cloudinary structure
      disableLocalStorage: true, // Keep local files for now to ensure local development works seamlessly
    }),
  ],

  endpoints: [
    {
      path: '/instagram-feed',
      method: 'get',
      handler: async (req) => {
        try {
              const settings = await (req.payload as any).findGlobal({
                slug: 'instagram-settings',
                overrideAccess: true,
              });
              const { instagramId, accessToken } = settings as any;

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

              const settings = await (req.payload as any).findGlobal({
                slug: 'instagram-settings',
                overrideAccess: true,
              });

              const { accessToken } = settings as any;

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

              const newToken = refreshData.access_token as string;
              const expiresIn = refreshData.expires_in as number | undefined;
              const now = new Date().toISOString();

              await (req.payload as any).updateGlobal({
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
