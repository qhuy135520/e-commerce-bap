import { ConfigProvider, Divider } from "antd";

function DividerTitle({ title, type = "horizontal" }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: "var(--color-grey-500)",
          fontSize: "1.4rem",
          colorSplit: "var(--color-grey-400)",
        },
      }}
    >
      <Divider type={type}>{title}</Divider>
    </ConfigProvider>
  );
}

export default DividerTitle;
