"use client";

import { useSyncExternalStore } from "react";

import {
  readLearningState,
  subscribeLearningState,
} from "@/src/modules/progress/local-learning";

export function useLocalLearningState() {
  return useSyncExternalStore(
    subscribeLearningState,
    readLearningState,
    readLearningState,
  );
}
