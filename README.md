# Valen 💝

A romantic Valentine's Day web application featuring an interactive chat widget, lock screen, invitation system, and floating hearts animation. Built with React, TypeScript, and Vite, and deployed on Vercel.

🔗 **Live Demo:** [main-bice-eta.vercel.app](https://main-bice-eta.vercel.app)

## ✨ Features

### 🔒 Lock Screen
An elegant lock screen interface that greets users before they enter the main application.

### 💌 Invitation System
A special invitation screen that sets the romantic mood and introduces users to the experience.

### 💬 Chat Widget
An interactive chat widget where users can engage in conversation. The chat includes:
- Real-time messaging interface
- Smooth animations and transitions
- Custom styling with dedicated CSS

### 🎯 Explain Feature
A feature that helps provide context and explanations for messages and interactions within the chat, enhancing user understanding during conversations.

### ❤️ Floating Hearts Animation
Beautiful animated floating hearts that create a romantic ambiance throughout the application.

## 🏗️ Architecture

### Frontend
- **Framework:** React 18+ with TypeScript
- **Build Tool:** Vite for fast development and optimized production builds
- **Styling:** Custom CSS with component-specific stylesheets
- **Deployment:** Render (frontend hosting)

### Backend
Located in the `/backend` directory, the backend is deployed on **Render** and handles:
- API endpoints for chat functionality
- Data processing for the explain feature
- Server-side logic and integrations

The backend is deployed on Render, providing:
- Reliable hosting and automatic scaling
- Easy deployment from Git
- Environment variable management
- Built-in logging and monitoring

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CupNoodles02/Valen.git
   cd Valen
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with necessary configuration:
   ```env
   VITE_API_URL=your_api_url_here
   # Add other environment variables as needed
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
Valen/
├── backend/              # Vercel serverless backend
│   └── api/             # API endpoints
├── public/              # Static assets
├── src/                 # Source files
│   ├── App.tsx         # Main application component
│   ├── LockScreen.tsx  # Lock screen component
│   ├── InvitationScreen.tsx  # Invitation component
│   ├── FloatingHearts.tsx    # Hearts animation component
│   ├── ChatWidget.tsx        # Chat interface component
│   └── ChatWidget.css        # Chat widget styles
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── README.md          # This file
```

## 🛠️ Tech Stack

- **React** - UI library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend build tool
- **Vercel** - Frontend deployment platform
- **Render** - Backend API deployment platform
- **CSS3** - Custom styling and animations

## 🔧 Configuration

### ESLint
The project uses ESLint with TypeScript-specific rules. Configuration can be found in `eslint.config.js`.

### TypeScript
TypeScript configuration is split into:
- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node/build tool settings

### Vite
Vite configuration in `vite.config.ts` includes React plugin setup and build optimizations.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🌐 Deployment

### Frontend Deployment (Vercel)
The frontend is automatically deployed to Vercel when changes are pushed to the repository.

### Backend Deployment (Render)
The backend API is deployed on Render:
1. Connect your GitHub repository to Render
2. Configure build and start commands
3. Set environment variables in the Render dashboard
4. Automatic deployments on git push

### Manual Deployment

**Frontend (Vercel):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Backend (Render):**
- Push changes to your connected Git repository
- Or use Render's manual deploy feature in the dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Contributors

- [CupNoodles02](https://github.com/CupNoodles02) - Creator and maintainer

## 💡 Future Enhancements

- [ ] Add more interactive features to the chat widget
- [ ] Implement user authentication
- [ ] Add message persistence
- [ ] Enhance the explain feature with more AI capabilities
- [ ] Add sound effects and background music
- [ ] Create more animated elements
- [ ] Mobile responsive improvements

## 🐛 Known Issues

Please check the [Issues](https://github.com/CupNoodles02/Valen/issues) page for current bugs and feature requests.

## 📧 Contact

For questions or suggestions, please open an issue or contact the maintainer.

---

Made with ❤️ for Valentine's Day
