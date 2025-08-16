# WebSocket Test Project

Deployed version: [https://websocket-test-qjau.onrender.com](https://websocket-test-qjau.onrender.com)

This project demonstrates a simple full-stack application using WebSockets for real-time communication. It consists of a TypeScript/React client and a Node.js/TypeScript server.

## Project Structure

```
websocket_test/
├── client/      # Frontend React app (Vite, TypeScript)
└── server/      # Backend Node.js server (TypeScript)
```

## Features
- Real-time updates via WebSockets
- Modular React components
- TypeScript for type safety on both client and server
- Unit tests for frontend components

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Install Dependencies

#### Server
```bash
cd server
npm install
```

#### Client
```bash
cd ../client
npm install
```

### 2. Run the Server
```bash
cd server
npm run dev
```

### 3. Run the Client
```bash
cd client
npm run dev
```

The client will be available at `http://localhost:5173` (default Vite port).

---

## Project Details

### Client (`client/`)
- Built with React, Vite, and TypeScript
- Main entry: `src/main.tsx`
- WebSocket logic: `src/websocket.ts`
- Components: `src/components/`
- Tests: `src/__tests__/`

### Server (`server/`)
- Node.js with TypeScript
- Main entry: `src/index.ts`
- Utility functions: `src/utils/`
- Data and types: `src/data/`, `src/types/`

---

## Testing

### Client Tests
```bash
cd client
npm test
```

---

## License

MIT
