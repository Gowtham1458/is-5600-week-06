import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  const limit = 10;
  // Offset for pagination (index of the first product in the current page)
  const [offset, setOffset] = useState(0);
  // The complete dataset after any search filtering; initially it's the full data set.
  const [filteredData, setFilteredData] = useState(data);
  // Products to display on the current page
  const [products, setProducts] = useState(filteredData.slice(0, limit));

  // Update the products displayed when offset, limit, or filteredData changes
  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, limit, filteredData]);

  // Single pagination handler that accepts a direction (-1 for previous, +1 for next)
  const handlePagination = (direction) => {
    const newOffset = offset + direction * limit;
    // Prevent going before the beginning or beyond the end of the filtered list
    if (newOffset < 0 || newOffset >= filteredData.length) return;
    setOffset(newOffset);
  };

  // Filter the original data by tags when a search term is entered
  const filterTags = (searchTerm) => {
    const filtered = data.filter((product) => {
      return (
        product.tags &&
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm)
        )
      );
    });
    setFilteredData(filtered);
    setOffset(0); // Reset to the first page of filtered results
  };

  return (
    <div className="cf pa2">
      {/* Search component to filter products by tags */}
      <Search handleSearch={filterTags} />
      
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      
      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => handlePagination(-1)}
          disabled={offset === 0}
        />
        <Button
          text="Next"
          handleClick={() => handlePagination(1)}
          disabled={offset + limit >= filteredData.length}
        />
      </div>
    </div>
  );
};

export default CardList;