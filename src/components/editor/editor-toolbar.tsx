"use client";

import React from "react";
import { RovingFocusGroup } from "@radix-ui/react-roving-focus";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { Toolbar } from "@/components/plate-ui/toolbar";

export function EditorToolbar() {
  return (
    <Toolbar>
      <RovingFocusGroup asChild loop>
        <div className="relative flex w-full items-center">
          <FixedToolbarButtons />
        </div>
      </RovingFocusGroup>
    </Toolbar>
  );
}
