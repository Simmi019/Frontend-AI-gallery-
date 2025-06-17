import { useState, useEffect } from "react"
import { X, Heart, Download, Calendar, User, Tag, Share2, Info } from "lucide-react"

const ImageModal = ({ image, isOpen, onClose, isFavorite, onToggleFavorite, onDownload }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setImageLoaded(false)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, image.id])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: `Check out this AI-generated artwork: ${image.title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-image-section">
          {!imageLoaded && (
            <div className="modal-image-loading">
              <div className="loading-text">Loading...</div>
            </div>
          )}

          <img
            src={image.url || `https://picsum.photos/800/600?random=${image.id}`}
            alt={image.title}
            className={`modal-image ${imageLoaded ? "loaded" : "loading"}`}
            onLoad={() => setImageLoaded(true)}
          />

          <button className="modal-close-button" onClick={onClose} title="Close modal">
            <X size={20} />
          </button>

          <div className="modal-actions">
            <button className="modal-action-button" onClick={() => onToggleFavorite(image.id)} title="Toggle favorite">
              <Heart className={`heart-icon ${isFavorite ? "favorited" : ""}`} size={16} />
            </button>
            <button className="modal-action-button" onClick={() => onDownload(image)} title="Download image">
              <Download size={16} />
            </button>
            <button className="modal-action-button" onClick={handleShare} title="Share image">
              <Share2 size={16} />
            </button>
          </div>
        </div>

        <div className="modal-details-section">
          <div className="modal-details-content">
            <div className="modal-details-header">
              <div className="details-header-content">
                <Info size={20} />
                <h2 className="details-title">Details</h2>
              </div>
              <span className="details-category-badge">{image.category}</span>
            </div>

            <div className="modal-details-body">
              <div className="detail-section">
                <h3 className="image-title">{image.title}</h3>
                {image.description && <p className="image-description">{image.description}</p>}
              </div>

              <div className="detail-item-card">
                <User size={20} />
                <div>
                  <p className="detail-label">Created by</p>
                  <p className="detail-value">{image.creator}</p>
                </div>
              </div>

              <div className="detail-item-card">
                <Calendar size={20} />
                <div>
                  <p className="detail-label">Created on</p>
                  <p className="detail-value">
                    {new Date(image.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="detail-item-card">
                <div className="dimensions-icon">
                  <div className="dimensions-square"></div>
                </div>
                <div>
                  <p className="detail-label">Dimensions</p>
                  <p className="detail-value">
                    {image.width} × {image.height} pixels
                  </p>
                </div>
              </div>

              {image.tags.length > 0 && (
                <div className="tags-section">
                  <div className="tags-section-header">
                    <Tag size={16} />
                    <h4 className="tags-section-title">Tags</h4>
                  </div>
                  <div className="modal-tags-list">
                    {image.tags.map((tag, index) => (
                      <span key={index} className="modal-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-action-buttons">
                <button
                  className={`action-btn ${isFavorite ? "favorited" : "outline"}`}
                  onClick={() => onToggleFavorite(image.id)}
                >
                  <Heart className={`heart-icon ${isFavorite ? "favorited" : ""}`} size={16} />
                  {isFavorite ? "Favorited" : "Favorite"}
                </button>
                <button className="action-btn outline" onClick={() => onDownload(image)}>
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageModal
