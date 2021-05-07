import { useMediaQuery } from "@material-ui/core";

export function useIsMobile() {
  return useMediaQuery((theme: any) => theme.breakpoints.down("xs"));
}
