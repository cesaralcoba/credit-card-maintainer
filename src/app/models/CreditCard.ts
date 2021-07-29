export class CreditCard {
  id?: string;
  titular: string;
  cardNumber: string;
  expDate: string;
  cvv: number;
  createdDate?: Date;
  updateDate: Date;

  constructor(
    titular: string,
    cardNumber: string,
    expDate: string,
    cvv: number
  ) {
    this.titular = titular;
    this.cardNumber = cardNumber;
    this.expDate = expDate;
    this.cvv = cvv;
    this.createdDate = new Date();
    this.updateDate = new Date();
  }
}
