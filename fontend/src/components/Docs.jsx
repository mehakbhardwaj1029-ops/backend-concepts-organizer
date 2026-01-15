import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Check } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTopicById, updateTopic } from "../api/topicapi";

const Docs = () => {
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none text-white " +
          "prose-p:text-white prose-headings:text-white prose-strong:text-white " +
          "prose-code:text-emerald-400 prose-pre:bg-black prose-pre:border prose-pre:border-white/10",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const loadDocs = async () => {
      const topic = await getTopicById(id);
      editor.commands.setContent(topic.docs || "");
    };

    loadDocs();
  }, [editor, id]);

  if (!editor) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateTopic(id, { docs: editor.getHTML() });
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="h-[calc(100vh-3rem)] rounded-xl border border-white/10 bg-[#0f0f0f] overflow-hidden">

        <div className="flex justify-between px-4 py-3 border-b border-white/10">
          <div className="flex gap-2">
            <button onClick={() => editor.chain().focus().toggleBold().run()} className="editor-btn">B</button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className="editor-btn">I</button>
            <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="editor-btn">U</button>
            <button onClick={() => editor.chain().focus().toggleCode().run()} className="editor-btn">{`</>`}</button>
            <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className="editor-btn">Code</button>
          </div>

          <button onClick={handleSave} className="editor-btn flex items-center gap-2">
            <Check size={14} /> {saved ? "Saved" : "Save"}
          </button>
        </div>

        <div className="h-full px-12 py-10 overflow-y-auto">
          <EditorContent editor={editor} />
        </div>
      </div>

      <style>{`
        .editor-btn {
          padding: 0.35rem 0.6rem;
          font-size: 0.85rem;
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 4px;
          background: transparent;
        }
        .editor-btn:hover {
          background: rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
};

export default Docs;
