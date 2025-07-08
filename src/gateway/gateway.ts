import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class MyCarGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    // console.log('====================================');
    // console.log(this.server);
    // console.log('====================================');

    this.server.on('connection', (socket) => {
      console.log('====================================');
      console.log(socket.id);
      console.log('Connected socket');
      console.log('====================================');
    });
  }

  @SubscribeMessage(`newMessage`)
  onNewMessage(@MessageBody() message: any) {
    console.log('====================================');
    console.log(message);
    console.log('====================================');

    this.server.emit('onMessage', {
      message: 'New Message',
      content: message,
    });
  }
}
