import { useState } from 'react';
import FeedbackForm from './components/Pages/FeedbackForm.jsx';
import FeedbackList from './components/Pages/FeedbackList.jsx';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';

function App() {
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [newFeedback, setNewFeedback] = useState(null);

  const handleNewFeedback = (feedback) => {
    setNewFeedback(feedback);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 font-sans">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#fff',
          },
        }}
      />

      <div className="container mx-auto px-4 py-10">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow-sm">Feedback Collector</h1>
          <p className="text-gray-600 mt-2 text-lg">We value your thoughts. Share your feedback!</p>
        </header>

        <FeedbackForm onNewFeedback={handleNewFeedback} />

        <div className="mt-10 text-center">
          <button
            onClick={() => setShowFeedbacks(!showFeedbacks)}
            className="inline-flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            {showFeedbacks ? (
              <>
                <FiEyeOff className="mr-2" /> Hide Feedback
              </>
            ) : (
              <>
                <FiEye className="mr-2" /> View Feedback
              </>
            )}
          </button>
        </div>

        {showFeedbacks && <FeedbackList key={newFeedback?._id} />}

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} | All rights reserved.</p>
          <p>Created by-Anuj Kumar Gupta</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
