"use client";

import { commentsPlugin } from "@/components/editor/plugins/comments-plugin";
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
import { SlateEditor } from "@udecode/plate-common";
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
import { deserializeMd } from "@udecode/plate-markdown";
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
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import remarkEmoji from "remark-emoji";
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
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const defaultContent = `# Welcome to the Markdown Editor
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





This is a **live demo** of MDXEditor with all default features on.

> The overriding design goal for Markdown’s formatting syntax is to make it as readable as possible.
> The idea is that a Markdown-formatted document should be publishable as-is, as plain text,
> without looking like it’s been marked up with tags or formatting instructions.

[— Daring Fireball](https://daringfireball.net/projects/markdown/).

In here, you can find the following markdown elements:

* Headings
* Lists
  * Unordered
  * Ordered
  * Check lists
  * And nested ;)
* Links
* Bold/Italic/Underline formatting
* Tables
* Code block editors
* And much more.


`;

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState("");
  const [pages, setPages] = useState<PageContent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editorContent, setEditorContent] = useState("");
  // Add ref to track initial content processing
  const initialContentProcessedRef = useRef(false);
  const initializedRef = useRef(false);
  const processingRef = useRef(false);
  const pagesRef = useRef<PageContent[]>([]);
  const lastProcessedContentRef = useRef("");

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

  useEffect(() => {
    if (!initialContentProcessedRef.current && editor?.api?.markdown) {
      initialContentProcessedRef.current = true;
      processContent(defaultContent, true);
    }
  }, [editor?.api?.markdown]);

  const splitContentIntoPages = useCallback((markdownContent: string) => {
    const MAX_LENGTH = 500;
    const newPages: PageContent[] = [];
    let currentPageContent = "";
    let currentPageNumber = 1;

    // First try to split by main headers
    const mainSections = markdownContent.split(/(?=# (?!#))/g).filter(Boolean);

    if (mainSections.length > 1) {
      // If we have header-based sections, use them as primary split points
      mainSections.forEach((section) => {
        if (
          (currentPageContent + section).length > MAX_LENGTH &&
          currentPageContent
        ) {
          newPages.push({
            content: currentPageContent.trim(),
            pageNumber: currentPageNumber++,
          });
          currentPageContent = section;
        } else {
          currentPageContent += section;
        }
      });
    } else {
      // If no headers or just one section, split by paragraphs
      const paragraphs = markdownContent.split(/\n\n+/).filter(Boolean);

      paragraphs.forEach((paragraph) => {
        // Handle special cases like code blocks
        const isCodeBlock = paragraph.startsWith("```");
        const isList = paragraph.match(/^[-*+]\s|^\d+\.\s/m);
        const shouldKeepTogether = isCodeBlock || isList;

        if (shouldKeepTogether) {
          // If this is a code block or list, try to keep it together on one page
          if (
            currentPageContent &&
            (currentPageContent + paragraph).length > MAX_LENGTH
          ) {
            newPages.push({
              content: currentPageContent.trim(),
              pageNumber: currentPageNumber++,
            });
            currentPageContent = paragraph;
          } else {
            currentPageContent +=
              (currentPageContent ? "\n\n" : "") + paragraph;
          }
        } else {
          // Regular paragraph handling
          if (
            (currentPageContent + paragraph).length > MAX_LENGTH &&
            currentPageContent
          ) {
            // Check if paragraph itself is too long
            if (paragraph.length > MAX_LENGTH) {
              // Split long paragraph at sentence boundaries or by length
              const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [
                paragraph,
              ];
              sentences.forEach((sentence) => {
                if (
                  (currentPageContent + sentence).length > MAX_LENGTH &&
                  currentPageContent
                ) {
                  newPages.push({
                    content: currentPageContent.trim(),
                    pageNumber: currentPageNumber++,
                  });
                  currentPageContent = sentence;
                } else {
                  currentPageContent +=
                    (currentPageContent ? " " : "") + sentence;
                }
              });
            } else {
              // Normal paragraph
              newPages.push({
                content: currentPageContent.trim(),
                pageNumber: currentPageNumber++,
              });
              currentPageContent = paragraph;
            }
          } else {
            currentPageContent +=
              (currentPageContent ? "\n\n" : "") + paragraph;
          }
        }
      });
    }

    // Add the last page if there's content
    if (currentPageContent) {
      newPages.push({
        content: currentPageContent.trim(),
        pageNumber: currentPageNumber,
      });
    }

    // Ensure we have at least one page
    if (newPages.length === 0 && markdownContent.trim()) {
      newPages.push({
        content: markdownContent.trim(),
        pageNumber: 1,
      });
    }

    return newPages;
  }, []);

  // Process content with improved splitting
  const processContent = useCallback(
    (markdownContent: string, force = false) => {
      if (
        processingRef.current ||
        (!force && lastProcessedContentRef.current === markdownContent)
      ) {
        return;
      }

      processingRef.current = true;

      try {
        // Split content into pages
        const newPages = splitContentIntoPages(markdownContent);

        // Validate pages
        if (newPages.length === 0 && markdownContent.trim()) {
          newPages.push({
            content: markdownContent.trim(),
            pageNumber: 1,
          });
        }

        // Debug log each page's content
        console.log(
          "Page contents:",
          newPages.map((page) => ({
            pageNumber: page.pageNumber,
            contentPreview: page.content.substring(0, 50) + "...",
            length: page.content.length,
          }))
        );

        // Update state and refs
        pagesRef.current = newPages;
        lastProcessedContentRef.current = markdownContent;
        setPages(newPages);

        // Set initial content if needed
        if (!initializedRef.current && newPages.length > 0) {
          setEditorContent(newPages[0].content);
          initializedRef.current = true;
        }

        console.log("Content processed:", {
          totalPages: newPages.length,
          currentPage,
          sections: newPages.length,
        });
      } catch (error) {
        console.error("Error processing content:", error);
      } finally {
        processingRef.current = false;
      }
    },
    [currentPage, splitContentIntoPages]
  );

  // Handle initial content setting
  useEffect(() => {
    if (
      !editor?.api?.markdown ||
      processingRef.current ||
      initializedRef.current
    )
      return;

    const markdownContent = editor.api.markdown.serialize();
    if (
      markdownContent &&
      markdownContent !== lastProcessedContentRef.current
    ) {
      setContent(markdownContent);
      processContent(markdownContent, true);
    }
  }, [editor?.children, processContent]);

  // Handle page navigation
  useEffect(() => {
    if (!pagesRef.current.length) return;

    const pageData = pagesRef.current.find((p) => p.pageNumber === currentPage);
    if (!pageData) return;

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
    setCurrentPage,
    handleNextPage,
    handlePrevPage,
    setContent: useCallback(
      (newContent: string) => {
        // Update only the current page's content
        if (pagesRef.current.length > 0) {
          const updatedPages = pagesRef.current.map((page) => {
            if (page.pageNumber === currentPage) {
              return {
                ...page,
                content: newContent,
              };
            }
            return page;
          });

          // Update pages state and ref
          pagesRef.current = updatedPages;
          setPages(updatedPages);

          // Update editor content
          if (editor && editor.api?.markdown) {
            editor.children = editor.api.markdown.deserialize(newContent);
            editor.onChange();
          }

          // Update current page content
          setEditorContent(newContent);

          // Update the overall content by joining all pages
          const fullContent = updatedPages
            .sort((a, b) => a.pageNumber - b.pageNumber)
            .map((page) => page.content)
            .join("\n\n");

          console.log({
            fullContent,
          });

          setContent(fullContent);
        } else {
          // If no pages exist, process the content normally
          processContent(newContent, true);
        }
      },
      [currentPage, editor, processContent]
    ),
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
