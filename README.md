# SAM2 SaaS Concept 🎨

[![GitHub Actions](https://github.com/devtony01/sam2-saas-concept/actions/workflows/api-staging.yml/badge.svg)](https://github.com/devtony01/sam2-saas-concept/actions)
[![GitHub Actions](https://github.com/devtony01/sam2-saas-concept/actions/workflows/web-staging.yml/badge.svg)](https://github.com/devtony01/sam2-saas-concept/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An AI-powered image segmentation platform built with the **Segment Anything Model 2 (SAM2)**. This SaaS application allows users to upload images and perform intelligent segmentation using cutting-edge AI technology.

## 🚀 Live Demo

- **Staging**: [sam2-saas.is-not-a.dev](https://sam2-saas.is-not-a.dev)
- **Production**: [sam2-saas-prod.is-not-a.dev](https://sam2-saas-prod.is-not-a.dev)
- **API Documentation**: [api.sam2-saas.is-not-a.dev](https://api.sam2-saas.is-not-a.dev)

## ✨ Features

- 🖼️ **Image Upload & Processing** - Drag and drop or browse to upload images
- 🤖 **AI-Powered Segmentation** - Powered by Meta's SAM2 model
- 🎨 **Interactive Segmentation** - Click-based prompt segmentation
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🔐 **User Authentication** - Secure JWT-based authentication
- 📊 **Project Management** - Organize your segmentation projects
- ☁️ **Cloud Storage** - Secure image and result storage
- 🌐 **RESTful API** - Full API access for developers

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 15 with React 19
- **UI Library**: Mantine UI components
- **State Management**: Zustand
- **HTTP Client**: Axios with React Query
- **Styling**: CSS Modules with PostCSS

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Koa.js
- **Database**: MongoDB Atlas
- **Cache**: Redis (Upstash)
- **Authentication**: JWT tokens
- **File Upload**: AWS SDK for S3-compatible storage

### AI/ML
- **Model**: Segment Anything Model 2 (SAM2)
- **Image Processing**: Canvas API integration
- **Real-time Processing**: WebSocket support

### Infrastructure
- **Container Orchestration**: Kubernetes (AWS EKS)
- **CI/CD**: GitHub Actions
- **SSL/TLS**: Let's Encrypt with cert-manager
- **Load Balancing**: NGINX Ingress Controller
- **Monitoring**: Kubernetes metrics

## 🛠️ Technology Stack

```
┌─────────────────┬─────────────────┬─────────────────┐
│    Frontend     │     Backend     │  Infrastructure │
├─────────────────┼─────────────────┼─────────────────┤
│ Next.js 15      │ Node.js         │ Kubernetes      │
│ React 19        │ Koa.js          │ AWS EKS         │
│ TypeScript      │ TypeScript      │ Docker          │
│ Mantine UI      │ MongoDB Atlas   │ GitHub Actions  │
│ Zustand         │ Redis (Upstash) │ Let's Encrypt   │
│ React Query     │ JWT Auth        │ NGINX Ingress   │
└─────────────────┴─────────────────┴─────────────────┘
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm 8+
- Docker (optional)
- Kubernetes cluster (for deployment)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/devtony01/sam2-saas-concept.git
cd sam2-saas-concept
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
# Copy environment templates
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Update with your credentials
```

4. **Start development servers**
```bash
# Start all services
pnpm dev

# Or start individually
pnpm dev:api    # API server (port 3001)
pnpm dev:web    # Web app (port 3002)
```

### Environment Variables

#### API (`apps/api/.env`)
```env
# Database
MONGO_URI=mongodb://localhost:27017/sam2-saas
REDIS_URI=redis://localhost:6379

# Application URLs
API_URL=http://localhost:3001
WEB_URL=http://localhost:3002

# Optional: External services
RESEND_API_KEY=your_resend_key
CLOUD_STORAGE_ENDPOINT=your_s3_endpoint
```

#### Web (`apps/web/.env`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📦 Deployment

The application uses GitOps-style deployment with GitHub Actions:

### Staging Deployment
- **Trigger**: Push to `main` branch
- **Environment**: Staging cluster
- **URL**: [sam2-saas.is-not-a.dev](https://sam2-saas.is-not-a.dev)

### Production Deployment
- **Trigger**: Push to `production` branch
- **Environment**: Production cluster  
- **URL**: [sam2-saas-prod.is-not-a.dev](https://sam2-saas-prod.is-not-a.dev)

### Manual Deployment
```bash
# Deploy to staging
kubectl apply -f deploy/app/web/staging.yaml
kubectl apply -f deploy/app/api/staging.yaml

# Deploy to production
kubectl apply -f deploy/app/web/production.yaml
kubectl apply -f deploy/app/api/production.yaml
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run API tests
pnpm test:api

# Run web tests
pnpm test:web

# Run with coverage
pnpm test:coverage
```

## 📝 API Documentation

The API provides endpoints for:

- **Authentication**: `/auth/signin`, `/auth/signup`
- **Image Processing**: `/images/upload`, `/images/segment`
- **Projects**: `/projects`, `/projects/:id`
- **Health**: `/health`

Full API documentation available at: [api.sam2-saas.is-not-a.dev/docs](https://api.sam2-saas.is-not-a.dev/docs)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Tony** ([@devtony01](https://github.com/devtony01))
- Email: chibuezeogbuji01@gmail.com
- GitHub: [@devtony01](https://github.com/devtony01)

## 🙏 Acknowledgments

- [Meta AI](https://ai.meta.com/) for the Segment Anything Model 2
- [Mantine](https://mantine.dev/) for the beautiful UI components
- [Open Domains](https://github.com/open-domains/register) for free domain hosting
- The open-source community for amazing tools and libraries

---

⭐ If you find this project helpful, please give it a star!
