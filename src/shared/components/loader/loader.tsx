import { Icon } from '../icon/icon';
import style from './loader.module.scss';

export const Loader = () => {
    return (
        <div className={`${style.loader} show loader`}>
            <Icon icon='logo' />
        </div>
    )
}