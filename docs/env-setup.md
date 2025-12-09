# Environment Setup for Payload CMS

To run Payload CMS, you need to create a `.env` file in the root of your project.

## 1. Create the File

Create a new file named `.env` in the root directory:
`/home/fittechy/Desktop/Gideon Bk/WEB DEVELOPMENT/my-abuja-home/.env`

## 2. Add Environment Variables

Copy and paste the following content into the file:

```bash
# Database Connection (MongoDB)
# Ensure MongoDB is running locally on port 27017
DATABASE_URI=mongodb://127.0.0.1/my-abuja-home

# Payload Secret
# Used for signing JWTs and other security features.
# You can generate a random string for this.
PAYLOAD_SECRET=YOUR_SECRET_KEY_HERE

# Server URL
# The URL where your Next.js app is running.
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## 3. Restart Server

After creating the file, restart your development server to apply the changes:

```bash
npm run dev
```
