import { queryClient } from "../main";

export const queryManager = {
  invalidate: (key: readonly string[]) =>
    queryClient.invalidateQueries({
      queryKey: key,
    }),
  refetch: (key: readonly string[]) =>
    queryClient.refetchQueries({ queryKey: key }),

  setQueryData: (key: readonly string[], data: any) =>
    queryClient.setQueryData(key, data),

  remove: (key: readonly string[]) =>
    queryClient.removeQueries({ queryKey: key }),

  resetAll: () => queryClient.clear(),
};
