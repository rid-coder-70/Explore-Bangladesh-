const images = require.context('../assets/images', false, /\.(png|jpe?g|svg)$/);

const imageMap = {};
images.keys().forEach((item) => {
    const key = item.replace('./', '');
    imageMap[key] = images(item);
});

export default imageMap;
