import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/services/card.service';
import { CreditCard } from '../../models/CreditCard';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss'],
})
export class CreateCardComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  title: string = 'Create Crad';
  textBtn: string = 'Accept';
  id: string | undefined;

  constructor(
    private fb: FormBuilder,
    private _cardService: CardService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      cardNumber: [
        '',
        [ Validators.pattern("^[0-9]*$"),
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      expDate: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      cvv: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._cardService.getEditCard().subscribe((data) => {
      this.title = 'Edit Card';
      this.textBtn = 'Edit';
      this.id = data.id;
      this.form.patchValue({
        titular: data.titular,
        cardNumber: data.cardNumber,
        expDate: data.expDate,
        cvv: data.cvv,
      });
    });
  }

  saveCard() {
    this.loading = true;

    if (this.id === undefined) {
      this.addCard();
    } else {
      this.editCard(this.id);
    }
  }

  addCard() {
    const card: CreditCard = {
      titular: this.form.value.titular,
      cardNumber: this.form.value.cardNumber,
      expDate: this.form.value.expDate,
      cvv: this.form.value.cvv,
      createdDate: new Date(),
      updateDate: new Date(),
    };
    this._cardService
      .saveCard(card)
      .then(() => {
        console.log('Registred');
        this.form.reset();
        this.toastr.success('Registred Succesfully', 'Registred');
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        this.toastr.error('Oops! Error', 'Error');
        console.error('Error Registred');
      });
  }

  editCard(id: string) {
    const card: CreditCard = {
      titular: this.form.value.titular,
      cardNumber: this.form.value.cardNumber,
      expDate: this.form.value.expDate,
      cvv: this.form.value.cvv,
      updateDate: new Date(),
    };
    this._cardService
      .editCard(id, card)
      .then(() => {
        console.log('Edited');
        this.form.reset();
        this.toastr.info('Card Edited','Record updated');
        this.id = undefined;
        this.title = 'Create Crad';
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        this.toastr.error('Oops! Error', 'Error');
        console.error('Error Registred');
      });
  }
}
