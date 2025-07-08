import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class SocketClient implements OnModuleInit {
  public client: Socket;
  constructor() {
    this.client = io(`http://localhost:3000`);
  }

  onModuleInit() {
    this.registerEvents();
  }

  private registerEvents = () => {
    // this.client.emit("newMessage", {
    //     "message": "hi there"
    // })

    this.client.on(`connect`, () => {
      console.log('====================================');
      console.log(`Connected to Gateway`);
      console.log('====================================');
    });

    this.client.on('onMessage', async (payload: any) => {
      console.log('====================================');
      console.log('payload', payload);
      console.log('====================================');
    });
  };
}
