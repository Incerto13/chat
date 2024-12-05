import { ChatMessage } from "./Chat";


export type EventEmitter = {
    emit: (event: string, data: any) => void;
    on: (event: string, listener: (msg?: ChatMessage) => Promise<void> | void) => void;
  }
  