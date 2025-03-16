import "styled-components";
import type { ResponsiveTheme } from "@/@interfaces/themes";
import { FlocThemeLight } from "@/theme/light";

declare module "styled-components" {
    type FlocType = typeof FlocThemeLight;
    export interface DefaultTheme extends ResponsiveTheme, FlocType {}
}
