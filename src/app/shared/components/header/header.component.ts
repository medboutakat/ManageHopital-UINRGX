import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/doctors/doctor-store/app-state';
import { LogOut } from 'src/app/Auth/store/auth.actions'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  getState: Observable<any>;
  @Input() displayMenu: boolean;

  displayStyle
  constructor( 
    private store: Store<AppState>,
  ) { 
  }

  ngOnInit() { 
        console.log("displayMenu",this.displayMenu) 
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
  logout() { 
    this.store.dispatch(new LogOut())
  }
 
}
