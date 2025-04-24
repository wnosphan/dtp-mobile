# DTP Mobile App

A React Native mobile app for the DTP (Du lịch Quy Nhơn) platform, built with Expo SDK 50.

## Features

- Browse and search tours
- View tour details and schedules
- Book tours and manage bookings
- User authentication
- Shopping cart functionality
- Chat support
- Interactive map
- Blog and about sections
- User profile management

## Tech Stack

- React Native with Expo SDK 50
- TypeScript
- NativeWind (TailwindCSS for React Native)
- React Navigation
- Zustand for state management
- Axios for API requests

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dtp-mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   EXPO_PUBLIC_API_URL=https://api.yourdomain.com/v1
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Run on a device or emulator:
   - Press `a` for Android
   - Press `i` for iOS (requires macOS)
   - Scan QR code with Expo Go app on your device

## Project Structure

```
dtp-mobile/
├── src/
│   ├── api/           # API services
│   ├── components/    # Reusable components
│   ├── screens/       # Screen components
│   ├── navigation/    # Navigation configuration
│   ├── store/         # Zustand stores
│   ├── theme/         # Theme and styling
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript types
│   └── constants/     # Constants and config
├── assets/           # Images, fonts, etc.
└── App.tsx          # Root component
```

## Development

- Follow the [Expo documentation](https://docs.expo.dev/) for best practices
- Use NativeWind classes for styling
- Follow TypeScript best practices
- Keep components small and focused
- Write meaningful commit messages

## Building for Production

1. Configure app.json with your app details
2. Build for Android:
   ```bash
   eas build -p android
   ```
3. Build for iOS:
   ```bash
   eas build -p ios
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 