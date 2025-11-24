import {
  generateRoadmap,
  getRoadmap,
  getRoadmapById,
} from "@/services/roadmap.services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useRoadmap = () => {
  return useMutation({
    mutationFn: generateRoadmap,
  });
};

export const useGetRoadmaps = () => {
  return useQuery({
    queryKey: ["roadmaps"],
    queryFn: getRoadmap,
    staleTime: 1000 * 60,
  });
};

export const useGetRoadmapById = (id: string) => {
    return useQuery({
      queryKey: ["roadmap", id],
      queryFn: () => getRoadmapById(id),
      enabled: !!id,         
      staleTime: 1000 * 60, 
    });
  };
  
