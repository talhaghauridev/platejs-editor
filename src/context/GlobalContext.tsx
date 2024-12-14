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
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useCallback,
  useRef,
} from "react";
import { commentsPlugin } from "@/components/editor/plugins/comments-plugin";
interface PageContent {
  content: string;
  pageNumber: number;
}
interface GlobalContextType {
  content: string;
  setContent: (content: string) => void;
  handlePrevPage: () => void;
  pages: PageContent[];
  currentPageContent: string;
  totalPages: number;
  handleNextPage: () => void;
  currentPage: number;
  editor: any;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState("");
  const [pages, setPages] = useState<PageContent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editorContent, setEditorContent] = useState("");
  const contentRef = useRef(content);
  const pagesRef = useRef(pages);
  const isProcessingRef = useRef(false);
  const isNavigatingRef = useRef(false);
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

  // Split content into pages with stable logic
  const processContent = useCallback(
    (markdownContent: string) => {
      if (isProcessingRef.current || contentRef.current === markdownContent) {
        return;
      }

      isProcessingRef.current = true;
      contentRef.current = markdownContent;

      try {
        // Split content by headers
        const sections = markdownContent.split(/(?=# )/g).filter(Boolean);
        const newPages: PageContent[] = [];
        let currentContent = "";
        const MAX_LENGTH = 500;

        // Process sections into pages
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];

          // If adding this section would exceed MAX_LENGTH, create a new page
          if (
            (currentContent + section).length > MAX_LENGTH &&
            currentContent
          ) {
            newPages.push({
              content: currentContent.trim(),
              pageNumber: newPages.length + 1,
            });
            currentContent = section;
          } else {
            currentContent += section;
          }

          // Add remaining content as the last page
          if (i === sections.length - 1 && currentContent) {
            newPages.push({
              content: currentContent.trim(),
              pageNumber: newPages.length + 1,
            });
          }
        }

        // Ensure at least one page exists
        if (newPages.length === 0 && markdownContent.trim()) {
          newPages.push({
            content: markdownContent.trim(),
            pageNumber: 1,
          });
        }

        // Update pages state and ref
        pagesRef.current = newPages;
        setPages(newPages);

        // Set initial page content if needed
        if (!editorContent && newPages.length > 0) {
          setEditorContent(newPages[0].content);
        }

        console.log("Content processed:", {
          totalPages: newPages.length,
          currentPage,
          sections: sections.length,
        });
      } catch (error) {
        console.error("Error processing content:", error);
      } finally {
        isProcessingRef.current = false;
      }
    },
    [editorContent]
  );

  // Handle editor content changes
  useEffect(() => {
    if (!editor?.api?.markdown || isNavigatingRef.current) return;

    const markdownContent = editor.api.markdown.serialize();
    if (markdownContent !== contentRef.current) {
      setContent(markdownContent);
      processContent(markdownContent);
    }
  }, [editor?.children, processContent]);

  // Update editor content when page changes
  useEffect(() => {
    if (!pagesRef.current.length || isProcessingRef.current) return;

    const pageData = pagesRef.current.find((p) => p.pageNumber === currentPage);
    if (!pageData) {
      console.warn("Invalid page:", currentPage);
      return;
    }

    isNavigatingRef.current = true;

    try {
      if (editor) {
        const newContent = deserializeMd(editor, pageData.content, {
          processor(processor) {
            return processor.use(remarkEmoji) as any;
          },
        });

        editor.children = newContent;
        editor.onChange();
        setEditorContent(pageData.content);
      }
    } catch (error) {
      console.error("Error updating page:", error);
    } finally {
      isNavigatingRef.current = false;
    }
  }, [currentPage, editor]);

  const handleNextPage = useCallback(() => {
    if (currentPage < pagesRef.current.length) {
      setCurrentPage((prev) => {
        const nextPage = prev + 1;
        console.log("Next page:", {
          current: prev,
          next: nextPage,
          total: pagesRef.current.length,
        });
        return nextPage;
      });
    }
  }, [currentPage]);
  console.log({
    pages,
  });

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => {
        const nextPage = prev - 1;
        console.log("Previous page:", {
          current: prev,
          next: nextPage,
          total: pagesRef.current.length,
        });
        return nextPage;
      });
    }
  }, [currentPage]);

  const contextValue = {
    content,
    editor,
    pages: pagesRef.current,
    currentPage,
    currentPageContent: editorContent,
    totalPages: pagesRef.current.length,
    handleNextPage,
    handlePrevPage,
    setContent,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
}
