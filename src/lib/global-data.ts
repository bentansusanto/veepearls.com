export const payment = [
  // {
  //     payment_method: "cod",
  //     img: ''
  // },
  {
    payment_method: "paypal",
    img: "paypal.svg",
  },
  // {
  //   payment_method: "card",
  //   img: "",
  // }
];

export const orders = [
  {
    order_code: "#2932",
    order_date: "2023-07-27",
    carts: [
      {
        product_name: "Freshwater necklace set of jewellery",
        quantity: 2,
        price: 10.99,
        img: "https://res.cloudinary.com/dmgosztlh/image/upload/v1742462830/veepearl/sets%20of%20jewellery/S005/S005-pic-4.jpg",
      },
      {
        product_name: "Freshwater necklace set of jewellery 2",
        quantity: 2,
        price: 10.99,
        img: "https://res.cloudinary.com/dmgosztlh/image/upload/v1742462830/veepearl/sets%20of%20jewellery/S005/S005-pic-4.jpg",
      },
    ],
    amount: 20.98,
    payment_method: "PayPal",
    shipping_method: "Standard",
    order_status: "Pending",
  },
  {
    order_code: "#2934",
    order_date: "2023-07-28",
    carts: [
      {
        product_name: "Freshwater necklace set of jewellery 3",
        quantity: 2,
        price: 10.99,
        img: "https://res.cloudinary.com/dmgosztlh/image/upload/v1742462830/veepearl/sets%20of%20jewellery/S005/S005-pic-4.jpg",
      },
      {
        product_name: "Freshwater necklace set of jewellery 4",
        quantity: 2,
        price: 10.99,
        img: "https://res.cloudinary.com/dmgosztlh/image/upload/v1742462830/veepearl/sets%20of%20jewellery/S005/S005-pic-4.jpg",
      },
    ],
    amount: 20.98,
    payment_method: "PayPal",
    shipping_method: "Standard",
    order_status: "Completed",
  },
  {
    order_code: "#2935",
    order_date: "2023-07-28",
    carts: [
      {
        product_name: "Freshwater necklace set of jewellery 5",
        quantity: 2,
        price: 10.99,
        img: "https://res.cloudinary.com/dmgosztlh/image/upload/v1742462830/veepearl/sets%20of%20jewellery/S005/S005-pic-4.jpg",
      },
      {
        product_name: "Freshwater necklace set of jewellery 6",
        quantity: 2,
        price: 10.99,
        img: "https://res.cloudinary.com/dmgosztlh/image/upload/v1742462830/veepearl/sets%20of%20jewellery/S005/S005-pic-4.jpg",
      },
    ],
    amount: 20.98,
    payment_method: "PayPal",
    shipping_method: "Standard",
    order_status: "Failed",
  },
];
