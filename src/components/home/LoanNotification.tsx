import { useEffect, useState } from 'react';
import { X, CheckCircle, Zap, TrendingUp, Target, Users, Star } from 'lucide-react';

const youthNotifications = [
  { phone: '0721****77', amount: 15000, name: 'Samuel K.', age: 22, purpose: 'Student Loan' },
  { phone: '0733****21', amount: 25000, name: 'Faith M.', age: 24, purpose: 'Business Startup' },
  { phone: '0712****55', amount: 8000, name: 'Kevin O.', age: 20, purpose: 'Education' },
  { phone: '0745****89', amount: 50000, name: 'Lilian W.', age: 26, purpose: 'Agribusiness' },
  { phone: '0722****44', amount: 12000, name: 'Brian M.', age: 23, purpose: 'Skill Training' },
  { phone: '0701****33', amount: 35000, name: 'Sarah A.', age: 25, purpose: 'E-commerce' },
  { phone: '0798****66', amount: 18000, name: 'David N.', age: 21, purpose: 'University Fees' },
  { phone: '0767****99', amount: 40000, name: 'Grace L.', age: 27, purpose: 'Tech Startup' },
];

const purposes = {
  'Student Loan': { icon: '🎓', color: 'text-blue-400', bg: 'bg-blue-600/20' },
  'Business Startup': { icon: '💼', color: 'text-green-400', bg: 'bg-green-600/20' },
  'Education': { icon: '📚', color: 'text-purple-400', bg: 'bg-purple-600/20' },
  'Agribusiness': { icon: '🚜', color: 'text-yellow-400', bg: 'bg-yellow-600/20' },
  'Skill Training': { icon: '⚡', color: 'text-red-400', bg: 'bg-red-600/20' },
  'E-commerce': { icon: '🛒', color: 'text-pink-400', bg: 'bg-pink-600/20' },
  'University Fees': { icon: '🎯', color: 'text-cyan-400', bg: 'bg-cyan-600/20' },
  'Tech Startup': { icon: '💻', color: 'text-indigo-400', bg: 'bg-indigo-600/20' },
};

export function LoanNotification() {
  const [currentNotification, setCurrentNotification] = useState<typeof youthNotifications[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [notificationQueue, setNotificationQueue] = useState<typeof youthNotifications>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Shuffle notifications for variety
    const shuffled = [...youthNotifications].sort(() => Math.random() - 0.5);
    setNotificationQueue(shuffled);
  }, []);

  useEffect(() => {
    const showNextNotification = () => {
      if (notificationQueue.length === 0) return;

      setCurrentNotification(notificationQueue[currentIndex]);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % notificationQueue.length);
        }, 2000); // Short delay before next notification
      }, 7000); // Show for 7 seconds
    };

    // Show first notification after 2 seconds
    const initialTimeout = setTimeout(showNextNotification, 2000);

    // Then show every 25 seconds
    const interval = setInterval(showNextNotification, 25000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [notificationQueue, currentIndex]);

  const handleClose = () => {
    setIsVisible(false);
    // Move to next notification after closing
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % notificationQueue.length);
    }, 1000);
  };

  if (!isVisible || !currentNotification) return null;

  const purposeInfo = purposes[currentNotification.purpose as keyof typeof purposes] || 
    { icon: '🎯', color: 'text-green-400', bg: 'bg-green-600/20' };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="relative">
        {/* Decorative background effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 to-red-600/20 rounded-2xl blur-sm opacity-50"></div>
        
        {/* Main notification card */}
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black backdrop-blur-sm border border-green-500/30 rounded-xl shadow-2xl shadow-green-500/10 p-3 max-w-sm w-64 md:w-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-400" />
                  <p className="font-bold text-green-400 text-sm">YOUTH LOAN APPROVED</p>
                  <div className="px-2 py-0.5 bg-green-600/20 border border-green-500/30 rounded text-[10px] text-green-400 font-medium">
                    Age {currentNotification.age}
                  </div>
                </div>
                <p className="text-xs text-gray-400">Young Kenyan Empowered</p>
              </div>
            </div>
            
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors duration-200 hover:bg-gray-800/50 rounded-full p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center">
                  <Users className="h-3 w-3 text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">{currentNotification.name}</p>
                  <p className="text-xs text-gray-400">{currentNotification.phone}</p>
                </div>
              </div>
              
              {/* Amount Badge */}
              <div className="bg-gradient-to-r from-green-600/20 to-green-600/10 border border-green-500/30 rounded-lg px-3 py-1.5">
                <p className="text-xl font-bold text-green-400">
                  Ksh {currentNotification.amount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Purpose */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`${purposeInfo.bg} border ${purposeInfo.color.replace('text-', 'border-')}/30 rounded-lg px-2 py-1 flex items-center gap-1.5`}>
                <span className="text-sm">{purposeInfo.icon}</span>
                <span className={`text-xs font-medium ${purposeInfo.color}`}>
                  {currentNotification.purpose}
                </span>
              </div>
              <div className="text-xs text-gray-400">• Just now</div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Today's youth approvals</span>
                <span className="text-green-400">+{Math.floor(Math.random() * 10) + 15}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                ></div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-900/50 rounded p-2">
                <p className="text-[10px] text-gray-400">Today</p>
                <p className="text-sm font-bold text-white">{Math.floor(Math.random() * 20) + 15}</p>
              </div>
              <div className="bg-gray-900/50 rounded p-2">
                <p className="text-[10px] text-gray-400">This Month</p>
                <p className="text-sm font-bold text-green-400">{Math.floor(Math.random() * 200) + 300}</p>
              </div>
              <div className="bg-gray-900/50 rounded p-2">
                <p className="text-[10px] text-gray-400">Success Rate</p>
                <p className="text-sm font-bold text-green-400">92%</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                <p className="text-xs text-gray-400">Empowering Kenyan youth</p>
              </div>
              <button className="text-xs text-green-400 hover:text-green-300 font-medium">
                Apply Now →
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-600/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 bg-red-600/10 rounded-full translate-y-6 -translate-x-6"></div>
        </div>

        {/* Animation indicators */}
        <div className="absolute -top-2 -right-2">
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
            <div className="relative w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
              <Zap className="h-2 w-2 text-white" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
