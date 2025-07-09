import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

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
  onNewMessage(@MessageBody() message: any, @ConnectedSocket() client: Socket) {
    console.log('====================================');
    console.log(client.id);
    console.log(message);
    console.log('====================================');

    this.server.emit('onMessage', {
      message: 'New Message',
      content: message,
    });
  }
}
