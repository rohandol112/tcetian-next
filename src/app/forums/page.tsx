'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, ThumbsUp, ThumbsDown, Plus, TrendingUp, Clock, Search, User } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { motion } from 'framer-motion';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function ForumsPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
    // Poll every 15 seconds
    const interval = setInterval(fetchPosts, 15000);
    return () => clearInterval(interval);
  }, [filter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts?sort=${filter}`);
      const data = await res.json();
      console.log('Posts fetched:', data);
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 pt-32 pb-20 border-b">
        <motion.div
          className="absolute top-10 left-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8">
            <div className="flex-1">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MessageSquare className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-gray-700">Community Forums</span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Campus
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Discussions
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Ask questions, share knowledge, and connect with peers
              </motion.p>
            </div>

            {user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link
                  href="/forums/create"
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  New Discussion
                </Link>
              </motion.div>
            )}
          </div>

          {/* Search and Filters */}
          <motion.div
            className="flex flex-col md:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter('trending')}
                className={`px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-all ${
                  filter === 'trending'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Trending
              </button>
              <button
                onClick={() => setFilter('recent')}
                className={`px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-all ${
                  filter === 'recent'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                <Clock className="w-4 h-4" />
                Recent
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Posts List */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border animate-pulse">
                <div className="flex gap-4">
                  <div className="w-16 h-24 bg-gray-200 rounded-xl" />
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <motion.div
            className="text-center py-20 bg-white rounded-3xl border"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-6">Be the first to start a discussion!</p>
            {user && (
              <Link
                href="/forums/create"
                className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Post
              </Link>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredPosts.map((post) => (
              <motion.div
                key={post._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              >
                <Link
                  href={`/forums/${post._id}`}
                  className="block bg-white rounded-2xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all"
                >
                  <div className="flex gap-4">
                    {/* Vote Section */}
                    <div className="flex flex-col items-center gap-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 min-w-[80px]">
                      <ThumbsUp className="w-5 h-5 text-purple-600" />
                      <span className="text-2xl font-bold text-gray-900">
                        {(post.upvotes?.length || 0) - (post.downvotes?.length || 0)}
                      </span>
                      <ThumbsDown className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {post.author?.name?.charAt(0) || 'U'}
                          </div>
                          <span className="font-medium text-gray-700">
                            {post.author?.name || 'Anonymous'}
                          </span>
                        </div>

                        <span>•</span>
                        <span>{formatDate(post.createdAt)}</span>

                        {post.category && (
                          <>
                            <span>•</span>
                            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold">
                              {post.category}
                            </span>
                          </>
                        )}

                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.commentCount || 0} {post.commentCount === 1 ? 'comment' : 'comments'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}
