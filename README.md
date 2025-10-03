# React Logo Maker

A simple, intuitive logo m4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🤖 AI Logo Generation

The app includes **secure AI integration** with OpenAI DALL-E 3:

### 🔒 Secure Architecture

- **Protected API Keys**: OpenAI keys stored safely on backend server
- **Rate Limiting**: 10 requests/minute to prevent abuse
- **CORS Protection**: Only authorized domains can access the API
- **Cost Controls**: Built-in usage limits and monitoring

### 🚀 Quick Start (Development)

1. **Start the backend**: `cd backend && npm install && npm run dev`
2. **Start the frontend**: `npm run dev`
3. **Generate logos**: Click "Generate AI Logos" to test with real OpenAI API

### 📋 Production Deployment

See `DEPLOYMENT.md` for complete setup instructions:

- Deploy backend to Railway with secure environment variables
- Deploy frontend to GitHub Pages/Vercel
- Configure CORS and API endpoints

**Cost**: ~$0.16-0.32 per generation (4 logo variations)

## 🛠️ Technologies Usedr built with React, TypeScript, and Tailwind CSS. Create custom logos with text, shapes, colors, and effects, then export them as SVG or PNG files.

## ✨ Features

### 🎨 AI Logo Generation

- **OpenAI DALL-E 3 Integration**: Generate professional logos with AI
- **Professional Mock Designs**: 4 high-quality fallback designs when no API key is provided
- **Smart Prompt Enhancement**: Uses your color and text settings for better AI results
- **Full-Screen Gallery**: Large preview modal for viewing and selecting AI logos
- **Mobile Optimized**: Touch-friendly gallery with responsive design

### 🛠️ Traditional Logo Tools

- **Real-time Preview**: See your logo changes instantly
- **Multiple Shapes**: Support for circles, squares, and triangles
- **Color Customization**: Logo color, background, and border colors
- **Text Styling**: Custom text with size and style options
- **Hybrid Mode**: Combine AI-generated bases with traditional customization

### 📤 Export & Sharing

- **Multiple Formats**: Download as SVG or PNG
- **Individual Downloads**: Save specific AI variations
- **Responsive Design**: Clean two-panel layout that works on all devices

## 🚀 Getting Started

1. Clone this repository

   ```bash
   git clone https://github.com/ChrisForti/react-logo-maker.git
   cd react-logo-maker
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5174](http://localhost:5174) in your browser

## 🛠️ Technologies Used

**Frontend:**

- ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-green) ![Vite](https://img.shields.io/badge/Vite-6.0-purple)

**Backend:**

- ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![Express](https://img.shields.io/badge/Express-4.18-black) ![OpenAI](https://img.shields.io/badge/OpenAI-DALL--E--3-orange)

## 📦 Build & Deploy

```bash
# Frontend only (static files)
npm run build
npm run preview

# Full stack with backend
cd backend && npm start    # Start backend on Railway/server
npm run build             # Build frontend for deployment
```

**Deployment Options**:

- **Frontend**: GitHub Pages, Vercel, Netlify
- **Backend**: Railway (recommended), Render, Heroku
- **Complete Guide**: See `DEPLOYMENT.md` for step-by-step instructions

## 🎯 Design Philosophy

This project follows the principle of **radical simplicity**:

- Minimal dependencies
- Straightforward solutions over complex abstractions
- Clean, readable code
- Focus on essential features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
