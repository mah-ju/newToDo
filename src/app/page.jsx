"use client"
import { TodoList } from "@/components/TodoList";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <TodoList />
    </div>
  );
}
