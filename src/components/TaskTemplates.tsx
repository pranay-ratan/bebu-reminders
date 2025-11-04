import { useState } from "react";

interface TaskTemplate {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  category?: string;
  emoji: string;
}

interface TaskTemplatesProps {
  isHorrorMode: boolean;
  onSelectTemplate: (template: Omit<TaskTemplate, 'id' | 'emoji'>) => void;
}

const templates: TaskTemplate[] = [
  {
    id: "friends",
    title: "Going out with friends",
    description: "Plan the perfect night out with your besties! 💃🕺",
    priority: "medium",
    category: "Social",
    emoji: "👯‍♀️"
  },
  {
    id: "work",
    title: "Work meeting",
    description: "Important team discussion and collaboration",
    priority: "high",
    category: "Work",
    emoji: "💼"
  },
  {
    id: "shopping",
    title: "Shopping trip",
    description: "Retail therapy time! Find some amazing deals",
    priority: "low",
    category: "Personal",
    emoji: "🛍️"
  },
  {
    id: "exercise",
    title: "Workout session",
    description: "Time to get those endorphins flowing! 💪",
    priority: "medium",
    category: "Health",
    emoji: "🏋️‍♀️"
  },
  {
    id: "date",
    title: "Date night",
    description: "Romantic evening with your special someone 💕",
    priority: "high",
    category: "Personal",
    emoji: "💑"
  },
  {
    id: "study",
    title: "Study session",
    description: "Hit the books and expand your knowledge 📚",
    priority: "medium",
    category: "Education",
    emoji: "📖"
  },
  {
    id: "cleaning",
    title: "Deep cleaning",
    description: "Time to tidy up and organize your space",
    priority: "low",
    category: "Home",
    emoji: "🧹"
  },
  {
    id: "doctor",
    title: "Doctor appointment",
    description: "Health check-up and medical visit",
    priority: "high",
    category: "Health",
    emoji: "🏥"
  },
  {
    id: "french",
    title: "Learn French",
    description: "Practice French language skills and vocabulary! 🇫🇷",
    priority: "medium",
    category: "Education",
    emoji: "🇫🇷"
  },
  {
    id: "dancing",
    title: "Dance practice",
    description: "Time to dance and express yourself! 💃🕺",
    priority: "low",
    category: "Hobby",
    emoji: "💃"
  }
];

export function TaskTemplates({ isHorrorMode, onSelectTemplate }: TaskTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSelectTemplate = (template: TaskTemplate) => {
    setSelectedTemplate(template.id);
    onSelectTemplate({
      title: template.title,
      description: template.description,
      priority: template.priority,
      category: template.category
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className={`text-lg font-semibold mb-2 ${isHorrorMode ? 'text-red-200' : 'text-pink-700'}`}>
          <span className="mr-2">{isHorrorMode ? '📜' : '📋'}</span>
          {isHorrorMode ? 'Magical Templates' : 'Quick Templates'}
        </h3>
        <p className={`text-sm ${isHorrorMode ? 'text-purple-300' : 'text-purple-600'}`}>
          {isHorrorMode ? 'Choose from enchanted task templates!' : 'Start with a template and customize it!'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleSelectTemplate(template)}
            className={`p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
              selectedTemplate === template.id
                ? (isHorrorMode
                    ? 'bg-red-600/50 border-red-400 shadow-red-500/50'
                    : 'bg-pink-500/50 border-pink-400 shadow-pink-500/50')
                : (isHorrorMode
                    ? 'bg-purple-800/30 border-purple-600/50 hover:bg-purple-700/50'
                    : 'bg-white/50 border-pink-200 hover:bg-pink-50')
            } backdrop-blur-sm`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">{template.emoji}</div>
              <div className={`text-xs font-medium leading-tight ${
                isHorrorMode ? 'text-red-200' : 'text-pink-700'
              }`}>
                {template.title}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => {
            setSelectedTemplate(null);
            onSelectTemplate({
              title: "",
              description: "",
              priority: "medium",
              category: ""
            });
          }}
          className={`text-sm px-3 py-1 rounded-md transition-colors ${
            isHorrorMode
              ? 'text-purple-300 hover:text-purple-200 hover:bg-purple-800/50'
              : 'text-purple-600 hover:text-purple-500 hover:bg-purple-100'
          }`}
        >
          {isHorrorMode ? '🧙‍♀️ Start from scratch' : '✨ Start from scratch'}
        </button>
      </div>
    </div>
  );
}
