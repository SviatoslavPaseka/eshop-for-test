package com.eshop.cart;

import com.eshop.product.Product;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.swing.text.html.Option;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Cart {
//    private static final Logger logger = LogManager.getLogger(Cart.class);
    List<CartItem> items;
    int numberOfItems;

    public Cart() {
        items = new ArrayList<>();
        numberOfItems = 0;
    }

    public double getSubtotal() {

        double amount = 0;

        for (CartItem scItem : items) {

            Product product = scItem.getProduct();
            amount += (scItem.getQuantity() * product.getPrice());
        }
        BigDecimal b = new BigDecimal(amount);
        amount = b.setScale(2, BigDecimal.ROUND_HALF_EVEN).doubleValue();
        return amount;
    }

    private void printItems(){
        for (CartItem item:items
             ) {
            System.out.printf("----\nItem name: %s, item quantity: %s\n", item.product.getName(), String.valueOf(item.getQuantity()));
        }
        System.out.println("|||\n");
    }
    public synchronized int removeItem(Product product) {
        boolean isItemExist = false;
//        logger.info("Items list:");
        printItems();
        for (CartItem cItem : items) {
//            logger.info(String.format("Item: %s, quantity: %s", cItem.product.getName(), String.valueOf(cItem.getQuantity())));
            if (cItem.getProduct().getId() == product.getId()) {
                isItemExist = true;
//                logger.info("Item exist " + cItem.product.getName() + "! - " + true + "\n");
            }
            if (isItemExist) {
//                logger.info("!!Started to remove item: " + cItem.product.getName() + "\n");
                items.remove(cItem);
                printItems();
                return product.getId();
            }
        }
        return -1;
    }


    public synchronized void addItem(Product product) {

        boolean newItem = true;

        for (CartItem cItem : items) {

            if (cItem.getProduct().getId() == product.getId()) {

                newItem = false;
                cItem.incrementQuantity();
            }
        }

        if (newItem) {
            CartItem cItem = new CartItem(product);
            items.add(cItem);
        }
    }

    public synchronized void update(Product product, String quantity) {

        short qty = Short.parseShort(quantity);

        if (qty >= 0) {

            CartItem item = null;

            for (CartItem scItem : items) {

                if (scItem.getProduct().getId() == product.getId()) {

                    if (qty != 0) {
                        scItem.setQuantity(qty);
                    } else {
                        item = scItem;
                        break;
                    }
                }
            }

            if (item != null) {
                items.remove(item);
            }
        }
    }

    public List<CartItem> getItems() {
        return items;
    }

    public synchronized int getNumberOfItems() {

        numberOfItems = 0;

        for (CartItem scItem : items) {
            numberOfItems += scItem.getQuantity();
        }

        return numberOfItems;
    }

}