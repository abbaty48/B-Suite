import WindowContent from "@ui-components/window/windowContent";
import WindowToolbar from "@ui-components/window/windowToolbar";
import WindowStatusBar from "@ui-components/window/windowStatusBar";

export default function Window() {

   return (
      <main
         className={
            "--window overflow-hidden h-screen flex flex-col justify-between min-h-screen"
         }
      >
         {/* LockScreen */}
         {/* ScreenSaver */}
         {/* WindowToolBar */}
         <WindowToolbar />
         {/* WindowContent */}
         <WindowContent />
         {/* WindowStatusBar */}
         <WindowStatusBar />
      </main>
   );
}
