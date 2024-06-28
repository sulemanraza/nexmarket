// import "server-only";
"use server";
// product server actions
export async function createWishlistItem(formData: FormData) {
  const product = formData;
  console.log("create wishlist", product);
}

export async function removeWishlistItem(formData: FormData) {
  const product = formData;
  console.log("remove item", product);
}

export async function proceedToCheckout(formData: FormData) {
  console.log("Proceed to checkout");

  // Get cart items
  const items = formData;
  console.log("Proceed to checkout items", items);

  return items;
}
