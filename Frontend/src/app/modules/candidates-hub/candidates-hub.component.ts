import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-candidates-hub',
  templateUrl: './candidates-hub.component.html',
  styleUrls: ['./candidates-hub.component.scss']
})
export class CandidatesHubComponent {
  constructor(private location: Location,private api:AdminService) {}

  election:any={}

  goBack() {
    this.location.back()  }



ngOnInit() {
  this.api.getElectionList().subscribe((res: any) => {
    this.election = res.data[0];
  })
}


}
