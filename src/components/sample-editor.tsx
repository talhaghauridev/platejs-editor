"use client";
import { withProps } from "@udecode/cn";
import { AIPlugin } from "@udecode/plate-ai/react";
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from "@udecode/plate-code-block/react";
import { CommentsPlugin } from "@udecode/plate-comments/react";
import {
  ParagraphPlugin,
  Plate,
  PlateLeaf,
  usePlateEditor,
} from "@udecode/plate-common/react";
import { DatePlugin } from "@udecode/plate-date/react";
import { EmojiInputPlugin } from "@udecode/plate-emoji/react";
import { ExcalidrawPlugin } from "@udecode/plate-excalidraw/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { TocPlugin } from "@udecode/plate-heading/react";
import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { ColumnItemPlugin, ColumnPlugin } from "@udecode/plate-layout/react";
import { LinkPlugin } from "@udecode/plate-link/react";
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
  VideoPlugin,
} from "@udecode/plate-media/react";
import {
  MentionInputPlugin,
  MentionPlugin,
} from "@udecode/plate-mention/react";
import { SlashInputPlugin } from "@udecode/plate-slash-command/react";
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from "@udecode/plate-table/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";

import { copilotPlugins } from "@/components/editor/plugins/copilot-plugins";
import { editorPlugins } from "@/components/editor/plugins/editor-plugins";
import { FixedToolbarPlugin } from "@/components/editor/plugins/fixed-toolbar-plugin";
import { FloatingToolbarPlugin } from "@/components/editor/plugins/floating-toolbar-plugin";
import { AILeaf } from "@/components/plate-ui/ai-leaf";
import { BlockquoteElement } from "@/components/plate-ui/blockquote-element";
import { CodeBlockElement } from "@/components/plate-ui/code-block-element";
import { CodeLeaf } from "@/components/plate-ui/code-leaf";
import { CodeLineElement } from "@/components/plate-ui/code-line-element";
import { CodeSyntaxLeaf } from "@/components/plate-ui/code-syntax-leaf";
import { ColumnElement } from "@/components/plate-ui/column-element";
import { ColumnGroupElement } from "@/components/plate-ui/column-group-element";
import { CommentLeaf } from "@/components/plate-ui/comment-leaf";
import { DateElement } from "@/components/plate-ui/date-element";
import { EmojiInputElement } from "@/components/plate-ui/emoji-input-element";
import { ExcalidrawElement } from "@/components/plate-ui/excalidraw-element";
import { HeadingElement } from "@/components/plate-ui/heading-element";
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf";
import { HrElement } from "@/components/plate-ui/hr-element";
import { ImageElement } from "@/components/plate-ui/image-element";
import { KbdLeaf } from "@/components/plate-ui/kbd-leaf";
import { LinkElement } from "@/components/plate-ui/link-element";
import { MediaAudioElement } from "@/components/plate-ui/media-audio-element";
import { MediaEmbedElement } from "@/components/plate-ui/media-embed-element";
import { MediaFileElement } from "@/components/plate-ui/media-file-element";
import { MediaPlaceholderElement } from "@/components/plate-ui/media-placeholder-element";
import { MediaVideoElement } from "@/components/plate-ui/media-video-element";
import { MentionElement } from "@/components/plate-ui/mention-element";
import { MentionInputElement } from "@/components/plate-ui/mention-input-element";
import { ParagraphElement } from "@/components/plate-ui/paragraph-element";
import { withPlaceholders } from "@/components/plate-ui/placeholder";
import { SlashInputElement } from "@/components/plate-ui/slash-input-element";
import {
  TableCellElement,
  TableCellHeaderElement,
} from "@/components/plate-ui/table-cell-element";
import { TableElement } from "@/components/plate-ui/table-element";
import { TableRowElement } from "@/components/plate-ui/table-row-element";
import { TocElement } from "@/components/plate-ui/toc-element";
import { ToggleElement } from "@/components/plate-ui/toggle-element";
import { withDraggables } from "@/components/plate-ui/with-draggables";
import { SlateEditor } from "@udecode/plate-common";
import { deserializeMd } from "@udecode/plate-markdown";
import remarkEmoji from "remark-emoji";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ArrowDownToDot } from "lucide-react";
import { Editor, EditorContainer } from "./plate-ui/editor";
import { SettingsDialog } from "./editor/settings";
import { commentsPlugin } from "./editor/plugins/comments-plugin";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { EditorToolbar } from "./editor/editor-toolbar";
import { useGlobalContext } from "@/context/GlobalContext";
type SampleEditorProps = {
  content?: string;
  newEditor?: any;
  isToolbar: boolean;
  handleIndex: () => void;
};

