import "./style.css";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { INotification } from "../../../interfaces/INotification";
import {
  useNotifications,
  useMarkNotificationAsRead,
  useDeleteNotification,
} from "../../../services/notifications/notification.queries";

function Notification() {
  const { data: notifications = [], isLoading } = useNotifications();
  const markAsRead = useMarkNotificationAsRead();
  const deleteNotification = useDeleteNotification();

  const handleNotificationClick = async (notification: INotification) => {
    if (!notification.status) {
      try {
        await markAsRead.mutateAsync(notification.id);
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }
  };

  const handleDeleteNotification = async (
    notificationId: number,
    event: React.MouseEvent
  ) => {
    event.stopPropagation(); // Prevent triggering the click handler
    try {
      await deleteNotification.mutateAsync(notificationId);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "payment":
        return <PaymentIcon />;
      case "account":
        return <AccountBalanceIcon />;
      case "mall":
        return <LocalMallIcon />;
      case "cart":
        return <ShoppingCartIcon />;
      default:
        return <PaymentIcon />;
    }
  };

  if (isLoading) {
    return (
      <main className="mt-16 ml-16">
        <div className="text-center">
          <p className="text-2xl">Loading notifications...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mt-16 ml-16">
      <div className="grid">
        <p className="text-center text-3xl text-blue-500 my-2 font-bold rounded-xl">
          Notification
        </p>
        <div className="bg-blue-300 py-5 px-10 rounded-xl">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-600">No notifications found</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`grid bg-gray-200 p-5 rounded-xl lg:grid-cols-8 md:grid-cols-5 my-2 cursor-pointer hover:bg-gray-300 transition-colors ${
                  !notification.status ? "border-l-4 border-blue-500" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="lg:col-span-1">
                  <div className="w-12 h-12 rounded-full bg-white flex align-middle justify-center items-center">
                    {getNotificationIcon(notification.user)}
                  </div>
                </div>
                <div className="lg:col-span-6 md:col-span-4">
                  <p className="font-bold">{notification.user}</p>
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-sm">
                    {new Date(notification.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="lg:col-span-1 flex items-center justify-end">
                  <button
                    onClick={(e) =>
                      handleDeleteNotification(notification.id, e)
                    }
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default Notification;
