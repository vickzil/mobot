import { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
interface Props extends ViewProps {
    onBeginHidden?: Function;
    onHide?: Function;
    onBeginDisplayed?: Function;
    onDisplay?: Function;
    onTouchTop?: Function;
    onTouchBottom?: Function;
    bottomOffset?: number;
    topOffset?: number;
}
export declare const TriggeringView: FunctionComponent<Props>;
export {};
