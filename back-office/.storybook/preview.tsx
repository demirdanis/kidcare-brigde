import "../src/app/globals.css";

import type { Preview } from "@storybook/nextjs";
import React from "react";
import { comfortaa } from "../src/lib/fonts";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      // Font CSS variables'larını root'a inject et
      React.useEffect(() => {
        const root = document.documentElement;

        const tempDiv = document.createElement("div");
        tempDiv.className = comfortaa.className;
        document.body.appendChild(tempDiv);
        const comfortaaFont = getComputedStyle(tempDiv).fontFamily;
        document.body.removeChild(tempDiv);

        root.style.setProperty("--font-comfortaa", comfortaaFont);

        console.log("🎨 Fonts loaded:");
        console.log("Comfortaa:", comfortaaFont);
      }, []);

      return (
        <div className={`${comfortaa.variable} antialiased`}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
