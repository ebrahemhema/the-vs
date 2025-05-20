// Function to read Excel file and return products
async function readExcelFile() {
    try {
        const response = await fetch('الفئات/الفئات.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        
        const products = [];
        
        // Read each sheet (category)
        workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            
            data.forEach(row => {
                if (row['اسم المنتج'] && row['السعر']) {
                    products.push({
                        name: row['اسم المنتج'],
                        price: parseFloat(row['السعر']),
                        imageCode: row['كود الصورة'] || '1', // Default to '1' if no image code
                        category: sheetName
                    });
                }
            });
        });
        
        return products;
    } catch (error) {
        console.error('Error reading Excel file:', error);
        return [];
    }
}

// Function to get image path based on code
function getImagePath(imageCode) {
    // Try to find the image with the specific code
    const imagePath = `صور/${imageCode}.png`;
    // If image doesn't exist, use default image
    return imagePath;
} 