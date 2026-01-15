import Editor from "@monaco-editor/react";
import { Copy, Check, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopicById, updateTopic } from "../api/topicapi";

const Code = () => {
  const { id } = useParams();

  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadTopic = async () => {
      try {
        const topic = await getTopicById(id);
        setCode(topic.code || "");
      } catch (err) {
        console.error("Failed to load code", err);
      }
    };

    loadTopic();
  }, [id]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSave = async () => {
    if (saving) return;

    setSaving(true);
    setSaved(false);

    try {
      await updateTopic(id, { code });
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch (err) {
      console.error("Failed to save code", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-6">
      <div className="relative w-full max-w-[1400px] h-[90vh] rounded-xl border border-white/20 shadow-2xl overflow-hidden">
        <div className="absolute top-4 right-6 z-10 flex gap-3">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition active:scale-95"
          >
            {copied ? (
              <Check size={20} className="text-white" />
            ) : (
              <Copy size={20} className="text-white" />
            )}
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition active:scale-95 disabled:opacity-50"
          >
            {saved ? (
              <Check size={20} className="text-white" />
            ) : (
              <Save size={20} className="text-white" />
            )}
          </button>
        </div>

        <Editor
          height="100%"
          language="java"
          value={code}
          onChange={(v) => setCode(v || "")}
          theme="vs-dark"
        />
      </div>
    </div>
  );
};

export default Code;
