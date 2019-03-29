const lib = require("../scripts/lib");
// test("Asolute", () => {
//   expect(1).toBe(lib.absolute(1));
// });
describe("Abslute", () => {
  it("for ng", () => {
    expect(1).toBe(lib.absolute(-1));
  });
  it("for pos", () => {
    expect(1).toBe(lib.absolute(1));
  });
  it("for 0", () => {
    expect(0).toBe(lib.absolute(0));
  });
});
describe("greeting test", () => {
  it("match", () => {
    //expect(lib.greeting("Arun")).toContain("Arun");
    expect(lib.greeting("Arun")).toMatch(/Arun/);
  });
});
