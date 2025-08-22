import { TColor, TextSize, TFontWeight, Variant } from '@/app/interfaces';
import { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from 'react';
import "./styles.css"


interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement | HTMLHeadingElement>,
    HTMLParagraphElement
  > {
  color?: TColor;
  fontSize?: TextSize;
  fontWeight?: TFontWeight;
  variant?: Variant;
  extraClass?:string
}

const Text: FC<PropsWithChildren<Props>> = ({
  children,
  color = '', // Valor por defecto
  fontSize = 'XXS', // Valor por defecto
  fontWeight = 'regular', // Valor por defecto
  variant = 'p', // Valor por defecto
  extraClass,
  ...props
}) => {
  const Tag = variant;
  const classes = `text ${color} ${fontSize.toLowerCase()} ${fontWeight} ${extraClass ?? ""}`;

  return (
    <Tag className={classes}  {...props}>
      {children}
    </Tag>
  );
};

export default Text;