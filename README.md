## AI Art Gallery

A responsive and visually appealing AI Art Gallery built with React.js. This app showcases a collection of AI-generated images with features for browsing, searching, filtering, and interacting with artwork.

## Features

### Core
- Responsive Layout (desktop/tablet/mobile)
- Image Grid with optional Masonry view
- Image Modal with metadata
- Search by title or keywords
- Category-based Filtering
- Light/Dark Mode toggle
- Smooth loading skeletons

### Bonus
- Download images
- Like/Favorite images (stored locally)
- Upload custom images (local only)
- Share via Web Share API
- View statistics (total images, favorites, uploads)
- Accessibility support (keyboard, screen readers)

## Technology Stack

- React.js 18
- JavaScript (ES6+)
- CSS3 (custom properties)
- Icons: Lucide React
- State Management: React Hooks + LocalStorage
- Image Loading: Native HTML5 with progressive loading

## Installation
bash
git clone <repository-url>
cd ai-art-gallery
npm install
npm start

Visit: [http://localhost:3000](http://localhost:3000)

## Project Structure

ai-art-gallery/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json


## Customization

### Add New Images

Edit `src/data/mockImages.js`:

javascript
{
  id: 'unique-id',
  title: 'Image Title',
  url: 'https://example.com/image.jpg',
  creator: 'AI Model Name',
  createdAt: '2024-01-01T00:00:00Z',
  category: 'category-name',
  tags: ['tag1', 'tag2'],
  description: 'Image description',
  width: 400,
  height: 600
}

### Styling

* Modify CSS variables in `App.css`
* Customize component styles

## Deployment

### Netlify

```bash
npm run build
```

Deploy `/build` to Netlify

### Vercel

* Push code to GitHub
* Connect GitHub to Vercel
* Deploy (zero config)

### GitHub Pages

```bash
npm install --save-dev gh-pages
npm run deploy
```

## Contributing

```bash
git checkout -b feature-name
git commit -m 'Add feature'
git push origin feature-name
```

Then open a pull request.

Built with ❤️ using React.js and modern web technologies.

