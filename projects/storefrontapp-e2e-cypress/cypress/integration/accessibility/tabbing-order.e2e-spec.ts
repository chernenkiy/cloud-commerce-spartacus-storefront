import { closeAccountTabbingOrder } from '../../helpers/accessibility/tabbing-order/close-account';
import { tabbingOrderConfig as config } from '../../helpers/accessibility/tabbing-order.config';
import { footerTabbingOrder } from '../../helpers/accessibility/tabbing-order/footer';
import { loginTabbingOrder } from '../../helpers/accessibility/tabbing-order/login';
import { registerAndLogin } from '../../helpers/accessibility/tabbing-order';
import { registerTabbingOrder } from '../../helpers/accessibility/tabbing-order/register';
import { forgotPasswordTabbingOrder } from '../../helpers/accessibility/tabbing-order/reset-password';
import { changePasswordTabbingOrder } from '../../helpers/accessibility/tabbing-order/change-password';
import { updateEmailTabbingOrder } from '../../helpers/accessibility/tabbing-order/update-email';
import { personalDetailsTabbingOrder } from '../../helpers/accessibility/tabbing-order/personal-details';
import { paymentDetailsTabbingOrder } from '../../helpers/accessibility/tabbing-order/payment-details';
import {
  paymentDetailCard,
  addSecondaryPaymentCard,
} from '../../helpers/payment-methods';
import { consentManagementTabbingOrder } from '../../helpers/accessibility/tabbing-order/consent-management';

context("Tabbing order - tests don't require user to be logged in", () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  describe('Footer', () => {
    it('should allow to navigate with tab key', () => {
      footerTabbingOrder(config.footer);
    });
  });

  describe('Login page', () => {
    it('should allow to navigate with tab key', () => {
      loginTabbingOrder(config.login);
    });
  });

  describe('Register page', () => {
    it('should verify tabbing order', () => {
      registerTabbingOrder(config.register);
    });
  });

  describe('Reset password', () => {
    it('should allow to navigate with tab key', () => {
      forgotPasswordTabbingOrder(config.resetPassword);
    });
  });
});

context('Tabbing order - tests do require user to be logged in', () => {
  before(() => {
    registerAndLogin();
  });

  describe('Change password', () => {
    it('should allow to navigate with tab key', () => {
      changePasswordTabbingOrder(config.changePassword);
    });
  });

  describe('Close account', () => {
    it('should allow to navigate with tab key', () => {
      closeAccountTabbingOrder(config.closeAccount);
    });
  });

  describe('Personal details', () => {
    it('should allow to navigate with tab key', () => {
      personalDetailsTabbingOrder(config.personalDetails);
    });
  });

  describe('Update email', () => {
    it('should allow to navigate with tab key', () => {
      updateEmailTabbingOrder(config.updateEmail);
    });
  });

  describe('Payment Details', () => {
    it('should allow to navigate with tab key', () => {
      paymentDetailCard();
      addSecondaryPaymentCard();

      paymentDetailsTabbingOrder(config.paymentDetails);
    });
  });

  describe('Consent Management', () => {
    it('should allow to navigate with tab key', () => {
      consentManagementTabbingOrder(config.consentManagement);
    });
  });
});