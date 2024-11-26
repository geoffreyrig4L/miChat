import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConvListComponent } from '../conv-list/conv-list.component';
import { ConvComponent } from '../conv/conv.component';

@Component({
  selector: 'app-conv-provider',
  imports: [ConvListComponent, ConvComponent],
  templateUrl: './conv-provider.component.html',
})
export class ConvProviderComponent implements OnInit {
  private route = inject(ActivatedRoute);

  idConv: null | number = null;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) this.idConv = +params['id'];
    });
  }
}
