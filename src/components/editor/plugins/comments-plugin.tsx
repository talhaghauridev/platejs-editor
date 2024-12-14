"use client";

import { CommentsPlugin } from "@udecode/plate-comments/react";

import { CommentsPopover } from "@/components/plate-ui/comments-popover";

export const commentsPlugin = CommentsPlugin.configure({
  options: {
    myUserId: "1",
    users: {
      "1": {
        id: "1",
        name: "User 1",
        avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
      },
      "2": {
        id: "2",
        name: "User 2",
        avatarUrl: "https://avatars.githubusercontent.com/u/2?v=4",
      },
    },
  },
  render: { afterEditable: CommentsPopover },
});
