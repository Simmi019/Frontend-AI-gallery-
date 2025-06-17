import { useState, useEffect, useMemo } from "react"
import ImageCard from "./components/imagecard"
import ImageModal from "./components/imagemodal"
import ImageSkeleton from "./components/imageskeleton"
import Header from "./components/header"
import { mockImages } from "./data/mockimages"
import { useLocalStorage } from "./hooks/uselocalstorage"
import { useKeyboard } from "./hooks/usekeyboard"
import "./App.css"

function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState(null)
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false)
  const [favorites, setFavorites] = useLocalStorage("favorites", [])
  const [layoutMode, setLayoutMode] = useState("masonry")
  const [uploadedImages, setUploadedImages] = useState([])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setImages([...mockImages, ...uploadedImages])
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [uploadedImages])

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Keyboard navigation
  useKeyboard("Escape", () => setSelectedImage(null))

  // Get unique categories
  const categories = useMemo(() => {
    const cats = images.map((img) => img.category)
    return ["all", ...Array.from(new Set(cats))]
  }, [images])

  // Filter and search images
  const filteredImages = useMemo(() => {
    return images.filter((image) => {
      const matchesSearch =
        image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || image.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [images, searchTerm, selectedCategory])

  const toggleFavorite = (imageId) => {
    setFavorites((prev) => (prev.includes(imageId) ? prev.filter((id) => id !== imageId) : [...prev, imageId]))
  }

  const handleImageUpload = (event) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage = {
            id: `uploaded-${Date.now()}-${index}`,
            title: file.name.replace(/\.[^/.]+$/, ""),
            url: e.target?.result,
            creator: "User Upload",
            createdAt: new Date().toISOString(),
            category: "uploaded",
            tags: ["user-generated"],
            description: "User uploaded image",
            width: 400,
            height: 600,
          }
          setUploadedImages((prev) => [...prev, newImage])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const downloadImage = async (image) => {
    try {
      const response = await fetch(image.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${image.title}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
        handleImageUpload={handleImageUpload}
        filteredImages={filteredImages}
        favorites={favorites}
        uploadedImages={uploadedImages}
      />

      <main className="main-content">
        {loading ? (
          <div className={`image-grid ${layoutMode === "grid" ? "grid-layout" : "masonry-layout"}`}>
            {Array.from({ length: 12 }).map((_, index) => (
              <ImageSkeleton key={index} />
            ))}
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🎨</div>
            <h2 className="no-results-title">No images found</h2>
            <p className="no-results-text">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className={`image-grid ${layoutMode === "grid" ? "grid-layout" : "masonry-layout"}`}>
            {filteredImages.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                isFavorite={favorites.includes(image.id)}
                onToggleFavorite={toggleFavorite}
                onImageClick={setSelectedImage}
                onDownload={downloadImage}
                layoutMode={layoutMode}
              />
            ))}
          </div>
        )}
      </main>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          isFavorite={favorites.includes(selectedImage.id)}
          onToggleFavorite={toggleFavorite}
          onDownload={downloadImage}
        />
      )}
    </div>
  )
}

export default App
