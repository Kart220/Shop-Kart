import React from 'react'


export default function ProductCard({ product }){
function addToCart(){
console.log(`Add to cart: ${product.name}`)
alert(`Added "${product.name}" to cart (check console)`)
}


return (
<article className="card">
<div className="thumb">
<img src={product.image} alt={product.name} />
</div>
<div className="card-body">
<h3 className="title">{product.name}</h3>
<p className="meta">{product.category} · ⭐ {product.rating}</p>
<div className="bottom">
<div className="price">₹{product.price.toLocaleString()}</div>
<button className="btn" onClick={addToCart}>Add to Cart</button>
</div>
</div>
</article>
)
}