import Product from "../models/Product"


export const createProduct = async (req, res) => {
    
      
    const {name, category, estatus, price, imgUrl} = req.body;

    try {
        const newProduct = new Product({
          name,
          category,
          estatus,
          price,
          imgUrl,
        });
    
        const productSaved = await newProduct.save();
    
        res.status(201).json(productSaved);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    };
    
    export const getProductById = async (req, res) => {
      const { productId } = req.params;
    
      const product = await Product.findById(productId);
      res.status(200).json(product);
    };
    
    export const getProducts = async (req, res) => {
      const products = await Product.find();
      return res.json(products);
    };
    
    export const updateProductById = async (req, res) => {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            {
              new: true,
            }
          );
          res.status(204).json(updatedProduct);
    };
    
    export const deleteProductById = async (req, res) => {
      const { productId } = req.params;
      await Product.findByIdAndDelete(productId);
      // el codigo 200 tambien es correcto
      res.status(204).json();
    };
    