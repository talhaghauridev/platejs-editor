"use client";

import React from "react";
import { MessageSquareIcon } from "lucide-react";
import { useCommentAddButton } from "@udecode/plate-comments/react";

import { ToolbarButton } from "./toolbar";

export function CommentToolbarButton() {
  const { props } = useCommentAddButton();

  return (
    <ToolbarButton tooltip="Add comment (⌘+⇧+M)" {...props}>
      <MessageSquareIcon className="h-5 w-5" />
    </ToolbarButton>
  );
}
