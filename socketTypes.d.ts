import 'socket.io';

declare module 'socket.io' {
  interface Socket {
    user: {
      _id: string;
    };
  }
}