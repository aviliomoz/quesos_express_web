"use client";

import { Bell, Circle } from "lucide-react";
import { useEffect, useState } from "react";

type Notification = {
  id: string;
  description: string;
  read: boolean;
};

const notifications_example: Notification[] = [
  {
    id: "1",
    description: "First notification",
    read: true,
  },
  {
    id: "2",
    description: "Second notification",
    read: true,
  },
];

export function NotificationsWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getUnreadNotifications = async () => {
    return notifications_example;
  };

  useEffect(() => {
    getUnreadNotifications().then(setNotifications);
  }, []);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="border shadow-sm rounded-md w-8 h-8 min-w-8 flex justify-center items-center relative"
    >
      <Bell className="w-4 stroke-zinc-700" />
      <Circle className="absolute -top-1 right-2 w-2 stroke-orange-500 fill-orange-500" />
      <div
        className={`absolute top-full mt-2 right-0 p-4 border rounded-md bg-white min-w-max -translate-y-2 opacity-0 transition-all duration-200 ease-in-out invisible ${
          isOpen && "!visible !translate-y-0 opacity-100"
        }`}
      >
        <h5 className="font-medium text-xs text-left">Notifications</h5>
      </div>
    </button>
  );
}
