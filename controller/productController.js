const ProductModel=require('../model/productModel')

const addProduct=async(req,res)=>{
    try {
        const product=req.body;
        const data=await ProductModel.addProduct(product)
        res.status(200)
        res.send({success:true,message:"Product added successfully.",data})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const updateProductById=async(req, res)=>{
    try {
        const {id,month}=req.body
        const data=await ProductModel.updateProduct(id,month)
        res.status(200)
        res.send({success:true,message:"Product added successfully.",data})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


const getAllProduct=async(req,res)=>{
    try {
        const {pageNo}=req.body
        const data=await ProductModel.getAllProduct(pageNo)
        res.status(200)
        res.send({success:true, message:"List of all products.",data})
        
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getAllProductByMonth=async(req,res)=>{
    try {
        const {month}=req.body
        const data=await ProductModel.getAllProductByMonth(month)
        
        res.status(200)
        res.send({success:true,data})
        
    } catch (error) {
        
    }
}

const getStaticsByMonth=async(req,res)=>{
    try {
        const {month}=req.body
        const data=await ProductModel.getAllProductByMonth(month)
        const soldProduct=await ProductModel.staticsByMonth(month)
        const price=soldProduct.map(product=>product.price)
        const sum=price.reduce((acc, curr)=>acc+curr)
        const obj={
            saleAmount:sum,
            soldItems:price.length,
            notSoldItems:data.length-price.length
        }
        console.log("price=",sum)
        console.log("size=",price.length)
        console.log("size1=",data.length)
        res.status(200)
        res.send({success:true,obj})
        
    } catch (error) {
        
    }
}
    const barChart=async(req,res)=>{
        try {
            
            const {month}=req.body
            const soldProduct=await ProductModel.staticsByMonth(month)
            const price=soldProduct.map(product=>product.price)
            let i0to100=0,i101to200=0,i201to300=0,i301to400=0,i401to500=0,i501to600=0,i601to700=0,i701to800=0,i801to900=0,i901above=0
            price.forEach((i)=>
                {
                    if(i<=100)
                        i0to100++;
                    else if(i>=101 && i<=200)
                        i101to200++
                    else if(i>=201 && i<=300)
                        i201to300++
                    else if(i>=301 && i<=400)
                        i301to400++
                    else if(i>=401 && i<=500)
                        i401to500++
                    else if(i>=501 && i<=600)
                        i501to600++
                    else if(i>=601 && i<=700)
                        i601to700++
                    
                    else if(i>=701 && i<=800)
                        i701to800++
                    else
                        i901above++
                } )   
                const ob={
                    i0to100,
                    i101to200,
                    i201to300,
                    i301to400,
                    i401to500,
                    i501to600,i601to700,i701to800,i801to900,i901above
                }
                res.status(200)
            res.send({success:true,ob})
            
        } catch (error) {
            
        }
    }
    const pieChart=async(req,res)=>{
        try {

            const {month}=req.body
            let category="electronics"
            const electronicsProduct=await ProductModel.soldCategoryByMonth(month,category)
            category="men's clothing"
            const mensProduct=await ProductModel.soldCategoryByMonth(month,category)
            category="jewelery"
            const jeweleryProduct=await ProductModel.soldCategoryByMonth(month,category)
            category="women's clothing"
            const womenProduct=await ProductModel.soldCategoryByMonth(month,category)
            const obj={
                electronics:electronicsProduct.length,
                men:mensProduct.length,
                jewelery:jeweleryProduct.length,
                women:womenProduct.length
            }
            res.status(200)
            res.send({success:true,obj})
        } catch (error) {
            
        }
    }



module.exports={addProduct, getAllProduct,getAllProductByMonth,updateProductById,getStaticsByMonth,barChart,pieChart}