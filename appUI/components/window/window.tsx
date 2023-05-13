import WindowToolbar from "@/appUI/components/window/windowTopBar";
import WindowContent from "@/appUI/components/window/windowContentBar";
import WindowStatusBar from "@/appUI/components/window/windowBottomBar";

export default function Window() {

   return (
      <main
         className={
            "--window overflow-hidden h-screen flex flex-col justify-between min-h-screen"
         }
      >
         {/* WindowToolBar */}
         <WindowToolbar />
         {/* WindowContent */}
         <WindowContent />
         {/* WindowStatusBar */}
         <WindowStatusBar />
      </main>
   );
}
