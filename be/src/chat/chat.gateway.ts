import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AddMessageDto } from '../chat/dto/add-message.dto';

@WebSocketGateway({ cors: { origin: '*' } }) //클래스가 웹소켓 게이트웨이이고, 해당 포트에서 웹 소켓 서버를 시작!
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() //server 변수에 웹소켓 서버의 인스턴스를 주입, server 변수를 통해 서버에 접근하고 관리할 수 있다.
  server: Server;

  private logger = new Logger('ChatGateway');

  //'chat'라는 이름의 메시지를 구독하는 핸들러 선언,
  //클라이언트가 'chat' 메시지를 서버에 보내면 핸들러가 호출
  //Get, Post 같은 느낌
  @SubscribeMessage('chat') //클라이언트에서 이벤트 수신하였을 때 실행하는 메소드 정의

  //클라이언트로부터 받은 메시지(payload)를 처리한다
  handleMessage(@MessageBody() payload: AddMessageDto): AddMessageDto {
    this.logger.log(`Message received: ${payload.author} - ${payload.body}`);
    this.server.emit('chat', payload);
    return payload;
  }

  //클라이언트가 연결되거나 끊어졌을 때 호출, 각각의 소켓 연결/해제 이벤트 로깅
  handleConnection(socket: Socket) {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}
