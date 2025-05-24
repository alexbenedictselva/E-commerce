const prodSchema = require('../Schema/product-schema');

const inserManyImages = async (req, res) => {
    try {
        const productsToInsert = [
            {
                "product": "Noise Smart Watch",
                "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1747990101/ecommerce-images/pf4wa2rblg0zvrcpqjlg.jpg",
                "category": "Electronics",
                "price": 3499,
                "stock": 15,
                "tags": ["smartwatch", "wearable", "tech"]
            }
              
            // {
            //     "product": "Product 1",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538927/n8_rspbff.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales1"]
            // },
            // {
            //     "product": "Product 2",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538925/n7_l3viu6.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales1"]
            // },
            // {
            //     "product": "Product 3",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538924/n6_lasjij.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales1"]
            // },
            // {
            //     "product": "Product 4",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538923/n5_klc4fa.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales1"]
            // },
            // {
            //     "product": "Product 5",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538920/n4_p73zlz.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales1"]
            // },
            // {
            //     "product": "Product 6",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538918/n3_mzqg8g.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales1"]
            // },
            // {
            //     "product": "Product 7",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538917/n2_m5kugh.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales1"]
            // },
            // {
            //     "product": "Product 8",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538915/n1_mxipxu.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales1"]
            // },
            // {
            //     "product": "Product 9",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538914/f8_fqrreb.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales2"]
            // },
            // {
            //     "product": "Product 10",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538913/f7_qxvwpi.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales2"]
            // },
            // {
            //     "product": "Product 11",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538910/f6_smaaci.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales2"]
            // },
            // {
            //     "product": "Product 12",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538909/f5_tgirfe.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales2"]
            // },
            // {
            //     "product": "Product 13",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538907/f4_htlhag.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales2"]
            // },
            // {
            //     "product": "Product 14",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538906/f3_ifkr3c.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales2"]
            // },
            // {
            //     "product": "Product 15",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538905/f2_o2z46u.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales2"]
            // },
            // {
            //     "product": "Product 16",
            //     "image": "https://res.cloudinary.com/dni5usgip/image/upload/v1734538905/f1_pxwztc.jpg",
            //     "category": "Default Category",
            //     "price": 100,
            //     "stock": 10,
            //     "tags": ["default", "sales2"]
            // }
        ];

        const InsertImages = await prodSchema.insertMany(productsToInsert);
        if (InsertImages) {
            return res.json({
                success: true,
                data: InsertImages
            });
        }
        res.json({
            success: false,
            message: "cant upload these images"
        });
      
    } catch (e) {
        console.log("Error in inserting images : ",e);
  }
};



const GetImgSales1 = async (req, res) => {
    try {
        const salesOne = await prodSchema.find({ tags: { $in: ['sales1'] } });
        if (!salesOne) {
            return res.json({
                success: false,
                message: "Can't get the images for sales 1"
            });
        }
        res.json({
            success: true,
            data: salesOne
        });
    } catch (e) {
        console.log("Error in fetching images for sales 1 :",e);
    }
};
const GetImgSales2 = async (req, res) => {
    try {
        const salesTwo = await prodSchema.find({ tags: { $in: ['sales2'] } });
        if (!salesTwo) {
            return res.json({
                success: false,
                message: "Can't get the images for sales 2"
            });
        }
        res.json({
            success: true,
            data: salesTwo
        });
    } catch (e) {
        console.log("Error in fetching images for sales 2 :",e);
    }
}


module.exports = {inserManyImages,GetImgSales1,GetImgSales2};