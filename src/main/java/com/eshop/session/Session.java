package com.eshop.session;

import com.eshop.cart.Cart;
import com.eshop.cart.CartService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public class Session {
    private static final Logger logger = LogManager.getLogger(Session.class);
    private final String SID;
    private Map<String, Object> attributes;

    public Session() {
        this.SID = buildUID();
        this.attributes = new ConcurrentHashMap<>();
        logger.info("adding attribute to session");
        addAttribute("cart", new Cart());
        logger.info("session attribute 'cart': " + attributes.get("cart"));
    }

    private String buildUID() {
        UUID result = UUID.randomUUID();
        logger.info("building sid");
        return result.toString();
    }

    public String getSID() {
        return SID;
    }

    public void addAttribute(String attributeName, Object attributeEntity) {
        attributes.put(attributeName, attributeEntity);
    }

    public Object getAttribute(String attributeName) {
        Object attributeEntity = attributes.get(attributeName);
        return attributeEntity;
    }

}
