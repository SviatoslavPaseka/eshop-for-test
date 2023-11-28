package com.eshop.utils;

import org.json.JSONObject;

public class TemplateMessages {

    //Http code 400
    public static JSONObject requestBodyWrongFormat() {
        String template = "Request body wrong format";
        JSONObject result = new JSONObject().append("message", template);
        return result;
    }

    //Http code 404
    public static JSONObject productIsNotPresentInCart(String id) {
        String template = "Product with id: " + id +" is not present in cart";
        JSONObject result = new JSONObject().append("message", template);
        return result;
    }

    //Http code 404
    public static JSONObject productIsNotAvailable(String id) {
        String template = "Product with id: " + id +" is not available";
        JSONObject result = new JSONObject().append("message", template);
        return result;
    }

    //Http code 500
    public static JSONObject inputStreamError() {
        String template = "Failed to read input stream";
        JSONObject result = new JSONObject().append("message", template);
        return result;
    }

    //Http code 500
    public static JSONObject internalServerError() {
        String template = "Internal server error";
        JSONObject result = new JSONObject().append("message", template);
        return result;
    }

    //Http code 501
    public static JSONObject methodNotImplemented(String method) {
        String template = "Method " + method + " is not implemented";
        JSONObject result = new JSONObject().append("message", template);
        return result;
    }

    //Http code 501
    public static JSONObject uriNotImplemented(String requestURI) {
        String template = "URI " + requestURI + " is not implemented";
        JSONObject result = new JSONObject().append("message", template);
        return result;
    }

}
