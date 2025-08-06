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

interface Properties {
  [category: string]: {
    [property: string]: string;
  };
}

class ThemeGenerator {
  private readonly backOfficeRoot: string;
  private readonly paths: {
    color: string;
    semantic: string;
    properties: string;
    output: string;
    tailwindConfig: string;
  };

  private colorTokens: ColorTokens;
  private semanticTokens: SemanticTokens;
  private properties: Properties;

  constructor() {
    this.backOfficeRoot = this.resolveBackOfficeRoot();
    this.paths = this.initializePaths();
    this.colorTokens = this.loadColorTokens();
    this.semanticTokens = this.loadSemanticTokens();
    this.properties = this.loadProperties();
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
      properties: path.resolve(
        this.backOfficeRoot,
        "src/theme/properties.json"
      ),
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
   * Load and validate properties
   */
  private loadProperties(): Properties {
    try {
      if (!fs.existsSync(this.paths.properties)) {
        console.warn(`⚠️  Properties file not found: ${this.paths.properties}`);
        return {};
      }

      const content = fs.readFileSync(this.paths.properties, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      console.warn(`⚠️  Failed to load properties: ${getErrorMessage(error)}`);
      return {};
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
   * Generate CSS properties variables
   */
  private generateCSSProperties(): string {
    if (Object.keys(this.properties).length === 0) {
      return "";
    }

    let variables = "";

    Object.entries(this.properties).forEach(([category, props]) => {
      Object.entries(props).forEach(([key, value]) => {
        const variableName =
          key === "default" ? category : `${category}-${key}`;
        variables += `  --${variableName}: ${value};\n`;
      });
    });

    return variables;
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
    const cssProperties = this.generateCSSProperties();

    return `:root {
${lightVariables}${cssProperties ? "\n" + cssProperties : ""}
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
   * Extract colors configuration for Tailwind with proper nested structure
   */
  private generateTailwindColors(): string {
    const baseColors = ["border", "input", "ring", "background", "foreground"];

    const nestedColors = [
      "primary",
      "secondary",
      "destructive",
      "muted",
      "accent",
      "popover",
      "card",
    ];

    const subKeys = ["foreground", "hover", "light", "lighter"]; // desteklenen varyasyonlar

    let colorConfig = "";

    // Add base colors
    baseColors.forEach((color) => {
      if (this.semanticTokens[color]) {
        colorConfig += `        ${color}: "var(--${color})",\n`;
      }
    });

    // Add nested colors
    nestedColors.forEach((color) => {
      const hasDefault = this.semanticTokens[color];
      const hasAnySub = subKeys.some(
        (subKey) => this.semanticTokens[`${color}-${subKey}`]
      );

      if (hasDefault || hasAnySub) {
        colorConfig += `        ${color}: {\n`;

        if (hasDefault) {
          colorConfig += `          DEFAULT: "var(--${color})",\n`;
        }

        subKeys.forEach((subKey) => {
          const key = `${color}-${subKey}`;
          if (this.semanticTokens[key]) {
            colorConfig += `          ${subKey}: "var(--${key})",\n`;
          }
        });

        colorConfig += `        },\n`;
      }
    });

    return colorConfig.trimEnd();
  }

  /**
   * Update Tailwind configuration file with proper nested structure
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

      // Find colors section start
      const colorsStartPattern = /colors:\s*{/;
      const colorsStartMatch = tailwindConfig.match(colorsStartPattern);

      if (!colorsStartMatch) {
        console.warn("⚠️  Colors section not found in Tailwind config");
        return;
      }

      const colorsStartIndex = tailwindConfig.indexOf(colorsStartMatch[0]);
      const searchStart = colorsStartIndex + colorsStartMatch[0].length;

      // Find the matching closing brace for colors section
      let braceCount = 1;
      let colorsEndIndex = searchStart;
      let inString = false;
      let stringChar = "";

      for (let i = searchStart; i < tailwindConfig.length; i++) {
        const char = tailwindConfig[i];

        if (!inString && (char === '"' || char === "'")) {
          inString = true;
          stringChar = char;
        } else if (
          inString &&
          char === stringChar &&
          tailwindConfig[i - 1] !== "\\"
        ) {
          inString = false;
        } else if (!inString) {
          if (char === "{") {
            braceCount++;
          } else if (char === "}") {
            braceCount--;
            if (braceCount === 0) {
              colorsEndIndex = i;
              break;
            }
          }
        }
      }

      const newColors = this.generateTailwindColors();
      const beforeColors = tailwindConfig.slice(
        0,
        colorsStartIndex + colorsStartMatch[0].length
      );
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
    console.info(`   Properties: ${this.paths.properties}`);
    console.info(`   Output CSS: ${this.paths.output}`);
    console.info(`   Tailwind config: ${this.paths.tailwindConfig}`);
    console.info(
      `   Total semantic tokens: ${Object.keys(this.semanticTokens).length}`
    );
    console.info(
      `   Total color groups: ${Object.keys(this.colorTokens).length}`
    );
    console.info(
      `   Total property categories: ${Object.keys(this.properties).length}\n`
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
