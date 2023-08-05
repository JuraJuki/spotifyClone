import { stripe } from "@/libs/stripe";
import { Price } from "@/types";
import { Database } from "@/types_db";
import { createClient } from "@supabase/supabase-js";
import { Stripe } from "stripe";
import Product = module;

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
);

const upsertProductRecord = async (product: Stripe.Product) => {
  const productData: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? undefined,
    image: product.images?.[0] ?? null,
    metadata: product.metadata,
  };

  const { error } = await supabaseAdmin.from("produts").upsert([productData]);

  if (error) throw error;

  console.log(`Product updated ${product.id}`);
};

const upsertPriceRecord = async (price: Stripe.Price) => {
  const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === "string" ? price.product : "",
    active: price.active,
    currency: price.currency,
    description: price.nickname ?? undefined,
    unit_amount: price.unit_amount ?? undefined,
    interval: price.recurring?.interval,
    interval_count: price.recurring?.interval_count,
    trial_period_days: price.recurring?.trial_period_days,
    metadata: price.metadata,
  };

  const { error } = await supabaseAdmin.from("prices").upsert([priceData]);

  if (error) throw error;

  console.log(`Price updated ${price.id}`);
};

const createOrRetreiveaCustomer = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) => {
  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("stripe_customer_id")
    .eq("id", uuid)
    .single();

  if (error || !data?.stripe_customer_id) {
    const customerData: { metadata: { supabaseUUID: string }; email?: string } =
      {
        metadata: { supabaseUUID: uuid },
        email,
      };

    if (email) customerData.email = email;

    const customer = await stripe.customers.create(customerData);

    const { error: supabaseError } = await supabaseAdmin
      .from("customers")
      .upsert([{ id: uuid, stripe_customer_id: customer.id }]);

    if (supabaseError) throw supabaseError;

    console.log(`New customer created & inserted ${uuid}`);
    return customer.id;
  }

  return data.stripe_customer_id;
};
