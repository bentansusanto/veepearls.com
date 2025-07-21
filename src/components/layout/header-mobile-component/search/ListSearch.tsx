import { JewelType } from "@/common/Fetching/Product/fetch-jewel";
import { GetAllProducts } from "@/common/Fetching/Product/fetch-product";
import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ListSearch = () => {
    const {data: products} = GetAllProducts();
    const {data: jeweltype} = JewelType();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [filteredTypes, setFilteredTypes] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredProducts([]);
            setFilteredTypes([]);
            return;
        }

        // Filter products based on search term
        const matchingProducts = products?.filter((product: any) => 
            product.name_product?.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];
        setFilteredProducts(matchingProducts.slice(0, 5)); // Limit to 5 results

        // Filter jewel types based on search term
        const matchingTypes = jeweltype?.filter((type: any) => 
            type.name_type?.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];
        setFilteredTypes(matchingTypes.slice(0, 3)); // Limit to 3 results
    }, [searchTerm, products, jeweltype]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm("");
    };

    const navigateToProduct = (slug: string) => {
        router.push(`/products/${slug}`);
    };

    const navigateToCategory = (type: string) => {
        router.push(`/jewellery-type/${type}`);
    };

  return (
    <div>
      <div className="border border-gray-200 dark:border-gray-800 p-3 rounded-md flex items-center justify-between">
        <input
          type="text"
          placeholder="Search product here...."
          className="placeholder:text-sm text-sm w-full bg-transparent outline-none"
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <span 
            onClick={clearSearch}
            className="border border-gray-200 dark:border-gray-800 hover:dark:border-gray-500 transition-all duration-300 dark:text-white w-6 h-6 p-1 rounded-full flex justify-center items-center cursor-pointer"
          >
            <X width={14} height={14} strokeWidth={1.5} />
          </span>
        )}
      </div>
      
      {/* suggestions */}
      {filteredTypes.length > 0 && (
        <div className="space-y-3 mt-5">
          <p className="text-xs dark:text-gray-500">Suggestions</p>
          <div className="space-y-2">
            {filteredTypes.map((type) => (
              <p 
                key={type.id} 
                className="dark:text-white text-sm cursor-pointer hover:text-gray-500 dark:hover:text-gray-300"
                onClick={() => navigateToCategory(type.type)}
              >
                {type.name_type}
              </p>
            ))}
          </div>
        </div>
      )}
      
      {/* products */}
      {filteredProducts.length > 0 && (
        <div className="space-y-3 mt-5">
          <p className="text-xs dark:text-gray-500">Products</p>
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md"
                onClick={() => navigateToProduct(product.slug)}
              >
                <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={product.thumbnail || '/images/placeholder.png'} 
                    width={0}
                    height={0}
                    alt={product.name_product}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">{product.name_product}</p>
                  <p className="text-xs text-gray-500">{product.sku}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {searchTerm && filteredProducts.length === 0 && filteredTypes.length === 0 && (
        <div className="mt-5 text-center py-4">
          <p className="text-gray-500 dark:text-gray-400">No results found</p>
        </div>
      )}
    </div>
  );
};

export default ListSearch;
