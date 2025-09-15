import React from "react";
import { Rate, Empty, Avatar, Typography, Radio } from "antd";
import { format } from "date-fns";
import { HeadingStyled, ReviewProductStyled as RPS } from "@/components";
import useProductReview from "@/hooks/productDetail/useProductReview";

const { Text } = Typography;

export default function ReviewProduct(props) {
  const {
    filter,
    setFilter,
    sortBy,
    setSortBy,
    page,
    setPage,
    counts,
    totalReviews,
    displayAvg,
    filteredSorted,
    paginated,
    pageSize,
  } = useProductReview(props);

  return (
    <RPS.ReviewProduct>
      <HeadingStyled as="h2" style={{ marginBottom: "1rem" }}>
        Đánh giá sản phẩm
      </HeadingStyled>

      <RPS.Header>
        <RPS.AvgWrapper>
          <RPS.AvgScore>{displayAvg.toFixed(1)}</RPS.AvgScore>
          <RPS.AvgRate value={displayAvg} allowHalf disabled />
          <RPS.TotalReview>{totalReviews} đánh giá</RPS.TotalReview>
        </RPS.AvgWrapper>

        <RPS.ControlWrapper>
          <RPS.SortWrapper>
            <Text strong>Sắp xếp:</Text>
            <RPS.SortSelect value={sortBy} onChange={setSortBy} size="small">
              <RPS.SortSelect.Option value="newest">Mới nhất</RPS.SortSelect.Option>
              <RPS.SortSelect.Option value="oldest">Cũ nhất</RPS.SortSelect.Option>
            </RPS.SortSelect>
          </RPS.SortWrapper>

          <RPS.BreakdownWrapper>
            {[5, 4, 3, 2, 1].map((s) => {
              const count = counts[s] || 0;
              const ratePercent = totalReviews ? Math.round((count / totalReviews) * 100) : 0;
              return (
                <RPS.BreakdownItem key={s} active={filter === String(s)} onClick={() => setFilter(String(s))}>
                  <RPS.BreakdownStar>
                    <span>{s}</span>
                    <Rate value={s} disabled style={{ fontSize: 12 }} />
                  </RPS.BreakdownStar>
                  <RPS.BreakdownBar>
                    <RPS.ProgressBar>
                      <RPS.ProgressFill percent={ratePercent} />
                    </RPS.ProgressBar>
                    <RPS.BreakdownText>
                      {count} ({ratePercent}%)
                    </RPS.BreakdownText>
                  </RPS.BreakdownBar>
                </RPS.BreakdownItem>
              );
            })}
          </RPS.BreakdownWrapper>
        </RPS.ControlWrapper>
      </RPS.Header>

      <RPS.ReviewWrapper>
        {filteredSorted.length === 0 ? (
          <Empty description="Chưa có đánh giá nào" style={{ margin: "2rem auto" }} />
        ) : (
          <>
            {paginated.map((review) => (
              <RPS.ReviewItem key={review.id}>
                <Avatar size={56}>{review.userName?.trim()?.charAt(0)?.toUpperCase() || "U"}</Avatar>
                <RPS.UserInfo>
                  <RPS.TitleReview>
                    <span style={{ fontWeight: 700, marginRight: 8 }}>{review.userName}</span>
                    <RPS.FlexWrapper>
                      <Rate value={review.rating} disabled style={{ fontSize: 14 }} />
                      <span>{format(new Date(review.createdAt), "HH:mm dd/MM/yyyy")}</span>
                    </RPS.FlexWrapper>
                  </RPS.TitleReview>
                  <RPS.ContentReview>{review.content}</RPS.ContentReview>
                </RPS.UserInfo>
              </RPS.ReviewItem>
            ))}

            {filteredSorted.length > pageSize && (
              <RPS.PaginationWrapper>
                <RPS.StyledPagination
                  current={page}
                  pageSize={pageSize}
                  total={filteredSorted.length}
                  onChange={setPage}
                  showSizeChanger={false}
                />
              </RPS.PaginationWrapper>
            )}
          </>
        )}
      </RPS.ReviewWrapper>
    </RPS.ReviewProduct>
  );
}
