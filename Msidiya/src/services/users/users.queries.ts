import { useQuery, useMutation } from "@tanstack/react-query";
import * as api from "./users.api";
import { createUser } from "./users.api";

export const usersQueryKeys = {
  profile: ["profile"],
};

export const useProfileQuery = () =>
  useQuery({
    queryKey: usersQueryKeys.profile,
    queryFn: api.getCurrentLoggedUserProfile,
  });

export const useCreateUserMutation = () =>
  useMutation({
    mutationFn: ({
      username,
      password,
      Role,
    }: {
      username: string;
      password: string;
      Role: string;
    }) => createUser(username, password, Role),
  });
