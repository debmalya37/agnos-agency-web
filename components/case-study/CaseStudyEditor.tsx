"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useEffect } from "react"; // [NEW] Import useEffect
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  Heading1, Heading2, List, ImageIcon, Link as LinkIcon 
} from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface CaseStudyEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const ToolbarButton = ({ onClick, isActive, children }: any) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-md transition-colors ${
      isActive 
        ? "bg-blue-100 text-blue-600" 
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
    }`}
  >
    {children}
  </button>
);

export default function CaseStudyEditor({ value, onChange }: CaseStudyEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      TextStyle,
      Color,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-xl shadow-md my-6 border border-gray-100",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800",
        },
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none focus:outline-none min-h-[400px] px-8 py-6",
      },
    },
  });

  // [NEW] Sync editor content when the parent 'value' changes (e.g. from AI)
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
       // Avoid clearing if value is just empty paragraph tags
       if (value === "" || value === "<p></p>") {
         editor.commands.clearContent();
       } else {
         editor.commands.setContent(value, false);
       }
    }
  }, [value, editor]);

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file || !editor) return;
      const url = await uploadToCloudinary(file);
      editor.chain().focus().setImage({ src: url }).run();
    };
  };

  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  if (!editor) return null;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Modern Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 p-2 bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}><Bold size={18} /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}><Italic size={18} /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')}><UnderlineIcon size={18} /></ToolbarButton>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}><Heading1 size={18} /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })}><Heading2 size={18} /></ToolbarButton>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}><List size={18} /></ToolbarButton>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <ToolbarButton onClick={setLink} isActive={editor.isActive('link')}><LinkIcon size={18} /></ToolbarButton>
        <ToolbarButton onClick={addImage}><ImageIcon size={18} /></ToolbarButton>
      </div>

      {/* Content Area */}
      <EditorContent editor={editor} className="flex-1 cursor-text" />
    </div>
  );
}