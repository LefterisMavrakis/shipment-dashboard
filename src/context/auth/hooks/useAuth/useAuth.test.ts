import { renderHook } from "@testing-library/react";
import { useAuth } from "./useAuth";

describe("useAuth", () => {
  it("should return undefined if used outside AuthProvider", () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current).toEqual(undefined);
  });

  //TODO: Add test for positive context assertion
});
