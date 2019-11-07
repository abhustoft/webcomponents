module.exports = {
    // Needed for transpiling CSS grid to IE targets
    plugins: [require('autoprefixer')({grid: true})],
};
