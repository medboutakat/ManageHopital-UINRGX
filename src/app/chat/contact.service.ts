import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class ContactService {

  readonly token = environment.dialogflow.HospitalManage;
  readonly client = new ApiAiClient({ accessToken: this.token })
  conversation = new BehaviorSubject<Message[]>([]);
  constructor() { }
  update(msg: Message) {
    this.conversation.next([msg]);
  }
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);
    return this.client.textRequest(msg).then(res => {
      const speech = res.result.fulfillment.speech;
      const botMessage = new Message(speech, 'bot');
      this.update(botMessage);
    })
  }
  talk() {
    this.client.textRequest('hey i have some questions about your services').then(res => console.log(res))
  }
}
export class Message {
  constructor(public content: string, public sentBy: string) { }
}
