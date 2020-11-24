import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Client } from 'socket.io';

@WebSocketGateway({ namespace: 'message' })
export class MessageGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {

  @WebSocketServer() server: Server;

  
  handleConnection(client: Client, ...args: any[]) {
    console.log('Se conecto el usuario ' + client.id + ' ' + JSON.stringify(args))
  }
	/**
   * Handles disconnect 
   * @param client
	 */
  handleDisconnect(client: any) {
    console.log('Se desconecto el usuario ' + client.id)
  }
	/**
	 * After init
	 * @param server
	 */
  afterInit(server: any) {
    // console.log('se inicio');

  }

}
