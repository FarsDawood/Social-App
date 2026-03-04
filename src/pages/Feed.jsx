import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Divider } from "@heroui/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { formatPostDate } from "../helpers/date";

export default function Feed() {
  const { userToken } = useContext(AuthContext);
  const [feedPosts, setFeedPosts] = useState([]);
  async function getPosts() {
    const {
      data: {
        data: { posts },
      },
    } = await axios.get("https://route-posts.routemisr.com/posts", {
      headers: {
        token: userToken,
      },
    });
    setFeedPosts(posts);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {feedPosts.map((post) => {
        return (
          <article
            key={post._id}
            className="mb-6 mx-auto p-0 md:p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 max-w-2xl"
          >
            {/* Header: User Info & Privacy */}
            <div className="flex pb-4 items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Profile Photo */}
                <Avatar
                  isBordered
                  color="success"
                  radius="full"
                  size="md"
                  src={post.user.photo || "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"}
                />
                {/* Post Header */}
                <div className="flex flex-col">
                  {/* Name & Username */}
                  <Link
                    to="/profile"
                    className="text-sm md:text-base font-bold text-slate-900 dark:text-white hover:text-green-900 transition-colors"
                  >
                    {post.user.name} <span className="text-xs font-normal text-slate-500">{post.user.username}</span>
                  </Link>

                  {/* Post Date */}
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <span>{formatPostDate(post.createdAt)}</span> {/* هنا هنستخدم دالة format date */}
                    <span>•</span>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9V7h2v6z" />
                    </svg>
                    {/* Privacy */}
                    <span className="capitalize">{post.privacy}</span>
                  </div>
                </div>
              </div>
              <Button isIconOnly variant="light" radius="full" size="sm">
                <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </Button>
            </div>

            {/* Post Content */}
            <div className="space-y-3">
              {post.body && <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{post.body}</p>}

              {/* Post Image: هنعمل Check لو الـ image موجودة في الـ API */}
              {post.image && (
                <div className="overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-black flex justify-center items-center">
                  <img className="w-full h-auto max-h-125 object-contain shadow-inner" src={post.image} alt="Post content" />
                </div>
              )}
            </div>

            {/* Stats Section: Likes, Comments, Shares */}
            <div className="flex items-center justify-between py-3 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 hover:text-rose-600 cursor-pointer transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {post.likesCount} Likes
                </span>
                <span className="flex items-center gap-1 hover:text-green-900 cursor-pointer transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {post.commentsCount} Comments
                </span>
              </div>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">{post.sharesCount} Shares</span>
            </div>

            <Divider className="my-1 opacity-50" />

            {/* 1. Action Buttons */}
            <div className="flex items-center justify-around py-1">
              <Button variant="light" radius="lg" className="flex-1 text-slate-600 font-bold hover:text-rose-600">
                Like
              </Button>
              <Button variant="light" radius="lg" className="flex-1 text-slate-600 font-bold hover:text-green-900">
                Comment
              </Button>
              <Button variant="light" radius="lg" className="flex-1 text-slate-600 font-bold hover:text-blue-600">
                Share
              </Button>
            </div>

            <Divider className="my-3 opacity-50" />

            {/* 2. Add Comment Input */}
            <div className="flex items-center gap-3 pb-4">
              <Avatar size="sm" src={localStorage.getItem("userPhoto") || "https://api.dicebear.com/8.x/notionists/svg?seed=Fares"} />
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="w-full py-2 pr-10 px-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-900/20 transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-green-900 hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 3. Comments List (Top Comment) */}
            <div className="space-y-4">
              {/* ده مثال لكومنت واحد (اللي هيكون topComment في الـ API) */}
              <div className="flex gap-3">
                <Avatar size="sm" src="https://i.pravatar.cc/150?u=4e29026" />
                <div className="flex-1">
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Leslie Alexander</span>
                      <span className="text-[10px] text-slate-500">25m ago</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      This design looks amazing! Can't wait to see the final version of Wanas.
                    </p>
                  </div>

                  {/* Comment Actions */}
                  <div className="flex items-center gap-4 mt-1 ml-2 text-xs font-bold text-slate-500">
                    <button className="hover:text-rose-600 transition-colors">Like</button>
                    <button className="hover:text-green-900 transition-colors">Reply</button>
                  </div>
                </div>
              </div>

              {/* زرار عرض باقي الكومنتات - بيظهر بس لو commentsCount > 1 */}
              <button className="text-xs font-bold text-slate-500 hover:text-green-900 transition-colors ml-12">
                View all 12 comments...
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
