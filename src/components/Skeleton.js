import React from "react";
import "../Css/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const SkeletonComponent = () => {
  return (
    <div className="skeleton-container">
      <SkeletonTheme color="lightgray" highlightColor="var(--light-gray)">
        <Skeleton count={1} height={20} width={400} />
        <Skeleton count={1} height={15} />
        <Skeleton count={1} height={15} />
        <Skeleton count={1} height={15} />
        <Skeleton count={1} height={15} />
        <Skeleton count={1} height={15} />
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonComponent;
