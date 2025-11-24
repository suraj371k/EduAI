"use client";

import { Button } from "@/components/ui/button";
import { useGetRoadmaps } from "@/hooks/useRoadmap";
import Link from "next/link";

export default function Roadmaps() {
  const { data: roadmaps, isPending, error } = useGetRoadmaps();

  if (isPending) return <RoadmapSkeleton />;
  if (error) return <ErrorMessage />;

  const isEmpty = !Array.isArray(roadmaps) || roadmaps.length === 0;

  return (
    <div className="min-h-screen bg-black p-6 text-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold bg-linear-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            Your Generated Roadmaps
          </h1>
          <p className="text-gray-400 mt-2">Manage and view your learning paths</p>
        </header>

        {isEmpty ? (
          <EmptyState />
        ) : (
          <RoadmapGrid roadmaps={roadmaps} />
        )}
      </div>
    </div>
  );
}

function RoadmapSkeleton() {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="p-6 bg-gray-900 border border-gray-800 rounded-xl h-48"
              >
                <div className="h-6 bg-gray-800 rounded mb-4"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2 mb-6"></div>
                <div className="h-10 bg-gray-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className="min-h-screen bg-black p-6 flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-100 mb-2">Unable to load roadmaps</h2>
        <p className="text-gray-400 mb-6">There was an error fetching your roadmaps. Please try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-lg font-medium transition-colors duration-200"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-12 text-center py-20 border-2 border-dashed border-gray-800 rounded-2xl bg-linear-to-b from-gray-900/50 to-gray-900/20">
      <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-100 mb-3">No roadmaps yet</h3>
      <p className="text-gray-400 max-w-sm mx-auto mb-8">
        Create your first roadmap to start organizing your learning journey
      </p>
      <button className="px-8 py-3 bg-linear-to-r from-gray-100 to-gray-300 text-gray-900 hover:from-gray-200 hover:to-gray-400 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
        Generate New Roadmap
      </button>
    </div>
  );
}

function RoadmapGrid({ roadmaps }: { roadmaps: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {roadmaps.map((roadmap) => (
        <RoadmapCard key={roadmap._id} roadmap={roadmap} />
      ))}
    </div>
  );
}

function RoadmapCard({ roadmap }: { roadmap: any }) {
  const topicCount = roadmap.topics?.length ?? 0;
  
  return (
    <div className="group p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-gray-900/20">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-100 group-hover:text-gray-50 line-clamp-2 mb-2">
            {roadmap.title}
          </h3>
          <p className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded-md inline-block">
            {roadmap.subject}
          </p>
        </div>
        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 group-hover:animate-pulse"></div>
      </div>

      <div className="flex items-center text-sm text-gray-400 mb-6">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span>
          <span className="font-medium text-gray-300">{topicCount}</span>{" "}
          {topicCount === 1 ? "topic" : "topics"}
        </span>
      </div>

      <div className="flex space-x-3">
        <Link href={`/roadmaps/${roadmap._id}`}>
        <Button className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-lg font-medium transition-colors duration-200 text-sm">
          View Details
        </Button>
        </Link>
        <button className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg transition-colors duration-200">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}