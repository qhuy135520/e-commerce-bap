import { ConfigProvider, Divider } from "antd";

function DividerTitle({ title }) {
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
      <Divider>{title}</Divider>
    </ConfigProvider>
  );
}

export default DividerTitle;
