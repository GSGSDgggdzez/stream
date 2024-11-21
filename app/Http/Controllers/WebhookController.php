<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Webhook;
use App\Models\User;
use Laravel\Cashier\Exceptions\IncompletePayment;

class WebhookController extends Controller
{
    public function handleWebhook(Request $request)
    {
        // Set Stripe secret key to validate incoming webhooks
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // The payload from Stripe
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');  // Your Stripe webhook secret

        try {
            $event = Webhook::constructEvent($payload, $sig_header, $endpoint_secret);

            // Handle different types of events
            switch ($event->type) {
                case 'invoice.payment_succeeded':
                    $this->handlePaymentSucceeded($event);
                    break;
                case 'invoice.payment_failed':
                    $this->handlePaymentFailed($event);
                    break;
                case 'customer.subscription.created':
                    $this->handleSubscriptionCreated($event);
                    break;
                case 'customer.subscription.updated':
                    $this->handleSubscriptionUpdated($event);
                    break;
                case 'customer.subscription.deleted':
                    $this->handleSubscriptionDeleted($event);
                    break;
                default:
                    // Handle other events
                    break;
            }

            return response('Webhook handled', 200);
        } catch (\Exception $e) {
            return response('Webhook error: ' . $e->getMessage(), 400);
        }
    }

    // Handle successful payments
    protected function handlePaymentSucceeded($event)
    {
        $user = User::find($event->data->object->customer);
        $user->subscription('default')->createInvoice();
        // Add any custom logic for successful payment
    }

    // Handle failed payments
    protected function handlePaymentFailed($event)
    {
        // Add logic for failed payments, like notifying the user
    }

    // Handle subscription events (created, updated, deleted)
    protected function handleSubscriptionCreated($event)
    {
        // Subscription created logic
    }

    protected function handleSubscriptionUpdated($event)
    {
        // Subscription updated logic
    }

    protected function handleSubscriptionDeleted($event)
    {
        // Subscription deleted logic
    }
}

