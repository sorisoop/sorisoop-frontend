declare module "event-source-polyfill" {
  export interface EventSourcePolyfillInit extends EventSourceInit {
    heartbeatTimeout?: number;
  }

  export class EventSourcePolyfill extends EventSource {
    constructor(url: string, eventSourceInitDict?: EventSourcePolyfillInit);
  }
}