export function SampleEditor({
  content,
  newEditor,
  isToolbar,
  handleIndex,
}: SampleEditorProps) {
  const { currentPage, setContent } = useGlobalContext();
  const editor = usePlateEditor({
    override: {
      components: withDraggables(
        withPlaceholders({
          [AIPlugin.key]: AILeaf,
          [AudioPlugin.key]: MediaAudioElement,
          [BlockquotePlugin.key]: BlockquoteElement,
          [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
          [CodeBlockPlugin.key]: CodeBlockElement,
          [CodeLinePlugin.key]: CodeLineElement,
          [CodePlugin.key]: CodeLeaf,
          [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
          [ColumnItemPlugin.key]: ColumnElement,
          [ColumnPlugin.key]: ColumnGroupElement,
          [CommentsPlugin.key]: CommentLeaf,
          [DatePlugin.key]: DateElement,
          [EmojiInputPlugin.key]: EmojiInputElement,
          [ExcalidrawPlugin.key]: ExcalidrawElement,
          [FilePlugin.key]: MediaFileElement,
          [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
          [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
          [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
          [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
          [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: "h5" }),
          [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: "h6" }),
          [HighlightPlugin.key]: HighlightLeaf,
          [HorizontalRulePlugin.key]: HrElement,
          [ImagePlugin.key]: ImageElement,
          [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
          [KbdPlugin.key]: KbdLeaf,
          [LinkPlugin.key]: LinkElement,
          [MediaEmbedPlugin.key]: MediaEmbedElement,
          [MentionInputPlugin.key]: MentionInputElement,
          [MentionPlugin.key]: MentionElement,
          [ParagraphPlugin.key]: ParagraphElement,
          [PlaceholderPlugin.key]: MediaPlaceholderElement,
          [SlashInputPlugin.key]: SlashInputElement,
          [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
          [SubscriptPlugin.key]: withProps(PlateLeaf, { as: "sub" }),
          [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: "sup" }),
          [TableCellHeaderPlugin.key]: TableCellHeaderElement,
          [TableCellPlugin.key]: TableCellElement,
          [TablePlugin.key]: TableElement,
          [TableRowPlugin.key]: TableRowElement,
          [TocPlugin.key]: TocElement,
          [TogglePlugin.key]: ToggleElement,
          [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
          [VideoPlugin.key]: MediaVideoElement,
        })
      ),
    },
    plugins: [
      // ...copilotPlugins,
      ...editorPlugins,
      commentsPlugin,
      FixedToolbarPlugin,
      FloatingToolbarPlugin,
    ],
    value: (editor: SlateEditor) =>
      content
        ? deserializeMd(editor, content, {
            processor(processor) {
              return processor.use(remarkEmoji) as any;
            },
          })
        : undefined,
  });
  return (
    <Plate
      editor={newEditor ? newEditor : editor}
      onValueChange={() => {
        if (editor?.api?.markdown) {
          const markdown = editor.api.markdown.serialize();
          // setContent(markdown);
          console.log("Full Markdown Content:", markdown);
          console.log({ currentPage });
          setTimeout(() => {
            setContent(markdown);
          }, 1000);
        }
      }}
    >
      {isToolbar && (
        <div
          className="max-w-fit mx-3  top-0 left-0 bg-white z-50"
          style={{
            position: "absolute",
          }}
        >
          <div className="max-w-fit mx-auto rounded-3xl border-gray-200 bg-[#EDF2F8] py-[6px] px-3">
            <div className="relative overflow-auto">
              <EditorToolbar />
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 max-w-[800px] mx-auto w-full bg-white mt-5 border border-[#D8E2EE] rounded">
        <div
          className="mx-auto max-w-full w-full  min-h-full shadow-sm relative"
          onClick={handleIndex}
        >
          {/* Sticky button container */}
          {/* <div className="sticky top-4 flex justify-end px-4">
            <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors">
              <ArrowDownToDot />
            </button>
          </div> */}

          <EditorContainer>
            <Editor variant="default" className={"overflow-hidden"} />
          </EditorContainer>
        </div>
      </div>

      <SettingsDialog />
    </Plate>
  );
}
