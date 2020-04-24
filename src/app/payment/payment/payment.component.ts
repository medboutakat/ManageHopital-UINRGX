import { Component, AfterViewChecked, Input, HostListener } from '@angular/core';

declare let paypal: any;



@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements AfterViewChecked {
//PAYPAL PAYMENT
  addScript: boolean = false;
  paypalLoad: boolean = true;
  @Input() finalAmount = 1;

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
//end paypal payment
//STRIP PAYMENT
stipeLoading:boolean = false;
loadStripe() {
     
  if(!window.document.getElementById('stripe-script')) {
    var s = window.document.createElement("script");
    s.id = "stripe-script";
    s.type = "text/javascript";
    s.src = "https://checkout.stripe.com/checkout.js";
    window.document.body.appendChild(s);
  }
}

pay(amount) {    
 
  var handler = (<any>window).StripeCheckout.configure({
    key: 'pk_test_cb9WyYiXFd4PSGtHrDYLk5Ia00Jc0HVyg0',
    image:'data:image/jpeg;base64,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',
    locale: 'auto',
    token: function (token: any) {
      // You can access the token ID with `token.id`.
      // Get the token ID to your server-side code for use.
      console.log(token)
      alert('Token Created!!');
    }
  });

  handler.open({
    name: 'Hospital Site',
    description: 'Payment with Stripe',
    amount: amount * 100
  });
  
  // @HostListener('window:popstate')
  // onPopstate(){
  //   handler.close();
  // }
}
//end strip payment
  constructor() { 
  }

  ngOnInit() {
    console.log('ngOnInit this.finalAmount : ',this.finalAmount)
    this.loadStripe()
  }

}
