"use client";

import { createPlatePlugin } from "@udecode/plate-common/react";

// We don't need to render the toolbar here anymore since it's in the layout
export const FixedToolbarPlugin = createPlatePlugin({
  key: "fixed-toolbar",
});
