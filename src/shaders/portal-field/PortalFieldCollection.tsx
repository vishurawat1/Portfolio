import { type CSSProperties } from "react";
import { CloudField, type NeuformIsolatedEffectProps } from "../neuform-isolated/NeuformIsolatedEffects";

export type PortalFieldVariant =
  | "cloud-field"
  | "flow-field"
  | "bell-field"
  | "stream-convergence";

export type PortalFieldCollectionProps = NeuformIsolatedEffectProps & {
  variant?: PortalFieldVariant;
  className?: string;
  style?: CSSProperties;
};

export function PortalFieldCollection({
  variant = "cloud-field",
  ...props
}: PortalFieldCollectionProps) {
  if (variant === "cloud-field") {
    return <CloudField {...props} />;
  }
  return <CloudField {...props} />;
}

export default PortalFieldCollection;
