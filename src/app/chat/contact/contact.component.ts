import { Component, OnInit } from '@angular/core';
import { ContactService, Message } from '../contact.service';
import { Observable, } from 'rxjs';
import { scan } from 'rxjs/operators'


@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  messages: Observable<Message[]>
  formValue: string
  constructor(public chat: ContactService) { }

  ngOnInit() {
    this.messages = this.chat.conversation.asObservable().pipe(
      scan((acc, val) => acc.concat(val))
    )
    console.log("messages", this.messages);
    console.log("chat", this.chat.talk())
  }
  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

}
