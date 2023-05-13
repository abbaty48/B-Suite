import { Space } from "antd";

export default function WindowBottomBar() {
  return (
    <>
      <footer className={"--window-bottom-bar m-0 p-0"}>
        <Space
          size={'large'}
          direction="horizontal"
          className={'flex items-center justify-end py-2 px-2'}
        >
        </Space>
      </footer>
    </>
  );
}
