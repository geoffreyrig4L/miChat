import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conversation } from '@app/interface/conversation.interface';
import { ConversationService } from '@app/services/conversation.service';
import { ConvListComponent } from '../conv-list/conv-list.component';
import { ConvComponent } from '../conv/conv.component';
import { Message } from '@app/interface/message.interface';

@Component({
  selector: 'app-conv-provider',
  imports: [ConvListComponent, ConvComponent],
  templateUrl: './conv-provider.component.html',
})
export class ConvProviderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private conversationService = inject(ConversationService);

  idConv: null | string = null;

  listConv: Conversation[] = [];

  user: { name: string; imgUrl: string; online: boolean; lastMsg: string } = {
    name: '',
    imgUrl: '',
    online: false,
    lastMsg: '',
  };

  messages: Message[] = [];

  ngOnInit(): void {
    this.conversationService.getConversations().subscribe((conversations) => {
      if (conversations.length === 0) {
        this.conversationService.loadConversations();
      } else {
        this.listConv = conversations;
      }
      this.listConv = conversations;
      this.route.params.subscribe((params) => {
        if (params['id']) {
          this.idConv = params['id'];
          let convFind = conversations.find(
            ({ interlocutor }) => interlocutor._id == params['id']
          );

          if (convFind) {
            this.user.name = convFind?.interlocutor.username;
            this.user.lastMsg = 'test';
            this.messages = convFind?.messages;
          } else {
            this.router.navigateByUrl('/');
          }
        }
      });
    });
  }
}
