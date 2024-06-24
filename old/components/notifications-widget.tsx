import { Bell } from "lucide-react";
import { Widget } from "./widget";

export function NotificationsWidget() {
  return (
    <Widget icon={Bell} badge>
      <p>Notifications</p>
    </Widget>
  );
}
