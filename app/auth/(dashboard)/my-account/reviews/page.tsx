import React from "react";
import { ReviewsTable } from "./ReviewTable";
import { getServerSession } from "next-auth";
import { getReviewByUserId } from "@/server/action/reviews/getReviewByUserId";
import { authOptions } from "@/client/lib/authOption";

const Reviews = async () => {
  const session = await getServerSession(authOptions);
  const reviews = await getReviewByUserId(session?.user?.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-brand font-semibold">Reviews</h1>
      </div>

      <ReviewsTable data={reviews ?? []} />
    </div>
  );
};

export default Reviews;
