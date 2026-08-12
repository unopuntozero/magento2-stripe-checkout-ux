define([
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/checkout-data'
], function (quote, checkoutData) {
    'use strict';

    return function (Target) {
        return Target.extend({
            initialize: function () {
                this._super();

                var self = this;

                window.setTimeout(function () {
                    var currentMethod = quote.paymentMethod();
                    var savedMethod = null;

                    if (typeof checkoutData.getSelectedPaymentMethod === 'function') {
                        savedMethod = checkoutData.getSelectedPaymentMethod();
                    }

                    if (
                        !currentMethod &&
                        (!savedMethod || savedMethod === 'stripe_payments') &&
                        self.item &&
                        self.item.method === 'stripe_payments'
                    ) {
                        self.selectPaymentMethod();
                    }
                }, 0);

                return this;
            }
        });
    };
});
