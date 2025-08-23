import { TColor, TFontWeight } from '@/app/interfaces';
import { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from 'react';
import Text from '../Text/Text';
import "./styles.css"



interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  bgColor?: TColor;
  bgArrowColor?: TColor;
  arrowColor?: TColor;
  blur?:boolean;
  textColor?:TColor;
  borderColor?:"light-border"|"dark-border";
  fontWeight?:TFontWeight;
  extraClass?:string;
}

const Bottom: FC<PropsWithChildren<Props>> = ({
  children,
  bgColor = 'black-opaque', // Valor por defecto
  bgArrowColor = 'yellow', // Valor por defecto
  arrowColor = 'white', // Valor por defecto
  blur = true,
  textColor = null,
  borderColor='light-border',
  extraClass = null,
  //fontWeight=''
  ...props
}) => {

  const classes = `Bottom ${bgColor} ${blur? "blur":""} ${borderColor !== 'light-border' ? "dark-border":""} ${extraClass ?? ''}`;
  const arrowClasses = `Arrow ${bgArrowColor} arrow-${arrowColor}`;

  return (
    <button className={classes}  {...props}>
        <Text color={ textColor? textColor :undefined} fontWeight='medium'>
            {children}
        </Text>
        <div className={arrowClasses}>
            <svg   viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4169 7.0773L9.42578 1.08618C9.14395 0.804351 8.6856 0.804351 8.40377 1.08618C8.12194 1.368 8.12194 1.82636 8.40377 2.10818L13.1592 6.86361L1.09487 6.86516C0.695362 6.86516 0.371727 7.1888 0.371727 7.58831C0.371727 7.98782 0.695362 8.31145 1.09487 8.31145L13.1592 8.30991L8.40377 13.0653C8.12194 13.3472 8.12194 13.8055 8.40377 14.0873C8.6856 14.3692 9.14395 14.3692 9.42578 14.0873L15.4154 8.09776C15.6987 7.81748 15.6987 7.35913 15.4169 7.0773Z"/>
            </svg>
        </div>


    </button>
  );
};

export default Bottom;