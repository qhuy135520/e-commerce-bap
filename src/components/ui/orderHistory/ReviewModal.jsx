import { useState } from "react";
import { Modal, Rate, Input, Button, Typography, Space, Divider } from "antd";
import { formatCurrency } from "@/utils/helpers";

const { TextArea } = Input;
const { Title, Text } = Typography;

export default function ReviewModal({ visible, onCancel, onSubmit, product, loading }) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!rating || !content.trim()) return;
    onSubmit({ rating, comment: content, product });
    onCancel();
  };

  return (
    <Modal title={null} open={visible} onCancel={onCancel} footer={null} centered width={600} destroyOnClose>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <Title level={4} style={{ marginBottom: "0.5rem" }}>
          Viết đánh giá của bạn
        </Title>
        <Text type="secondary">Chia sẻ trải nghiệm để giúp người khác</Text>
      </div>

      <Divider />

      {product && (
        <Space style={{ marginBottom: "1.5rem", width: "100%" }} align="start">
          <img
            src={product.productImg}
            alt={product.productName}
            style={{
              width: 60,
              height: 60,
              objectFit: "cover",
              borderRadius: 8,
              border: "1px solid #f0f0f0",
            }}
          />
          <div>
            <Text strong>{product.productName}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: "0.9rem" }}>
              Số lượng: x{product.quantity}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: "0.9rem" }}>
              Giá: {formatCurrency(product.price)}
            </Text>
          </div>
        </Space>
      )}

      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <Rate value={rating} onChange={setRating} style={{ fontSize: 28, color: "#faad14" }} />
        <div style={{ marginTop: 8 }}>
          <Text>{rating ? `Bạn đã chọn ${rating} sao` : "Chọn số sao"}</Text>
        </div>
      </div>

      <TextArea
        rows={5}
        placeholder="Chia sẻ cảm nhận về sản phẩm..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ marginBottom: "1.5rem" }}
      />

      <div style={{ textAlign: "right" }}>
        <Space>
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" onClick={handleSubmit} disabled={!rating || !content.trim()} loading={loading}>
            Gửi đánh giá
          </Button>
        </Space>
      </div>
    </Modal>
  );
}
