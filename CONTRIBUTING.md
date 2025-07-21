# Contributing to SAM2 SaaS Concept 🎨

Thank you for considering contributing to the SAM2 SaaS Concept! We welcome contributions from the community and are excited to work with you.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. Please be respectful and considerate in all interactions.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ and pnpm 8+
- Docker (for local development)
- Git for version control
- Basic knowledge of TypeScript, React, and Node.js

### Setting Up Development Environment

1. **Fork and clone the repository**
```bash
git clone https://github.com/your-username/sam2-saas-concept.git
cd sam2-saas-concept
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
# Edit the .env files with your configuration
```

4. **Start development servers**
```bash
pnpm dev
```

## 🔄 Development Workflow

### Branching Strategy

We use a GitFlow-inspired workflow:

- `main` - Stable staging branch
- `production` - Production releases
- `feature/feature-name` - New features
- `bugfix/issue-description` - Bug fixes
- `hotfix/critical-fix` - Emergency fixes

### Making Changes

1. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**
   - Write clean, readable code
   - Follow our coding standards
   - Add tests for new functionality
   - Update documentation as needed

3. **Commit your changes**
```bash
git add .
git commit -m "feat: add amazing new feature"
```

4. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

## 📝 Pull Request Process

### Before Submitting

- ✅ Code follows our style guidelines
- ✅ Tests pass (`pnpm test`)
- ✅ Build succeeds (`pnpm build`)
- ✅ Documentation is updated
- ✅ Commit messages follow our format

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - Code style changes
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes

**Examples:**
```bash
feat(api): add image segmentation endpoint
fix(web): resolve upload progress indicator bug
docs: update API documentation for v2 endpoints
```

### Pull Request Template

When creating a pull request, please include:

- **Description** - What does this PR do?
- **Type of Change** - Feature, bugfix, documentation, etc.
- **Testing** - How was this tested?
- **Screenshots** - For UI changes
- **Breaking Changes** - Any breaking changes?
- **Checklist** - Confirm requirements are met

## 🎯 Coding Standards

### TypeScript

- Use strict TypeScript configuration
- Provide type annotations for all public APIs
- Prefer interfaces over types for object definitions
- Use meaningful variable and function names

### React/Next.js

- Use functional components with hooks
- Follow React best practices
- Implement proper error boundaries
- Use Mantine UI components consistently

### Node.js/API

- Use async/await over callbacks
- Implement proper error handling
- Follow RESTful API design principles
- Use middleware for cross-cutting concerns

### File Organization

```
apps/
├── api/                 # Backend API
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   └── utils/
├── web/                 # Frontend app
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   └── utils/
packages/                # Shared packages
├── app-types/
├── schemas/
└── app-constants/
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run specific test suites
pnpm test:api
pnpm test:web

# Run with coverage
pnpm test:coverage

# Run in watch mode
pnpm test:watch
```

### Writing Tests

- **Unit Tests** - Test individual functions/components
- **Integration Tests** - Test API endpoints and workflows
- **E2E Tests** - Test complete user journeys

### Test Standards

- Aim for 80%+ test coverage
- Write descriptive test names
- Use proper setup/teardown
- Mock external dependencies

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Include examples in complex functions
- Document complex business logic
- Keep README files updated

### API Documentation

- Update OpenAPI/Swagger specs
- Provide request/response examples
- Document error cases
- Include authentication requirements

## 🏗️ Architecture Guidelines

### Frontend Architecture

- **Components** - Reusable UI components
- **Pages** - Next.js pages with routing
- **Hooks** - Custom React hooks for logic
- **Utils** - Helper functions and utilities
- **Types** - TypeScript type definitions

### Backend Architecture

- **Controllers** - Request/response handling
- **Services** - Business logic layer
- **Models** - Data models and validation
- **Middleware** - Cross-cutting concerns
- **Utils** - Helper functions

### State Management

- Use Zustand for client-side state
- Implement proper data fetching with React Query
- Keep state minimal and focused
- Use proper error and loading states

## 🐛 Reporting Issues

### Bug Reports

Include the following information:

- **Description** - Clear description of the issue
- **Steps to Reproduce** - Detailed steps
- **Expected Behavior** - What should happen
- **Actual Behavior** - What actually happens
- **Environment** - OS, browser, versions
- **Screenshots** - If applicable

### Feature Requests

- **Description** - Clear feature description
- **Use Case** - Why is this needed?
- **Implementation** - Suggested approach
- **Examples** - Similar features elsewhere

## 🎨 Design Guidelines

### UI/UX Standards

- Follow Mantine UI design system
- Maintain consistent spacing and typography
- Ensure accessibility (WCAG 2.1 AA)
- Test on multiple screen sizes
- Use semantic HTML elements

### Visual Design

- Consistent color scheme
- Proper contrast ratios
- Intuitive navigation
- Loading and error states
- Mobile-first responsive design

## 🌟 Recognition

Contributors will be recognized in:

- README.md contributor section
- Release notes for significant contributions
- GitHub repository insights
- Project documentation

## 📞 Community

### Getting Help

- **GitHub Issues** - Bug reports and feature requests
- **Discussions** - Questions and general discussion
- **Email** - chibuezeogbuji01@gmail.com for private matters

### Stay Connected

- Watch the repository for updates
- Star the project if you find it useful
- Share the project with others
- Contribute to discussions

## 📄 License

By contributing to SAM2 SaaS Concept, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to SAM2 SaaS Concept! 🚀

Together, we're building something amazing. ✨
