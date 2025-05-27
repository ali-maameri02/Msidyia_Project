import { useQuery } from "@tanstack/react-query";
import * as api from "./users.api";

export const usersQueryKeys = {
  profile: ["profile"],
};

export const useProfileQuery = () =>
  useQuery({
    queryKey: usersQueryKeys.profile,
    queryFn: api.getCurrentLoggedUserProfile,
  });
