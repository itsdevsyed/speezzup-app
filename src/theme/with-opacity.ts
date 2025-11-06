import { platformSelect } from "nativewind/theme";

export function withOpacity(
  variableNameOrColor: string,
  opacityValue?: number
): any {
  // Case 1: Direct color string with opacity number (used in Button)
  if (opacityValue !== undefined) {
    return platformSelect({
      ios: `rgba(${variableNameOrColor}, ${opacityValue})`,
      android: `rgba(${variableNameOrColor}, ${opacityValue})`,
    });
  }

  // Case 2: Tailwind color function callback
  return ({ opacityValue: twOpacity }: { opacityValue?: string }) => {
    if (twOpacity !== undefined) {
      return platformSelect({
        ios: `rgb(var(--${variableNameOrColor}) / ${twOpacity})`,
        android: `rgb(var(--android-${variableNameOrColor}) / ${twOpacity})`,
      });
    }
    return platformSelect({
      ios: `rgb(var(--${variableNameOrColor}))`,
      android: `rgb(var(--android-${variableNameOrColor}))`,
    });
  };
}
