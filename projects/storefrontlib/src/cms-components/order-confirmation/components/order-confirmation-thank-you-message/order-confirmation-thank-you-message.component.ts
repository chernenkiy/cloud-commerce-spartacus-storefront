import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CheckoutService,
  Order,
  UserService,
  RoutingService,
  AuthService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomFormValidators } from '../../../../shared/utils/validators/custom-form-validators';

@Component({
  selector: 'cx-order-confirmation-thank-you-message',
  templateUrl: './order-confirmation-thank-you-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationThankYouMessageComponent
  implements OnInit, OnDestroy {
  order$: Observable<Order>;
  isGuestCustomer = false;
  orderGuid: string;

  subscription: Subscription;

  guestRegisterForm: FormGroup = this.fb.group(
    {
      password: [
        '',
        [Validators.required, CustomFormValidators.passwordValidator],
      ],
      passwordconf: ['', Validators.required],
    },
    { validator: CustomFormValidators.matchPassword }
  );

  constructor(
    checkoutService: CheckoutService,
    userService: UserService, // tslint:disable-line
    routingService: RoutingService, // tslint:disable-line
    authService: AuthService, // tslint:disable-line
    fb: FormBuilder // tslint:disable-line
  );
  /**
   * @deprecated since version 1.x
   *
   *  TODO(issue:#1178) deprecated since 1.x
   */
  constructor(checkoutService: CheckoutService);
  constructor(
    protected checkoutService: CheckoutService,
    protected userService?: UserService,
    protected routingService?: RoutingService,
    protected authService?: AuthService,
    protected fb?: FormBuilder
  ) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails().pipe(
      tap(order => {
        this.isGuestCustomer = order.guestCustomer;
        this.orderGuid = order.guid;
      })
    );
  }

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  submit() {
    if (this.isGuestCustomer) {
      this.userService.registerGuest(
        this.orderGuid,
        this.guestRegisterForm.value.password
      );
      if (!this.subscription) {
        this.subscription = this.authService.getUserToken().subscribe(token => {
          if (token.access_token) {
            this.routingService.go({ cxRoute: 'home' });
          }
        });
      }
    }
  }
}
