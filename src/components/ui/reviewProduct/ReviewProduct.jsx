import React from "react";
import { Rate } from "antd";
import { formatDate } from "date-fns/format";

import { HeadingStyled, ReviewProductStyled as RPS } from "@/components";

export default function ReviewProduct({ reviews, avgRating }) {
  return (
    <RPS.ReviewProduct>
      <HeadingStyled as={"h2"}>Đánh giá sản phẩm</HeadingStyled>
      <RPS.RatingAvg>
        {avgRating} trên 5 <Rate defaultValue={avgRating} allowHalf disabled />
      </RPS.RatingAvg>
      <RPS.ReviewWrapper>
        {reviews.map((review, index) => (
          <RPS.ReviewItem key={index}>
            <RPS.TitleReview>
              {review.userName}
              <RPS.FlexWrapper>
                <Rate defaultValue={review.rating} allowHalf disabled />
                {formatDate(review.createdAt, "HH:mm dd/MM/yyyy")}
              </RPS.FlexWrapper>
            </RPS.TitleReview>
            <RPS.ContentReview>{review.content}</RPS.ContentReview>
          </RPS.ReviewItem>
        ))}
      </RPS.ReviewWrapper>
    </RPS.ReviewProduct>
  );
}
