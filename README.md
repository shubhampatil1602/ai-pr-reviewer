# 🚀 PR Pilot - AI Code Reviewer

Automate your Pull Request reviews seamlessly. **PR Pilot** is an intelligent AI-powered code reviewer that deeply understands your repository context to help you ship better, more secure code faster.

[![Live Demo](https://img.shields.io/badge/Live_Demo-pr--pilot.shubhamspatil.me-blue?style=for-the-badge)](https://pr-pilot.shubhamspatil.me/)

## ✨ Features

- **🧠 Deep Context Understanding:** Doesn't just read the diff—understands how changes impact the broader architecture.
- **⚡ Background Processing:** Powered by Inngest for reliable, asynchronous webhook handling and AI processing.
- **🤖 High-Quality Reviews:** Uses advanced LLMs to provide constructive feedback, flag vulnerabilities, and optimize performance.
- **🔍 Semantic Repository Search:** Integrated with Pinecone vector database to embed and search your codebase instantly.
- **🔐 Secure Authentication:** Seamless GitHub OAuth powered by Better Auth.
- **💳 Monetization:** Razorpay integration for frictionless subscriptions.
- **🎨 Beautiful UI:** Built with Tailwind CSS v4, Framer Motion, and cutting-edge UI components.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + Framer Motion
- **Database:** PostgreSQL (Neon) + Prisma ORM
- **Vector DB:** Pinecone
- **Authentication:** Better Auth
- **Background Jobs:** Inngest
- **AI Integration:** AI SDK + OpenRouter

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shubhampatil1602/ai-pr-reviewer.git
cd ai-pr-reviewer
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add the following keys:

```env
DATABASE_URL="your_postgresql_database_url"

# Authentication
BETTER_AUTH_SECRET="your_random_secret"
BETTER_AUTH_URL="http://localhost:3000"

# GitHub App Integration
GITHUB_APP_ID="your_app_id"
GITHUB_CLIENT_ID="your_client_id"
GITHUB_CLIENT_SECRET="your_client_secret"
GITHUB_WEBHOOK_SECRET="your_webhook_secret"
GITHUB_APP_PRIVATE_KEY="your_private_key"

# Background Jobs
INNGEST_DEV=1

# AI & Vector DB
OPENROUTER_API_KEY="your_openrouter_key"
PINECONE_INDEX="your_pinecone_index"
PINECONE_API_KEY="your_pinecone_key"
```

### 4. Setup Database

```bash
npx prisma db push
npx prisma generate
```

### 5. Run the Application

You will need to run the Next.js app and the Inngest dev server simultaneously:

```bash
# Terminal 1: Next.js dev server
pnpm dev

# Terminal 2: Inngest dev server
npx inngest-cli@latest dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app!

## 🌍 Deployment

PR Pilot is optimized for deployment on **Vercel**.

1. Connect your GitHub repository to Vercel.
2. Add all environment variables.
3. Set the Build Command in Vercel to `npx prisma generate && next build`.
4. Deploy!
