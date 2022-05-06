import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { UserData, UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dataSource: UserData = null!;
  pageSize: number = 10;
  pageSizeOptions: number[] = [this.pageSize, 20,30,40,50,100];
  filterValue: string = null!;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.userService.findAll(1, this.pageSize).pipe(
      //tap(users => console.log(users)),
      map((userData: UserData) => this.dataSource = userData)
    ).subscribe();
  }

  onPageChange(page: number){
    if(this.filterValue == null) {
      page = page + 1;
      this.userService.findAll(page, this.pageSize).pipe(
        map((userData: UserData) => this.dataSource = userData)
      ).subscribe();
    }

    this.userService.paginateByName(page, this.pageSize, this.filterValue).pipe(
      map((userData: any) => this.dataSource = userData)
    ).subscribe()
    
  }

  onPageSizeChange(e: any) {
    // console.log(e.target.value);
    this.pageSize = e.target.value;
    this.userService.findAll(1, this.pageSize).pipe(
      map((userData: UserData) => this.dataSource = userData)
    ).subscribe();

  }

  findByName(username: string) {
    console.log(username);
    this.userService.paginateByName(0,10, username).pipe(
      map((userData: any) => this.dataSource = userData)
    ).subscribe()
  }

}
