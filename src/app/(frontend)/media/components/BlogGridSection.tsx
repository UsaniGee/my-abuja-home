'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import BlogSkeleton from './BlogSkeleton';

const categories = ['All', 'News', 'Blogs', 'Social Media'];

const formatDate = (value?: string) =>
  value ? new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value)) : '';

const BlogGridSection = () => {
  const [activeTab, setActiveTab] = useState('All');

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['unified-posts', activeTab],
    queryFn: async () => {
      const filterParam = activeTab === 'All' ? '' : `&category=${activeTab}`;
      const res = await fetch(`/api/posts?limit=10${filterParam}`);
      if (!res.ok) throw new Error('Failed to fetch posts');
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="">
        <BlogSkeleton />
      </div>
    );
  }

  if (isError || !posts) return <p className="text-center text-red-500 py-10">Error loading feed.</p>;
  if (!posts?.length) return <p className="text-center text-gray-400 py-10">No posts found in this category.</p>;

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="space-y-16">
      {featuredPost && activeTab === 'All'  && (
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group">
          <div className="space-y-6 order-2 lg:order-1">
            <div className="flex items-center justify-between gap-3">
              <span className="px-6 py-1 border border-primary text-primary rounded-full font-medium">
                Tips & Tricks
              </span>
              <span className="text-gray-400 text-xs border-b border-[#E2E0DB] lg:w-1/2"></span>
              <span className="text-sm uppercase">{formatDate(featuredPost.publishDate)}</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 group-hover:text-primary transition-colors">
              {featuredPost.title}
            </h2>
            <p className="text-gray-600 line-clamp-3 leading-relaxed">
              {featuredPost.excerpt}
            </p>
            <Link href={`/media/${featuredPost.id}`} className="inline-block font-bold border-b-2 border-primary pb-1">
              Read Featured Story
            </Link>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl order-1 lg:order-2">
            <Image 
              src={featuredPost.image} 
              alt={featuredPost.title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              unoptimized
            />
          </div>
        </article>
      )}

      <div className="text-center space-y-8">
        <div className="flex justify-center items-center gap-4">
          <div className="h-px w-24 bg-linear-to-r from-transparent to-primary" />
          <span className="px-6 py-1 border border-primary text-primary rounded-full font-medium">Latest Updates</span>
          <div className="h-px w-24 bg-linear-to-l from-transparent to-primary" />
        </div>

        <div className="space-y-2">
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">Latest Posts</h3>
          <p className="text-gray-500 text-base">Celebrate a legacy of excellence and recognition</p>
        </div>

        <div className="flex flex-wrap justify-center items-center"> 
          <div className="flex flex-wrap justify-center items-center gap-3 bg-[#1F1E1E14] p-2 rounded-full w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === cat 
                ? 'bg-white text-black' 
                : ' text-black border-gray-100 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-16">
        {(activeTab === 'All' ? gridPosts : posts).map((post: any) => (
          <Link key={post.id} href={`/media/${post.id}`} className="block">
            <article className="group cursor-pointer flex flex-col space-y-4 h-full">
              <div className="relative h-64 rounded-xl overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase text-primary shadow-sm">
                  {post.type}
                </div>
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="flex-1 flex flex-col space-y-2">
                <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                   <span className="text-secondary font-black">{post.source || 'My Abuja Homes'}</span>
                   <span className="opacity-30">|</span>
                   <span>{formatDate(post.publishDate)}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogGridSection;