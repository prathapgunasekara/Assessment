import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `https://localhost:7015`;
  }
  addCustomers(customer: Customer): Observable<Customer[]> {
    const url = `${this.baseUrl}/customers`;
    return this.httpClient.post<Customer[]>(url, customer);
  }

  getCustomers(): Observable<Customer[]> {
    const url = `${this.baseUrl}/customers`;
    return this.httpClient.get<Customer[]>(url);
  }

  editCustomers(changes: Customer): Observable<Customer[]> {
    const url = `${this.baseUrl}/customers`;
    return this.httpClient.put<Customer[]>(url, changes);
  }

  deleteCustomers(id: string): Observable<Customer[]> {
    const url = `${this.baseUrl}/customers/${id}`;
    return this.httpClient.delete<Customer[]>(url);
  }
}
