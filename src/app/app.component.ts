import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  id: string;
  prospect: string;
  recruiter: string;
  areaTeam: string;
  step: string;
  status: string;
}

/** Constants used to fill up our data base. */
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

const AREATEAMS: string[] = [
  'Northeast Massachusetts', 'Southeast Massachusetts', 'Western Massachusetts', 'Eastern Massachusetts'
]

const RECRUITERS: string[] = [
  'Erica Spence', 'Tracey Lord'
]

const STEPS: string[] = [
  'Prospect', 'Invited', 'Applicant'
]

const STATUS: string[] = [
  '1st Interview', '2nd Interview', 'Background Check'
]

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  implements OnInit {
  displayedColumns: string[] = ['id', 'prospect', 'recruiter', 'areaTeam', 'step', 'status'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const prospect = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
  const recruiter = RECRUITERS[Math.round(Math.random() * (RECRUITERS.length - 1))];
  const areaTeam = AREATEAMS[Math.round(Math.random() * (AREATEAMS.length - 1))];
  const step = STEPS[Math.round(Math.random() * (STEPS.length - 1))];
  const status = STATUS[Math.round(Math.random() * (STATUS.length - 1))];

  return {
    id: id.toString(),
    prospect: prospect,
    recruiter: recruiter,
    areaTeam: areaTeam,
    step: step,
    status: status
  };
}