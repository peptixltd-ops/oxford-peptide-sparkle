type Subscriber = {
  email: string;
  phone?: string;
  smsConsent: boolean;
  source: string;
  code: string;
};

type GraphQLResult<T> = { data?: T; errors?: Array<{ message: string }> };
type MutationResult = { userErrors: Array<{ field?: string[]; message: string }> };

export async function syncNewsletterCustomer(
  subscriber: Subscriber,
  tokens: string[],
  shop: string,
  version: string,
  request: typeof fetch = fetch,
) {
  let token: string | undefined;
  for (const candidate of tokens) {
    const response = await request(`https://${shop}/admin/oauth/access_scopes.json`, {
      headers: { "X-Shopify-Access-Token": candidate },
    });
    if (!response.ok) {
      console.error(`Shopify newsletter scope check failed [${response.status}]: ${await response.text()}`);
      continue;
    }
    const result = await response.json() as { access_scopes?: Array<{ handle: string }> };
    if (result.access_scopes?.some(scope => scope.handle === "write_customers")) {
      token = candidate;
      break;
    }
  }
  if (!token) throw new Error("Shopify newsletter sync requires write_customers; no configured token has this scope.");

  async function graphql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
    const response = await request(`https://${shop}/admin/api/${version}/graphql.json`, {
      method: "POST",
      headers: { "X-Shopify-Access-Token": token ?? "", "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    if (!response.ok) throw new Error(`Shopify newsletter request failed [${response.status}]: ${await response.text()}`);
    const result = await response.json() as GraphQLResult<T>;
    if (result.errors?.length) throw new Error(result.errors.map(error => error.message).join("; "));
    if (!result.data) throw new Error("Shopify newsletter request returned no data.");
    return result.data;
  }

  function check(result: MutationResult) {
    if (result.userErrors.length) throw new Error(result.userErrors.map(error => error.message).join("; "));
  }

  const found = await graphql<{ customers: { nodes: Array<{ id: string; email: string | null }> } }>(
    `query NewsletterCustomer($query: String!) { customers(first: 10, query: $query) { nodes { id email } } }`,
    { query: `email:${JSON.stringify(subscriber.email)}` },
  );
  const existing = found.customers.nodes.find(customer => customer.email?.toLowerCase() === subscriber.email.toLowerCase());
  const input = {
    ...(existing ? { id: existing.id } : {}),
    email: subscriber.email,
    ...(subscriber.phone && subscriber.smsConsent ? { phone: subscriber.phone } : {}),
  };
  const mutation = existing ? "customerUpdate" : "customerCreate";
  const saved = await graphql<Record<string, MutationResult & { customer: { id: string } | null }>>(
    `mutation SaveNewsletterCustomer($input: CustomerInput!) { ${mutation}(input: $input) { customer { id } userErrors { field message } } }`,
    { input },
  );
  check(saved[mutation]);
  const customer = saved[mutation].customer;
  if (!customer) throw new Error("Shopify newsletter customer was not saved.");

  const consent = await graphql<{ customerEmailMarketingConsentUpdate: MutationResult }>(
    `mutation NewsletterEmailConsent($input: CustomerEmailMarketingConsentUpdateInput!) { customerEmailMarketingConsentUpdate(input: $input) { userErrors { field message } } }`,
    { input: { customerId: customer.id, emailMarketingConsent: { marketingState: "SUBSCRIBED", marketingOptInLevel: "SINGLE_OPT_IN" } } },
  );
  check(consent.customerEmailMarketingConsentUpdate);
  const tagged = await graphql<{ tagsAdd: MutationResult }>(
    `mutation NewsletterTags($id: ID!, $tags: [String!]!) { tagsAdd(id: $id, tags: $tags) { userErrors { field message } } }`,
    { id: customer.id, tags: ["newsletter", subscriber.source] },
  );
  check(tagged.tagsAdd);
  const metafield = await graphql<{ metafieldsSet: MutationResult }>(
    `mutation NewsletterWelcomeCode($metafields: [MetafieldsSetInput!]!) { metafieldsSet(metafields: $metafields) { userErrors { field message } } }`,
    { metafields: [{ ownerId: customer.id, namespace: "custom", key: "welcome_code", type: "single_line_text_field", value: subscriber.code }] },
  );
  check(metafield.metafieldsSet);
  if (subscriber.phone && subscriber.smsConsent) {
    const sms = await graphql<{ customerSmsMarketingConsentUpdate: MutationResult }>(
      `mutation NewsletterSmsConsent($input: CustomerSmsMarketingConsentUpdateInput!) { customerSmsMarketingConsentUpdate(input: $input) { userErrors { field message } } }`,
      { input: { customerId: customer.id, smsMarketingConsent: { marketingState: "SUBSCRIBED", marketingOptInLevel: "SINGLE_OPT_IN" } } },
    );
    check(sms.customerSmsMarketingConsentUpdate);
  }
}

export async function syncNewsletterCustomerSafely(...args: Parameters<typeof syncNewsletterCustomer>) {
  try {
    await syncNewsletterCustomer(...args);
  } catch (error) {
    console.error("Shopify newsletter customer sync failed; subscriber keeps their code", error);
  }
}