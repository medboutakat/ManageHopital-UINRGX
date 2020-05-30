import { Component, OnInit } from '@angular/core';
declare var $ : any ;
@Component({
  selector: 'our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss']
})
export class OurTeamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.p1').click(function(){
       $('.p11').toggle()
      })
    })
    $(document).ready(function(){
      $('.p1').click(function(){
       $('.p22').hide()
      })
    })
    $(document).ready(function(){
      $('.p1').click(function(){
       $('.p33').hide()
      })
    })
    $(document).ready(function(){
      $('.p1').click(function(){
       $('.p44').hide()
      })
    })
    $(document).ready(function(){
      $('.p2').click(function(){
        $('.p11').hide()})
    })
    $(document).ready(function(){
      $('.p2').click(function(){
        $('.p22').toggle();
      })
    })
    $(document).ready(function(){
      $('.p2').click(function(){
        $('.p33').hide();
      })
    })
    $(document).ready(function(){
      $('.p2').click(function(){
        $('.p44').hide();
      })
    })
    $(document).ready(function(){
      $('.p3').click(function(){
        $('.p22').hide()})
    })
    $(document).ready(function(){
      $('.p3').click(function(){
       $('.p11').hide()
      })
    })
    $(document).ready(function(){
      $('.p3').click(function(){
        $('.p44').hide();
      })
    })
    $(document).ready(function(){
      $('.p3').click(function(){
        $('.p33').toggle();
      })
    })

    $(document).ready(function(){
      $('.p4').click(function(){
        $('.p22').hide()})
    })
    $(document).ready(function(){
      $('.p4').click(function(){
       $('.p11').hide()
      })
    })
    $(document).ready(function(){
      $('.p4').click(function(){
        $('.p33').hide();
      })
    })
    $(document).ready(function(){
      $('.p4').click(function(){
        $('.p44').toggle();
      })
    })
  }

}
