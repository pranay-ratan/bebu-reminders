import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { TaskTemplates } from "./TaskTemplates";

interface TaskFormProps {
  isHorrorMode: boolean;
  onSuccess: () => void;
}

export function TaskForm({ isHorrorMode, onSuccess }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [category, setCategory] = useState("");

  const addTask = useMutation(api.tasks.addTask);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please add a title, sweetie! 💖");
      return;
    }

    try {
      const dueDateTimestamp = dueDate ? new Date(`${dueDate}T${dueTime || '23:59'}`).getTime() : undefined;
      
      await addTask({
        title: title.trim(),
        description: description.trim() || undefined,
        dueDate: dueDateTimestamp,
        dueTime: dueTime || undefined,
        priority,
        category: category.trim() || undefined,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setDueDate("");
      setDueTime("");
      setPriority("medium");
      setCategory("");

      toast.success(isHorrorMode ? "🎃 Spooky task added!" : "✨ Task added, Bebu!", {
        description: isHorrorMode ? "The ghosts will remind you! 👻" : "You're going to crush this! 💪💖"
      });
      
      onSuccess();
    } catch (error) {
      toast.error("Oops! Couldn't add the task, darling 😢");
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
    isHorrorMode
      ? 'bg-purple-900/50 border-red-600/50 text-red-100 placeholder-red-300/70 focus:border-red-400 focus:ring-red-400/50'
      : 'bg-transparent border-pink-300/60 text-gray-800 placeholder-gray-500 focus:border-pink-400 focus:ring-pink-400/50 backdrop-blur-sm'
  }`;

  const selectClass = `w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
    isHorrorMode
      ? 'bg-purple-900/50 border-red-600/50 text-red-100 focus:border-red-400 focus:ring-red-400/50'
      : 'bg-transparent border-pink-300/60 text-gray-800 focus:border-pink-400 focus:ring-pink-400/50 backdrop-blur-sm'
  }`;

  const handleTemplateSelect = (template: { title: string; description?: string; priority: "low" | "medium" | "high"; category?: string }) => {
    setTitle(template.title);
    setDescription(template.description || "");
    setPriority(template.priority);
    setCategory(template.category || "");
  };

  return (
    <div className="space-y-6">
      {/* Task Templates */}
      <TaskTemplates isHorrorMode={isHorrorMode} onSelectTemplate={handleTemplateSelect} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <h3 className={`text-2xl font-bold ${isHorrorMode ? 'text-red-200' : 'text-pink-600'}`}>
            <span className="mr-2">{isHorrorMode ? '🕸️' : '✨'}</span>
            {isHorrorMode ? 'Customize Your Task' : 'Customize Your Task'}
            <span className="ml-2">{isHorrorMode ? '👻' : '💖'}</span>
          </h3>
        </div>

      <div>
        <label className={`block text-sm font-semibold mb-2 ${isHorrorMode ? 'text-red-200' : 'text-pink-700'}`}>
          Task Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={isHorrorMode ? "What spooky task needs doing? 👻" : "What needs to be done, beautiful? ✨"}
          className={inputClass}
          required
        />
      </div>

      <div>
        <label className={`block text-sm font-semibold mb-2 ${isHorrorMode ? 'text-red-200' : 'text-pink-700'}`}>
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={isHorrorMode ? "Add some haunting details... 🦇" : "Add some lovely details... 🌸"}
          className={`${inputClass} h-24 resize-none`}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${isHorrorMode ? 'text-red-200' : 'text-pink-700'}`}>
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${isHorrorMode ? 'text-red-200' : 'text-pink-700'}`}>
            Due Time
          </label>
          <input
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${isHorrorMode ? 'text-red-200' : 'text-pink-700'}`}>
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
            className={selectClass}
          >
            <option value="low">{isHorrorMode ? '🕷️ Low (Whisper)' : '🌸 Low (Chill)'}</option>
            <option value="medium">{isHorrorMode ? '🦇 Medium (Spooky)' : '💖 Medium (Important)'}</option>
            <option value="high">{isHorrorMode ? '💀 High (Terrifying!)' : '🔥 High (Super Important!)'}</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${isHorrorMode ? 'text-red-200' : 'text-pink-700'}`}>
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder={isHorrorMode ? "Haunted category... 🎃" : "Work, Personal, etc... 🏷️"}
            className={inputClass}
          />
        </div>
      </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
              isHorrorMode
                ? 'bg-gradient-to-r from-red-600 to-purple-600 text-white hover:from-red-500 hover:to-purple-500'
                : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-400 hover:to-purple-400'
            }`}
          >
            <span className="mr-2">{isHorrorMode ? '🎃' : '✨'}</span>
            {isHorrorMode ? 'Cast the Spell!' : 'Add Task!'}
            <span className="ml-2">{isHorrorMode ? '👻' : '💖'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
