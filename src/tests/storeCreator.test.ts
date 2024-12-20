import { beforeEach, describe, expect, it, vi } from "vitest";
import { createStore } from "../scripts";

// Mock для localStorage и sessionStorage
class StorageMock {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  clear(): void {
    this.store = {};
  }

  removeItem(key: string): void {
    delete this.store[key];
  }
}

const localStorageMock = new StorageMock();
const sessionStorageMock = new StorageMock();

Object.defineProperty(global, "localStorage", { value: localStorageMock });
Object.defineProperty(global, "sessionStorage", { value: sessionStorageMock });

describe("createStore", () => {
  beforeEach(() => {
    localStorageMock.clear();
    sessionStorageMock.clear();
  });

  it("should create a store with initial state", () => {
    const store = createStore({ count: 0 });

    expect(store.get("count")).toBe(0);
  });

  it("should update state reactively", () => {
    const store = createStore({ count: 0 });
    const subscriber = vi.fn();

    store.subscribe("count", subscriber);
    store.set("count", 5);

    expect(store.get("count")).toBe(5);
    expect(subscriber).toHaveBeenCalledWith(5);
  });

  it("should support updater function in set", () => {
    const store = createStore({ count: 0 });

    store.set("count", (prev) => prev + 10);

    expect(store.get("count")).toBe(10);
  });

  it("should persist state to localStorage", () => {
    const key = "testStore";
    const store = createStore(
      { count: 0 },
      { storageType: "localStorage", key }
    );

    store.set("count", 42);

    const savedState = JSON.parse(localStorage.getItem(key) || "{}");
    expect(savedState.count).toBe(42);
  });

  it("should restore state from localStorage", () => {
    const key = "testStore";
    localStorage.setItem(key, JSON.stringify({ count: 99 }));

    const store = createStore(
      { count: 0 },
      { storageType: "localStorage", key }
    );

    expect(store.get("count")).toBe(99);
  });

  it("should persist state to sessionStorage", () => {
    const key = "testSessionStore";
    const store = createStore(
      { count: 0 },
      { storageType: "sessionStorage", key }
    );

    store.set("count", 88);

    const savedState = JSON.parse(sessionStorage.getItem(key) || "{}");
    expect(savedState.count).toBe(88);
  });

  it("should restore state from sessionStorage", () => {
    const key = "testSessionStore";
    sessionStorage.setItem(key, JSON.stringify({ count: 77 }));

    const store = createStore(
      { count: 0 },
      { storageType: "sessionStorage", key }
    );

    expect(store.get("count")).toBe(77);
  });

  it("should notify subscribers immediately with the current value", () => {
    const store = createStore({ count: 0 });
    const subscriber = vi.fn();

    store.subscribe("count", subscriber);

    expect(subscriber).toHaveBeenCalledWith(0);
  });
});
