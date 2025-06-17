import { useState } from "react"
import { Heart, Download, Calendar, User, Tag } from "lucide-react"

const ImageCard = ({ image, isFavorite, onToggleFavorite, onImageClick, onDownload }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleDownload = (e) => {
    e.stopPropagation()
    onDownload(image)
  }

  const handleFavorite = (e) => {
    e.stopPropagation()
    onToggleFavorite(image.id)
  }

  return (
    <div className="image-card" onClick={() => onImageClick(image)}>
      <div className="image-container">
        {!imageLoaded && !imageError && <div className="image-placeholder" />}

        {imageError ? (
          <div className="image-error">
            <div className="error-content">
              <div className="error-icon">🖼️</div>
              <p className="error-text">Image not available</p>
            </div>
          </div>
        ) : (
          <img
            src={image.url || `https://picsum.photos/400/600?random=${image.id}`}
            alt={image.title}
            className={`image fixed-aspect ${imageLoaded ? "loaded" : "loading"}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}

        <div className="image-overlay">
          <div className="overlay-actions">
            <button className="action-button" onClick={handleFavorite} title="Toggle favorite">
              <Heart className={`heart-icon ${isFavorite ? "favorited" : ""}`} size={16} />
            </button>
            <button className="action-button" onClick={handleDownload} title="Download image">
              <Download size={16} />
            </button>
          </div>
        </div>

        <div className="category-badge">{image.category}</div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{image.title}</h3>

        <div className="card-details">
          <div className="detail-item">
            <User size={14} />
            <span>{image.creator}</span>
          </div>

          <div className="detail-item">
            <Calendar size={14} />
            <span>{new Date(image.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {image.tags.length > 0 && (
          <div className="card-tags">
            <div className="tags-header">
              <Tag size={12} />
              <span className="tags-label">Tags</span>
            </div>
            <div className="tags-list">
              {image.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
              {image.tags.length > 3 && <span className="tag">+{image.tags.length - 3}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageCard