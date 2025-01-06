import { Injectable } from '@angular/core';

@Injectable()
export class QueryOptions {
  s: number = -1; // start index
  c: number = -1; // count of items to retrieve
  o: string = null; // order by property
  d: string = null; // order by direction a:asc, d: desc
  sis: string[] = []; // StateIds
  i: string[] = []; // include properties
}
