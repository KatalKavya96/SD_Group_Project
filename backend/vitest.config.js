import { defineConfig } from "vitest/config";
export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        //since our tests are outside backend we write a general test files location extractor
        include: ["../tests/**/*.test.ts"],
    },
});
//# sourceMappingURL=vitest.config.js.map