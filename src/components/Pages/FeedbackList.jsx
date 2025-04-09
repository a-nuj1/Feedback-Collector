import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiUser, FiMail, FiMessageSquare, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; 
    
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/v1/feedbacks');
        if (isMounted) {
          setFeedbacks(response.data);
          toast.success('Feedbacks loaded successfully');
        }
      } catch (err) {
        if (isMounted) {
          toast.error('Failed to fetch feedbacks');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchFeedbacks();
    
    return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Submitted Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p className="text-center text-gray-500">No feedbacks submitted yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback) => {
            const key = feedback._id || feedback.id || JSON.stringify(feedback);
            return (
              <div key={key} className="bg-white rounded-lg shadow-md p-5 border border-gray-100">
                <div className="flex items-center mb-3">
                  <FiUser className="text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-800">{feedback.name}</h3>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <FiMail className="mr-2" /> {feedback.email}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <FiCalendar className="mr-2" /> {new Date(feedback.date).toLocaleString()}
                </div>
                <div className="border-t pt-3 text-gray-700">
                  <div className="flex items-start">
                    <FiMessageSquare className="text-blue-600 mr-2 mt-1" />
                    <p>{feedback.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
