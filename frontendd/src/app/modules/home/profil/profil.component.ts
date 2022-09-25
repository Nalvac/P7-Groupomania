import {ChangeDetectorRef, Component, OnInit} from "@angular/core";

@Component({
  selector: 'profil',
  templateUrl: 'profil.component.html',
  styleUrls: ['profil.component.scss'],
})
export class ProfilComponent implements OnInit{
  user: any ;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('profil') || '' ) ;
    this.cdr.markForCheck();
  }
}
