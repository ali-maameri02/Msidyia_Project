import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./chat.api";
import { IUser } from "../../interfaces/IUser";
import { queryClient } from "../../main";
import { IExtendedMessage } from "../../interfaces/IExtendedMessage";
import { ICreateMessageDTO } from "../../interfaces/dto/ICreateMessageDTO";
import { IChatUser } from "../../interfaces/IChatUser";
import { IMessage } from "../../interfaces/IMessage";

export const useLatestMessagesQuery = (currentUser?: IUser) =>
  useQuery({
    queryKey: ["latestChats"],
    queryFn: api.getLatestMessages,
    refetchInterval: 3000,
    staleTime: 0,
    enabled: !!currentUser,
  });

export const useSearchMessagesUsersQuery = (searchQuery: string) =>
  useQuery({
    queryKey: ["searchUsers", searchQuery],
    queryFn: () => api.searchUsers(searchQuery),
    enabled: !!searchQuery.trim() && searchQuery.length >= 2,
    staleTime: 1000 * 30, // 30 seconds
  });

export const useMessagesBetweenUsQuery = (
  selectedUserId: number | null,
  currentUser?: IUser
) =>
  useQuery({
    queryKey: ["messages", selectedUserId],
    queryFn: () => api.getMessagesBetweenus(selectedUserId!),
    enabled: !!selectedUserId && !!currentUser,
    refetchInterval: 3000,
    staleTime: 0,
  });

export const useSendMessageMutatoin = (
  currentUser?: IUser,
  selectedUser?: IChatUser,
  selectedUserId?: number | null
) =>
  useMutation({
    mutationFn: (data: ICreateMessageDTO) => api.sendMessageToUser(data),
    onMutate: async ({ Receiver, Content }) => {
      if (!currentUser) return;

      await queryClient.cancelQueries({ queryKey: ["messages", Receiver] });
      const previousMessages = queryClient.getQueryData(["messages", Receiver]);

      const optimisticMessage: IExtendedMessage = {
        id: Math.random() * 1000,
        sender_username: currentUser.username,
        receiver_username: selectedUser?.username || "",
        receiver_avatar: selectedUser?.avatar || null,
        Sender: currentUser.id,
        Receiver,
        Content,
        Time: new Date().toISOString(),
        isOwn: true,
        isOptimistic: true,
      };

      queryClient.setQueryData(
        ["messages", Receiver],
        (old: IMessage[] = []) => [...old, optimisticMessage]
      );

      return { previousMessages };
    },
    onError: (err, variables, context) => {
      console.error(err);
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["messages", variables.Receiver],
          context.previousMessages
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", selectedUserId] });
      queryClient.invalidateQueries({ queryKey: ["latestChats"] });
    },
  });

export const useGetUserByIdQuery = (userId: number | null) =>
  useQuery({
    queryKey: ["user", userId],
    queryFn: () => api.getUserById(userId!),
    enabled: !!userId,
  });
