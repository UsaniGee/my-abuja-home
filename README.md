# My Abuja Home

A modern real estate platform built with Next.js 15, Payload CMS 3.0, and Tailwind CSS.

## Features

- **Full-Stack Integration**: Payload CMS integrated directly into Next.js App Router.
- **Server Components**: Optimized data fetching using Payload's Local API.
- **Advanced Filtering**: Filter properties by status, type, price, bedrooms, and bathrooms.
- **Responsive Design**: Mobile-friendly interface with a responsive filter bar.
- **Modern UI**: Built with Shadcn UI and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3.0 (Beta)
- **Database**: MongoDB
- **Styling**: Tailwind CSS, Shadcn UI
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB installed and running locally

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd my-abuja-home
    ```

2.  Install dependencies:

    ```bash
    npm install --legacy-peer-deps
    ```

3.  Set up environment variables:
    Create a `.env` file in the root directory with the following content:

    ```env
    DATABASE_URI=mongodb://127.0.0.1/my-abuja-home
    PAYLOAD_SECRET=your-secret-key
    NEXT_PUBLIC_SERVER_URL=http://localhost:3000
    ```

4.  Run the development server:

    ```bash
    npm run dev
    ```

5.  Seed the database (optional):
    Visit `http://localhost:3000/api/seed` to populate the database with initial property data.

6.  Access the application:
    - Frontend: `http://localhost:3000`
    - Admin Panel: `http://localhost:3000/admin`

## Project Structure

- `src/app/(frontend)`: Frontend pages and components.
- `src/app/(payload)`: Payload CMS admin and API routes.
- `src/payload`: Payload configuration and collections.
- `src/components/ui`: Shared UI components (Shadcn).

## Troubleshooting

### TypeScript Errors

If you encounter TypeScript errors related to Payload types, try running:

```bash
npx payload generate:types
```

If that fails, ensure your `src/payload.config.ts` imports do not have file extensions (unless using `allowImportingTsExtensions`).

### Dependency Conflicts

Use `--legacy-peer-deps` when installing new packages to avoid conflicts between Payload CMS and Next.js versions.

## Production Readiness Checklist

Before deploying to production (Vercel or VPS), ensure the following:

### 1. Environment Variables
Ensure these are set in your production environment (Vercel Settings, .env on VPS):

- `DATABASE_URI`: Your production MongoDB connection string (e.g., MongoDB Atlas).
- `PAYLOAD_SECRET`: A strong, random string.
- `NEXT_PUBLIC_SERVER_URL`: Your production domain (e.g., `https://my-abuja-home.com`).
- `CLOUDINARY_CLOUD_NAME`: Required for cloud storage.
- `CLOUDINARY_API_KEY`: Required for cloud storage.
- `CLOUDINARY_API_SECRET`: Required for cloud storage.

### 2. Deployment Steps

#### Vercel
- Connect your GitHub repository to Vercel.
- The build script is already optimized: `npm run build` will automatically generate necessary maps.
- Ensure `legacy-peer-deps=true` is in your `.npmrc` (already included).

#### VPS (Ubuntu/Nginx)
1. Clone the repo and `npm install`.
2. Run `npm run build`.
3. Use **PM2** to manage the process:
   ```bash
   pm2 start npm --name "my-abuja-home" -- run start
   ```
4. Configure Nginx as a reverse proxy to port `3000`.

### 3. Media Storage
This project uses **Cloudinary** for media.
- Local uploads in the `/media` folder are enabled for redundancy (`disableLocalStorage: false`).
- Cloudinary ensures your media is persistent even if the VPS or Vercel container restarts.
