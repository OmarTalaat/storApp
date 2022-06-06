import { Injectable } from '@angular/core';

declare let alertify: any;
@Injectable()
export class AlertifyService {

constructor() { }
confirm(message: string, okCallback: () => any) {
  // tslint:disable-next-line:only-arrow-functions
  alertify.confirm(message , function(e: any) {
          if (e) {
              // call function when the user confirms
              okCallback();
          } else {
              // do something else when the user cancels the confirm dialog
          }
      });
}

success(message: string) {
      alertify.success(message);
  }
error(message: string) {
      alertify.error(message);
  }

warning(message: string) {
      alertify.warning(message);
  }

message(message: string) {
      alertify.message(message);

  }


}
