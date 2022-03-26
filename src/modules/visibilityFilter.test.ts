import {
  setVisibilityFilter,
  VisibilityFilter,
  visibilityFilterReducer,
} from "./visibilityFilter";

describe("visibilityFilterReducer", () => {
  it("should handle initial state", () => {
    expect(
      visibilityFilterReducer(undefined, {
        type: undefined,
      })
    ).toBe(VisibilityFilter.SHOW_ALL);
  });

  it("should handle setVisibilityFilter", () => {
    expect(
      visibilityFilterReducer(VisibilityFilter.SHOW_ACTIVE, {
        type: setVisibilityFilter.type,
        payload: VisibilityFilter.SHOW_COMPLETED,
      })
    ).toBe(VisibilityFilter.SHOW_COMPLETED);
  });
});
