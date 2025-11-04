import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";

interface Task {
  _id: Id<"tasks">;
  title: string;
  description?: string;
  dueDate?: number;
  dueTime?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  category?: string;
}

interface TaskListProps {
  tasks: Task[];
  isHorrorMode: boolean;
  onToggle: (taskId: Id<"tasks">) => void;
  onDelete: (taskId: Id<"tasks">) => void;
}

export function TaskList({ tasks, isHorrorMode, onToggle, onDelete }: TaskListProps) {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getPriorityIcon = (priority: string) => {
    if (isHorrorMode) {
      switch (priority) {
        case 'high': return '💀';
        case 'medium': return '🦇';
        case 'low': return '🕷️';
        default: return '👻';
      }
    } else {
      switch (priority) {
        case 'high': return '🔥';
        case 'medium': return '💖';
        case 'low': return '🌸';
        default: return '✨';
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    if (isHorrorMode) {
      switch (priority) {
        case 'high': return 'text-red-300 bg-red-900/50';
        case 'medium': return 'text-purple-300 bg-purple-900/50';
        case 'low': return 'text-gray-300 bg-gray-800/50';
        default: return 'text-purple-300 bg-purple-900/50';
      }
    } else {
      switch (priority) {
        case 'high': return 'text-red-600 bg-red-100';
        case 'medium': return 'text-purple-600 bg-purple-100';
        case 'low': return 'text-gray-600 bg-gray-100';
        default: return 'text-purple-600 bg-purple-100';
      }
    }
  };

  const isOverdue = (task: Task) => {
    return task.dueDate && task.dueDate < Date.now() && !task.completed;
  };

  if (tasks.length === 0) {
    return (
      <div className={`text-center p-8 rounded-xl ${
        isHorrorMode ? 'text-purple-300' : 'text-gray-500'
      }`}>
        <div className="text-4xl mb-2">{isHorrorMode ? '🕸️' : '🌟'}</div>
        <p>{isHorrorMode ? 'No spooky tasks here!' : 'No tasks here, Bebu!'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
            task.completed
              ? isHorrorMode
                ? 'bg-green-900/30 border-green-600/50 opacity-75'
                : 'bg-green-50/30 border-green-300/60 opacity-75 backdrop-blur-sm'
              : isOverdue(task)
              ? isHorrorMode
                ? 'bg-red-900/50 border-red-500 animate-pulse'
                : 'bg-red-50/30 border-red-300/60 backdrop-blur-sm'
              : isHorrorMode
              ? 'bg-purple-800/30 border-purple-600/50'
              : 'bg-transparent border-pink-300/60 backdrop-blur-sm'
          }`}
        >
          <div className="flex items-start gap-3">
            {/* Checkbox */}
            <button
              onClick={() => onToggle(task._id)}
              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                task.completed
                  ? isHorrorMode
                    ? 'bg-green-600 border-green-500 text-white'
                    : 'bg-green-500 border-green-400 text-white'
                  : isHorrorMode
                  ? 'border-red-400 hover:bg-red-600/20'
                  : 'border-pink-400 hover:bg-pink-100'
              }`}
            >
              {task.completed && (
                <span className="text-sm">
                  {isHorrorMode ? '🎃' : '✓'}
                </span>
              )}
            </button>

            {/* Task Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4
                    className={`font-semibold text-lg cursor-pointer transition-colors duration-300 ${
                      task.completed
                        ? isHorrorMode
                          ? 'text-green-300 line-through'
                          : 'text-green-600 line-through'
                        : isHorrorMode
                        ? 'text-red-200 hover:text-red-100'
                        : 'text-gray-800 hover:text-pink-600'
                    }`}
                    onClick={() => setExpandedTask(expandedTask === task._id ? null : task._id)}
                  >
                    {task.title}
                  </h4>

                  {/* Priority and Category */}
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                      {getPriorityIcon(task.priority)} {task.priority.toUpperCase()}
                    </span>
                    {task.category && (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        isHorrorMode ? 'bg-purple-700/50 text-purple-200' : 'bg-gray-100 text-gray-600'
                      }`}>
                        🏷️ {task.category}
                      </span>
                    )}
                  </div>

                  {/* Due Date */}
                  {task.dueDate && (
                    <div className={`mt-2 text-sm ${
                      isOverdue(task)
                        ? isHorrorMode
                          ? 'text-red-300 animate-pulse'
                          : 'text-red-600'
                        : isHorrorMode
                        ? 'text-purple-300'
                        : 'text-gray-600'
                    }`}>
                      <span className="mr-1">{isOverdue(task) ? (isHorrorMode ? '💀' : '⚠️') : '📅'}</span>
                      {formatDate(task.dueDate)}
                      {task.dueTime && ` at ${formatTime(task.dueTime)}`}
                      {isOverdue(task) && (
                        <span className="ml-2 font-semibold">
                          {isHorrorMode ? '(HAUNTING YOU!)' : '(OVERDUE!)'}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Expanded Description */}
                  {expandedTask === task._id && task.description && (
                    <div className={`mt-3 p-3 rounded-lg ${
                      isHorrorMode ? 'bg-purple-900/50 text-purple-200' : 'bg-gray-50 text-gray-700'
                    }`}>
                      <p className="text-sm">{task.description}</p>
                    </div>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => onDelete(task._id)}
                  className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                    isHorrorMode
                      ? 'text-red-400 hover:bg-red-900/50 hover:text-red-300'
                      : 'text-gray-400 hover:bg-red-100 hover:text-red-600'
                  }`}
                  title="Delete task"
                >
                  <span className="text-lg">{isHorrorMode ? '🗡️' : '🗑️'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
