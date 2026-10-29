/**
 * stories.mjs — generate Storybook stories for @entropyscope/ui components.
 * Produces story files under packages/ui/stories/.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "packages/ui/stories";

function writeIfMissing(filePath, content) {
  if (existsSync(filePath)) return;
  mkdirSync(join(filePath, ".."), { recursive: true });
  writeFileSync(filePath, content);
}

const components = [
  "Button",
  "Card",
  "Badge",
  "Chart",
  "Stat",
  "Sparkline",
  "Gauge",
  "Timeline",
  "Table",
  "Toggle",
  "Slider",
  "Progress",
  "Select",
];

function storyTemplate(name) {
  return `import type { Meta, StoryObj } from "@storybook/react-vite";
import { ${name} } from "../src/components/${name}";

const meta: Meta<typeof ${name}> = {
  title: "UI/${name}",
  component: ${name},
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ${name}>;

export const Default: Story = {
  args: {},
};

export const Deterministic: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Deterministic ${name} component. Seed 7331.",
      },
    },
  },
};
`;
}

export function generateStories(_rand, _seed) {
  let count = 0;
  for (const name of components) {
    const file = `${ROOT}/${name}.stories.tsx`;
    writeIfMissing(file, storyTemplate(name));
    count++;
  }
  console.log(`   stories: ${count} files generated`);
  return count;
}
