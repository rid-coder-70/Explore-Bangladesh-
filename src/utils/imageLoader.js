// Use Vite's import.meta.glob for dynamic asset loading
const images = import.meta.glob('../assets/images/*.{png,jpg,jpeg,svg}', { eager: true });

const imageMap = {};
Object.keys(images).forEach((path) => {
    // Extract filename from path (e.g., "../assets/images/image.jpg" -> "image.jpg")
    const key = path.split('/').pop();
    imageMap[key] = images[path].default;
});

export default imageMap;
