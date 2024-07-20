import Button from "@/client/components/Buttons";
import { ProductCarousel } from "@/client/components/CarouselNext/ProductCarousel";
import { FeaturedCard } from "@/client/components/FeaturedSection";
import FlashTimer from "@/client/components/FlashSalesTimer";
import { HeroSection } from "@/client/components/HeroSection";
import { FlashProduct } from "@/client/components/Product/FlashProduct";
import { SectionHeader } from "@/client/components/reuseable/SectionHeader";
import Layout from "@/client/components/layout";
import { createWishlistItem } from "@/server/action/productActions";
import Link from "next/link";
import { getProducts } from "@/server/action/product/getAllProduct";
import { getCategories } from "@/server/action/category/getCategories";
import { addToWishlist } from "@/server/action/wishlist/addToWishlist";

export default async function Home() {
  const product = await getProducts();
  const categories = await getCategories();

  return (
    <Layout>
      <HeroSection />

      <div className="mt-28">
        {/* Flash Sales */}
        <SectionHeader
          title="Today’s"
          heading="Flash Sales"
          headerStyle="flex flex-col justify-start md:flex-row items-center md:justify-between gap-8"
          headerChildren={<FlashTimer endTime={"2024-07-25T00:00:00"} />}
        >
          <div className="relative">
            <ProductCarousel className="grid place-items-center">
              {product?.slice(0, 8).map((product: any, index: number) => (
                <FlashProduct
                  key={index}
                  item={product}
                  createWishlistItem={addToWishlist} // create wishlist item function
                />
              ))}
            </ProductCarousel>
          </div>

          <div className="flex justify-center mt-10">
            <Button className="w-44 h-10 md:w-48 md:h-12 lg:w-[234px] lg:h-14 hover:bg-brand hover:opacity-90">
              View All Products
            </Button>
          </div>
        </SectionHeader>

        {/* Categories */}
        <div>
          <SectionHeader title="Categories" heading="Browse By Category">
            <div className="relative">
              <ProductCarousel
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1024,
                    },
                    items: 6,
                  },
                  mobile: {
                    breakpoint: {
                      max: 464,
                      min: 0,
                    },
                    items: 2,
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 464,
                    },
                    items: 3,
                  },
                }}
              >
                {categories?.map(({ name, slug, iconName }, i) => {
                  return (
                    <Link
                      href={`/${slug}`}
                      key={i}
                      className="w-[170px] h-[145px] grid place-items-center border-2 rounded-sm hover:bg-brand hover:text-white cursor-pointer"
                    >
                      <div className="flex items-center flex-col gap-3 justify-center">
                        {/* {iconName && <iconName className="w-14 h-14" />} */}
                        <span className="text-sm font-semibold">{name}</span>
                      </div>
                    </Link>
                  );
                })}
              </ProductCarousel>
            </div>
          </SectionHeader>
          <hr className="container" />
        </div>

        {/* Best Products */}
        <SectionHeader
          title="This Month"
          heading="Best Selling Products"
          headerStyle="flex items-center gap-4 justify-between w-full"
          headerChildren={
            <Button className="w-36 h-10 md:w-[159px] md:h-14 hover:bg-brand hover:opacity-90">
              View All
            </Button>
          }
        >
          <div className="relative grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-4">
            {product?.slice(0, 4).map((product: any, index: number) => (
              <FlashProduct key={index} item={product} />
            ))}
          </div>
        </SectionHeader>

        {/* Our Products  */}
        <SectionHeader title="Our Products" heading="Explore Our Products">
          <div className="relative grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-4">
            {product?.slice(0, -8).map((product: any, index: number) => (
              <FlashProduct key={index} item={product} showOldPrice={false} />
            ))}
          </div>
        </SectionHeader>

        <SectionHeader title="Featured" heading="New Arrival">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 w-full h-full min-h-[600px] gap-8">
            <FeaturedCard
              image="/images/playstation.png"
              title="PlayStation 5"
              description="Black and White version of the PS5 coming out on sale."
            />
            <div className="grid gap-8 h-full">
              <FeaturedCard
                image="/images/woman.png"
                title="Women’s Collections"
                description="Featured woman collections that give you another vibe."
                width={432}
                height={286}
              />
              <div className="grid md:grid-cols-2 gap-8">
                <FeaturedCard
                  image="/images/Frame707.png"
                  title="Speakers"
                  description="Amazon wireless speakers"
                />
                <FeaturedCard
                  image="/images/prof.png"
                  title="Perfume"
                  description="GUCCI INTENSE OUD EDP"
                />
              </div>
            </div>
          </div>
        </SectionHeader>
      </div>
    </Layout>
  );
}
