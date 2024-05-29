import React, { useState, useEffect } from "react";
import { apiUrl } from "../../config/BeApiEndpoint";
import MerchandiseItem from "../MerchandiseItem/MerchandiseItem";

const SearchMerchandise = ({ searchMerchandise,setSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(true);

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/Merchandise/name/${searchTerm}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.status === "success") {
                setSearchResults(data.data);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error("Có lỗi xảy ra khi tìm kiếm: ", error);
            setSearchResults([]);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className="search-merchandise-list">
            <input
                className="search-container"
                type="text"
                placeholder="Nhập tên hàng hóa cần tìm"
                value={searchTerm}
                onChange={handleChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
            />
           
           
        </div>
    );
}

export default SearchMerchandise;
