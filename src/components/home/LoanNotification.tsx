import { useEffect, useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

const notifications = [
  { phone: '0721****77', amount: 15000 },
  { phone: '0733****21', amount: 25000 },
  { phone: '0712****55', amount: 8000 },
  { phone: '0745****89', amount: 50000 },
  { phone: '0722****44', amount: 12000 },
];

export function LoanNotification() {
  const [currentNotification, setCurrentNotification] = useState<typeof notifications[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      const randomIndex = Math.floor(Math.random() * notifications.length);
      setCurrentNotification(notifications[randomIndex]);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(showNotification, 3000);

    // Then show every 30 seconds
    const interval = setInterval(showNotification, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible || !currentNotification) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 notification-slide">
      <div className="bg-card border shadow-lg rounded-lg p-4 max-w-sm flex items-start gap-3">
        <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
          <CheckCircle className="h-5 w-5 text-success" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-success text-sm">Loan Approved</p>
          <p className="text-sm text-muted-foreground">
            {currentNotification.phone} loaned Ksh {currentNotification.amount.toLocaleString()} - just now
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
