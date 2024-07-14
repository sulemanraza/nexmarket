import { FlashProduct } from "@/client/components/Product/FlashProduct";
import { Button } from "@/client/components/ui/button";
import { removeWishlistItem } from "@/server/action/productActions";
import { getProducts } from "@/server/action/product/getAllProduct";
import { getWishlistProduct } from "@/server/action/wishlist/getWishlistProduct";

const Wishlist = async () => {
  // const product = await getProducts();
  const wishlistItems: any = await getWishlistProduct();

  console.log({ wishlistItems });

  return (
    <div className="container space-y-4 pb-10">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mt-10">
            Wishlist ({wishlistItems?.items.length})
          </h1>

          <Button className="mt-10" variant="outline">
            Move All To Bag
          </Button>
        </div>

        {wishlistItems?.items.length ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems?.items?.map(({ product }: any, index: number) => (
              <FlashProduct
                key={index}
                item={{
                  ...product,
                  isInWishlist: true,
                }}
                showDelete={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h2>No items in wishlist</h2>
          </div>
        )}
      </div>

      {/* <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-3 h-6 sm:w-[20px] sm:h-10 rounded-sm bg-brand"></div>
            <div className="font-semibold  text-sm sm:text-[16px]">
              Just For You
            </div>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {product.length &&
            product
              ?.slice(0, 4)
              .map((product: any, index: number) => (
                <FlashProduct key={index} item={product} />
              ))}
        </div>
      </div> */}
    </div>
  );
};

export default Wishlist;
