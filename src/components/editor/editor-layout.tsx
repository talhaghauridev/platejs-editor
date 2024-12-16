"use client";
import { EditorToolbar } from "@/components/editor/editor-toolbar";
import { SettingsDialog } from "@/components/editor/settings";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";
import { useGlobalContext } from "@/context/GlobalContext";
import { Plate } from "@udecode/plate-common/react";
import { ArrowDownToDot } from "lucide-react";
import { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SampleEditor } from "../sample-editor";
import { set } from "date-fns";
const markdown = `# Article Title

## Introduction

Start your article with a brief introduction.

## Main Section

Your main content goes here.

## Conclusion

Wrap up your article with a conclusion.`;

export function EditorLayout() {
  const { setContent, editor, pages, currentPage, setCurrentPage } =
    useGlobalContext();

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {pages.map((page, key) => (
          <SampleEditor
            key={key}
            content={page.content}
            isToolbar={page.pageNumber === currentPage}
            handleIndex={() => {
              setCurrentPage(page.pageNumber);
            }}
          />
        ))}
      </DndProvider>
    </>
  );
}
