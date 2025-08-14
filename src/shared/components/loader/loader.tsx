import { Icon } from '../icon/icon';
import style from './loader.module.scss';

export const Loader = () => {
    return (
        <div className={`${style.loader} show loader`}>
            <img src="/images/logo-gray.png" alt="Loading..." />
            <div className="bar-loading">
                <span>0%</span>
                <div className="bar"></div>
            </div>
        </div>
    )
}