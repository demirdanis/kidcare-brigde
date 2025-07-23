import fs from "fs";
import path from "path";

/**
 * Theme CSS generator for back-office design system
 * Generates CSS variables from semantic tokens and updates Tailwind config
 */

/**
 * Safely extract error message from unknown error type
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return String(error);
}

interface ColorTokens {
  [group: string]: {
    [shade: string]: string;
  };
}

interface SemanticTokens {
  [key: string]: {
    light: string;
    dark: string;
  };
}

class ThemeGenerator {
  private readonly backOfficeRoot: string;
  private readonly paths: {
    color: string;
    semantic: string;
    output: string;
    tailwindConfig: string;
  };

  private colorTokens: ColorTokens;
  private semanticTokens: SemanticTokens;

  constructor() {
    this.backOfficeRoot = this.resolveBackOfficeRoot();
    this.paths = this.initializePaths();
    this.colorTokens = this.loadColorTokens();
    this.semanticTokens = this.loadSemanticTokens();
  }

  /**
   * Resolves the back-office root directory
   */
  private resolveBackOfficeRoot(): string {
    const currentDir = process.cwd();

    // If we're already in back-office directory
    if (currentDir.includes("back-office")) {
      return currentDir.split("back-office")[0] + "back-office";
    }

    // Fallback to relative path from script location
    return path.resolve(__dirname, "../../../../");
  }

  /**
   * Initialize all file paths
   */
  private initializePaths() {
    return {
      color: path.resolve(this.backOfficeRoot, "src/theme/color.json"),
      semantic: path.resolve(this.backOfficeRoot, "src/theme/semantic.json"),
      output: path.resolve(this.backOfficeRoot, "src/theme/theme.css"),
      tailwindConfig: path.resolve(this.backOfficeRoot, "tailwind.config.js"),
    };
  }

  /**
   * Load and validate color tokens
   */
  private loadColorTokens(): ColorTokens {
    try {
      if (!fs.existsSync(this.paths.color)) {
        throw new Error(`Color tokens file not found: ${this.paths.color}`);
      }

      const content = fs.readFileSync(this.paths.color, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to load color tokens: ${getErrorMessage(error)}`);
    }
  }

  /**
   * Load and validate semantic tokens
   */
  private loadSemanticTokens(): SemanticTokens {
    try {
      if (!fs.existsSync(this.paths.semantic)) {
        throw new Error(
          `Semantic tokens file not found: ${this.paths.semantic}`
        );
      }

      const content = fs.readFileSync(this.paths.semantic, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      throw new Error(
        `Failed to load semantic tokens: ${getErrorMessage(error)}`
      );
    }
  }

  /**
   * Resolve color reference to actual hex value
   */
  private resolveColorReference(reference: string): string {
    // If it's already a hex color, return as is
    if (reference.startsWith("#")) {
      return reference;
    }

    const [group, shade] = reference.split("/");

    if (!this.colorTokens[group]) {
      throw new Error(`Color group not found: ${group}`);
    }

    if (!this.colorTokens[group][shade]) {
      throw new Error(`Color shade not found: ${group}/${shade}`);
    }

    return this.colorTokens[group][shade];
  }

  /**
   * Generate CSS variables for a specific theme mode
   */
  private generateCSSVariables(mode: "light" | "dark"): string {
    const variables = Object.entries(this.semanticTokens)
      .map(([tokenName, tokenValue]) => {
        const colorReference = tokenValue[mode];

        if (!colorReference) {
          console.warn(`No ${mode} mode defined for token: ${tokenName}`);
          return "";
        }

        try {
          const resolvedColor = this.resolveColorReference(colorReference);
          return `  --${tokenName}: ${resolvedColor};`;
        } catch (error) {
          console.error(
            `Error resolving ${tokenName} in ${mode} mode: ${getErrorMessage(
              error
            )}`
          );
          return "";
        }
      })
      .filter((variable) => variable !== "")
      .join("\n");

    return variables;
  }

  /**
   * Generate complete CSS with light and dark theme variables
   */
  private generateThemeCSS(): string {
    const lightVariables = this.generateCSSVariables("light");
    const darkVariables = this.generateCSSVariables("dark");

    return `:root {
${lightVariables}
}

[data-theme="dark"] {
${darkVariables}
}
`;
  }

  /**
   * Write generated CSS to output file
   */
  private writeCSSFile(): void {
    try {
      const css = this.generateThemeCSS();

      // Ensure output directory exists
      const outputDir = path.dirname(this.paths.output);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(this.paths.output, css);
      console.info(`✅ Theme CSS generated: ${this.paths.output}`);
    } catch (error) {
      throw new Error(`Failed to write CSS file: ${getErrorMessage(error)}`);
    }
  }

  /**
   * Extract colors configuration for Tailwind
   */
  private generateTailwindColors(): string {
    return Object.keys(this.semanticTokens)
      .map((tokenName) => `        "${tokenName}": "var(--${tokenName})",`)
      .join("\n");
  }

  /**
   * Update Tailwind configuration file
   */
  private updateTailwindConfig(): void {
    try {
      if (!fs.existsSync(this.paths.tailwindConfig)) {
        console.warn(
          `⚠️  Tailwind config not found: ${this.paths.tailwindConfig}`
        );
        return;
      }

      let tailwindConfig = fs.readFileSync(this.paths.tailwindConfig, "utf-8");

      const colorsStartIndex = tailwindConfig.indexOf("colors: {");
      if (colorsStartIndex === -1) {
        console.warn("⚠️  Colors section not found in Tailwind config");
        return;
      }

      const colorsEndIndex = tailwindConfig.indexOf("},", colorsStartIndex);
      if (colorsEndIndex === -1) {
        console.warn("⚠️  Colors section end not found in Tailwind config");
        return;
      }

      const newColors = this.generateTailwindColors();
      const beforeColors = tailwindConfig.slice(0, colorsStartIndex + 9);
      const afterColors = tailwindConfig.slice(colorsEndIndex);

      tailwindConfig = `${beforeColors}\n${newColors}\n      ${afterColors}`;

      fs.writeFileSync(this.paths.tailwindConfig, tailwindConfig);
      console.info("✅ Tailwind config updated successfully");
    } catch (error) {
      console.error(
        `❌ Failed to update Tailwind config: ${getErrorMessage(error)}`
      );
    }
  }

  /**
   * Print debug information about paths and tokens
   */
  private printDebugInfo(): void {
    console.info("\n📋 Configuration:");
    console.info(`   Root directory: ${this.backOfficeRoot}`);
    console.info(`   Color tokens: ${this.paths.color}`);
    console.info(`   Semantic tokens: ${this.paths.semantic}`);
    console.info(`   Output CSS: ${this.paths.output}`);
    console.info(`   Tailwind config: ${this.paths.tailwindConfig}`);
    console.info(
      `   Total semantic tokens: ${Object.keys(this.semanticTokens).length}`
    );
    console.info(
      `   Total color groups: ${Object.keys(this.colorTokens).length}\n`
    );
  }

  /**
   * Generate theme CSS and update configurations
   */
  public generate(): void {
    try {
      console.info("🎨 Starting theme generation...\n");

      this.printDebugInfo();
      this.writeCSSFile();
      this.updateTailwindConfig();

      console.info("\n🎉 Theme generation completed successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`❌ Theme generation failed: ${errorMessage}`);
      process.exit(1);
    }
  }
}

// Execute theme generation
const themeGenerator = new ThemeGenerator();
themeGenerator.generate();
