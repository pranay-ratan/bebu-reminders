import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

interface Reward {
  id: string;
  name: string;
  description: string;
  emoji: string;
  level: number;
  unlocked: boolean;
}

interface RewardSystemProps {
  isHorrorMode: boolean;
}

const rewards: Reward[] = [
  {
    id: "lays",
    name: "Lays Chips",
    description: "A bag of your favorite Lays chips! 🥔",
    emoji: "🥔",
    level: 1,
    unlocked: false
  },
  {
    id: "pringles",
    name: "Pringles",
    description: "A tube of delicious Pringles! 🥜",
    emoji: "🥜",
    level: 2,
    unlocked: false
  },
  {
    id: "bhel",
    name: "Home Made Bhel",
    description: "I'll make you delicious home made bhel! 🍲",
    emoji: "🍲",
    level: 3,
    unlocked: false
  },
  {
    id: "chaat",
    name: "Home Made Chaat",
    description: "Authentic home made chaat just for you! 🥟",
    emoji: "🥟",
    level: 4,
    unlocked: false
  },
  {
    id: "ramen_home",
    name: "Home Made Ramen Date",
    description: "A cozy ramen date at home with your favorite toppings! 🍜",
    emoji: "🍜",
    level: 5,
    unlocked: false
  },
  {
    id: "ramen_out",
    name: "Ramen Date Outside",
    description: "Let's go out for ramen at your favorite spot! 🏮",
    emoji: "🏮",
    level: 6,
    unlocked: false
  },
  {
    id: "surprise_date",
    name: "Surprise Date",
    description: "A surprise date planned just for you! 🎁",
    emoji: "🎁",
    level: 7,
    unlocked: false
  },
  {
    id: "special_treat",
    name: "Special Treat",
    description: "Something extra special coming your way! ✨",
    emoji: "✨",
    level: 8,
    unlocked: false
  }
];

