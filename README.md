# React Logo Maker

A simple, intuitive logo m4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🤖 AI Logo Generation Setup (Optional)

The app works great with professional mock designs, but you can enable real AI generation:

1. **Get an OpenAI API key**:

   - Sign up at [platform.openai.com](https://platform.openai.com/signup)
   - Go to [API Keys](https://platform.openai.com/api-keys) and create a new key
   - Add billing information (DALL-E costs ~$0.04-0.08 per image)

2. **Configure your environment**:

   ```bash
   # Copy the example file
   cp .env.example .env.local

   # Edit .env.local and add your API key
   VITE_OPENAI_API_KEY=sk-proj-your-key-here
   ```

3. **Restart the development server**:
   ```bash
   npm run dev
   ```

**Cost Estimate**: Generating 4 logo variations costs approximately $0.16-0.32

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

- ![React](https://img.shields.io/badge/React-18-blue)
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-green)
- ![Vite](https://img.shields.io/badge/Vite-6.0-purple)

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The project is configured for GitHub Pages deployment via GitHub Actions.

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
