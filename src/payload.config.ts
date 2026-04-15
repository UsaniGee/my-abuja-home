import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { cloudinaryStorage } from 'payloadcms-storage-cloudinary'
import { Users } from './payload/collections/Users' 
import { Media } from './payload/collections/Media'
import { Properties } from './payload/collections/Properties'
import InstagramSettings from './payload/collections/InstagramSettings'
import { BlogPosts } from './payload/collections/BlogPosts'
import { NewsPosts } from './payload/collections/NewsPosts'
import { Comments } from './payload/collections/Comments'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
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
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_USER || 'info@myabujahome.com',
    defaultFromName: 'My Abuja Home Contact',
    transportOptions: {
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://127.0.0.1/my-abuja-home',
  }),
  sharp,
  plugins: [
    cloudinaryStorage({
      cloudinaryConfig: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
        api_key: process.env.CLOUDINARY_API_KEY || '',
        api_secret: process.env.CLOUDINARY_API_SECRET || '',
      },
      collections: {
        media: true,
      },
    }),
  ],

  endpoints: [
    {
      path: '/instagram-feed',
      method: 'get',
      handler: async (req) => {
        try {
              // 1. Get the secure token from Payload's local API (bypass access for server-side use)
              const settings = await (req.payload as any).findGlobal({
                slug: 'instagram-settings',
                overrideAccess: true,
              });

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const { instagramId, accessToken } = settings as any;

              if (!instagramId || !accessToken) {
                return Response.json(
                  { error: 'Instagram settings are missing instagramId or accessToken' },
                  { status: 500 }
                );
              }

              // 2. Fetch from Instagram
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

              // 3. Return the data to your frontend
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

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        {
          path: '/contact',
          method: 'post',
          handler: async (req) => {
            try {
              let body;
              if (typeof req.json === 'function') {
                body = await req.json();
              } else {
                body = (req as any).data || (req as any).body || {};
              }
              const { firstName, lastName, email, phone, message } = body;

              if (!email || !message || !firstName) {
                return Response.json({ error: 'Missing required fields' }, { status: 400 });
              }

              await req.payload.sendEmail({
                to: process.env.CONTACT_EMAIL_RECIPIENT || process.env.SMTP_USER || 'admin@example.com',
                from: process.env.SMTP_USER || 'info@myabujahome.com',
                subject: `New Contact Form Submission from ${firstName} ${lastName}`,
                html: `
                  <h2>New Contact Submission</h2>
                  <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                  <p><strong>Message:</strong></p>
                  <p>${message.replace(/\n/g, '<br/>')}</p>
                `,
              });

              return Response.json({ success: true });
            } catch (error) {
              console.error('Contact form submission error:', error);
              return Response.json({ error: 'Failed to send message' }, { status: 500 });
            }
          },
        },
      ],
    })
