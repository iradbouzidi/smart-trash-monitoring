import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Emplog} from '../../models/emplog.model';
import {Employee} from '../../models/employee.model';
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-editprofilew',
  templateUrl: './editprofilew.component.html',
  styleUrls: ['./editprofilew.component.scss']
})

export class EditprofilewComponent implements OnInit {

  emp: Emplog[];
  workers: Employee[];
  regions: any = [];
  empid: string;
  // @ts-ignore
  @ViewChild('fileInput') fileInput: ElementRef;
  loading = false;
  valid = false;
  message = '';
  imageE: File;

  constructor(private router: Router, private employeeService: EmployeeService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.employeeService.getCurrentW().subscribe((emp: Emplog[]) => {
      this.emp = emp;
    });
    this.employeeService.getCurrentE().subscribe((workers: Employee[]) => {
      this.workers = workers;
    });
    this.httpClient.get('assets/json/tn.json').subscribe(data => {
      console.log(data);
      this.regions = data;
    });
  }

  //#region Profile Pic Upload
  onFileChange(event) {
    this.imageE = event.target.files[0];
    this.valid = true;
  }

  changeImg(event, id: string) {
    const imageE = new FormData();
    imageE.append('imageE', this.imageE);
    this.employeeService.sendImage(imageE, id).subscribe((res: any) => {
      console.log(res);
    });
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.ngOnInit();
    }, 2000);
  }

  clearFile() { // Method to clear the selected file
    this.valid = false;
    this.fileInput.nativeElement.value = '';
  }
  //#endregion

  // tslint:disable-next-line:max-line-length
  saveeditprofile (id: string,
                   userNameC: string,
                   firstNameC: string,
                   lastNameC: string,
                   emailC: string,
                   cinC: string,
                   cityC: string,
                   addressC: string) {
    this.employeeService.updateEmp (
      id,
      userNameC,
      firstNameC,
      lastNameC,
      emailC,
      cinC,
      cityC,
      addressC).subscribe(() => {
        this.router.navigate(['/', this.empid]);
      });
    this.router.navigateByUrl('/profilew');
  }

  profilew() {
    this.router.navigateByUrl('/profilew');
  }

  addreportw() {
    this.router.navigateByUrl('/addreportw');
  }

  listreportsw() {
    this.router.navigateByUrl('/listreportw');
  }
  logout() {
    this.router.navigateByUrl('auth/signin');
  }
}
