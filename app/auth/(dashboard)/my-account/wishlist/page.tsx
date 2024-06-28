import { FlashProduct } from "@/client/components/Product/FlashProduct";
import { Button } from "@/client/components/ui/button";
import { products } from "@/server/db";
import { removeWishlistItem } from "@/server/action/productActions";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/client/components/ui/breadcrumb";
import ProtectRoute from "@/client/utils/ProtectRoute";
import { getAllProducts } from "@/server/context";

const Wishlist = async () => {
  const productItems = await getAllProducts();

  return (
    <ProtectRoute>
      <div className="container space-y-4 py-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-xs md:text-sm" href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs md:text-sm">
                My Account
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs md:text-sm">
                Wishlist
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold mt-10">Wishlist (4)</h1>

            <Button className="mt-10" variant="outline">
              Move All To Bag
            </Button>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productItems.slice(0, 4).map((product, index) => (
              <FlashProduct
                key={index}
                item={product}
                showDelete={true}
                deleteItem={removeWishlistItem} // delete item function
              />
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-6 sm:w-[20px] sm:h-10 rounded-sm bg-brand"></div>
              <div className="font-semibold  text-sm sm:text-[16px]">
                Just For You
              </div>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productItems.slice(0, 4).map((product, index) => (
              <FlashProduct key={index} item={product} />
            ))}
          </div>
        </div>
      </div>
    </ProtectRoute>
  );
};

export default Wishlist;