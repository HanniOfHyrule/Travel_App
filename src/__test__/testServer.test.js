import { server } from "../server/server";

describe("server test", () => {
  it("Port should be listen to 8008", () => {
    expect(server).toBe(undefined);
  });
});
