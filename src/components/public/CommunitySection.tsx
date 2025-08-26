import React, { useState } from "react";
import { Star, Heart, MessageCircle, BookOpen } from "lucide-react";
import useAuth from "../../hook/UseAuth";


interface CommunityReview {
  id: string;
  username: string;
  bookTitle: string;
  rating: number;
  review: string;
  timeAgo: string;
  likes: number;
  replies: number;
}

const mockCommunityReviews: CommunityReview[] = [
  {
    id: "1",
    username: "Emma Thompson",
    bookTitle: "The Art of Storytelling",
    rating: 5,
    review:
      "An absolutely captivating read! The author's ability to weave complex narratives is truly remarkable. I couldn't put it down.",
    timeAgo: "2 days ago",
    likes: 12,
    replies: 3,
  },
  {
    id: "2",
    username: "Michael Chen",
    bookTitle: "Cosmic Horizons",
    rating: 4,
    review:
      "Mind-bending science fiction at its finest. The world-building is incredible and the characters feel so real.",
    timeAgo: "1 week ago",
    likes: 8,
    replies: 1,
  },
  {
    id: "3",
    username: "Sarah Davis",
    bookTitle: "Whispers of the Heart",
    rating: 5,
    review:
      "A beautiful romance that touched my soul. Perfect for a cozy weekend read with a cup of tea.",
    timeAgo: "3 days ago",
    likes: 15,
    replies: 5,
  },
];

const CommunitySection: React.FC = () => {
  const { isLoggedIn,userId} = useAuth();
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) return;

    console.log("Submitting review:", {
      bookTitle,
      author,
      rating,
      review,
      userId,
    });

    // Reset form
    setBookTitle("");
    setAuthor("");
    setRating(0);
    setReview("");
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Share your reading experiences and discover new favorites through
            our community reviews
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Review Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center space-x-2 mb-8">
              <BookOpen className="h-6 w-6 text-gray-700" />
              <h3 className="text-xl font-semibold text-gray-900">
                Add Your Book Review
              </h3>
            </div>

            {isLoggedIn ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Book Title
                  </label>
                  <input
                    type="text"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    placeholder="Enter the book title..."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-gray-700 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Author
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author name..."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-gray-700 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Your Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none transition-all duration-200 p-1 hover:scale-110"
                      >
                        <Star
                          className={`h-10 w-10 ${
                            star <= (hoverRating || rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 hover:text-yellow-200"
                          } transition-all duration-200 cursor-pointer`}
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="ml-2 text-sm text-gray-600">
                        ({rating}/5)
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Your Review
                  </label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your thoughts about this book..."
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all resize-none text-gray-700 placeholder-gray-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Post Review
                </button>
              </form>
            ) : (
              <div className="text-center py-2">
                <p className="text-gray-600 mb-6">
                  Please log in to share your book reviews with the community.
                </p>
                <a href="/login" className="btn-primary mb-8">
                  Login to Continue
                </a>
                <div className="flex justify-center items-center space-x-3 mt-40">
                  <BookOpen className="h-12 w-12 text-black" />
                  <span className="text-4xl font-bold text-black">
                    BookHouse
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Recent Community Reviews */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
              Recent Community Reviews
            </h3>

            <div className="space-y-8">
              {mockCommunityReviews.map((communityReview) => (
                <div
                  key={communityReview.id}
                  className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base">
                        {communityReview.username}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {communityReview.bookTitle}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= communityReview.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                    {communityReview.review}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{communityReview.timeAgo}</span>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                        <Heart className="h-3 w-3" />
                        <span>Like</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-3 w-3" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button className="btn-secondary">View All Reviews</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
