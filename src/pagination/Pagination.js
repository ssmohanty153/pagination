import React, { useEffect, useState } from "react";

export default function Pagination() {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    console.log(data);
    if (data && data.products) {
      setProduct(data.products);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(product);
  return (
    <div>
      {product.length > 0 && (
        <div className="products">
          {product.slice(page * 12 - 12, page * 12).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} /> {/* alt is imp */}
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {product.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => setPage(page > 1 ? page - 1 : page)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀
          </span>
          {[...Array(Math.ceil(product.length / 12))].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() =>
              setPage(page < Math.ceil(product.length / 12) ? page + 1 : page)
            }
            className={
              page < Math.ceil(product.length / 12) ? "" : "pagination__disable"
            }
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}
