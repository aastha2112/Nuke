import { products } from '@wix/stores';
import { createClient, OAuthStrategy } from '@wix/sdk';

//To access the Wix APIs, create a client with the createClient() function imported from the @wix/sdk package.
const myWixClient = createClient({
modules: { products },
auth: OAuthStrategy({ clientId: '198ad844-3432-4cfa-8ab6-33aec48b0e48' }),
});

const productList = await myWixClient.products.queryProducts().find();

console.log('My Products:');
console.log('Total: ', productList.items.length);
console.log(productList.items
.map((item) => item.name)
.join('\n')
);
