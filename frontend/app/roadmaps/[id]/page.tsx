"use client";

import { useGetRoadmapById } from "@/hooks/useRoadmap";
import { useParams } from "next/navigation";

const RoadmapDetail = () => {
  const { id } = useParams();
  const { data: roadmap, isPending, error } = useGetRoadmapById(id as string);

  if (isPending) return <RoadmapDetailSkeleton />;
  if (error) return <RoadmapErrorState />;

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header Section */}
      <div className="border-b border-gray-800 bg-linear-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <span>Roadmaps</span>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300">{roadmap.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
                {roadmap.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                {roadmap.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="px-4 py-2 bg-gray-800 rounded-full text-sm font-medium">
                  {roadmap.subject}
                </div>
                <div className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-medium">
                  {roadmap.level}
                </div>
                <div className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium">
                  {roadmap.timeCommitment?.hoursPerWeek}h/week
                </div>
                <div className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium">
                  {roadmap.timeCommitment?.totalWeeks} weeks
                </div>
              </div>
            </div>

            <div className="lg:w-80 space-y-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="font-semibold text-gray-200 mb-3">
                  Time Commitment
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Weekly</span>
                    <span className="text-gray-200">
                      {roadmap.timeCommitment?.hoursPerWeek} hours
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-gray-200">
                      {roadmap.timeCommitment?.totalWeeks} weeks
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Hours</span>
                    <span className="text-gray-200">
                      {roadmap.timeCommitment?.hoursPerWeek &&
                      roadmap.timeCommitment?.totalWeeks
                        ? roadmap.timeCommitment.hoursPerWeek *
                          roadmap.timeCommitment.totalWeeks
                        : 0}{" "}
                      hours
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Learning Goals */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Learning Goals
              </h3>
              <ul className="space-y-3">
                {roadmap.learningGoals?.map((goal, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-300"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 shrink-0"></span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prerequisites */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                Prerequisites
              </h3>
              <ul className="space-y-3">
                {roadmap.prerequisites?.map((prereq, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-300"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 shrink-0"></span>
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Topics Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-100">Curriculum</h2>
              <span className="text-gray-400 text-sm">
                {roadmap.topics?.length || 0} topics
              </span>
            </div>

            <div className="space-y-6">
              {roadmap.topics?.map((topic, index) => (
                <div
                  key={topic.name || index}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg flex items-center justify-center text-sm font-bold text-gray-300">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-100 mb-2">
                          {topic.name}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {topic.estimatedHours} hours
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      {topic.difficulty}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      {topic.subtopics?.length || 0} subtopics
                    </div>
                  </div>

                  {/* Subtopics */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">
                      Subtopics
                    </h4>
                    <div className="space-y-2">
                      {topic.subtopics?.map((subtopic, subIndex) => (
                        <div
                          key={subtopic.name || subIndex}
                          className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-gray-700 rounded text-xs flex items-center justify-center text-gray-300">
                              {subIndex + 1}
                            </div>
                            <span className="text-sm text-gray-300">
                              {subtopic.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {subtopic.estimatedMinutes !== undefined
                              ? `${Math.round(subtopic.estimatedMinutes / 60)}h`
                              : "N/A"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Takeaways */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">
                      Key Takeaways
                    </h4>
                    <ul className="space-y-2">
                      {topic.keyTakeaways?.map((takeaway, takeawayIndex) => (
                        <li
                          key={takeawayIndex}
                          className="flex items-start gap-2 text-sm text-gray-400"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 shrink-0"></span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resources */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">
                      Resources
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {topic.resources?.map((resource, resourceIndex) => (
                        <a
                          key={resource.url || resourceIndex}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-sm text-gray-300 transition-colors duration-200"
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              resource.type === "course"
                                ? "bg-green-400"
                                : resource.type === "documentation"
                                ? "bg-blue-400"
                                : resource.type === "video"
                                ? "bg-purple-400"
                                : resource.type === "article"
                                ? "bg-yellow-400"
                                : "bg-gray-400"
                            }`}
                          ></div>
                          <span className="truncate">{resource.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoadmapDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="border-b border-gray-800 bg-linear-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-800 rounded w-32 mb-4"></div>
            <div className="h-12 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-800 rounded w-1/2 mb-6"></div>
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-800 rounded w-24"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-800 rounded w-32 mb-4"></div>
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="h-4 bg-gray-800 rounded flex-1"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 space-y-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-800 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-2/3 mb-6"></div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-800 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const RoadmapErrorState = () => {
  return (
    <div className="min-h-screen bg-black p-6 flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-100 mb-2">
          Failed to load roadmap
        </h2>
        <p className="text-gray-400 mb-6">
          There was an error fetching the roadmap details. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-lg font-medium transition-colors duration-200"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default RoadmapDetail;
