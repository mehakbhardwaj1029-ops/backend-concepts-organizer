import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import {
  fetchTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from "../api/topicapi.js";

const Home = () => {
  const navigate = useNavigate();

  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const loadTopics = async () => {
      try {
        const data = await fetchTopics();
        setPanels(data);
      } catch (err) {
        console.error("Failed to fetch topics", err);
      } finally {
        setLoading(false);
      }
    };

    loadTopics();
  }, []);

 
  const addPanel = async () => {
    try {
      const newTopic = await createTopic();
      setPanels((prev) => [...prev, newTopic]);
    } catch (err) {
      console.error("Failed to create topic", err);
    }
  };

  const updateTitle = async (id, newTitle) => {
    setPanels((prev) =>
      prev.map((panel) =>
        panel.id === id ? { ...panel, name: newTitle } : panel
      )
    );

    try {
      await updateTopic(id, { name: newTitle });
    } catch (err) {
      console.error("Failed to update title", err);
    }
  };

  const handleDelete = async (id) => {
    const backup = panels;
    setPanels((prev) => prev.filter((panel) => panel.id !== id));

    try {
      await deleteTopic(id);
    } catch (err) {
      console.error("Delete failed", err);
      setPanels(backup);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#122220]">
        Loading topics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#122220] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-48 -left-48 h-96 w-96 rounded-full bg-[#E08A2E]/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-48 h-96 w-96 rounded-full bg-[#E08A2E]/5 blur-[140px]" />
      </div>

      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={addPanel}
          className="
            px-6 py-3 text-lg font-semibold
            text-[#E08A2E]
            bg-[#122220]
            border border-[rgba(224,138,46,0.4)]
            rounded-xl
            shadow-[0_0_25px_rgba(224,138,46,0.15)]
            hover:bg-[rgba(224,138,46,0.08)]
            transition-all duration-300
          "
        >
          +
        </button>
      </div>

      {/* Content */}
      <div className="relative pt-24 flex flex-col items-center gap-6">
        {panels.map((panel) => (
          <div
            key={panel.id}
            className="
              w-[1120px] h-16
              flex items-center px-6
              rounded-xl
              bg-[#122220]
              border border-[rgba(224,138,46,0.25)]
              shadow-[0_10px_35px_rgba(0,0,0,0.7)]
              hover:border-[rgba(224,138,46,0.5)]
              hover:-translate-y-[2px]
              transition-all duration-300
            "
          >
            {/* Title */}
            <input
              value={panel.name || ""}
              onChange={(e) => updateTitle(panel.id, e.target.value)}
              placeholder="Untitled topic"
              className="
                bg-transparent
                text-[#F5F5F5]
                text-lg
                font-medium
                outline-none
                border-b border-transparent
                focus:border-[#E08A2E]
                placeholder-[rgba(245,245,245,0.5)]
                w-[55%]
              "
            />

            {/* Actions */}
            <div className="ml-auto flex items-center gap-3">
              <button
                onClick={() => navigate(`/code/${panel.id}`)}
                className="
                  px-4 py-1.5 text-sm
                  text-[#E08A2E]
                  border border-[rgba(224,138,46,0.4)]
                  rounded-md
                  hover:bg-[rgba(224,138,46,0.12)]
                  transition-all
                "
              >
                Code
              </button>

              <button
                onClick={() => navigate(`/docs/${panel.id}`)}
                className="
                  px-4 py-1.5 text-sm
                  text-[#E08A2E]
                  border border-[rgba(224,138,46,0.4)]
                  rounded-md
                  hover:bg-[rgba(224,138,46,0.12)]
                  transition-all
                "
              >
                Docs
              </button>

              <button
                onClick={() => handleDelete(panel.id)}
                className="
                  p-2
                  text-[rgba(245,245,245,0.6)]
                  hover:text-red-400
                  hover:bg-red-500/10
                  rounded-md
                  transition-all
                "
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
