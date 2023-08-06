import { StripeEvent } from "@/app/api/webhooks/StripeEvent";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/libs/stripe";
import {
  manageSubscriptionStatusChange,
  upsertPriceRecord,
  upsertProductRecord,
} from "@/libs/supabaseAdmin";

const relevantEvents = new Set(Object.values(StripeEvent).map((e) => e));

export async function POST(request: Request) {
  const body = await request.text();
  const sig = headers().get("Stripe-Signature");

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE ?? process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`Error message: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type as StripeEvent)) {
    try {
      switch (event.type) {
        case StripeEvent.ProductCreated:
        case StripeEvent.ProductUpdated:
          await upsertProductRecord(event.data.object as Stripe.Product);
          break;
        case StripeEvent.PriceCreated:
        case StripeEvent.PriceUpdated:
          await upsertPriceRecord(event.data.object as Stripe.Price);
          break;
        case StripeEvent.CustomerSubscriptionCreated:
        case StripeEvent.CustomerSubscriptionUpdated:
        case StripeEvent.CustomerSubscriptionDeleted:
          const subscription = event.data.object as Stripe.Subscription;
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            event.type === StripeEvent.CustomerSubscriptionCreated,
          );
          break;
        case StripeEvent.CheckoutSessionCompleted:
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === "subscription") {
            const subscriptionId = checkoutSession.subscription;
            await manageSubscriptionStatusChange(
              subscriptionId as string,
              checkoutSession.customer as string,
              true,
            );
          }
          break;
        default:
          throw new Error("Unhandled relevant event!");
      }
    } catch (error) {
      console.log(error);
      return new NextResponse(
        'Webhook error: "Webhook handler failed. View logs."',
        { status: 400 },
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
