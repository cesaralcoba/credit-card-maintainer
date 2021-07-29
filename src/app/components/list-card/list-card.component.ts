import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/services/card.service';
import { CreditCard } from '../../models/CreditCard';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {
  cardList: CreditCard[] = [];

  constructor(
    private _cardService: CardService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCards();
  }

  getCards() {
    this._cardService.sortCards().subscribe((res) => {
      this.cardList = [];
      res.forEach((element: any) => {
        this.cardList.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }

  deleteCard(id: string) {
    this._cardService
      .deleteCard(id)
      .then(() => {
         this.toastr.error('Card deleted','Deleted');
      })
      .catch((error) => {
        console.error(error);
        this.toastr.error('Oops Card deleted Error','Deleted');
      });
  }

  editCard(card: CreditCard) {
    this._cardService.setEditCard(card);
  }
}
