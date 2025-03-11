import { toast } from "./store";

export function T(text = "", type = "info") {
  toast.set({ text, type });
  const countdown = text.length * 140;
  setTimeout(() => {
    toast.set({ text: "", type: "" });
  }, countdown);
}

export { default } from "./Toast.svelte";
