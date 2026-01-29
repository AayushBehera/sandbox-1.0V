# Sandbox - Career Guidance Platform

A production-ready, multi-domain career guidance and roadmap platform that helps users discover careers across all fields—from tech to arts, business to healthcare.

## 🚀 Features

- **Multi-Domain Career Discovery**: Explore careers across tech, business, law, medicine, psychology, arts, design, commerce, STEM, and vocational fields
- **Personalized Assessment**: Multi-step assessment that analyzes your background, skills, and preferences
- **Skill-Aware Matching**: Get career recommendations based on your actual skills and interests
- **Multi-Path Roadmaps**: Choose from Fast, Budget, or Safe career paths with detailed step-by-step guidance
- **Role Comparison**: Compare up to 4 careers side-by-side to make informed decisions
- **Progress Tracking**: Save careers and track your journey step-by-step
- **Beautiful UI**: Modern, responsive design built with Tailwind CSS and Framer Motion

## 🛠️ Tech Stack

- **React 18+** with TypeScript (strict mode)
- **Vite** - Fast, modern build tool
- **React Router v6** - Client-side routing
- **Tailwind CSS v3+** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon library

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sandbox-career
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

## 📁 Project Structure

```
sandbox-career/
├── public/
│   ├── logo.svg              # Company logo
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   ├── layout/           # Layout components
│   │   └── features/         # Feature-specific components
│   ├── pages/                # Page components
│   ├── contexts/             # React contexts
│   ├── hooks/                # Custom hooks
│   ├── utils/                # Utility functions
│   ├── types/                # TypeScript types
│   ├── styles/               # Global styles
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: Deep blue/teal (#0066cc) - Professional, trustworthy
- **Secondary**: Warm orange (#ff8c00) - Optimistic, growth
- **Accents**: Green (success), Yellow (warning), Red (danger)

### Typography
- **Font**: Inter (modern sans-serif)
- **Headings**: Bold weights (700-900)
- **Body**: Regular/Medium weights (400-500)

## 🚢 Deployment

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod
```

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder to your hosting provider

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint (if configured)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=Sandbox
VITE_APP_DESCRIPTION=Discover your perfect career path
```

### Tailwind Configuration

Customize colors, fonts, and other design tokens in `tailwind.config.js`.

## 📄 License

This project is proprietary and confidential.

## 👥 Contributing

This is a private project. For contributions, please contact the project maintainers.

## 🆘 Support

For issues or questions, please open an issue in the repository or contact the development team.

---

Built with ❤️ by the Sandbox team
