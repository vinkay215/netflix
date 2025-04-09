# Netflix UI Clone with Expo

A high-fidelity Netflix mobile UI clone built with React Native and Expo, featuring advanced animations and gesture interactions.

![Demo](assets/gifs/demo.gif)

## Key Features

### Profile Management

- 👥 Animated profile selection screen with staggered loading
- 🔄 Smooth profile switching transitions
- 🎵 Sound effects and haptic feedback

### Navigation & Animations

- 🔄 Custom tab navigation with sliding animations
- 💫 Gesture-based content interactions
- 🌟 Shared element transitions between screens
- 📱 iOS-style modal presentations
- 🎨 Dynamic blur effects and scaling
- 🔄 Tilt animations for featured content

### Content Screens

- 🏠 Animated home screen with featured content
- 🔥 "New & Hot" section with Netflix-style layout
- 🎮 Mobile games showcase
- 🔍 Dynamic search with instant results
- ⬇️ Downloads management
- 📺 Teaser Video player
- 📋 Expandable categories list
- 🔤 Custom font

### Performance

- ⚡ Optimized animations using Reanimated
- 📊 Efficient list rendering [wip]
- 🎯 Native gesture handling
- 🔄 Smart transition management

## Tech Stack

- [Expo](https://expo.dev) - React Native development platform
- [Expo Router](https://docs.expo.dev/router/introduction) - File-based routing
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Smooth animations
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) - Native gestures
- [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) - Haptic feedback
- [Expo AV](https://docs.expo.dev/versions/latest/sdk/av/) - Audio/video playback

## Implementation Details

### Animation System

- Custom tab screen wrapper for consistent transitions
- Worklet-based animations for optimal performance
- Shared element transitions for content previews
- Gesture-based modal interactions

### State Management

- Context-based profile management
- Animation state coordination
- Tab navigation state handling

### UI Components

- Reusable animated components
- Custom Netflix-style icons and layouts

## Project Structure

```
project-root/
├── app/
│   ├── (tabs)/
│   │   ├── (profile)/        # Profile section
│   │   ├── index.tsx         # Home screen
│   │   └── new.tsx          # New & Hot screen
│   ├── movie/
│   ├── _layout.tsx          # Root layout
│   └── search.tsx           # Search functionality
├── components/
│   ├── MovieList/           # Movie listings
│   ├── GameList/            # Games section
│   ├── FeaturedContent/     # Featured content
│   ├── BottomSheet/         # Bottom sheets
│   ├── navigation/          # Navigation components
│   └── WhoIsWatching/       # Profile selection
├── hooks/
│   ├── useCachedResources.ts
│   ├── useColorScheme.ts
│   ├── useDeviceMotion.ts
│   └── useOverlayView.ts
├── data/
│   ├── movies.json          # Movie data
│   ├── new.json            # New content data
│   └── users.json          # User profiles
└── contexts/               # App-wide state management
```

## TODO

- [ ] Shared transition on modal navigation
- [ ] Bug: Disable shift animation on back (fixed on branch router-4 (React Navigation 7))
- [ ] X-Ray style content details
- [ ] Full screen video player
- [ ] Color extraction from images for dynamic theming

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License
