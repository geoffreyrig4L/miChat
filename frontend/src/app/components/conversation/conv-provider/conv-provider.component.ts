import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conversation } from '@app/interface/conversation.interface';
import { ConversationService } from '@app/services/conversation.service';
import { ConvListComponent } from '../conv-list/conv-list.component';
import { ConvComponent } from '../conv/conv.component';

@Component({
  selector: 'app-conv-provider',
  imports: [ConvListComponent, ConvComponent],
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
      this.listConv = conversations;
      this.route.params.subscribe((params) => {
        if (params['id']) {
          this.conv =
            this.listConv.find((conv) => conv._id === params['id']) ?? null;

          if (!this.conv) {
            this.router.navigateByUrl('/');
          }
        }
      });
    });
  }
}
