import { useNavigate } from "react-router-dom";
import { Button, ConfigProvider, Result } from "antd";

export default function Error({ message = "There are some problems with your operation." }) {
  const navigate = useNavigate();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: "var(--color-grey-900)",
        },
      }}
    >
      <Result
        status="warning"
        title={message}
        extra={
          <Button type="primary" key="console" onClick={() => navigate("/")}>
            Return Dashboard
          </Button>
        }
      />
    </ConfigProvider>
  );
}
