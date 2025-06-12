import { useQuery } from "@tanstack/react-query";
import * as api from "./tutor.api";

export const tutorQueryKeys = {
  profile: (tutorId: string | number) => ["tutor-profile", tutorId],
  categories: ["tutor-categories"],
  subjects: (categoryId: string | number) => ["tutor-subjects", categoryId],
  topics: (subjectId: string | number) => ["tutor-topics", subjectId],
  availableSchedules: ["tutor-available-schedules"],
  groupClasses: (tutorId: string | number) => ["tutor-group-classes", tutorId],
};

export const useTutorProfileQuery = (tutorId: string | number) =>
  useQuery({
    queryKey: tutorQueryKeys.profile(tutorId),
    queryFn: () => api.getTutorProfile(tutorId),
    staleTime: 1000 * 60 * 50,
    refetchOnWindowFocus: false,

    enabled: !!tutorId,
  });

export const useTutorGroupClassesQuery = (tutorId: string | number) =>
  useQuery({
    queryKey: tutorQueryKeys.groupClasses(tutorId),
    queryFn: () => api.getTutorGroupClasses(tutorId),
    enabled: !!tutorId,
  });
