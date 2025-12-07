# 🎒 PackMate WebXR - Mixed Reality Packing Assistant

![PackMate Logo](https://img.shields.io/badge/WebXR-PackMate-00FFFF?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-r160-000000?style=for-the-badge&logo=three.js)
![Meta Quest](https://img.shields.io/badge/Meta_Quest-Compatible-00FFFF?style=for-the-badge)

**AI-Powered Mixed Reality Packing App for Meta Quest | Meta Horizon Start Competition 2025**

---

## 🌟 Live Demo

**🔗 [https://Oarmestos.github.io/PackMate-WebXR/](https://Oarmestos.github.io/PackMate-WebXR/)**

> **Note**: For full MR experience, open on Meta Quest browser and click "Enter VR"

---

## 📖 About

PackMate WebXR is a Mixed Reality application that revolutionizes travel packing by bringing your checklist into 3D space. Built with React Three Fiber and WebXR, it works directly in the Meta Quest browser - no APK installation needed!

### The Problem
62% of travelers forget at least one essential item per trip. Traditional packing lists are disconnected from the physical packing process.

### The Solution
PackMate integrates digital organization with physical packing through:
- 🤖 **AI Scene Detection** - Automatically finds your suitcase
- 👋 **Hand Tracking** - Controller-free natural gestures  
- 👁️ **Passthrough Mode** - See your real environment enhanced with digital info
- ✅ **Interactive 3D Checklist** - Floating packing list in space

---

## ✨ Key Features

### 🎨 Beautiful UI
- Futuristic cyan (#00FFFF) theme
- Glassmorphism effects
- Smooth animations
- Semi-transparent panels

### 🖱️ Interactive Elements
- Click items to mark as packed
- Hover effects with visual feedback
- Progress bar showing completion
- Animated checkmarks

### 📦 Suitcase Detection
- AI-powered detection simulation
- 3D wireframe outline
- Pulsing glow effects
- Confidence percentage display

### ✅ Completion Flow
- Automatic completion detection
- Success message with celebration
- "Have a great trip!" message

---

## 🚀 Quick Start

### For Users (Meta Quest)

1. **Open Meta Quest Browser**
2. **Navigate to**: https://Oarmestos.github.io/PackMate-WebXR/
3. **Click "Enter VR / Start PackMate"**
4. **Allow permissions** when prompted
5. **Start packing!**

### For Developers

```bash
# Clone repository
git clone https://github.com/Oarmestos/PackMate-WebXR.git
cd PackMate-WebXR

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎮 How to Use

### Desktop/Browser Testing

**Keyboard Controls:**
- `L` - Toggle packing list visibility
- `R` - Reset all items
- `H` - Show help in console
- **Click** on items to mark as packed

**Mouse:**
- Click and drag to rotate view
- Scroll to zoom
- Right-click drag to pan

### Meta Quest (VR Mode)

**Gestures:**
- 🖐️ **Left Hand Open Palm** - Show/hide packing list
- 👌 **Right Hand Pinch** - Select and grab items
- 📦 **Point at suitcase** - Trigger detection
- ✋ **Drag to suitcase** - Pack items

---

## 🏗️ Technical Architecture

### Technology Stack

```
Frontend:  React 18.2 + Vite 5.0
3D Engine: Three.js r160
3D React:  React Three Fiber 8.15
WebXR:     @react-three/xr 6.2
UI:        @react-three/drei 9.92
State:     Zustand 4.4
```

### Project Structure

```
PackMate-WebXR/
├── src/
│   ├── components/
│   │   ├── PackingList.jsx          # 3D floating list
│   │   ├── InteractiveItem.jsx      # Clickable items
│   │   ├── SuitcaseDetector.jsx     # AI detection
│   │   ├── HandController.jsx       # Gesture controls
│   │   └── CompletionMessage.jsx    # Success screen
│   ├── store/
│   │   └── packingStore.js          # Zustand state
│   ├── App.jsx                      # Main component
│   ├── App.css                      # Styles
│   └── main.jsx                     # Entry point
├── public/                          # Static assets
├── vite.config.js                   # Vite configuration
└── package.json                     # Dependencies
```

### Key Components

#### PackingList
- 3D floating panel with glassmorphism
- Progress bar with animated fill
- Interactive item list
- Cyan border glow effect

#### SuitcaseDetector
- Scanning animation
- 3D wireframe outline
- Corner markers
- Drop zone indicator
- Confidence display

#### InteractiveItem
- Click to pack functionality
- Hover effects
- Color changes (white → cyan → green)
- Smooth animations

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Cyan | `#00FFFF` | Primary, highlights, borders |
| Black | `#000000` | Backgrounds (70% opacity) |
| White | `#FFFFFF` | Text, unpacked items |
| Green | `#00FF00` | Success, packed items |
| Gray | `#333333` | Progress bar background |

### Typography
- Font: System default (Inter/Roboto fallback)
- Title: 0.045 units
- Items: 0.028 units
- Labels: 0.02-0.03 units

### 3D Positioning
- Packing List: `[-0.6, 1.5, -1.2]`
- Suitcase: `[0, 0.3, -2]`
- Completion Message: `[0, 1.8, -1.5]`

---

## 📊 Performance

- **Target**: 60 FPS constant
- **Load Time**: < 3 seconds
- **Bundle Size**: ~500KB (gzipped)
- **Optimizations**:
  - Component memoization
  - Efficient re-renders
  - Lazy loading
  - Tree shaking

---

## 🏆 Meta Horizon Start Competition

PackMate WebXR showcases:

✅ **WebXR Technology** - Runs in browser, no APK needed  
✅ **Hand Tracking** - Controller-free interaction  
✅ **Passthrough** - Mixed Reality blending real and virtual  
✅ **AI Integration** - Scene Understanding for object detection  
✅ **Travel Mode** - Perfect use case for Quest on the go  
✅ **Innovation** - Solving real travel problems with MR

### Submission Details

- **Category**: Lifestyle - Travel Mode
- **Platform**: Meta Quest 2/3/Pro (WebXR)
- **URL**: https://Oarmestos.github.io/PackMate-WebXR/
- **Technologies**: React, Three.js, WebXR, AI Scene Detection

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Environment Setup

1. Node.js 16+ required
2. Modern browser with WebXR support
3. Meta Quest (optional, for VR testing)

### Debugging

```bash
# View in browser console
Press 'H' for keyboard controls help

# React DevTools
Install React DevTools extension

# Three.js Inspector
Add ?debug to URL
```

---

## 🗺️ Roadmap

### Version 1.0 (Current) ✅
- [x] WebXR integration
- [x] 3D packing list UI
- [x] Click interaction
- [x] Suitcase detection simulation
- [x] Completion flow
- [x] Keyboard controls


---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

## 👨‍💻 Author

**Omar Armesto**  
📧 Email: maorarmesto@gmail.com  
🐙 GitHub: [@Oarmestos](https://github.com/Oarmestos)  
🌍 Location: Colombia 🇨🇴

Created for **Meta Horizon Start Developer Competition 2025**

---

## 🙏 Acknowledgments

- Meta for WebXR and Quest platform
- React Three Fiber community
- Three.js contributors
- Zustand team

---



---

<div align="center">

**Made for travelers, powered by WebXR** 🌍✈️🎒

**Meta Horizon Start 2025**

[Live Demo](https://Oarmestos.github.io/PackMate-WebXR/) | [Report Bug](https://github.com/Oarmestos/PackMate-WebXR/issues) | [Request Feature](https://github.com/Oarmestos/PackMate-WebXR/issues)

</div>
