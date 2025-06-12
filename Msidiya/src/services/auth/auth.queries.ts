import { useMutation } from "@tanstack/react-query";
import * as api from "./auth.api";
import { queryManager } from "../query.manager";
import { usersQueryKeys } from "../users/users.queries";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => api.login(username, password),
    onSuccess: () => {
      queryManager.invalidate(usersQueryKeys.profile);
    },
  });

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: api.logout,
    onSuccess: () => {
      queryManager.setQueryData(usersQueryKeys.profile, null);
      queryManager.invalidate(usersQueryKeys.profile);
    },
  });
