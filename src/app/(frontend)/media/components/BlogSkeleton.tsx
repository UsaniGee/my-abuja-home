import React from 'react';

const BlogSkeleton = () => {
  return (
    <div className="space-y-20 animate-pulse">
      
      {/* 1. Featured Post Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 order-2 lg:order-1">
          <div className="flex gap-3">
            <div className="h-6 w-24 bg-gray-200 rounded-full" />
            <div className="h-6 w-32 bg-gray-100 rounded-full" />
          </div>
          <div className="h-10 w-full bg-gray-200 rounded-xl" />
          <div className="h-10 w-3/4 bg-gray-200 rounded-xl" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-1/2 bg-gray-100 rounded" />
          </div>
          <div className="h-6 w-32 bg-gray-200 rounded mt-4" />
        </div>
        <div className="h-[400px] bg-gray-200 rounded-[2.5rem] order-1 lg:order-2" />
      </div>

      {/* 2. Heading & Tabs Skeleton */}
      <div className="flex flex-col items-center space-y-6">
        <div className="h-8 w-40 bg-gray-200 rounded-full" />
        <div className="h-10 w-64 bg-gray-200 rounded-lg" />
        <div className="flex gap-3 pt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-100 rounded-full" />
          ))}
        </div>
      </div>

      {/* 3. Grid Skeleton (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-64 bg-gray-200 rounded-3xl w-full" />
            <div className="space-y-3">
              <div className="h-6 w-full bg-gray-200 rounded-lg" />
              <div className="h-4 w-3/4 bg-gray-100 rounded-lg" />
              <div className="flex gap-2 pt-2">
                <div className="h-3 w-20 bg-gray-100 rounded" />
                <div className="h-3 w-16 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSkeleton;