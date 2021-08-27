import { Component, OnInit, NgZone } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { ChatService } from 'src/app/controllers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {


  ngOnInit(){
  }

  txtMessage: string = '';  
  uniqueID: string = new Date().getTime().toString();  
  messages = new Array<Message>();  
  message = new Message();  

  constructor(  
    private chatService: ChatService,  
    private _ngZone: NgZone  
  ) {  
    this.subscribeToEvents();  
  }  

  
  sendMessage(): void {  
    if (this.txtMessage) {  
      this.message = new Message();  
      this.message.clientuniqueid = this.uniqueID;  
      this.message.type = "sent";  
      this.message.message = this.txtMessage;  
      this.message.date = new Date();  
      this.messages.push(this.message);  
      this.chatService.sendMessage(this.message);  
      this.txtMessage = '';  
    }  
  }  
  private subscribeToEvents(): void {  
  
    this.chatService.messageReceived.subscribe((message: Message) => {  
      this._ngZone.run(() => {  
        if (message.clientuniqueid !== this.uniqueID) {  
          message.type = "received";  
          this.messages.push(message);  
        }  
      });  
    });  
  }  
}
