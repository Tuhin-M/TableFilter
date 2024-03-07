import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableService } from './table.service';

export interface UserData {
  avatar_url: string;
  id: number;
  login: string;
  node_id: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  displayedColumns: string[] = [
    'id', 'avatar_url', 'login', 'node_id',
    'repos_url',
    'events_url',
    'received_events_url'];
  dataSource!: MatTableDataSource<UserData>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: TableService) {
    this.service.getData().subscribe((data) => {
      this.posts = data;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
function createNewUser(id: number): UserData {

  return {
    avatar_url: 'avatar_url',
    id: id,
    login: 'login',
    node_id: 'node_id',
    repos_url: 'repos_url',
    events_url: 'events_url',
    received_events_url: 'received_events_url',
  };
}
