import { NotificationButton } from "@ui-components/notification/notificationButton";
import { useRealDateTime } from "@/appUI/hooks/useRealDateTime";
import { AppContext } from "@/appUI/stores/contexts/app";
import { Space, Tooltip } from "antd";
import { useContext } from "react";

export default function WindowBottomBar() {

  const { state } = useContext(AppContext)
  const { RealDate, RealTime } = useRealDateTime()

  return (
    <>
      <footer className={"--window-bottom-bar m-0 p-0"}>
        <Space
          size={'large'}
          direction="horizontal"
          className={'flex items-center justify-end px-1'}
        >
          {
            /* ACTIVITY INDICATOR */
            state.activityOnGoing.onGoing && (
              <Tooltip title={state.activityOnGoing.reason}>
                <span className={'--icon --icon-spin3 --spin'}></span>
              </Tooltip>
            )
          }
          {/* NOTIFICATION */}
          <NotificationButton />
          {/* DATE AND TIME */}
          <Space direction="horizontal">
            <RealDate />
            <RealTime />
          </Space>
        </Space>
      </footer>
    </>
  );
}
