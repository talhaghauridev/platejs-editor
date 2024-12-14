"use client";
import { EditorToolbar } from "@/components/editor/editor-toolbar";
import { SettingsDialog } from "@/components/editor/settings";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";
import { useGlobalContext } from "@/context/GlobalContext";
import { Plate } from "@udecode/plate-common/react";
import { ArrowDownToDot } from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const markdown = `# Welcome to the Markdown Editor
## Features
- **Bold text** and *italic text*
- Lists and checkboxes
  - [x] First task completed
  - [ ] Second task pending
- Code blocks

### Code Example
\`\`\`javascript
function hello() {
  console.log("Hello World!");
}
\`\`\`

> This is a blockquote with a [link](https://example.com)

1. Ordered lists
2. Are also supported
3. With multiple items

---

| Tables | Are | Cool |
|--------|-----|------|
| col 1  | col 2 | col 3 |
| data   | more | stuff |
# Welcome to the Markdown Editor
## Features
- **Bold text** and *italic text*
- Lists and checkboxes
  - [x] First task completed
  - [ ] Second task pending
- Code blocks

### Code Example
\`\`\`javascript
function hello() {
  console.log("Hello World!");
}
\`\`\`

> This is a blockquote with a [link](https://example.com)

1. Ordered lists
2. Are also supported
3. With multiple items

---

| Tables | Are | Cool |
|--------|-----|------|
| col 1  | col 2 | col 3 |
| data   | more | stuff |
# Welcome to the Markdown Editor
## Features
- **Bold text** and *italic text*
- Lists and checkboxes
  - [x] First task completed
  - [ ] Second task pending
- Code blocks

### Code Example
\`\`\`javascript
function hello() {
  console.log("Hello World!");
}
\`\`\`

> This is a blockquote with a [link](https://example.com)

1. Ordered lists
2. Are also supported
3. With multiple items

---

| Tables | Are | Cool |
|--------|-----|------|
| col 1  | col 2 | col 3 |
| data   | more | stuff |


`;

export function EditorLayout() {
  const { setContent, editor } = useGlobalContext();
  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        editor={editor}
        onValueChange={() => {
          if (editor?.api?.markdown) {
            const markdown = editor.api.markdown.serialize();
            // setContent(markdown);
            console.log("Full Markdown Content:", markdown);
          }
        }}
      >
        <div></div>
        {/* Top Toolbar Section */}
        <div className="max-w-fit mx-3">
          <div className="max-w-fit mx-auto rounded-3xl border-gray-200 bg-[#EDF2F8] py-[6px] px-3">
            <div className="relative overflow-auto">
              <EditorToolbar />
            </div>
          </div>
        </div>
        <div>Hello</div>
        {/* Editor Content Section */}
        <div className="flex-1 max-w-[800px] mx-auto w-full overflow-auto bg-gray-50">
          <div className="mx-auto max-w-full w-full bg-white min-h-full shadow-sm relative">
            {/* Sticky button container */}
            <div className="sticky top-4 flex justify-end px-4">
              <button
                onClick={() => {
                  // Set the content and force editor update
                  setContent(markdown);
                  editor.children = editor.api.markdown.deserialize(markdown);
                  editor.onChange();
                }}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
              >
                <ArrowDownToDot />
              </button>
            </div>

            <EditorContainer>
              <Editor variant="default" />
            </EditorContainer>
          </div>
        </div>

        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}
