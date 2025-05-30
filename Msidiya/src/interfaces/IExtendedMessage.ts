import { IMessage } from "./IMessage";

export  interface IExtendedMessage extends IMessage {
  isOwn?: boolean;
  isOptimistic?: boolean;
}

