declare interface TouchPoint {
  pageX?: number;
  pageY?: number;
  x?: number;
  y?: number;
}

declare interface MinaTouchEvent {
  touches: TouchPoint[];
  changedTouches?: TouchPoint[];
  type?: string;
  deltaX?: number;
  deltaY?: number;
  direction?: "Left" | "Right" | "Up" | "Down";
  singleZoom?: number;
  zoom?: number;
  angle?: number;
}

declare interface MinaTouchOptions {
  touchStart: (evt: MinaTouchEvent) => void;
  touchMove: (evt: MinaTouchEvent) => void;
  touchEnd: (evt: MinaTouchEvent) => void;
  touchCancel: (evt: MinaTouchEvent) => void;
  multipointStart: (evt: MinaTouchEvent) => void;
  multipointEnd: (evt: MinaTouchEvent) => void;
  tap: (evt: MinaTouchEvent) => void;
  doubleTap: (evt: MinaTouchEvent) => void;
  longTap: (evt: MinaTouchEvent) => void;
  singleTap: (evt: MinaTouchEvent) => void;
  rotate: (evt: MinaTouchEvent) => void;
  pinch: (evt: MinaTouchEvent) => void;
  pressMove: (evt: MinaTouchEvent) => void;
  swipe: (evt: MinaTouchEvent) => void;
}

declare class MinaTouch {
  constructor(
    _page: Record<string, any>,
    name: string,
    option?: Partial<MinaTouchOptions>
  );

  start(evt: MinaTouchEvent): void;
  move(evt: MinaTouchEvent): void;
  end(evt: MinaTouchEvent): void;
  cancel(evt: MinaTouchEvent): void;
  destroy(): void;
}

export default MinaTouch;
