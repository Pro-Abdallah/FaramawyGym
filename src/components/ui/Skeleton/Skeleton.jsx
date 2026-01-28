import React from 'react';
import css from './Skeleton.module.css';

const Skeleton = ({ width, height, borderRadius, className }) => {
    const style = {
        width: width || '100%',
        height: height || '20px',
        borderRadius: borderRadius || '4px'
    };

    return <div className={`${css.skeleton} ${className}`} style={style}></div>;
};

export const SkeletonCircle = ({ size, className }) => (
    <Skeleton width={size} height={size} borderRadius="50%" className={className} />
);

export const SkeletonRectangle = ({ width, height, borderRadius, className }) => (
    <Skeleton width={width} height={height} borderRadius={borderRadius} className={className} />
);

export default Skeleton;