export function RewardSystem({ isHorrorMode }: RewardSystemProps) {
  const [showRewards, setShowRewards] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState<string>("");

  const completedTasks = useQuery(api.tasks.getTasks) || [];
  const completedCount = completedTasks.filter(task => task.completed).length;

  // Calculate current level based on completed tasks
  const currentLevel = Math.min(Math.floor(completedCount / 2) + 1, rewards.length);

  // Update unlocked rewards based on level
  const updatedRewards = rewards.map(reward => ({
    ...reward,
    unlocked: reward.level <= currentLevel
  }));

  // Generate unique message for reward request
  const generateRewardMessage = (rewardName: string) => {
    const messages = [
      `Hey Pranay! I've been working super hard and reached level ${currentLevel}! Can I please have ${rewardName}? I've earned it with all my completed tasks! 💕✨`,
      `Pranay darling! I've completed ${completedCount} tasks and unlocked ${rewardName}! Pretty please? 🥺💖`,
      `Hi sweetie! I've been so productive today - ${completedCount} tasks done! Can I claim my ${rewardName} reward now? 🌸💕`,
      `Pranay! I've leveled up to ${currentLevel} and really want ${rewardName}! I've been such a good girl with all my tasks! 🎀💖`,
      `Hey love! ${completedCount} tasks completed means I get to ask for ${rewardName}, right? Please please please? 🦄✨`,
      `Pranay! I've been crushing my goals and reached level ${currentLevel}! ${rewardName} would make me so happy! 💕🌸`,
      `Sweetie! I've done ${completedCount} tasks today! Can I have my ${rewardName} reward now? I've earned it! 🎉💖`,
      `Pranay! Level ${currentLevel} unlocked! I've been so productive - can I please have ${rewardName}? 🥰✨`
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  const handleRequestReward = async (rewardId: string) => {
    setIsRequesting(true);
    const reward = updatedRewards.find(r => r.id === rewardId);

    if (!reward || !reward.unlocked) {
      toast.error("This reward isn't unlocked yet, sweetie! 💕");
      setIsRequesting(false);
      return;
    }

    // Generate unique message
    const message = generateRewardMessage(reward.name);
    setGeneratedMessage(message);

    try {
      // Copy message to clipboard
      await navigator.clipboard.writeText(message);

      toast.success(`📋 Message copied to clipboard!`, {
        description: "Send this unique message to Pranay to claim your reward! 💖"
      });

      setSelectedReward(null);
    } catch (error) {
      toast.error("Oops! Couldn't copy the message 😢");
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Level Progress */}
      <div className={`p-4 rounded-xl transition-all duration-300 ${
        isHorrorMode
          ? 'bg-purple-800/50 border border-red-600/50'
          : 'bg-transparent border border-pink-300/40'
      } backdrop-blur-xl`}>
        <div className="text-center">
          <h3 className={`text-lg font-semibold mb-2 ${isHorrorMode ? 'text-red-200' : 'text-pink-700'}`}>
            <span className="mr-2">{isHorrorMode ? '🏆' : '🎯'}</span>
            {isHorrorMode ? 'Achievement Level' : 'Reward Level'}
          </h3>
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className={`text-3xl font-bold ${isHorrorMode ? 'text-red-300' : 'text-pink-600'}`}>
              Level {currentLevel}
            </div>
            <div className="flex gap-1">
              {Array.from({ length: rewards.length }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i < currentLevel
                      ? (isHorrorMode ? 'bg-red-400' : 'bg-pink-400')
                      : (isHorrorMode ? 'bg-purple-600' : 'bg-gray-300')
                  }`}
                />
              ))}
            </div>
          </div>
          <p className={`text-sm ${isHorrorMode ? 'text-purple-300' : 'text-purple-600'}`}>
            Complete {Math.max(0, (currentLevel * 2) - completedCount)} more tasks to reach the next level!
          </p>
        </div>
      </div>

      {/* Reward Button */}
      <div className="text-center">
        <button
          onClick={() => setShowRewards(!showRewards)}
          className={`px-6 py-3 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
            isHorrorMode
              ? 'bg-gradient-to-r from-purple-600 to-red-600 text-white hover:from-purple-500 hover:to-red-500'
              : 'bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-300 hover:to-purple-300'
          }`}
        >
          <span className="mr-2">{isHorrorMode ? '🎁' : '🎉'}</span>
          {showRewards ? 'Hide Rewards' : 'Claim Rewards'}
          <span className="ml-2">{isHorrorMode ? '👻' : '💖'}</span>
        </button>
      </div>

      {/* Rewards Grid */}
      {showRewards && (
        <div className={`p-6 rounded-2xl transition-all duration-500 ${
          isHorrorMode
            ? 'bg-purple-900/70 border border-red-600/50'
            : 'bg-white/80 border border-pink-200'
        } backdrop-blur-sm`}>
          <h4 className={`text-xl font-bold mb-4 text-center ${isHorrorMode ? 'text-red-200' : 'text-pink-700'}`}>
            {isHorrorMode ? '🕸️ Available Rewards 🦇' : '✨ Your Rewards 🌸'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {updatedRewards.map((reward) => (
              <div
                key={reward.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  reward.unlocked
                    ? (isHorrorMode
                        ? 'bg-red-900/50 border-red-500 hover:bg-red-800/50'
                        : 'bg-green-50 border-green-300 hover:bg-green-100')
                    : (isHorrorMode
                        ? 'bg-purple-800/30 border-purple-600/50 opacity-60'
                        : 'bg-gray-50 border-gray-200 opacity-60')
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{reward.emoji}</span>
                      <h5 className={`font-semibold ${isHorrorMode ? 'text-red-200' : 'text-gray-800'}`}>
                        {reward.name}
                      </h5>
                      {!reward.unlocked && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isHorrorMode ? 'bg-purple-700 text-purple-200' : 'bg-gray-200 text-gray-600'
                        }`}>
                          Level {reward.level}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mb-3 ${isHorrorMode ? 'text-purple-300' : 'text-gray-600'}`}>
                      {reward.description}
                    </p>
                  </div>

                  {reward.unlocked && (
                    <button
                      onClick={() => setSelectedReward(selectedReward === reward.id ? null : reward.id)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedReward === reward.id
                          ? (isHorrorMode ? 'bg-red-600 text-white' : 'bg-pink-500 text-white')
                          : (isHorrorMode ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-pink-500 text-white hover:bg-pink-400')
                      }`}
                    >
                      {selectedReward === reward.id ? 'Cancel' : 'Request'}
                    </button>
                  )}
                </div>

                {selectedReward === reward.id && (
                  <div className="mt-3 p-3 rounded-lg bg-white/90">
                    <p className="text-sm text-gray-700 mb-3">
                      Ready to request this reward from Pranay? 💕
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRequestReward(reward.id)}
                        disabled={isRequesting}
                        className="flex-1 px-3 py-2 bg-pink-500 text-white rounded-lg text-sm font-medium hover:bg-pink-400 disabled:opacity-50"
                      >
                        {isRequesting ? 'Sending...' : 'Yes, please! 🎉'}
                      </button>
                      <button
                        onClick={() => setSelectedReward(null)}
                        className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                      >
                        Maybe later
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
