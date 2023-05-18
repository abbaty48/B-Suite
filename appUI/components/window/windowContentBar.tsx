import { AppRouter } from "@/appUI/pages/page.router";

export default function WindowContentBar() {
  return (
    <div className="--window-content-bar relative overflow-auto flex-1">
      <AppRouter />
    </div>
  );
}
