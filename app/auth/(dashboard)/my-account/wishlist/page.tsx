import { FlashProduct } from "@/client/components/Product/FlashProduct";
import { Button } from "@/client/components/ui/button";
import { getWishlistProduct } from "@/server/action/wishlist/getWishlistProduct";

const Wishlist = async () => {
  const wishlistItems: any = await getWishlistProduct();

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
    </div>
  );
};

export default Wishlist;
