"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useEffect } from "react"; // 1. Import useEffect

interface BlogEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  const editor = useEditor({
    immediatelyRender: false, // Recommended for Next.js to avoid hydration mismatch
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Image.configure({
        allowBase64: false,
        inline: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
    ],
    content: value, // Sets initial content
    onUpdate({ editor }) {
      // 2. Only call onChange, do not force update back immediately to avoid loops
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[350px] px-4 py-3",
      },
    },
  });

  // 3. FIX: Sync the editor content when the 'value' prop changes externally (e.g. via AI)
  useEffect(() => {
    if (!editor) return;

    // Check if the current editor content is different from the prop value
    // This prevents the cursor from jumping to the start if you are just typing
    if (editor.getHTML() !== value) {
      // If the value is empty, clear the editor, otherwise set the new HTML content
      if (value === "" || value === "<p></p>") {
        editor.commands.clearContent();
      } else {
        // 'emitUpdate: false' prevents the onUpdate loop from firing back
        editor.commands.setContent(value, { emitUpdate: false }); 
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

      try {
        // Ensure you have a loader or toast here in a real app
        const url = await uploadToCloudinary(file);
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      } catch (error) {
        console.error("Image upload failed", error);
      }
    };
  };

  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded-xl bg-white text-black overflow-hidden shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b border-gray-100 p-2 bg-gray-50 rounded-t-xl text-black sticky top-0 z-10">
        <button 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 font-bold' : ''}`}
        >
          H1
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 font-bold' : ''}`}
        >
          H2
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 font-bold' : ''}`}
        >
          H3
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded hover:bg-gray-200 font-bold ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded hover:bg-gray-200 italic ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}>I</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-1.5 rounded hover:bg-gray-200 underline ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}>U</button>
        
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}>• List</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}>1. List</button>

        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

        <button
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200 text-blue-600' : ''}`}
        >
          Link
        </button>

        <button onClick={addImage} className="p-1.5 rounded hover:bg-gray-200">Image</button>

        <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="ml-auto text-xs text-red-500 hover:bg-red-50 px-2 rounded">
          Clear Format
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}