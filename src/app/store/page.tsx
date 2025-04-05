import StoreClient from "./StoreClient";
import StoreLayout from "./StoreLayout";

export default async function StorePage() {
  const res = await fetch(
    "https://nuke-c480e-default-rtdb.firebaseio.com/store.json"
  );
  const data = await res.json();
  const firstKey = Object.keys(data)[0];
  const products = data[firstKey] || [];

  return (
    <StoreLayout>
      <StoreClient products={products} />
    </StoreLayout>
  );
}
