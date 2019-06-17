import { Action } from '@ngrx/store';
import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderSuccessAction,
} from '../../../state/utils/loader/loader.action';
import { CART_DATA } from '../cart-state';

export const CREATE_CART = '[Cart] Create Cart';
export const CREATE_CART_FAIL = '[Cart] Create Cart Fail';
export const CREATE_CART_SUCCESS = '[Cart] Create Cart Success';

export const LOAD_CART = '[Cart] Load Cart';
export const LOAD_CART_FAIL = '[Cart] Load Cart Fail';
export const LOAD_CART_SUCCESS = '[Cart] Load Cart Success';

export const MERGE_CART = '[Cart] Merge Cart';
export const MERGE_CART_SUCCESS = '[Cart] Merge Cart Success';

export const RESET_CART_DETAILS = '[Cart] Reset Cart Details';

export class CreateCart extends LoaderLoadAction {
  readonly type = CREATE_CART;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class CreateCartFail extends LoaderFailAction {
  readonly type = CREATE_CART_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class CreateCartSuccess extends LoaderSuccessAction {
  readonly type = CREATE_CART_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class LoadCart extends LoaderLoadAction {
  readonly type = LOAD_CART;
  constructor(
    public payload: { userId: string; cartId: string; details?: boolean }
  ) {
    super(CART_DATA);
  }
}

export class LoadCartFail extends LoaderFailAction {
  readonly type = LOAD_CART_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class LoadCartSuccess extends LoaderSuccessAction {
  readonly type = LOAD_CART_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class MergeCart implements Action {
  readonly type = MERGE_CART;
  constructor(public payload: any) {}
}

export class MergeCartSuccess implements Action {
  readonly type = MERGE_CART_SUCCESS;
  constructor(public payload: any) {}
}

export class ResetCartDetails implements Action {
  readonly type = RESET_CART_DETAILS;
  constructor() {}
}

export type CartAction =
  | CreateCart
  | CreateCartFail
  | CreateCartSuccess
  | LoadCart
  | LoadCartFail
  | LoadCartSuccess
  | MergeCart
  | MergeCartSuccess
  | ResetCartDetails;
