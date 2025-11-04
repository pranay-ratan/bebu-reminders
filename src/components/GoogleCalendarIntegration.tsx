import { useState } from "react";
import { toast } from "sonner";

interface GoogleCalendarIntegrationProps {
  isHorrorMode: boolean;
}

export function GoogleCalendarIntegration({ isHorrorMode }: GoogleCalendarIntegrationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);

    // Simulate connection for demo purposes
    // In a real implementation, this would integrate with Google Calendar API
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
      toast.success(isHorrorMode ? "🦇 Connected to the mystical calendar!" : "📅 Connected to Google Calendar!", {
        description: isHorrorMode ? "Your tasks will now haunt your calendar too!" : "Your reminders will sync automatically! ✨"
      });
    }, 2000);
  };

  const handleSetupGuide = () => {
    setShowSetup(!showSetup);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast.success(isHorrorMode ? "👻 Disconnected from the calendar spirits" : "📅 Disconnected from Google Calendar");
  };

  return (
    <div className={`p-4 rounded-xl transition-all duration-300 ${
      isHorrorMode
        ? 'bg-purple-800/50 border border-red-600/50'
        : 'bg-white/70 border border-pink-200'
    } backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{isHorrorMode ? '📜' : '📅'}</span>
          <div>
            <h3 className={`font-semibold ${isHorrorMode ? 'text-red-200' : 'text-pink-700'}`}>
              {isHorrorMode ? 'Mystical Calendar' : 'Google Calendar'}
            </h3>
            <p className={`text-sm ${isHorrorMode ? 'text-purple-300' : 'text-purple-600'}`}>
              {isConnected
                ? (isHorrorMode ? 'Connected to the calendar spirits ✨' : 'Connected - Tasks sync automatically!')
                : (isHorrorMode ? 'Connect to sync with the mystical realms' : 'Connect to sync your reminders')
              }
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={isConnected ? handleDisconnect : handleConnect}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isConnected
                ? (isHorrorMode
                    ? 'bg-red-600 hover:bg-red-500 text-white'
                    : 'bg-red-500 hover:bg-red-400 text-white')
                : (isHorrorMode
                    ? 'bg-purple-600 hover:bg-purple-500 text-white'
                    : 'bg-blue-500 hover:bg-blue-400 text-white')
            } disabled:opacity-50`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                {isHorrorMode ? 'Connecting...' : 'Connecting...'}
              </span>
            ) : isConnected ? (
              <span className="flex items-center gap-2">
                <span>🔌</span>
                {isHorrorMode ? 'Disconnect' : 'Disconnect'}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>🔗</span>
                {isHorrorMode ? 'Connect' : 'Connect'}
              </span>
            )}
          </button>

          {!isConnected && (
            <button
              onClick={handleSetupGuide}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                isHorrorMode
                  ? 'bg-gray-600 hover:bg-gray-500 text-white'
                  : 'bg-gray-500 hover:bg-gray-400 text-white'
              }`}
            >
              <span className="text-sm">?</span>
            </button>
          )}
        </div>
      </div>

      {isConnected && (
        <div className={`mt-4 p-3 rounded-lg ${
          isHorrorMode ? 'bg-purple-900/50' : 'bg-blue-50'
        }`}>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500">✓</span>
            <span className={isHorrorMode ? 'text-purple-200' : 'text-blue-700'}>
              {isHorrorMode ? 'Tasks will appear in your mystical calendar' : 'Tasks will appear in your Google Calendar'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm mt-1">
            <span className="text-green-500">✓</span>
            <span className={isHorrorMode ? 'text-purple-200' : 'text-blue-700'}>
              {isHorrorMode ? 'Reminders will haunt your notifications' : 'Reminders will sync to your calendar events'}
            </span>
          </div>
        </div>
      )}

      {showSetup && (
        <div className={`mt-4 p-4 rounded-lg ${
          isHorrorMode ? 'bg-red-900/30' : 'bg-blue-50/30 backdrop-blur-sm'
        }`}>
          <h4 className={`font-semibold mb-3 ${isHorrorMode ? 'text-red-200' : 'text-blue-700'}`}>
            🚀 Google Calendar Setup Guide
          </h4>

          <div className="space-y-3 text-sm">
            <div>
              <h5 className={`font-medium mb-1 ${isHorrorMode ? 'text-red-300' : 'text-blue-600'}`}>
                1. Create Google Cloud Project
              </h5>
              <p className={isHorrorMode ? 'text-purple-300' : 'text-blue-500'}>
                Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a> and create a new project
              </p>
            </div>

            <div>
              <h5 className={`font-medium mb-1 ${isHorrorMode ? 'text-red-300' : 'text-blue-600'}`}>
                2. Enable Google Calendar API
              </h5>
              <p className={isHorrorMode ? 'text-purple-300' : 'text-blue-500'}>
                Enable the Google Calendar API in your project
              </p>
            </div>

            <div>
              <h5 className={`font-medium mb-1 ${isHorrorMode ? 'text-red-300' : 'text-blue-600'}`}>
                3. Create OAuth Credentials
              </h5>
              <p className={isHorrorMode ? 'text-purple-300' : 'text-blue-500'}>
                Create OAuth 2.0 Client ID credentials
              </p>
            </div>

            <div>
              <h5 className={`font-medium mb-1 ${isHorrorMode ? 'text-red-300' : 'text-blue-600'}`}>
                4. Set Authorized Redirect URIs
              </h5>
              <p className={isHorrorMode ? 'text-purple-300' : 'text-blue-500'}>
                Add: <code className="bg-gray-200 px-1 py-0.5 rounded text-xs">http://localhost:5173/auth/google/callback</code>
              </p>
            </div>

            <div>
              <h5 className={`font-medium mb-1 ${isHorrorMode ? 'text-red-300' : 'text-blue-600'}`}>
                5. Environment Variables
              </h5>
              <p className={isHorrorMode ? 'text-purple-300' : 'text-blue-500'}>
                Add to <code className="bg-gray-200 px-1 py-0.5 rounded text-xs">.env.local</code>:<br/>
                <code className="bg-gray-200 px-1 py-0.5 rounded text-xs">VITE_GOOGLE_CLIENT_ID=your_client_id_here</code>
              </p>
            </div>

            <div className={`mt-4 p-3 rounded ${
              isHorrorMode ? 'bg-purple-800/50' : 'bg-yellow-50'
            }`}>
              <p className={`text-xs mb-2 ${isHorrorMode ? 'text-purple-200' : 'text-yellow-700'}`}>
                <strong>Why no sign-in popup?</strong> This is currently demo mode. For real Google sign-in, you need backend OAuth handling.
              </p>
              <p className={`text-xs ${isHorrorMode ? 'text-purple-200' : 'text-yellow-700'}`}>
                <strong>Calendar Selection:</strong> During OAuth consent, users choose which Google Calendar to grant access to. Usually the primary calendar.
              </p>
            </div>

            <div className={`mt-3 p-3 rounded ${
              isHorrorMode ? 'bg-red-900/30' : 'bg-green-50'
            }`}>
              <h5 className={`font-medium mb-2 text-xs ${isHorrorMode ? 'text-red-200' : 'text-green-700'}`}>
                🔐 How Real Google OAuth Works:
              </h5>
              <ol className={`text-xs space-y-1 ${isHorrorMode ? 'text-purple-300' : 'text-green-600'}`}>
                <li>1. User clicks "Connect" → Google OAuth popup opens</li>
                <li>2. User signs in to Google account</li>
                <li>3. User grants calendar access permissions</li>
                <li>4. User selects which calendar to sync with</li>
                <li>5. Authorization code sent to your backend</li>
                <li>6. Backend exchanges code for access tokens</li>
                <li>7. Tasks sync to selected Google Calendar</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
