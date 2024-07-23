const Category = require("../Models/Category.model");
const Product = require("../Models/Product.model");


const createProduct = async (reqData) => {
    try {
        console.log('Received request data:', reqData);

        // Ensure top-level category
        let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
        if (!topLevel) {
            console.log('Creating top-level category:', reqData.topLevelCategory);
            topLevel = new Category({ name: reqData.topLevelCategory });
            // await topLevel.save();
            console.log('Top-level category created:', topLevel);
        } else {
            console.log('Found top-level category:', topLevel);
        }

        // Ensure second-level category
        let secondLevel = await Category.findOne({ 
            name: reqData.secondLevelCategory, 
            parentCategory: topLevel._id 
        });
        if (!secondLevel) {
            console.log('Creating second-level category:', reqData.secondLevelCategory);
            secondLevel = new Category({ 
                name: reqData.secondLevelCategory, 
                parentCategory: topLevel._id 
            });
            // await secondLevel.save();
            console.log('Second-level category created:', secondLevel);
        } else {
            console.log('Found second-level category:', secondLevel);
        }

        // Ensure third-level category
        let thirdLevel = await Category.findOne({ 
            name: reqData.thirdLevelCategory, 
            parentCategory: secondLevel._id 
        });
        if (!thirdLevel) {
            console.log('Creating third-level category:', reqData.thirdLevelCategory);
            thirdLevel = new Category({ 
                name: reqData.thirdLevelCategory, 
                parentCategory: secondLevel._id 
            });
            // await thirdLevel.save();
            console.log('Third-level category created:', thirdLevel);
        } else {
            console.log('Found third-level category:', thirdLevel);
        }

        // Create the new product
        console.log('Creating product with data:', reqData);
        const product = new Product({
            title: reqData.title,
            color: reqData.color,
            description: reqData.description,
            discountedPrice: reqData.discountedPrice,
            discountPercent: reqData.discountPercent,
            imageUrl: reqData.imageUrl,
            brand: reqData.brand,
            price: reqData.price,
            sizes: reqData.sizes,
            quantity: reqData.quantity,
            category: thirdLevel._id
        });

        const savedProduct = await product.save();
        console.log('Product created:', savedProduct);
        return savedProduct;
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error(`Error creating product: ${error.message}`);
    }
};


const deleteProduct = async (productId) => {
    await Product.findByIdAndDelete(productId);
    return "Product deleted successfully";
};

const updateProduct = async (productId, reqData) => {
    return Product.findByIdAndUpdate(productId, reqData, { new: true });
};

const findProductById = async (id) => {
    const product = await Product.findById(id).populate("category").exec();

    if (!product) {
        throw new Error(`Product not found with this id: ${id}`);
    }

    return product;
};

const getAllProduct = async (reqQuery) => {
    let { category, sizes, color, sort, minPrice, maxPrice, minDiscount, stock, pageNumber, pageSize } = reqQuery;

    pageSize = parseInt(pageSize) || 10;
    pageNumber = parseInt(pageNumber) || 1;

    let query = Product.find().populate("category");

    if (category) {
        const existingCategory = await Category.findOne({ name: category });
        if (existingCategory) {
            query = query.where("category").equals(existingCategory._id);
        } else {
            return { content: [], currentPage: 1, totalPages: 0 };
        }
    }

    if (color) {
        const colorSet = new Set(color.split(",").map(c => c.trim().toLowerCase()));
        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
        query = query.where("color").regex(colorRegex);
    }

    if (sizes) {
        const sizeSet = new Set(sizes);
        query = query.where("sizes.name").in([...sizeSet]);
    }

    if (minPrice && maxPrice) {
        query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    } else if (minPrice) {
        query = query.where("discountedPrice").gte(minPrice);
    } else if (maxPrice) {
        query = query.where("discountedPrice").lte(maxPrice);
    }

    if (minDiscount) {
        query = query.where("discountPercent").gte(minDiscount);
    }

    if (stock) {
        if (stock === "in_stock") {
            query = query.where("quantity").gt(0);
        } else if (stock === "out_of_stock") {
            query = query.where("quantity").lte(0);
        }
    }

    if (sort) {
        const sortDirection = sort === "price_high" ? -1 : 1;
        query = query.sort({ discountedPrice: sortDirection });
    }

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / pageSize);

    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);

    const products = await query.exec();

    return { content: products, currentPage: pageNumber, totalPages };
};

const createMultipleProduct = async (products) => {
    for (let product of products) {
        await createProduct(product);
    }
};

module.exports = { createProduct, deleteProduct, updateProduct, findProductById, getAllProduct, createMultipleProduct };
