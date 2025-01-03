import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conversation } from '@app/interface/conversation.interface';
import { ConversationService } from '@app/services/conversation.service';
import { ConvListComponent } from '../conv-list/conv-list.component';
import { ConvComponent } from '../conv/conv.component';
import { CreateConv } from '../create-conv/createConv.component';

@Component({
  selector: 'app-conv-provider',
  imports: [ConvListComponent, ConvComponent, CreateConv],
  templateUrl: './conv-provider.component.html',
})
export class ConvProviderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private conversationService = inject(ConversationService);

  listConv: Conversation[] = [];

  conv: Conversation | null = null;

  ngOnInit(): void {
    this.conversationService.getConversations().subscribe((conversations) => {
      if (conversations.length === 0) {
        this.conversationService.loadConversations();
      } else {
        this.listConv = conversations;
      }

      this.listConv = this.sortConversations(conversations);

      this.route.params.subscribe((params) => {
        if (params['id']) {
          this.conv =
            this.listConv.find((conv) => conv._id === params['id']) ?? null;

          //TODO - Checker si c'était pas utile
          // if (!this.conv) {
          // this.router.navigateByUrl('/');
          // }
        }
      });
    });
  }

  sortConversations(conversations: Conversation[]) {
    return conversations.sort((a, b) => {
      const aHasMessages = a.messages.length > 0;
      const bHasMessages = b.messages.length > 0;

      if (!aHasMessages && bHasMessages) return -1;
      if (aHasMessages && !bHasMessages) return 1;

      if (aHasMessages && bHasMessages) {
        const aLastMessage = a.messages[a.messages.length - 1];
        const bLastMessage = b.messages[b.messages.length - 1];
        return (
          new Date(bLastMessage.updated_at).getTime() -
          new Date(aLastMessage.updated_at).getTime()
        );
      }

      return 0;
    });
  }
}
