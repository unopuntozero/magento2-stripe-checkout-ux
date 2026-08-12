# Magento 2 Stripe Checkout UX

A lightweight Magento 2 / Adobe Commerce module that automatically selects the official Stripe Payments method when the customer reaches the payment step, so the Stripe Payment Element is immediately expanded.

The goal is simple: remove the extra click on the generic Stripe payment-method container while preserving Magento's native checkout flow and Stripe's official Payment Element.

## Features

- Automatically selects `stripe_payments` when no other payment method is currently selected.
- Re-selects Stripe when Stripe itself was the previously selected method.
- Respects a different payment method already chosen by the customer.
- Leaves other Magento payment methods available.
- Uses a RequireJS mixin instead of modifying Magento core or Stripe vendor files.
- Works with the embedded Stripe Payment Element flow.

## Recommended checkout label

This module does not change the Stripe payment-method title automatically.

For a clearer checkout experience, configure the Stripe **Title** in Magento Admin. Suggested labels:

- Italian: `Carte e altri metodi di pagamento`
- English: `Cards & other payment methods`
- German: `Karten & weitere Zahlungsarten`

Using Stripe's **Vertical - Accordion** Payment Element layout is also a good fit when you want the available Stripe methods to be immediately visible after auto-selection.

## Requirements

- Magento 2 / Adobe Commerce
- Official Stripe Payments module for Magento 2
- Embedded Stripe Payment Element flow

Tested in production with:

- Magento 2.4.7-p10
- PHP 8.3
- Stripe Payments 4.6.4

Other compatible Magento / Stripe versions may also work, but have not necessarily been tested.

## Installation

### Composer from GitHub

Add this repository as a VCS source:

```bash
composer config repositories.scidigital-stripe-checkout-ux vcs https://github.com/unopuntozero/magento2-stripe-checkout-ux.git
```

Install the module:

```bash
composer require scidigital/magento2-stripe-checkout-ux:dev-main
```

Then run:

```bash
php bin/magento setup:upgrade
php bin/magento setup:di:compile
php bin/magento setup:static-content:deploy -f
php bin/magento cache:clean
```

### Manual installation

Copy the module files to:

```text
app/code/Scidigital/StripeCheckoutUx
```

Then run:

```bash
php bin/magento setup:upgrade
php bin/magento setup:di:compile
php bin/magento setup:static-content:deploy -f
php bin/magento cache:clean
```

## How it works

The module adds a RequireJS mixin to:

```text
StripeIntegration_Payments/js/view/payment/method-renderer/stripe_payments
```

When the Stripe renderer initializes, the mixin checks Magento's current payment state and the payment method stored in checkout data.

Stripe is auto-selected only when:

1. no payment method is currently selected;
2. no different payment method was previously selected; and
3. the renderer being initialized is `stripe_payments`.

This keeps the behavior intentionally conservative and avoids overriding an explicit customer choice.

## Stripe Payment Method Configurations

This module does not force Stripe to be available. Availability remains controlled by the official Stripe integration and its Payment Method Configuration / Payment Element logic.

If Stripe determines that `stripe_payments` is unavailable for a cart, this module does not add or expose it.

## Module name

```text
Scidigital_StripeCheckoutUx
```

Check status with:

```bash
php bin/magento module:status Scidigital_StripeCheckoutUx
```

## License

MIT License. See [LICENSE](LICENSE).

## Disclaimer

This is an independent open-source module and is not affiliated with or endorsed by Stripe or Adobe. Stripe, Adobe Commerce and Magento are trademarks of their respective owners.
