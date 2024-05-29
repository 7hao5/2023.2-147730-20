import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import { useLocation } from 'react-router-dom';
import { apiUrl } from '../config/BeApiEndpoint';
import SiteInventoryItem from '../components/SiteInventoryItems/SiteInventoryItem';

const Order = () => {
    const { user } = useUser();
    const location = useLocation();
    const [inventoryAndSitesList, setInventoryAndSitesList] = useState([]);
    const merchandiseList = location.state?.merchandiseList || [];

    console.log("Order merchandiseList", merchandiseList);

    const getInventoryAndSites = async (merchandiseCode) => {
        try {
            const response = await fetch(`${apiUrl}/Inventory/merchandiseCode/sites/${merchandiseCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => response.json())
            .then(data => {
                const resultData = data.data;
                resultData.forEach(item => {
                    setInventoryAndSitesList(prevList => [...prevList, item]);
                });
            });
            

        } catch (error) {
            console.error('Error fetching inventory and sites:', error);
        }
    };
    console.log("inventoryAndSitesList",inventoryAndSitesList)
    useEffect(() => {
        // Gọi API khi component được render
        merchandiseList.forEach(merchandise => {
            getInventoryAndSites(merchandise.merchandise_code);
        });
    }, [merchandiseList]);

    return (
        <div>
            {user?.role === 0 ? (
                <div>
                    <h1>Order</h1>
                    <SiteInventoryItem data={inventoryAndSitesList} />
                </div>
            ) : null}
        </div>
    );
};

export default Order;
