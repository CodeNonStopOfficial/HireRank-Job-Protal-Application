"use client";

import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";

import {
  EditorContent,
  JSONContent,
  useEditor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

export function JsonToHtml({ json }: { json: JSONContent }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
    ],

    editable: false,
    content: json,
    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none",
      },
    },
  });

  return <EditorContent editor={editor} />;
}
