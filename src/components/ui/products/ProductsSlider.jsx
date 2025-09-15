import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Rate } from "antd";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { ProductListStyled as PLS } from "@/components/ui/products";

import useProducts from "@/hooks/products/useProducts";
import { formatCurrency } from "@/utils/helpers";
import noimage from "@/assets/images/NoImage/noimage.jpg";

export default function ProductsSlider() {
  const { handleNavigate, bestSellerProducts, t } = useProducts();

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <PLS.Header>
        <h2>{t("productSlider.title")}</h2>
        <p>{t("productSlider.description")}</p>
      </PLS.Header>
      <PLS.SwiperSlideWrap>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={5}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            1200: { slidesPerView: 5 },
            768: { slidesPerView: 3 },
            480: { slidesPerView: 1 },
          }}
        >
          {bestSellerProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <PLS.ProductItem key={product.id}>
                <div className="product-card" onClick={() => handleNavigate(product.id)}>
                  <div className="image-wrapper">
                    <img src={product.images?.[0]?.imageUrl || noimage} alt={product.name} />
                  </div>

                  <div className="product-info">
                    {product.total_sold > 10 && <span className="badge">{t("productCard.bestSeller")}</span>}
                    {product.stock < 5 && <span className="badge badge-stock">{t("productCard.lowStock")}</span>}

                    <div>
                      <p className="brand">{product.brandName}</p>
                      <p className="name">{product.name}</p>
                      <p className="description">{product.description}</p>
                    </div>

                    <div className="bottom-info">
                      <p className="price">{formatCurrency(product.price)}</p>
                      <p className="sold-stock">
                        {t("productCard.sold")}: {product.total_sold || 0}{" "}
                      </p>
                    </div>
                    <Rate disabled allowHalf value={product.avgReview || 0} />
                  </div>
                </div>
              </PLS.ProductItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </PLS.SwiperSlideWrap>
    </motion.div>
  );
}
