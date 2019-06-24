var CartModel=require("./cartmodel")
exports.addtocart=function(req,res){
    if(req.body.email&&req.body.pid){
    



        var cartdata = new CartModel(req.body)
        cartdata.save()
        .then (function(newcart){
            console.log("item added",newcart)
            res.send({
                code:200,
                data:newcart            
            })
        },
        function(error){
            console.log("error in adding",error)
            res.send({
                code:500,
                error:"Internal server error000"
            })
        }
        )
    }
    else{
        res.send({
            error:"Insufficient details"
        })
    }
}
exports.cartitems=function(req,res){
    if(req.body.email){
        CartModel.find({email:req.body.email},function(error,productslist){
            if(productslist.length>0){
                res.send({
                    code:200,
                    productslist:productslist
                })
            }
            else if(error){
                res.send({
                    code:500,
                    error:"Internal server error"
                })
            }
            else{
                res.send({
                    code:404,
                    error:"no item in cart"
                })
            }
        }
        )}
    else{
        res.send({
            error:"insufficient details",
            code:510
        })
    }

}