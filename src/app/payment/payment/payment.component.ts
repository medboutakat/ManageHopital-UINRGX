import { Component, AfterViewChecked, Input } from '@angular/core';

declare let paypal: any;



@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements AfterViewChecked {

  addScript: boolean = false;
  paypalLoad: boolean = true;
  @Input() finalAmount = 1;
  //finalAmount: number = 1;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AQ6ePaiXBs6Z2lL1_kTwQfJCd4G_PjbGn1oy-5vljNtpoAQsCsLtBrgBNZR1aLKg4bKEdeIPU8sLzUpw',
      production: '<your-production-key-here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        //salert('Payment is ddddddoooonnnneeee')
      })
    }
  };

  ngAfterViewChecked(): void {
   
    if (!this.addScript) { console.log('this.finalAmount : ',this.finalAmount)
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  constructor() { 
    
  }

  ngOnInit() {
    console.log('ngOnInit this.finalAmount : ',this.finalAmount)

  }

}
