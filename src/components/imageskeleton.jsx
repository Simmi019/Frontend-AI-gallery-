const ImageSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image" />
      <div className="skeleton-content">
        <div className="skeleton-title" />
        <div className="skeleton-details">
          <div className="skeleton-detail-item">
            <div className="skeleton-icon" />
            <div className="skeleton-text" />
          </div>
          <div className="skeleton-detail-item">
            <div className="skeleton-icon" />
            <div className="skeleton-text" />
          </div>
        </div>
        <div className="skeleton-tags">
          <div className="skeleton-tag" />
          <div className="skeleton-tag" />
          <div className="skeleton-tag" />
        </div>
      </div>
    </div>
  )
}

export default ImageSkeleton
