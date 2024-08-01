const { Schema, model, Types: { Decimal128 } } = require("mongoose");

const productSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    category: {
        type: String
    },
    image: {
        type: String

    },
    sold: {
        type: Boolean,
    },
    dateOfSale: {
        type: String,

    },
    month:{
        type:Number,
    }
}, {
    toObject: {
        getters: true,
    }
});

productSchema.statics.addProduct=async (product)=>{
    const data=await ProductModel.create(product);
    console.log("data=",data);
    return data;
}

productSchema.statics.updateProduct=async(id, month)=>{
    console.log(id," ",month)
    const data=await ProductModel.findOneAndUpdate({id},{
        $set:{month}
    },{new:true})
    console.log(data)
    return data;
}

productSchema.statics.getAllProduct=async(pageNo)=>{
    const data=await ProductModel.find({},{_id:0,__v:0}).skip((pageNo-1)*10).limit(11);
    // console.log(data)
    return data;
}

productSchema.statics.getAllProductByMonth=async(month)=>{
    const data=await ProductModel.find({month},{_id:0,__v:0})
    // console.log("data=",data)
    return data;
}

productSchema.statics.staticsByMonth=async(month)=>{
    const data=await ProductModel.find({month,sold:true},{_id:0,__v:0})
    // console.log("data=",data)
    return data;
}


productSchema.statics.soldCategoryByMonth=async(month,category)=>{
    const data=await ProductModel.find({month,sold:true,category},{_id:0,__v:0})
    // console.log("data=",data)
    return data;
}

const ProductModel = model("products", productSchema);

module.exports = ProductModel;
