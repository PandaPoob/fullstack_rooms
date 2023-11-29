"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FetchNotification } from "@/app/_models/notifications";
import Link from "next/link";
import { formatDate } from "@/app/_utils/helpers/date";

function NotificationList() {
  const [notifications, setNotifications] = useState<FetchNotification[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLatePage, setIsLastPage] = useState(true);

  const { data: session, update } = useSession();

  const fetchNotifications = async (no: number) => {
    const resp = await fetch(`/api/notifications?pageNumber=${no}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session!.token.sub}`,
      },
    });
    if (resp.ok) {
      const data = await resp.json();
      setNotifications(data.notifications);

      if (!data.hasNextPage) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
      const unRead = data.notifications.filter(
        (n: FetchNotification) => !n.read
      );
      if (unRead.length !== 0) {
        updateNotifications(unRead, no);
      }
    } else {
      console.log("Error fetching notifications");
    }
  };

  const updateNotifications = async (
    unRead: FetchNotification[],
    no: number
  ) => {
    const resp = await fetch(`/api/notifications`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session!.token.sub}`,
      },
      body: JSON.stringify({ unreadNotifications: unRead }),
    });

    if (resp.ok) {
      const data = await resp.json();
      update({ unreadNotifications: data.unreadNotifications });
      fetchNotifications(no);
    } else {
      console.log("Error occurred while updating notifications");
    }
  };

  useEffect(() => {
    if (session && notifications.length === 0) {
      fetchNotifications(pageNo);
    }
    //if a new notifications happens while on the page then refetch data
    const unRead = notifications.filter((n: FetchNotification) => !n.read);
    if (session?.user.unreadNotifications !== unRead.length) {
      fetchNotifications(pageNo);
    }
  }, [session]);

  const handlePagnation = (controller: string) => {
    if (controller == "next") {
      fetchNotifications(pageNo + 1);

      setPageNo(pageNo + 1);
    } else if (controller === "back") {
      fetchNotifications(pageNo - 1);

      setPageNo(pageNo - 1);
    }
  };

  return (
    <div>
      <div className="flex flex-col max-w-3xl gap-3">
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => handlePagnation("back")}
            disabled={pageNo === 1 ? true : false}
            aria-label="Back"
            className="stroke-white p-2 rounded-md disabled:opacity-50  enabled:hover:bg-primary enabled:hover:bg-opacity-50 transition"
          >
            <svg
              width="27"
              height="14"
              viewBox="0 0 27 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26 7.24H0.999999M0.999999 7.24L8.69231 1M0.999999 7.24L8.69231 13"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            onClick={() => handlePagnation("next")}
            disabled={isLatePage}
            aria-label="Next"
            className="stroke-white p-2 rounded-md disabled:opacity-50 enabled:hover:bg-primary enabled:hover:bg-opacity-50 transition"
          >
            <svg
              width="27"
              height="14"
              viewBox="0 0 27 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180"
            >
              <path
                d="M26 7.24H0.999999M0.999999 7.24L8.69231 1M0.999999 7.24L8.69231 13"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <ul className="grid gap-3">
          {notifications.length > 0 &&
            notifications.map((n) => {
              let article;
              switch (n.meta_action) {
                case "created":
                  article = "a new";
                  break;
                case "deleted":
                case "edited":
                  article = "the";
                  break;
                default:
                  article = "the";
              }
              const formattedDate = formatDate(n.created_at);

              return (
                <li
                  key={n.id}
                  className={`grid py-3 px-5 bg-primary rounded-2xl gap-3 ${
                    n.read && "bg-opacity-50"
                  }`}
                >
                  <span className="lowercase text-xs md:text-sm text-darkGrey">
                    {formattedDate}
                  </span>
                  <span className="text-h5 md:text-h4 text-white pb-3">
                    <span className="font-medium">
                      {n.meta_user.first_name} {n.meta_user.last_name}{" "}
                    </span>
                    {n.meta_action} {article} {n.meta_target}{" "}
                    {n.meta_link ? (
                      <Link
                        className="font-medium text-link"
                        href={n.meta_link}
                      >
                        {n.meta_target_name}
                      </Link>
                    ) : (
                      <span className="font-medium">{n.meta_target_name}</span>
                    )}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default NotificationList;
