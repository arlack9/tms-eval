// // utils.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { LoginService } from '../auth/login.service'; // Import AuthService

// @Injectable({
//   providedIn: 'root',
// })
// export class UtilsService {
//   constructor(
//     private http: HttpClient,
//     private authService: LoginService // Inject AuthService
//   ) {}

//   /**
//    * Checks if a value is empty (null, undefined, or empty string).
//    * @param value The value to check.
//    * @returns True if the value is empty, false otherwise.
//    */
//   isEmpty(value: any): boolean {
//     return value === null || value === undefined || value === '';
//   }

//   /**
//    * Trims whitespace from the beginning and end of a string.
//    * @param str The string to trim.
//    * @returns The trimmed string.
//    */
//   trim(str: string): string {
//     return str ? str.trim() : '';
//   }

//   /**
//    * Generates a random alphanumeric string of a specified length.
//    * @param length The length of the random string.
//    * @returns The random alphanumeric string.
//    */
//   generateRandomString(length: number): string {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
//   }

//   /**
//    * Validates if a value is a number
//    * @param value The value to validate
//    * @returns True if the value is a number, else false
//    */
//   isNumber(value: string): boolean {
//     const numRegex = /^[0-9]+$/;
//     return numRegex.test(value);
//   }

//   /**
//    * Checks if a string contains only letters (no numbers or symbols).
//    * @param str The string to check.
//    * @returns True if the string contains only letters, false otherwise.
//    */
//   isLettersOnly(str: string): boolean {
//     return /^[a-zA-Z]+$/.test(str);
//   }

//   /**
//    * Formats a number as currency
//    * @param amount Amount as integer
//    *  @param currencyCode  The currency to check.
//    * @returns Formatted Amount
//    */
//   formatCurrency(amount: number, currencyCode = 'USD'): string {
//     const formatter = new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: currencyCode,
//     });
//     return formatter.format(amount);
//   }

//   /**
//    * Capitalizes the first letter of a string.
//    * @param str The string to capitalize.
//    * @returns The capitalized string.
//    */
//   capitalizeFirstLetter(str: string): string {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   }

//   /**
//    * Formats a date into a human-readable string (e.g., "YYYY-MM-DD").
//    * @param date The date object to format.
//    * @returns The formatted date string.
//    */
//   formatDate(date: Date): string {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }

//   /**
//    * Masks an email address (e.g., "a****@example.com").
//    * @param email The email address to mask.
//    * @returns The masked email address.
//    */
//   maskEmail(email: string): string {
//     if (!email) {
//       return '';
//     }
//     const [username, domain] = email.split('@');
//     const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 1);
//     return `${maskedUsername}@${domain}`;
//   }
//   // ---------------------------------------------------------------------------------

//   // /**
//   //  * Fetches data from a given API endpoint with authentication.
//   //  * @param endpoint The API endpoint URL.
//   //  * @returns An Observable containing the API response.
//   //  */
//   // fetchData(endpoint: string): Observable<any> {
//   //   const authToken = this.authService.getToken();
//   //   if (!authToken) {
//   //     console.error('No auth token available');
//   //     throw new Error('No auth token available'); // Or return an observable error
//   //   }

//   //   const headers = new HttpHeaders({
//   //     Authorization: `Bearer ${authToken}`, // Or 'Token ${authToken}'
//   //   });

//   //   return this.http.get(endpoint, { headers });
//   // }



  
//   // /**
//   //  * Posts data to a given API endpoint with authentication.
//   //  * @param endpoint The API endpoint URL.
//   //  * @param data The data to post.
//   //  * @returns An Observable containing the API response.
//   //  */
//   // postData(endpoint: string, data: any): Observable<any> {
//   //   const authToken = this.authService.getToken();
//   //   if (!authToken) {
//   //     console.error('No auth token available');
//   //     throw new Error('No auth token available'); // Or return an observable error
//   //   }

//   //   const headers = new HttpHeaders({
//   //     Authorization: `Bearer ${authToken}`, // Or 'Token ${authToken}'
//   //   });

//   //   return this.http.post(endpoint, data, { headers });
//   // }


//   // ------------------------------------------------------------------

//   /**
//    * Handles API errors and extracts the error message.
//    * @param error The error object from the API response.
//    * @returns A user-friendly error message.
//    */
//   handleApiError(error: any): string {
//     // Customize this based on your API's error structure
//     if (error.error && error.error.message) {
//       return error.error.message;
//     } else if (error.message) {
//       return error.message;
//     } else {
//       return 'An unexpected error occurred.';
//     }
//   }

//   /**
//    * Get User Role from local storage (if available)
//    */
//   getUserRoleFromLocalStorage(): string | null {
//     const storedUser = localStorage.getItem('currentUser');
//     if (storedUser) {
//       try {
//         const user = JSON.parse(storedUser);
//         return user.role || null; // Assuming your user object has a 'role' property
//       } catch (error) {
//         console.error('Error parsing stored user', error);
//         return null;
//       }
//     }
//     return null;
//   }
// }



// // let baseurl='https://localhost:8000'
