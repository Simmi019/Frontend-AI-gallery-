import { Search, Filter, Moon, Sun, Grid, LayoutGrid } from "lucide-react"

const Header = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  darkMode,
  setDarkMode,
  layoutMode,
  setLayoutMode,
  handleImageUpload,
  filteredImages,
  favorites,
  uploadedImages,
}) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-top">
            <h1 className="header-title">AI Art Gallery</h1>
            <div className="header-controls-mobile">
              <button
                className="icon-button"
                onClick={() => setLayoutMode(layoutMode === "grid" ? "masonry" : "grid")}
                title={`Switch to ${layoutMode === "grid" ? "masonry" : "grid"} layout`}
              >
                {layoutMode === "grid" ? <LayoutGrid size={20} /> : <Grid size={20} />}
              </button>
              <button
                className="icon-button"
                onClick={() => setDarkMode(!darkMode)}
                title={`Switch to ${darkMode ? "light" : "dark"} mode`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          <div className="header-main">
            <div className="search-filters">
              <div className="search-container">
                <Search className="search-icon" size={16} />
                <input
                  type="text"
                  placeholder="Search by title or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-container">
                <Filter className="filter-icon" size={16} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-select"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="header-actions">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
                id="image-upload"
              />
              <button className="upload-button" onClick={() => document.getElementById("image-upload")?.click()}>
                Upload Images
              </button>

              <div className="header-controls-desktop">
                <button
                  className="icon-button"
                  onClick={() => setLayoutMode(layoutMode === "grid" ? "masonry" : "grid")}
                  title={`Switch to ${layoutMode === "grid" ? "masonry" : "grid"} layout`}
                >
                  {layoutMode === "grid" ? <LayoutGrid size={20} /> : <Grid size={20} />}
                </button>
                <button
                  className="icon-button"
                  onClick={() => setDarkMode(!darkMode)}
                  title={`Switch to ${darkMode ? "light" : "dark"} mode`}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="upload-button-mobile">
            <button className="upload-button mobile" onClick={() => document.getElementById("image-upload")?.click()}>
              Upload Images
            </button>
          </div>

          <div className="stats">
            <span className="stat-badge">
              {filteredImages.length} {filteredImages.length === 1 ? "Image" : "Images"}
            </span>
            <span className="stat-badge">{favorites.length} Favorites</span>
            {uploadedImages.length > 0 && <span className="stat-badge">{uploadedImages.length} Uploaded</span>}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
