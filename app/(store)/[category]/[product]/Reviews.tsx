"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/client/components/ui/form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/client/components/ui/input";
import { Button } from "@/client/components/ui/button";
import { Textarea } from "@/client/components/ui/textarea";
import { FC, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/client/components/ui/avatar";
import { toast } from "@/client/components/ui/use-toast";

const formSchema = z.object({
  star: z
    .number()
    .int()
    .min(1, {
      message: "Please select a star rating",
    })
    .max(5, {
      message: "Please select a star rating",
    }),
  title: z
    .string()
    .min(15, {
      message: "Title must be at least 15 characters",
    })
    .max(60, {
      message: "Title must not exceed 60 characters",
    }),
  review: z
    .string()
    .min(50, {
      message: "Review must be at least 50 characters",
    })
    .max(500, {
      message: "Review must not exceed 500 characters",
    }),
});

interface ReviewsProps {
  onSubmitReview: (data: FormData) => void;
  productReviews: any;
  reviewStar: {
    _id: string;
    averageRating: number;
    numReviews: number;
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
  };
}

export const Reviews: FC<ReviewsProps> = ({
  onSubmitReview,
  productReviews,
  reviewStar,
}) => {
  const session = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      star: 0,
      title: "",
      review: "",
    },
  });
  const handleReview = async (e: any) => {
    // e.preventDefault();
    if (!session.data?.user) {
      return window.location.replace("/auth/login");
    }

    const data = new FormData();

    data.append("star", e.star);
    data.append("title", e.title);
    data.append("review", e.review);

    const response: any = await onSubmitReview(data);

    if (response.success) {
      form.reset();

      toast({
        title: "Review Submitted",
        description: "Your review has been submitted successfully",
        variant: "success",
      });
    }
  };
  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
        <div className="">
          <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-8 text-center">
            Customer reviews &amp; rating
          </h2>

          <ReviewStats reviewStats={reviewStar} />

          <div className=" space-y-6">
            {productReviews?.map(
              (
                {
                  review,
                  user,
                  star,
                  title,
                  createdAt,
                }: {
                  review: string;
                  user: { name: string };
                  star: number;
                  title: string;
                  createdAt: string;
                },
                index: number
              ) => {
                return (
                  <article key={index} className="border-b pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="hidden sm:block">
                        <AvatarImage src="https://avatar.iran.liara.run/public/boy" />
                        <AvatarFallback>
                          {user.name[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium dark:text-white">
                        <p>
                          {user.name}
                          <time
                            dateTime="2014-08-16 19:00"
                            className="block text-sm text-gray-500 dark:text-gray-400"
                          >
                            Joined on August 2014
                          </time>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mb-1 space-x-0.5 rtl:space-x-reverse">
                      {Array.from({ length: 5 }, (_, i) => (
                        <svg
                          key={i}
                          className={`w-8 h-8 text-yellow-400 dark:text-yellow-300`}
                          viewBox="0 0 20 20"
                          fill={i < star ? "currentColor" : "none"}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.243 3.824 4.004.058c.96.014 1.359 1.231.658 1.84l-3.062 2.637.964 3.963c.225.927-.758 1.675-1.54 1.116L10 13.011l-3.218 2.354c-.781.559-1.764-.189-1.54-1.116l.964-3.963-3.062-2.637c-.7-.609-.301-1.826.658-1.84l4.004-.058L9.049 2.927z" />
                        </svg>
                      ))}
                      <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
                        {title}
                      </h3>
                    </div>
                    <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                      <p className="flex items-center gap-4">
                        <span>Reviewed</span>
                        <time dateTime="2017-03-03 19:00">
                          {/* data like this March 3, 2017 */}
                          {new Date(createdAt).toLocaleDateString("en-PK", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>
                      </p>
                    </footer>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      {review}
                    </p>

                    <a
                      href="#"
                      className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Read more
                    </a>
                    <aside>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        19 people found this helpful
                      </p>
                      <div className="flex items-center mt-3">
                        <a
                          href="#"
                          className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Helpful
                        </a>
                        <a
                          href="#"
                          className="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600"
                        >
                          Report abuse
                        </a>
                      </div>
                    </aside>
                  </article>
                );
              }
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-8  max-xl:max-w-3xl max-xl:mx-auto">
            <p className="font-normal text-lg py-[1px] text-black">
              {productReviews?.length} Reviews
            </p>
            <form>
              <div className="flex">
                <div className="relative ">
                  <div className=" absolute -left-0 px-2 top-0 py-2">
                    <p className="font-normal text-lg leading-8 text-gray-500">
                      Sort by:
                    </p>
                  </div>
                  <input
                    type="text"
                    className="block w-60 h-11 pr-4 pl-20 py-2.5 text-lg leading-8 font-medium rounded-full cursor-pointer shadow-xs text-black bg-transparent placeholder-black focus:outline-gray-200 "
                    placeholder="Most Relevant"
                  />
                  <div
                    id="dropdown-button"
                    data-target="dropdown"
                    className="dropdown-toggle flex-shrink-0 cursor-pointer z-10 inline-flex items-center py-2.5 px-4 text-base font-medium text-center text-gray-900 bg-transparent absolute right-0 top-2 pl-2 "
                  >
                    <svg
                      className="ml-2"
                      width={12}
                      height={7}
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div
                    id="dropdown"
                    className="absolute top-9 right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdown-button"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Most Relevant
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          last week
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          oldest
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* reviews box */}
          {session.data?.user ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleReview)}
                className="space-y-8 border-t py-5"
                id="writeReview"
              >
                <FormField
                  control={form.control}
                  name="star"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" font-semibold">
                        Select a star rating
                      </FormLabel>
                      <FormControl>
                        <StarRating
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" capitalize">
                        Write a review title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Outstanding Experience!!!"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="review"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className=" capitalize">
                        Write a review
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="write your review here"
                          {...field}
                          cols={30}
                          rows={10}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit Review</Button>
              </form>
            </Form>
          ) : (
            // for review please login

            <div className="flex items-center justify-center w-full h-full border py-10 my-8">
              <p className="text-lg font-medium text-gray-500">
                Please{" "}
                <a href="/auth/login" className="text-blue-600 hover:underline">
                  login
                </a>{" "}
                to write a review
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================== handle Review Star Rating  ==============================
interface props {
  value: number;
  onChange: (value: number) => void;
}

const StarRating: FC<props> = ({ value, onChange }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-8 h-8 cursor-pointer ${
            star <= (hover || value) ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.243 3.824 4.004.058c.96.014 1.359 1.231.658 1.84l-3.062 2.637.964 3.963c.225.927-.758 1.675-1.54 1.116L10 13.011l-3.218 2.354c-.781.559-1.764-.189-1.54-1.116l.964-3.963-3.062-2.637c-.7-.609-.301-1.826.658-1.84l4.004-.058L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
};

// ============================== handle Review Star details  ==============================
interface StarProp {
  reviewStats: {
    _id: string;
    averageRating: number;
    numReviews: number;
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
  };
}

const ReviewStats: FC<StarProp> = ({ reviewStats }) => {
  const totalReviews = reviewStats?.numReviews;
  const starRatings = [
    { stars: 5, count: reviewStats.fiveStar },
    { stars: 4, count: reviewStats.fourStar },
    { stars: 3, count: reviewStats.threeStar },
    { stars: 2, count: reviewStats.twoStar },
    { stars: 1, count: reviewStats.oneStar },
  ];
  return (
    <div className="grid grid-cols-12 mb-11">
      <div className="col-span-12 xl:col-span-4 flex items-center">
        <div className="box flex flex-col gap-y-4 w-full max-xl:max-w-3xl mx-auto">
          {starRatings.map(({ stars, count }) => (
            <div key={stars} className="flex items-center w-full">
              <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                {stars}
              </p>
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_12042_8589)">
                  <path
                    d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                    fill="#FBBF24"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_12042_8589">
                    <rect width={20} height={20} fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="h-2 w-full sm:min-w-[278px] rounded-[30px] bg-gray-200 ml-5 mr-3">
                <span
                  className="h-full rounded-[30px] bg-[--brand] flex"
                  style={{ width: `${(count / totalReviews) * 100}%` }}
                />
              </p>
              <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                {count}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 max-xl:mt-8 xl:col-span-8 xl:pl-8 w-full min-h-[230px]">
        <div className="grid grid-cols-12 h-full px-8 max-lg:py-8 rounded-3xl bg-gray-100 w-full max-xl:max-w-3xl max-xl:mx-auto">
          <div className="col-span-12 md:col-span-8 flex items-center">
            <div className="flex items-center justify-center w-full h-full">
              <div className="sm:pr-3 sm:border-r border-gray-200 flex items-center justify-center flex-col">
                <h2 className="font-manrope font-bold text-5xl text-black text-center mb-4">
                  {reviewStats.averageRating.toFixed(1)}
                </h2>
                <div className="flex items-center gap-3 mb-4">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      width={36}
                      height={36}
                      viewBox="0 0 36 36"
                      fill={
                        index < reviewStats.averageRating ? "#FBBF24" : "none"
                      }
                      stroke={
                        index < reviewStats.averageRating ? "none" : "#FBBF24"
                      }
                    >
                      <g clipPath="url(#clip0_13624_3137)">
                        <path d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z" />
                      </g>
                      <defs>
                        <clipPath id="clip0_13624_3137">
                          <rect width={36} height={36} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  ))}
                </div>

                <p className="font-normal text-lg leading-8 text-gray-400">
                  {reviewStats.numReviews} Ratings
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 max-lg:mt-8 md:pl-8">
            <div className="flex items-center flex-col justify-center w-full h-full ">
              <button className="rounded-full border px-6 py-4 bg-white font-semibold text-lg text-brand whitespace-nowrap w-full text-center shadow-sm shadow-transparent transition-all duration-500   hover:border-brand ">
                See All Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
