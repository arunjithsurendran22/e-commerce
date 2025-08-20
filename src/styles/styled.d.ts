import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    // 👇 you can be loose for now
    [key: string]: any;
  }
}
